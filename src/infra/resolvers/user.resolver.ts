import { HttpCtx } from '@/domain/graphql'
import { GetUsers } from '@/usecases/users'
import { Inject } from '@nestjs/common'
import { Args, Context, Directive, Query, Resolver } from '@nestjs/graphql'
import { PaginationParams } from '../dtos'
import { UserDataOutput, UserDto, UserFiltersInput } from '../dtos/users.dto'
import { UseCaseProxy, UsecasesProxyModule } from '../usecases-proxy'

@Resolver(() => UserDto)
export class UserResolver {
  constructor(
    @Inject(UsecasesProxyModule.GET_USERS)
    private readonly getUsersProxy: UseCaseProxy<GetUsers>
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
}
