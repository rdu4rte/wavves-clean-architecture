import { DefaultResponse } from '@/infra/dtos'
import { EncrypterHelper } from '@/infra/helpers'
import { LoggerService } from '@/infra/logger'
import { UserRepository } from '@/infra/repositories'
import { Inject, InternalServerErrorException } from '@nestjs/common'
import { Db } from 'mongodb'

export class UpdateUserPassword {
  constructor(
    @Inject('logger') private readonly logger: LoggerService,
    @Inject('userRepository') private readonly userRepository: UserRepository,
    @Inject('encrypter') private readonly encrypter: EncrypterHelper
  ) {}

  async perform(
    userId: string,
    password: string,
    dbConn: Db
  ): Promise<DefaultResponse> {
    try {
      await this.userRepository.updateOne(
        userId,
        { password: this.encrypter.encrypt(password) },
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
