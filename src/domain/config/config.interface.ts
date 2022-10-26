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
  imgur: {
    clientId: string
    clientSecret: string
    clientName: string
    clientAlbum: string
    albumProps?: {
      id: string
      deletehash: string
      title: string
      description: string
    }
  }
}
