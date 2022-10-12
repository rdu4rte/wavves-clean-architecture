import { HttpCtx } from '@/domain/graphql'
import {
  GetUserById,
  GetUsers,
  InactivateUser,
  InsertUser,
  UpdateUserPassword
} from '@/usecases/users'
import { Inject } from '@nestjs/common'
import {
  Args,
  Context,
  Directive,
  Mutation,
  Query,
  Resolver
} from '@nestjs/graphql'
import { DefaultResponse, PaginationParams } from '../dtos'
import {
  UserDataOutput,
  UserDto,
  UserFiltersInput,
  UserInput
} from '../dtos/users.dto'
import { UseCaseProxy, UsecasesProxyModule } from '../usecases-proxy'

@Resolver(() => UserDto)
export class UserResolver {
  constructor(
    @Inject(UsecasesProxyModule.GET_USERS)
    private readonly getUsersProxy: UseCaseProxy<GetUsers>,
    @Inject(UsecasesProxyModule.GET_USER_BY_ID)
    private readonly getUserByIdProxy: UseCaseProxy<GetUserById>,
    @Inject(UsecasesProxyModule.INSERT_USER)
    private readonly insertUserProxy: UseCaseProxy<InsertUser>,
    @Inject(UsecasesProxyModule.UPDATE_USER_PASSWORD)
    private readonly updateUserPasswordProxy: UseCaseProxy<UpdateUserPassword>,
    @Inject(UsecasesProxyModule.INACTIVATE_USER)
    private readonly inactivateUserProxy: UseCaseProxy<InactivateUser>
  ) {}

  @Query(() => UserDataOutput)
  @Directive('@authSession')
  @Directive('@dbConn')
  async users(
    @Args('pagination') pagination: PaginationParams,
    @Args('filters') filters: UserFiltersInput,
    @Context() { dbConn }: HttpCtx
  ): Promise<UserDataOutput> {
    return this.getUsersProxy.getInstance().perform(pagination, filters, dbConn)
  }

  @Query(() => UserDto)
  @Directive('@authSession')
  @Directive('@dbConn')
  async user(
    @Args('user_id') userId: string,
    @Context() { dbConn }: HttpCtx
  ): Promise<UserDto> {
    return this.getUserByIdProxy.getInstance().perform(userId, dbConn)
  }

  @Mutation(() => DefaultResponse)
  @Directive('@dbConn')
  async insertUser(
    @Args('input') input: UserInput,
    @Context() { dbConn }: HttpCtx
  ): Promise<DefaultResponse> {
    return this.insertUserProxy.getInstance().perform(input, dbConn)
  }

  @Mutation(() => DefaultResponse)
  @Directive('@authSession')
  @Directive('@dbConn')
  async updateUserPassword(
    @Args('user_id') userId: string,
    @Args('password') password: string,
    @Context() { dbConn }: HttpCtx
  ): Promise<DefaultResponse> {
    return this.updateUserPasswordProxy
      .getInstance()
      .perform(userId, password, dbConn)
  }

  @Mutation(() => DefaultResponse)
  @Directive('@authSession(role: ["admin"])')
  @Directive('@dbConn')
  async inactivateUser(
    @Args('user_id') userId: string,
    @Context() { dbConn }: HttpCtx
  ): Promise<DefaultResponse> {
    return this.inactivateUserProxy.getInstance().perform(userId, dbConn)
  }
}
