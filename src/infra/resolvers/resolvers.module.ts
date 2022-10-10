import { Module } from '@nestjs/common'
import { UsecasesProxyModule } from '../usecases-proxy'
import { BookResolver } from './book.resolver'
import { UserResolver } from './user.resolver'

@Module({
  imports: [UsecasesProxyModule.register()],
  providers: [BookResolver, UserResolver]
})
export class ResolversModule {}
