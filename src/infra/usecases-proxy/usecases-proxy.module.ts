import { GetBooks } from '@/usecases/books'
import {
  GetUserById,
  GetUsers,
  InsertUser,
  UpdateUserPassword
} from '@/usecases/users'
import { DynamicModule, Module } from '@nestjs/common'
import { EncrypterHelper, MongoDbHelper } from '../helpers'
import { LoggerService } from '../logger'
import { BookRepository, UserRepository } from '../repositories'
import { UseCaseProxy } from './usecases-proxy'

@Module({
  providers: [
    LoggerService,
    MongoDbHelper,
    EncrypterHelper,
    BookRepository,
    UserRepository
  ]
})
export class UsecasesProxyModule {
  static GET_BOOKS = 'GetBooks'

  static GET_USERS = 'GetUsers'
  static GET_USER_BY_ID = 'GetUserById'
  static INSERT_USER = 'InsertUser'
  static UPDATE_USER_PASSWORD = 'UpdateUserPassword'

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
        },
        {
          inject: [LoggerService, UserRepository],
          provide: UsecasesProxyModule.GET_USER_BY_ID,
          useFactory: (
            logger: LoggerService,
            usersRepository: UserRepository
          ) => new UseCaseProxy(new GetUserById(logger, usersRepository))
        },
        {
          inject: [LoggerService, UserRepository, EncrypterHelper],
          provide: UsecasesProxyModule.INSERT_USER,
          useFactory: (
            logger: LoggerService,
            usersRepository: UserRepository,
            encrypterHelper: EncrypterHelper
          ) =>
            new UseCaseProxy(
              new InsertUser(logger, usersRepository, encrypterHelper)
            )
        },
        {
          inject: [LoggerService, UserRepository, EncrypterHelper],
          provide: UsecasesProxyModule.UPDATE_USER_PASSWORD,
          useFactory: (
            logger: LoggerService,
            usersRepository: UserRepository,
            encrypterHelper: EncrypterHelper
          ) =>
            new UseCaseProxy(
              new UpdateUserPassword(logger, usersRepository, encrypterHelper)
            )
        }
      ],
      exports: [
        UsecasesProxyModule.GET_BOOKS,
        UsecasesProxyModule.GET_USERS,
        UsecasesProxyModule.GET_USER_BY_ID,
        UsecasesProxyModule.INSERT_USER,
        UsecasesProxyModule.UPDATE_USER_PASSWORD
      ]
    }
  }
}
