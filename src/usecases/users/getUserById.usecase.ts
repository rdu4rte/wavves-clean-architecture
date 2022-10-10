import { UserDto } from '@/infra/dtos'
import { LoggerService } from '@/infra/logger'
import { UserRepository } from '@/infra/repositories'
import {
  Inject,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common'
import { Db } from 'mongodb'

export class GetUserById {
  constructor(
    @Inject('logger') private readonly logger: LoggerService,
    @Inject('userRepository') private readonly userRepository: UserRepository
  ) {}

  async perform(userId: string, dbConn: Db): Promise<UserDto> {
    try {
      const user = await this.userRepository.getById<UserDto>(userId, dbConn)
      if (!user) throw new NotFoundException('User not found')
      return user
    } catch (err) {
      this.logger.error(
        'GetUserByIdErr',
        `Failed to get user due to ${err?.message}`
      )
      throw new InternalServerErrorException(err)
    }
  }
}
