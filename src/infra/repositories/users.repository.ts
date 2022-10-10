import { Injectable } from '@nestjs/common'
import { Db } from 'mongodb'
import { UserDto } from '../dtos'
import { AbstractRepository } from './repository.abstract'

@Injectable()
export class UserRepository extends AbstractRepository {
  constructor() {
    super('users')
  }

  async getUserByUsername(username: string, dbConn: Db): Promise<UserDto> {
    return await dbConn.collection('users').findOne({ username })
  }

  async getUserByEmail(email: string, dbConn: Db): Promise<UserDto> {
    return await dbConn.collection('users').findOne({ email })
  }
}
