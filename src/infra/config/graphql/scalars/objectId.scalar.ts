import { GraphQLScalarType, Kind } from 'graphql'
import { ObjectId } from 'mongodb'

export const ObjectIdScalar = new GraphQLScalarType({
  name: 'ObjectId',
  description: 'Mongo Object Id scalar type',
  serialize(value: ObjectId) {
    return value.toHexString()
  },
  parseValue(value: unknown) {
    return new ObjectId(value.toString())
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) return new ObjectId(ast.value)
    return null
  }
})
