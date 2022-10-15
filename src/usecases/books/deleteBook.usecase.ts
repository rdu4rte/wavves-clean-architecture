import { DefaultResponse } from '@/infra/dtos'
import { LoggerService } from '@/infra/logger'
import { BookRepository } from '@/infra/repositories'
import { Inject, InternalServerErrorException } from '@nestjs/common'
import { Db } from 'mongodb'

export class UpdateBook {
  constructor(
    @Inject('logger') private readonly logger: LoggerService,
    @Inject('bookRepository') private readonly bookRepository: BookRepository
  ) {}

  async perform(book_id: string, dbConn: Db): Promise<DefaultResponse> {
    try {
      const res = await this.bookRepository.deleteOne(book_id, dbConn)
      this.logger.log(
        'DeleteBook',
        `Book "${book_id}" deleted, res: ${res.result.ok ? 'ok' : 'nok'}`
      )

      return {
        success: true,
        message: `Book "${book_id}" deleted`
      }
    } catch (err) {
      this.logger.error(
        'DeleteBookErr',
        `Failed to delete book due to ${err?.message}`
      )
      throw new InternalServerErrorException(err)
    }
  }
}
