import { Injectable } from '@nestjs/common'
import { AbstractRepository } from './repository.abstract'

@Injectable()
export class UserRepository extends AbstractRepository {
  constructor() {
    super('users')
  }
}
