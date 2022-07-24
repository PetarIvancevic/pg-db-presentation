/**
 * User ids will always start from 1 - 10000 because the DB is truncated when seeded.
 * Using exact ids here to have better comparisons.
 *
 * Some predefined data:
 * - everyone has read the first book
 * - everyone also read a random book
 *
 */
const _ = require('lodash')
const db = require('../db')
const books = require('../bookDbData.json')
const { NUM_USERS } = require('../constants')

const NUM_BOOKS = books.length - 1

function generateReplacementValues (arrLength) {
  const replacements = []

  for (let i = 0; i < arrLength; i++) {
    const replacementIndex = i * 5
    replacements.push(`($${replacementIndex + 1}, $${replacementIndex + 2}, $${replacementIndex + 3}, $${replacementIndex + 4}, $${replacementIndex + 5})`)
  }
  return replacements
}

function generateBooks () {
  const userBooksToCreate = []
  const bookEveryoneRead = books[0]

  for (let i = 0; i < NUM_USERS; i++) {
    const randomBook = books[_.random(1, NUM_BOOKS)]
    userBooksToCreate.push([
      i + 1, // user_id
      bookEveryoneRead.title,
      bookEveryoneRead.authors.join(','),
      bookEveryoneRead.pageCount,
      _.random(1, 5) // review
    ])
    userBooksToCreate.push([
      i + 1, // user_id
      randomBook.title,
      randomBook.authors.join(','),
      randomBook.pageCount,
      _.random(1, 5) // review
    ])
  }

  return _.shuffle(userBooksToCreate)
}

async function createRandomUsers () {
  const dbClient = await db.getClient()
  await dbClient.query('TRUNCATE ONLY user_books RESTART IDENTITY')

  const queryBooksArr = generateBooks()
  await dbClient.query(`
    INSERT INTO user_books (user_id, book_title, book_authors, page_count, review)
    VALUES ${generateReplacementValues(queryBooksArr.length).join(',')}
  `, _.flatten(queryBooksArr))
  await db.close()
}

createRandomUsers()
.catch(console.error)
.finally(() => {
  db.close()
})