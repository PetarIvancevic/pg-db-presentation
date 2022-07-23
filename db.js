const { Client, Pool } = require('pg')

const connectionString = process.env.DATABASE_URL

let dbClient

async function getClient () {
  if (dbClient) {
    return dbClient
  }

  dbClient = new Client({
    connectionString
  })
  await dbClient.connect()
  // verify connection
  await dbClient.query('SELECT 1+1')
  console.log('Connected to DB!')
  return dbClient
}

async function dbClose () {
  if (dbClient) {
    await dbClient.end()
  }
}

module.exports = {
  connectionString,
  dbClient,
  getClient,
  dbClose,
}