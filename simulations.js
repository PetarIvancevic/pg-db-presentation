const db = require('./db')

/**
 * Run db simulations
 */
async function run () {
  const dbClient = await db.getClient()

  console.log('Hello')
}

run()
.catch(console.error)
.finally(async () => {
  await db.close()
})