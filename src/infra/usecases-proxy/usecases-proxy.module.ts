import { GetBooks } from '@/usecases/books'
import { DynamicModule, Module } from '@nestjs/common'
import { LoggerService } from '../logger'
import { BookRepository } from '../repositories'
import { UseCaseProxy } from './usecases-proxy'

@Module({
  providers: [LoggerService, BookRepository]
})
export class UsecasesProxyModule {
  static GET_BOOKS = 'GetBooks'

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [LoggerService, BookRepository],
          provide: UsecasesProxyModule.GET_BOOKS,
          useFactory: (logger: LoggerService, bookRepository: BookRepository) =>
            new UseCaseProxy(new GetBooks(logger, bookRepository))
        }
      ],
      exports: [UsecasesProxyModule.GET_BOOKS]
    }
  }
}
