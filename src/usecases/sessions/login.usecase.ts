import {
  CredentialsDto,
  JwtCredentials,
  Role,
  SessionDto,
  SessionResponse,
  UserDto
} from '@/infra/dtos'
import { EncrypterHelper, JwtHelper, UuidHelper } from '@/infra/helpers'
import { LoggerService } from '@/infra/logger'
import { SessionRepository, UserRepository } from '@/infra/repositories'
import {
  Inject,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { Db, ObjectId } from 'mongodb'

export class Login {
  constructor(
    @Inject('logger') private readonly logger: LoggerService,
    @Inject('sessionRepository')
    private readonly sessionRepository: SessionRepository,
    @Inject('userRepository') private readonly userRepository: UserRepository,
    @Inject('encrypter') private readonly encrypter: EncrypterHelper,
    @Inject('jwt') private readonly jwt: JwtHelper,
    @Inject('uuid') private readonly uuid: UuidHelper
  ) {}

  async perform(
    credentials: CredentialsDto,
    dbConn: Db
  ): Promise<SessionResponse> {
    const { email, password } = credentials

    const user: UserDto = await this.userRepository.getUserByEmail(
      email,
      dbConn
    )
    if (!user)
      throw new NotFoundException('User not found or wrong credentials')

    const userId = user?._id

    const matchPassword = this.encrypter.decrypt(password, user?.password)
    if (!matchPassword) throw new UnauthorizedException('Wrong credentials')

    const jwtCredentials: JwtCredentials = await this.jwt.generateJwtToken(
      userId
    )

    const session = this.createSession(
      jwtCredentials.expiresIn,
      jwtCredentials.token,
      userId,
      user?.role
    )

    try {
      const [inactivate, newSession] = await Promise.all([
        await this.sessionRepository.inactivateSessions(userId, dbConn),
        await this.sessionRepository.insertOne<SessionDto>(session, dbConn)
      ])

      this.logger.log(
        'Login',
        `User logged in - res: ${inactivate.result.ok ? 'ok' : 'nok'}`
      )

      return {
        session_id: newSession.session_id
      }
    } catch (err) {
      this.logger.error(
        'LoginErr',
        `Failed to log user in due to ${err?.message}`
      )
      throw new InternalServerErrorException(err)
    }
  }

  createSession(
    expiresIn: Date,
    token: string,
    userId: string,
    role: Role
  ): SessionDto {
    return new SessionDto({
      active: true,
      created_at: new Date(),
      expires_at: expiresIn,
      session_id: this.uuid.generateUUID(),
      token,
      user: {
        _id: new ObjectId(userId),
        role
      }
    })
  }
}
