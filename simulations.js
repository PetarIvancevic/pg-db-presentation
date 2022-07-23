const db = require('./db')
const argv = require('argv')

const { options: sentArgs } = argv.option({
  name: 'simulation',
  short: 's',
  type: 'string'
}).run()

function getSimulationExecutor (client) {
  return async (query, queryParams, numTimes = 5000) => {
    for (let i = 0; i < numTimes; i++) {
      await client.query(query, queryParams)
    }
  }
}

/**
 * Run email db simulations
 */
async function runEmailExample () {
  const dbClient = await db.getClient()
  const dbSimulator = getSimulationExecutor(dbClient)

  /**
   * Simulate simple selects with LIKE property
   */
  const simpleSelectQuery = `SELECT * FROM users WHERE email LIKE $1`
  const simpleQueryParam = 'AM'
  await dbSimulator(simpleSelectQuery, [`${simpleQueryParam}%`])
}

/**
 * Run book title db simulations
 */
 async function runBookTitleExamples () {
  const dbClient = await db.getClient()
  const dbSimulator = getSimulationExecutor(dbClient)

  /**
   * Simulate simple selects with LIKE property
   */
  const simpleSelectQuery = `SELECT * FROM user_books WHERE book_title = $1`
  const simpleQueryParam = 'Unlocking Android'
  await dbSimulator(simpleSelectQuery, [`${simpleQueryParam}%`])
}

const fnsToRun = {
  email: runEmailExample,
  'book-title': runBookTitleExamples
}

if (fnsToRun[sentArgs.simulation]) {
  fnsToRun[sentArgs.simulation]()
    .catch(console.error)
    .finally(async () => {
      await db.close()
    })
} else {
  console.log('Invalid simulation sent!')
}
