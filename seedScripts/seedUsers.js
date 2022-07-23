const _ = require('lodash')
const db = require('../db')

const firstName = ['jack', 'anne', 'loki', 'thor', 'brian', 'julia', 'ivan', 'tony', 'stipe', 'michael', 'mila', 'marija', 'aragorn']
const lastName = ['mcdougal', 'sprout', 'snape', 'dragon', 'john', 'right', 'davis', 'brown', 'smith']

const NUM_USERS = 10000

const NUM_FIRST_NAMES_FOR_LOOP = firstName.length - 1
const NUM_LAST_NAMES_FOR_LOOP = lastName.length - 1

const getRandom = num => _.random(0, num)

const usersToCreate = []
const generatedStrValues = []

for (let i = 0; i < NUM_USERS; i++) {
  const randomFirstName = firstName[getRandom(NUM_FIRST_NAMES_FOR_LOOP)]
  const randomLastName = lastName[getRandom(NUM_LAST_NAMES_FOR_LOOP)]
  generatedStrValues.push(`($${i + 1})`)
  usersToCreate.push(`${randomFirstName}.${randomLastName}${i}@mail.com`)
}

async function createRandomUsers () {
  const dbClient = await db.getClient()
  await dbClient.query('TRUNCATE ONLY users RESTART IDENTITY')
  await dbClient.query(`
    INSERT INTO users (email) VALUES ${generatedStrValues.join(',')}
  `, usersToCreate)
  await db.close()
}

createRandomUsers()
.catch(console.error)
.finally(() => {
  db.close()
})