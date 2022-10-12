import {
  PaginationParams,
  QueryParams,
  SessionDto,
  SessionsDataOutput
} from '@/infra/dtos'
import { MongoDbHelper } from '@/infra/helpers'
import { LoggerService } from '@/infra/logger'
import { SessionRepository } from '@/infra/repositories'
import { Inject, InternalServerErrorException } from '@nestjs/common'
import { Db, ObjectId } from 'mongodb'

export class GetSessions {
  constructor(
    @Inject('logger') private readonly logger: LoggerService,
    @Inject('sessionRepository')
    private readonly sessionRepository: SessionRepository,
    @Inject('mongoDbHelper') private readonly mongoDbHelper: MongoDbHelper
  ) {}

  async perform(
    pagination: PaginationParams,
    dbConn: Db
  ): Promise<SessionsDataOutput> {
    const { search } = pagination
    const query: any = { active: true }

    const queryParams: QueryParams =
      this.mongoDbHelper.buildQueryParams(pagination)

    const isValidObjectId = this.mongoDbHelper.objectIdIsValid(search)
    if (search && !isValidObjectId) {
      query['$or'] = [{ session_id: { $regex: `.*${search}`, $options: 'i' } }]
    } else if (search && isValidObjectId) {
      query['user']['_id'] = new ObjectId(search)
    }

    try {
      const [data, count] = await Promise.all([
        await this.sessionRepository.getAll<SessionDto>(
          queryParams,
          query,
          dbConn
        ),
        await this.sessionRepository.countDocuments(query, dbConn)
      ])

      return {
        data,
        count
      }
    } catch (err) {
      this.logger.error(
        'GetSessionsErr',
        `Failed to get sessions due to ${err?.message}`
      )
      throw new InternalServerErrorException(err)
    }
  }
}
