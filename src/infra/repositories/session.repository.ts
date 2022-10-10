import { Injectable } from '@nestjs/common'
import { Db, ObjectId, UpdateWriteOpResult } from 'mongodb'
import { AbstractRepository } from './repository.abstract'

@Injectable()
export class SessionRepository extends AbstractRepository {
  constructor() {
    super('sessions')
  }

  async inactivateSessions(
    userId: ObjectId,
    dbConn: Db
  ): Promise<UpdateWriteOpResult> {
    return await dbConn
      .collection('sessions')
      .updateMany({ 'user._id': userId }, { $set: { active: false } })
  }
}
