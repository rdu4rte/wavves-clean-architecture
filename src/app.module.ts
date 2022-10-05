import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import {
  authSessionDirective,
  dbConnectorDirective
} from './infra/config/graphql/directives'
import { ObjectIdScalar } from './infra/config/graphql/scalars'
import { RepositoriesModule } from './infra/repositories'
import { ResolversModule } from './infra/resolvers'
import { UsecasesProxyModule } from './infra/usecases-proxy'

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: false,
      playground: true,
      sortSchema: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      resolvers: { ObjectId: ObjectIdScalar },
      schemaDirectives: {
        dbConn: dbConnectorDirective,
        authSession: authSessionDirective
      }
    }),
    ResolversModule,
    RepositoriesModule,
    UsecasesProxyModule.register()
  ]
})
export class AppModule {}
