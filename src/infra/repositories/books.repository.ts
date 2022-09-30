import { Injectable } from '@nestjs/common'
import { AbstractRepository } from './repository.abstract'

@Injectable()
export class BookRepository extends AbstractRepository {
  constructor() {
    super('books')
  }
}
