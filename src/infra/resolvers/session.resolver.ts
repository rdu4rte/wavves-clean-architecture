import { HttpCtx } from '@/domain/graphql'
import { Login } from '@/usecases/sessions'
import { Inject } from '@nestjs/common'
import { Args, Context, Directive, Mutation, Resolver } from '@nestjs/graphql'
import { CredentialsDto, SessionDto, SessionResponse } from '../dtos'
import { UseCaseProxy, UsecasesProxyModule } from '../usecases-proxy'

@Resolver(() => SessionDto)
export class SessionResolver {
  constructor(
    @Inject(UsecasesProxyModule.LOGIN_USER)
    private readonly loginProxy: UseCaseProxy<Login>
  ) {}

  @Mutation(() => SessionResponse)
  @Directive('@dbConn')
  async login(
    @Args('credentials') credentials: CredentialsDto,
    @Context() { dbConn }: HttpCtx
  ): Promise<SessionResponse> {
    return this.loginProxy.getInstance().perform(credentials, dbConn)
  }
}
