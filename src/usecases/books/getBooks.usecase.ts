import { BookDto } from '@/infra/dtos'
import { LoggerService } from '@/infra/logger'
import { BookRepository } from '@/infra/repositories'
import { Inject, InternalServerErrorException } from '@nestjs/common'
import { Db } from 'mongodb'

export class GetBooks {
  constructor(
    @Inject('logger') private readonly logger: LoggerService,
    @Inject('bookRepository') private readonly bookRepository: BookRepository
  ) {}

  async perform(dbConn: Db): Promise<BookDto[]> {
    try {
      return this.bookRepository.getAllNoParams<BookDto>(dbConn)
    } catch (err) {
      this.logger.error(
        'GetBooksErr',
        `Failed to get books due to ${err?.message}`
      )
      throw new InternalServerErrorException(err)
    }
  }
}
