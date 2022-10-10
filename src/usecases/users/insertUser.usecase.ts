import { DefaultResponse, Role, UserDto, UserInput } from '@/infra/dtos'
import { EncrypterHelper } from '@/infra/helpers'
import { LoggerService } from '@/infra/logger'
import { UserRepository } from '@/infra/repositories'
import {
  ConflictException,
  Inject,
  InternalServerErrorException
} from '@nestjs/common'
import { Db } from 'mongodb'

export class InsertUser {
  constructor(
    @Inject('logger') private readonly logger: LoggerService,
    @Inject('userRepository') private readonly userRepository: UserRepository,
    @Inject('encrypterHelper') private readonly encrypterHelper: EncrypterHelper
  ) {}

  async perform(input: UserInput, dbConn: Db): Promise<DefaultResponse> {
    const [usernameAlreadyExists, emailAlreadyExists] = await Promise.all([
      this.userRepository.getUserByUsername(input.username, dbConn),
      this.userRepository.getUserByEmail(input.email, dbConn)
    ])

    if (usernameAlreadyExists || emailAlreadyExists)
      throw new ConflictException('Username or email already exist')

    const newUser = this.setupUser(input)

    try {
      const res = await this.userRepository.insertOne<UserDto>(newUser, dbConn)
      this.logger.log('InsertUser', `User successfully registered: ${res?._id}`)

      return {
        success: true,
        message: `User successfully registered: ${res?._id}`
      }
    } catch (err) {
      this.logger.error(
        'InsertUserErr',
        `Failed to insert user due to ${err?.message}`
      )
      throw new InternalServerErrorException(err)
    }
  }

  setupUser(input: UserInput): UserDto {
    return new UserDto({
      username: input.username,
      email: input.email,
      role: input?.role || Role.user,
      active: true,
      password: this.encrypterHelper.encrypt(input.password),
      created_at: new Date(),
      updated_at: new Date()
    })
  }
}
