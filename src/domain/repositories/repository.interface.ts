import { Db, DeleteWriteOpResultObject, UpdateWriteOpResult } from 'mongodb'

export interface IDefaultRepository {
  getAll<T>(
    queryParams: object,
    query: object,
    dbConn: Db,
    collection?: string
  ): Promise<Array<T>>
  countDocuments(
    query: object,
    dbConn: Db,
    collection?: string
  ): Promise<number>
  getById<T>(
    id: string,
    dbConn: Db,
    collection?: string,
    field?: string
  ): Promise<T>
  insertOne<T>(document: T, dbConn: Db, collection?: string): Promise<T>
  updateOne(
    id: string,
    update: object,
    dbConn: Db,
    collection?: string
  ): Promise<UpdateWriteOpResult>
  deleteOne(
    id: string,
    dbConn: Db,
    collection?: string
  ): Promise<DeleteWriteOpResultObject>
}
