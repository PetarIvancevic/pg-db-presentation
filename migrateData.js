const _ = require('lodash')
const db = require('./db')

async function migrateData () {
  const dbClient = await db.getClient()
  const userBooks = _.get(await dbClient.query('SELECT * FROM user_books'), 'rows', [])
  const grouped = _.groupBy(userBooks, 'book_title')

  const bookTitles = _.keys(grouped)

  const replacements = []
  const values = []
  for (let i = 0; i < bookTitles.length; i++) {
    const bookData = grouped[bookTitles[i]][0]
    const replacementIndex = (i * 3)
    replacements.push(`($${replacementIndex + 1}, $${replacementIndex + 2}, $${replacementIndex + 3})`)
    values.push([bookData.book_title, bookData.book_authors, bookData.page_count])
  }

  await dbClient.query(`
    INSERT INTO books (title, authors, page_count)
    VALUES ${replacements.join(', ')}
  `, _.flatten(values))

  const books = _.groupBy(
    _.get(await dbClient.query('SELECT * FROM books'), 'rows', []),
    'title'
  )
  const bookKeys = _.keys(books)

  await dbClient.query(`
    ALTER TABLE user_books ADD COLUMN book_id INTEGER REFERENCES books(id)
  `)
  for (let i = 0; i < bookKeys.length; i++) {
    const book = books[bookKeys[i]][0]
    await dbClient.query(`
      UPDATE user_books SET book_id = $1
      WHERE book_title = $2
    `, [book.id, book.title])
  }

  await dbClient.query(`
    ALTER TABLE user_books DROP COLUMN book_title;
    ALTER TABLE user_books DROP COLUMN book_authors;
    ALTER TABLE user_books DROP COLUMN page_count;
  `)

}

migrateData()
.catch(console.error)
.finally(() => {
  db.close()
})