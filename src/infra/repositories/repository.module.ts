import { Module } from '@nestjs/common'
import { BookRepository } from './books.repository'

@Module({
  providers: [BookRepository],
  exports: [BookRepository]
})
export class RepositoriesModule {}
