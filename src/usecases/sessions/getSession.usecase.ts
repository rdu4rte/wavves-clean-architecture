import { LoggerService } from '@/infra/logger'
import { SessionRepository } from '@/infra/repositories'
import { Inject, InternalServerErrorException } from '@nestjs/common'
import { Db } from 'mongodb'

export class GetSession {
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
        'GetSessionErr',
        `Failed to get session due to ${err?.message}`
      )
      throw new InternalServerErrorException(err)
    }
  }
}
