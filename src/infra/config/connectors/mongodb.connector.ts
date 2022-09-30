import { Db, MongoClient } from 'mongodb'

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

  async getConnection(
    host: string,
    user: string,
    password: string,
    db?: string
  ): Promise<Db> {
    const uri = `mongodb://${user}:${password}@${host}/admin?maxIdleTimeMS=120000`

    this.uri = uri
    if (!this.client?.isConnected()) await this.connect(this.uri)
    return db ? this.client.db(db) : this.client
  }
}
