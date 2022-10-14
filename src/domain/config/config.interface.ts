export interface Config {
  port: number
  isDev: boolean
  isTest: boolean
  mongoDb: {
    host: string
    user: string
    password: string
    database: string
  }
  jwt: {
    secret: string
    sessionTtl: number
    salt: number
  }
}
