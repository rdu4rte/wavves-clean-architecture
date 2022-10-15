import { BookDto, BookInput, DefaultResponse } from '@/infra/dtos'
import { LoggerService } from '@/infra/logger'
import { BookRepository } from '@/infra/repositories'
import {
  ConflictException,
  Inject,
  InternalServerErrorException
} from '@nestjs/common'
import { Db } from 'mongodb'

export class InsertBook {
  constructor(
    @Inject('logger') private readonly logger: LoggerService,
    @Inject('bookRepository') private readonly bookRepository: BookRepository
  ) {}

  async perform(input: BookInput, dbConn: Db): Promise<DefaultResponse> {
    const newBook: BookDto = new BookDto({
      name: input.name,
      author: input.author,
      pages: +input.pages,
      unitValue: +input.unitValue,
      publisher: input.publisher,
      category: input.category,
      publicationDate: input.publicationDate,
      created_at: new Date(),
      updated_at: new Date(),
      active: true
    })

    try {
      const bookAlreadyExists = await this.bookRepository.getById<BookDto>(
        newBook.name,
        dbConn,
        null,
        'name'
      )

      if (bookAlreadyExists) throw new ConflictException('Book already exists')

      const res = await this.bookRepository.insertOne<BookDto>(newBook, dbConn)

      this.logger.log(
        'InsertBook',
        `Book registered, ${res?.name}, ${res?.created_at}`
      )

      return {
        success: true,
        message: `Book "${res?.name}" registered`
      }
    } catch (err) {
      this.logger.error(
        'InsertBookErr',
        `Failed to insert book due to ${err?.message}`
      )
      throw new InternalServerErrorException(err)
    }
  }
}
