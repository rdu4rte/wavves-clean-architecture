import { HttpCtx } from '@/domain/graphql'
import { GetBooks } from '@/usecases/books'
import { Inject } from '@nestjs/common'
import { Context, Directive, Query, Resolver } from '@nestjs/graphql'
import { BookDto } from '../dtos'
import { UseCaseProxy, UsecasesProxyModule } from '../usecases-proxy'

@Resolver(() => BookDto)
export class BookResolver {
  constructor(
    @Inject(UsecasesProxyModule.GET_BOOKS)
    private readonly getBooksProxy: UseCaseProxy<GetBooks>
  ) {}

  @Query(() => [BookDto])
  @Directive('@dbConn')
  async books(@Context() { dbConn }: HttpCtx): Promise<BookDto[]> {
    return this.getBooksProxy.getInstance().perform(dbConn)
  }
}
