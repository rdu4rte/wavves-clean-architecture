import { Config } from '@/domain/config'
import * as dotenv from 'dotenv'
dotenv.config()

const env = (name: string) => {
  return process.env[name]
}

export const config: Config = {
  port: +env('PORT') || 4000,
  isDev: env('NODE_ENV') === 'DEV',
  mongoDb: {
    host: env('MONGODB_HOST') || 'mongodb:27017',
    user: env('MONGODB_USER') || 'test',
    password: env('MONGODB_PASSWORD') || 'test',
    database: env('MONGODB_DATABASE') || 'wavvesdb'
  }
}
