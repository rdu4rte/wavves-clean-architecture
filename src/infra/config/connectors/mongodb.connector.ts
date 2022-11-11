import { Db, MongoClient } from 'mongodb'
import { config } from '../environment'

export const MongoConnection = {
  client: null as MongoClient,
  uri: null as string,

  async connect(uri: string): Promise<MongoClient> {
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    })
    return this.client
  },

  async disconnect(): Promise<void> {
    await this.client.close()
    this.client = null
  },

  getUri(host: string, user: string, password: string): string {
    const uri = config.isProd
      ? `mongodb+srv://${config.mongoDb.user}:${config.mongoDb.password}@${config.mongoDb.host}/?retryWrites=true&w=majority`
      : `mongodb://${user}:${password}@${host}/admin?maxIdleTimeMS=120000`

    return uri
  },

  async getConnection(
    host: string,
    user: string,
    password: string,
    db?: string
  ): Promise<Db> {
    this.uri = this.getUri(host, user, password)

    console.log(this.uri)
    if (!this.client?.isConnected()) await this.connect(this.uri)
    return db ? this.client.db(db) : this.client
  }
}
