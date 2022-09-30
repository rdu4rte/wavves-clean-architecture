export interface Config {
  port: number
  isDev: boolean
  mongoDb: {
    host: string
    user: string
    password: string
    database: string
  }
}
