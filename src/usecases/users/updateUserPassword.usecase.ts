import { DefaultResponse } from '@/infra/dtos'
import { EncrypterHelper, MongoDbHelper } from '@/infra/helpers'
import { LoggerService } from '@/infra/logger'
import { UserRepository } from '@/infra/repositories'
import {
  BadRequestException,
  Inject,
  InternalServerErrorException
} from '@nestjs/common'
import { Db } from 'mongodb'

export class UpdateUserPassword {
  constructor(
    @Inject('logger') private readonly logger: LoggerService,
    @Inject('userRepository') private readonly userRepository: UserRepository,
    @Inject('encrypter') private readonly encrypter: EncrypterHelper,
    @Inject('mongoDbHelper') private readonly mongoDbHelper: MongoDbHelper
  ) {}

  async perform(
    userId: string,
    password: string,
    dbConn: Db
  ): Promise<DefaultResponse> {
    if (!this.mongoDbHelper.objectIdIsValid(userId))
      throw new BadRequestException('ObjectId is invalid')

    try {
      await this.userRepository.updateOne(
        userId,
        { password: this.encrypter.encrypt(password), updated_at: new Date() },
        dbConn
      )

      return {
        success: true,
        message: 'User password updated'
      }
    } catch (err) {
      this.logger.error(
        'UpdateUserErr',
        `Failed to update user due to ${err?.message}`
      )
      throw new InternalServerErrorException(err)
    }
  }
}
