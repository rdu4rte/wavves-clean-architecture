import { Module } from '@nestjs/common'
import { UsecasesProxyModule } from '../usecases-proxy'
import { BookResolver } from './book.resolver'

@Module({
  imports: [UsecasesProxyModule.register()],
  providers: [BookResolver]
})
export class ResolversModule {}
