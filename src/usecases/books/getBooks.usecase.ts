import {
  BookDataOutput,
  BookDto,
  BookFilters,
  PaginationParams,
  QueryParams
} from '@/infra/dtos'
import { MongoDbHelper } from '@/infra/helpers'
import { LoggerService } from '@/infra/logger'
import { BookRepository } from '@/infra/repositories'
import { Inject, InternalServerErrorException } from '@nestjs/common'
import { Db } from 'mongodb'

export class GetBooks {
  constructor(
    @Inject('logger') private readonly logger: LoggerService,
    @Inject('bookRepository') private readonly bookRepository: BookRepository,
    @Inject('mongodbHelper') private readonly mongodbHelper: MongoDbHelper
  ) {}

  async perform(
    pagination: PaginationParams,
    filters: BookFilters,
    dbConn: Db
  ): Promise<BookDataOutput> {
    const { search } = pagination
    const query: any = { ...filters }

    const queryParams: QueryParams =
      this.mongodbHelper.buildQueryParams(pagination)

    if (search) {
      query['$or'] = [
        { name: { $regex: `.*${search}`, $options: 'i' } },
        { author: { $regex: `.*${search}`, $options: 'i' } },
        { publisher: { $regex: `.*${search}`, $options: 'i' } }
      ]
    }

    try {
      const [data, count] = await Promise.all([
        await this.bookRepository.getAll<BookDto>(queryParams, query, dbConn),
        await this.bookRepository.countDocuments(query, dbConn)
      ])

      return {
        data,
        count
      }
    } catch (err) {
      this.logger.error(
        'GetBooksErr',
        `Failed to get books due to ${err?.message}`
      )
      throw new InternalServerErrorException(err)
    }
  }
}
