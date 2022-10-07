import { Injectable } from '@nestjs/common'
import { ObjectID } from 'mongodb'
import { PaginationParams, QueryParams } from '../dtos'

@Injectable()
export class MongoDbHelper {
  objectIdIsValid(objectId: string): boolean {
    return ObjectID.isValid(objectId)
  }

  buildQueryParams(pagination: PaginationParams): QueryParams {
    const { page, pageSize, sort, sortDirection } = pagination
    const queryParams: QueryParams = {
      skip: page && pageSize && page > 0 ? (page - 1) * pageSize : 0,
      limit: pageSize || 10
    }

    if (sort?.[0])
      queryParams.sort = {
        [sort[0]]: sortDirection && sortDirection[0] === 'DESC' ? -1 : 1
      }

    return queryParams
  }
}
