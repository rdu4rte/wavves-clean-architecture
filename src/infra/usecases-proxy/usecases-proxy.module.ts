import { GetBooks } from '@/usecases/books'
import {
  Login,
  GetSession,
  GetSessions,
  InactivateSessions
} from '@/usecases/sessions'
import {
  GetUserById,
  GetUsers,
  InactivateUser,
  InsertUser,
  UpdateUserPassword
} from '@/usecases/users'
import { DynamicModule, Module } from '@nestjs/common'
import {
  EncrypterHelper,
  JwtHelper,
  MongoDbHelper,
  UuidHelper
} from '../helpers'
import { LoggerService } from '../logger'
import {
  BookRepository,
  SessionRepository,
  UserRepository
} from '../repositories'
import { UseCaseProxy } from './usecases-proxy'

@Module({
  providers: [
    LoggerService,
    MongoDbHelper,
    EncrypterHelper,
    JwtHelper,
    UuidHelper,
    BookRepository,
    UserRepository,
    SessionRepository
  ]
})
export class UsecasesProxyModule {
  static GET_BOOKS = 'GetBooks'

  static GET_USERS = 'GetUsers'
  static GET_USER_BY_ID = 'GetUserById'
  static INSERT_USER = 'InsertUser'
  static UPDATE_USER_PASSWORD = 'UpdateUserPassword'
  static INACTIVATE_USER = 'InactivateUser'

  static LOGIN_USER = 'Login'
  static GET_SESSION = 'GetSession'
  static GET_SESSIONS_LIST = 'GetSessions'
  static INACTIVATE_SESSIONS = 'InactivateSessions'

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
          inject: [
            LoggerService,
            UserRepository,
            EncrypterHelper,
            MongoDbHelper
          ],
          provide: UsecasesProxyModule.UPDATE_USER_PASSWORD,
          useFactory: (
            logger: LoggerService,
            usersRepository: UserRepository,
            encrypterHelper: EncrypterHelper,
            mongoDbHelper: MongoDbHelper
          ) =>
            new UseCaseProxy(
              new UpdateUserPassword(
                logger,
                usersRepository,
                encrypterHelper,
                mongoDbHelper
              )
            )
        },
        {
          inject: [LoggerService, UserRepository, MongoDbHelper],
          provide: UsecasesProxyModule.INACTIVATE_USER,
          useFactory: (
            logger: LoggerService,
            usersRepository: UserRepository,
            mongoDbHelper: MongoDbHelper
          ) =>
            new UseCaseProxy(
              new InactivateUser(logger, usersRepository, mongoDbHelper)
            )
        },
        {
          inject: [
            LoggerService,
            SessionRepository,
            UserRepository,
            EncrypterHelper,
            JwtHelper,
            UuidHelper
          ],
          provide: UsecasesProxyModule.LOGIN_USER,
          useFactory: (
            logger: LoggerService,
            sessionRepository: SessionRepository,
            userRepository: UserRepository,
            encrypterHelper: EncrypterHelper,
            jwtHelper: JwtHelper,
            uuidHelper: UuidHelper
          ) =>
            new UseCaseProxy(
              new Login(
                logger,
                sessionRepository,
                userRepository,
                encrypterHelper,
                jwtHelper,
                uuidHelper
              )
            )
        },
        {
          inject: [LoggerService, SessionRepository],
          provide: UsecasesProxyModule.GET_SESSION,
          useFactory: (
            logger: LoggerService,
            sessionRepository: SessionRepository
          ) => new UseCaseProxy(new GetSession(logger, sessionRepository))
        },
        {
          inject: [LoggerService, SessionRepository, MongoDbHelper],
          provide: UsecasesProxyModule.GET_SESSIONS_LIST,
          useFactory: (
            logger: LoggerService,
            sessionRepository: SessionRepository,
            mongoDbHelper: MongoDbHelper
          ) =>
            new UseCaseProxy(
              new GetSessions(logger, sessionRepository, mongoDbHelper)
            )
        },
        {
          inject: [LoggerService, SessionRepository, MongoDbHelper],
          provide: UsecasesProxyModule.INACTIVATE_SESSIONS,
          useFactory: (
            logger: LoggerService,
            sessionRepository: SessionRepository,
            mongoDbHelper: MongoDbHelper
          ) =>
            new UseCaseProxy(
              new InactivateSessions(logger, sessionRepository, mongoDbHelper)
            )
        }
      ],
      exports: [
        UsecasesProxyModule.GET_BOOKS,
        UsecasesProxyModule.GET_USERS,
        UsecasesProxyModule.GET_USER_BY_ID,
        UsecasesProxyModule.INSERT_USER,
        UsecasesProxyModule.UPDATE_USER_PASSWORD,
        UsecasesProxyModule.INACTIVATE_USER,
        UsecasesProxyModule.LOGIN_USER,
        UsecasesProxyModule.GET_SESSION,
        UsecasesProxyModule.GET_SESSIONS_LIST,
        UsecasesProxyModule.INACTIVATE_SESSIONS
      ]
    }
  }
}
