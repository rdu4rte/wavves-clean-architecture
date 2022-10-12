import { HttpCtx } from '@/domain/graphql'
import {
  GetSession,
  GetSessions,
  InactivateSessions,
  Login
} from '@/usecases/sessions'
import { Inject } from '@nestjs/common'
import {
  Args,
  Context,
  Directive,
  Mutation,
  Query,
  Resolver
} from '@nestjs/graphql'
import {
  CredentialsDto,
  DefaultResponse,
  PaginationParams,
  SessionDto,
  SessionResponse,
  SessionsDataOutput
} from '../dtos'
import { UseCaseProxy, UsecasesProxyModule } from '../usecases-proxy'

@Resolver(() => SessionDto)
export class SessionResolver {
  constructor(
    @Inject(UsecasesProxyModule.LOGIN_USER)
    private readonly loginProxy: UseCaseProxy<Login>,
    @Inject(UsecasesProxyModule.GET_SESSIONS_LIST)
    private readonly getSessionsProxy: UseCaseProxy<GetSessions>,
    @Inject(UsecasesProxyModule.GET_SESSION)
    private readonly getSessionProxy: UseCaseProxy<GetSession>,
    @Inject(UsecasesProxyModule.INACTIVATE_SESSIONS)
    private readonly inactivateSessionsProxy: UseCaseProxy<InactivateSessions>
  ) {}

  @Query(() => SessionsDataOutput)
  @Directive('@authSession(roles: ["admin"])')
  @Directive('@dbConn')
  async sessions(
    @Args('pagination') pagination: PaginationParams,
    @Context() { dbConn }: HttpCtx
  ): Promise<SessionsDataOutput> {
    return this.getSessionsProxy.getInstance().perform(pagination, dbConn)
  }

  @Query(() => SessionDto)
  @Directive('@authSession(roles: ["admin"])')
  @Directive('@dbConn')
  async session(
    @Args('session_id') sessionId: string,
    @Context() { dbConn }: HttpCtx
  ): Promise<SessionDto> {
    return this.getSessionProxy.getInstance().perform(sessionId, dbConn)
  }

  @Mutation(() => SessionResponse)
  @Directive('@dbConn')
  async login(
    @Args('credentials') credentials: CredentialsDto,
    @Context() { dbConn }: HttpCtx
  ): Promise<SessionResponse> {
    return this.loginProxy.getInstance().perform(credentials, dbConn)
  }

  @Mutation(() => DefaultResponse)
  @Directive('@authSession(roles: ["admin"])')
  @Directive('@dbConn')
  async inactivateSessions(
    @Args('user_id') userId: string,
    @Context() { dbConn }: HttpCtx
  ): Promise<DefaultResponse> {
    return this.inactivateSessionsProxy.getInstance().perform(userId, dbConn)
  }
}
