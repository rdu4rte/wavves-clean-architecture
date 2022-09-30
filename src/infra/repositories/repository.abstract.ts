import { IDefaultRepository } from '@/domain/repositories'
import {
  Db,
  DeleteWriteOpResultObject,
  ObjectId,
  UpdateWriteOpResult
} from 'mongodb'

export class AbstractRepository implements IDefaultRepository {
  protected readonly repositoryName: string

  constructor(repositoryName: string) {
    this.repositoryName = repositoryName
  }

  async getAll<T>(
    queryParams: object,
    query: object,
    dbConn: Db,
    collection?: string
  ): Promise<Array<T>> {
    return await dbConn
      .collection(collection || this.repositoryName)
      .find(query, queryParams)
      .toArray()
  }

  async getAllNoParams<T>(dbConn: Db, collection?: string): Promise<Array<T>> {
    return await dbConn
      .collection(collection || this.repositoryName)
      .find({})
      .toArray()
  }

  async countDocuments(
    query: object,
    dbConn: Db,
    collection?: string
  ): Promise<number> {
    return await dbConn
      .collection(collection || this.repositoryName)
      .countDocuments(query)
  }

  async getById<T>(id: string, dbConn: Db, collection?: string): Promise<T> {
    return await dbConn
      .collection(collection || this.repositoryName)
      .findOne({ _id: new ObjectId(id) })
  }

  async insertOne<T>(document: T, dbConn: Db, collection?: string): Promise<T> {
    const res = await dbConn
      .collection(collection || this.repositoryName)
      .insertOne(document)
    return res.ops[0]
  }

  async updateOne(
    id: string,
    update: object,
    dbConn: Db,
    collection?: string
  ): Promise<UpdateWriteOpResult> {
    return await dbConn
      .collection(collection || this.repositoryName)
      .updateOne({ _id: new ObjectId(id) }, { $set: update })
  }

  async deleteOne(
    id: string,
    dbConn: Db,
    collection?: string
  ): Promise<DeleteWriteOpResultObject> {
    return await dbConn
      .collection(collection || this.repositoryName)
      .deleteOne({ _id: new ObjectId(id) })
  }
}
