import { SchemaDirectiveVisitor } from 'apollo-server-express'
import { defaultFieldResolver, GraphQLField } from 'graphql'
import { Db } from 'mongodb'
import { MongoConnection } from '../../connectors'
import { config } from '../../environment'

export class dbConnectorDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>): void {
    const { resolve = defaultFieldResolver } = field
    field.resolve = async function (...args) {
      const db: Db = await MongoConnection.getConnection(
        config.mongoDb.host || 'localhost:27017',
        config.mongoDb.user || 'test',
        config.mongoDb.password || 'test',
        config.mongoDb.database || 'wavvesdb'
      )
      args[2].dbConn = db // context
      return await resolve.apply(this, args)
    }
  }
}
