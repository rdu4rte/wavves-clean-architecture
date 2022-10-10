import { DefaultResponse } from '@/infra/dtos'
import { MongoDbHelper } from '@/infra/helpers'
import { LoggerService } from '@/infra/logger'
import { UserRepository } from '@/infra/repositories'
import {
  BadRequestException,
  Inject,
  InternalServerErrorException
} from '@nestjs/common'
import { Db } from 'mongodb'

export class InactivateUser {
  constructor(
    @Inject('logger') private readonly logger: LoggerService,
    @Inject('userRepository') private readonly userRepository: UserRepository,
    @Inject('mongoDbHelper') private readonly mongoDbHelper: MongoDbHelper
  ) {}

  async perform(userId: string, dbConn: Db): Promise<DefaultResponse> {
    if (!this.mongoDbHelper.objectIdIsValid(userId))
      throw new BadRequestException('ObjectId is invalid')

    try {
      await this.userRepository.updateOne(userId, { active: false }, dbConn)

      return {
        success: true,
        message: 'User inactivated'
      }
    } catch (err) {
      this.logger.error(
        'InactivateUserErr',
        `Failed to inactivate user due to ${err?.message}`
      )
      throw new InternalServerErrorException(err)
    }
  }
}
