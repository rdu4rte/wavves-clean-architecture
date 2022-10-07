import {
  PaginationParams,
  QueryParams,
  UserDataOutput,
  UserDto,
  UserFiltersInput
} from '@/infra/dtos'
import { MongoDbHelper } from '@/infra/helpers'
import { LoggerService } from '@/infra/logger'
import { UserRepository } from '@/infra/repositories'
import { Inject, InternalServerErrorException } from '@nestjs/common'
import { Db, ObjectId } from 'mongodb'

export class GetUsers {
  constructor(
    @Inject('logger') private readonly logger: LoggerService,
    @Inject('usersRepository') private readonly usersRepository: UserRepository,
    @Inject('mongoDbHelper') private readonly mongoDbHelper: MongoDbHelper
  ) {}

  async perform(
    pagination: PaginationParams,
    filters: UserFiltersInput,
    dbConn: Db
  ): Promise<UserDataOutput> {
    const { search } = pagination
    const query: any = { ...filters }

    const queryParams: QueryParams =
      this.mongoDbHelper.buildQueryParams(pagination)

    const validObjectId = this.mongoDbHelper.objectIdIsValid(search)
    if (search && !validObjectId) {
      query['$or'] = [
        { username: { $regex: `.*${search}`, $options: 'i' } },
        { email: { $regex: `.*${search}`, $options: 'i' } }
      ]
    } else if (search && validObjectId) {
      query['_id'] = new ObjectId(search)
    }

    try {
      const [data, count] = await Promise.all([
        await this.usersRepository.getAll<UserDto>(queryParams, query, dbConn),
        await this.usersRepository.countDocuments(query, dbConn)
      ])

      return {
        data,
        count
      }
    } catch (err) {
      this.logger.error(
        'GetUsersErr',
        `Failed to get users due to ${err?.message}`
      )
      throw new InternalServerErrorException(err)
    }
  }
}
