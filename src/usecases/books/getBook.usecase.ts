import { BookDto } from '@/infra/dtos'
import { LoggerService } from '@/infra/logger'
import { BookRepository } from '@/infra/repositories'
import { Inject, InternalServerErrorException } from '@nestjs/common'
import { Db } from 'mongodb'

export class GetBook {
  constructor(
    @Inject('logger') private readonly logger: LoggerService,
    @Inject('bookRepository') private readonly bookRepository: BookRepository
  ) {}

  async perform(book_id: string, dbConn: Db): Promise<BookDto> {
    try {
      return await this.bookRepository.getById<BookDto>(book_id, dbConn)
    } catch (err) {
      this.logger.error(
        'GetBookErr',
        `Failed to get book due to ${err?.message}`
      )
      throw new InternalServerErrorException(err)
    }
  }
}
