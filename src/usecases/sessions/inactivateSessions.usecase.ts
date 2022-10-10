import { LoggerService } from '@/infra/logger'
import { SessionRepository } from '@/infra/repositories'
import { Inject, InternalServerErrorException } from '@nestjs/common'
import { Db } from 'mongodb'

export class InactivateSessions {
  constructor(
    @Inject('logger') private readonly logger: LoggerService,
    @Inject('sessionRepository')
    private readonly sessionRepository: SessionRepository
  ) {}

  async perform(dbConn: Db): Promise<any> {
    try {
      return {}
    } catch (err) {
      this.logger.error(
        'InactivateSessionsErr',
        `Failed to inactivate user sessions due to ${err?.message}`
      )
      throw new InternalServerErrorException(err)
    }
  }
}
