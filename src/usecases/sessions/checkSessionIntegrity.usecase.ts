import { SessionDto } from '@/infra/dtos'
import { SessionRepository } from '@/infra/repositories'
import { Inject, UnauthorizedException } from '@nestjs/common'
import { Db } from 'mongodb'

export class CheckSessionIntegrity {
  constructor(
    @Inject('sessionRepository')
    private readonly sessionRepository: SessionRepository
  ) {}

  async perform(sessionId: string, dbConn: Db): Promise<SessionDto> {
    const session: SessionDto =
      await this.sessionRepository.getById<SessionDto>(
        sessionId,
        dbConn,
        null,
        'session_id'
      )

    if (!session) throw new UnauthorizedException('Session not found')

    const currentDate = new Date()
    if (!session?.active || session?.expires_at < currentDate)
      throw new UnauthorizedException('Invalid session')

    return session
  }
}
