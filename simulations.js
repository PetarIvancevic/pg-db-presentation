const db = require('./db')

/**
 * Run db simulations
 */
async function run () {
  const dbClient = await db.getClient()

  console.log('Hello')
}

run()
.then(async () => {
  await db.dbClose()
})
.catch(console.error)