import { BookDto, BookUpdate, DefaultResponse } from '@/infra/dtos'
import { LoggerService } from '@/infra/logger'
import { BookRepository } from '@/infra/repositories'
import {
  ConflictException,
  Inject,
  InternalServerErrorException
} from '@nestjs/common'
import { Db } from 'mongodb'

export class UpdateBook {
  constructor(
    @Inject('logger') private readonly logger: LoggerService,
    @Inject('bookRepository') private readonly bookRepository: BookRepository
  ) {}

  async perform(
    book_id: string,
    update: BookUpdate,
    dbConn: Db
  ): Promise<DefaultResponse> {
    try {
      if (update.name) {
        const bookAlreadyExists = await this.bookRepository.getById<BookDto>(
          update.name,
          dbConn,
          null,
          'name'
        )
        if (bookAlreadyExists)
          throw new ConflictException('Book with the same name already exists')
      }

      update['updated_at'] = new Date()
      const res = await this.bookRepository.updateOne(book_id, update, dbConn)
      this.logger.log(
        'UpdateBook',
        `Book "${book_id}" updated, res: ${res.result.ok ? 'ok' : 'nok'}`
      )

      return {
        success: true,
        message: `Book "${book_id}" updated`
      }
    } catch (err) {
      this.logger.error(
        'UpdateBookErr',
        `Failed to update book due to ${err?.message}`
      )
      throw new InternalServerErrorException(err)
    }
  }
}
