import { Injectable } from '@nestjs/common'
import { AbstractRepository } from './repository.abstract'

@Injectable()
export class SessionRepository extends AbstractRepository {
  constructor() {
    super('sessions')
  }
}
