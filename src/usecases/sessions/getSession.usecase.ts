import { SessionDto } from '@/infra/dtos'
import { LoggerService } from '@/infra/logger'
import { SessionRepository } from '@/infra/repositories'
import {
  Inject,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common'
import { Db } from 'mongodb'

export class GetSession {
  constructor(
    @Inject('logger') private readonly logger: LoggerService,
    @Inject('sessionRepository')
    private readonly sessionRepository: SessionRepository
  ) {}

  async perform(sessionId: string, dbConn: Db): Promise<SessionDto> {
    try {
      const session = await this.sessionRepository.getById<SessionDto>(
        sessionId,
        dbConn,
        null,
        'session_id'
      )

      if (!session) throw new NotFoundException('Session not found')

      return session
    } catch (err) {
      this.logger.error(
        'GetSessionErr',
        `Failed to get session due to ${err?.message}`
      )
      throw new InternalServerErrorException(err)
    }
  }
}
