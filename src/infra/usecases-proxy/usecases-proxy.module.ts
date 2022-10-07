import { GetBooks } from '@/usecases/books'
import { GetUsers } from '@/usecases/users'
import { DynamicModule, Module } from '@nestjs/common'
import { MongoDbHelper } from '../helpers'
import { LoggerService } from '../logger'
import { BookRepository, UserRepository } from '../repositories'
import { UseCaseProxy } from './usecases-proxy'

@Module({
  providers: [LoggerService, MongoDbHelper, BookRepository, UserRepository]
})
export class UsecasesProxyModule {
  static GET_BOOKS = 'GetBooks'

  static GET_USERS = 'GetUsers'

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [LoggerService, BookRepository],
          provide: UsecasesProxyModule.GET_BOOKS,
          useFactory: (logger: LoggerService, bookRepository: BookRepository) =>
            new UseCaseProxy(new GetBooks(logger, bookRepository))
        },
        {
          inject: [LoggerService, UserRepository, MongoDbHelper],
          provide: UsecasesProxyModule.GET_USERS,
          useFactory: (
            logger: LoggerService,
            usersRepository: UserRepository,
            mongoDbHelper: MongoDbHelper
          ) =>
            new UseCaseProxy(
              new GetUsers(logger, usersRepository, mongoDbHelper)
            )
        }
      ],
      exports: [UsecasesProxyModule.GET_BOOKS, UsecasesProxyModule.GET_USERS]
    }
  }
}
