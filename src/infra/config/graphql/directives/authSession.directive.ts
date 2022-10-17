import { Role, SessionDto } from '@/infra/dtos'
import { SessionRepository } from '@/infra/repositories'
import { CheckSessionIntegrity } from '@/usecases/sessions'
import { UnauthorizedException } from '@nestjs/common'
import { SchemaDirectiveVisitor } from 'apollo-server-express'
import { defaultFieldResolver, GraphQLField } from 'graphql'
import { Db } from 'mongodb'

export class authSessionDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>): void {
    const { resolve = defaultFieldResolver } = field
    const thisArgs = this.args

    field.resolve = async function (...args) {
      const checkSessionIntegrity = new CheckSessionIntegrity(
        new SessionRepository()
      )

      const sessionId =
        args[2].req.headers['authorization'] || args[2].headers['authorization']

      const roles: Role[] = thisArgs?.roles
      const dbConn: Db = args[2].dbConn

      if (!sessionId || !dbConn)
        throw new UnauthorizedException(
          'Authentication failed, session not found'
        )

      const session: SessionDto = await checkSessionIntegrity.perform(
        sessionId.split(' ')[1],
        dbConn
      )

      args[2].userId = session?.user?._id // context

      if (roles && !roles.includes(session?.user?.role))
        throw new UnauthorizedException('Role not authorized')

      return await resolve.apply(this, args)
    }
  }
}
