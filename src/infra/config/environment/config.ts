import { Config } from '@/domain/config'
import * as dotenv from 'dotenv'
dotenv.config()

const env = (name: string) => {
  return process.env[name]
}

export const config: Config = {
  port: +env('PORT') || 4000,
  isDev: env('NODE_ENV') === 'DEV',
  isTest: env('NODE_ENV') === 'TEST',
  mongoDb: {
    host: env('MONGODB_HOST') || 'mongodb:27017',
    user: env('MONGODB_USER') || 'test',
    password: env('MONGODB_PASSWORD') || 'test',
    database: env('MONGODB_DATABASE') || 'wavvesdb'
  },
  jwt: {
    secret: env('JWT_SECRET') || 's3cr3t',
    sessionTtl: +env('JWT_SESSION_TTL') || 12 * 60 * 60,
    salt: +env('JWT_ENCRYPTION_SALT') || 12
  },
  imgur: {
    clientId: env('IMGUR_CLIENT_ID'),
    clientSecret: env('IMGUR_CLIENT_SECRET'),
    clientName: env('IMGUR_CLIENT_NAME') || 'WavvesAPI',
    clientAlbum: env('IMGUR_CLIENT_ALBUM') || 'l9p5TSwsd8lsdRe',
    albumProps: {
      id: '9gAjF3H',
      deletehash: 'l9p5TSwsd8lsdRe',
      title: 'wavves',
      description: 'wavves album api'
    }
  }
}
