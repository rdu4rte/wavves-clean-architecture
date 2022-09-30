import { Db } from 'mongodb'
import { MongoConnection } from '../config/connectors'
import { config } from '../config/environment'
import { LoggerService } from '../logger'
import * as data from './data'

const runSeed = async (): Promise<void> => {
  const logger = new LoggerService()

  await new Promise((resolve) => {
    setTimeout(resolve, 5000)
  })

  try {
    const dbConn: Db = await MongoConnection.getConnection(
      config.mongoDb.host || 'localhost:27027',
      config.mongoDb.user || 'test',
      config.mongoDb.password || 'test',
      config.mongoDb.database || 'wavvesdb'
    )

    for (const [collection, documents] of Object.entries(data)) {
      logger.log('Seed', `Seeding "${collection}" collection`)
      await dbConn.collection(collection).insertMany(documents)
    }

    logger.log('Seed', 'Collections successfully seeded')
  } catch (err) {
    logger.error('SeedErr', `Failed to seed DB due to: ${err?.message}`)
    process.exit(1)
  }
}

runSeed().then(() => process.exit(0))
