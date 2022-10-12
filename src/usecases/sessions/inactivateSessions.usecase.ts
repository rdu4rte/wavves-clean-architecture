import { DefaultResponse } from '@/infra/dtos'
import { MongoDbHelper } from '@/infra/helpers'
import { LoggerService } from '@/infra/logger'
import { SessionRepository } from '@/infra/repositories'
import {
  BadRequestException,
  Inject,
  InternalServerErrorException
} from '@nestjs/common'
import { Db } from 'mongodb'

export class InactivateSessions {
  constructor(
    @Inject('logger') private readonly logger: LoggerService,
    @Inject('sessionRepository')
    private readonly sessionRepository: SessionRepository,
    @Inject('mongoDbHelper') private readonly mongoDbHelper: MongoDbHelper
  ) {}

  async perform(userId: string, dbConn: Db): Promise<DefaultResponse> {
    if (!this.mongoDbHelper.objectIdIsValid(userId))
      throw new BadRequestException('User id not valid')

    try {
      await this.sessionRepository.inactivateSessions(userId, dbConn)

      return {
        success: true,
        message: `Sessions from user ${userId} are inactivated`
      }
    } catch (err) {
      this.logger.error(
        'InactivateSessionsErr',
        `Failed to inactivate user sessions due to ${err?.message}`
      )
      throw new InternalServerErrorException(err)
    }
  }
}
