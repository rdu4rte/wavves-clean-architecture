import { HttpCtx } from '@/domain/graphql'
import { GetBooks } from '@/usecases/books'
import { Inject } from '@nestjs/common'
import { Args, Context, Directive, Query, Resolver } from '@nestjs/graphql'
import { BookDataOutput, BookDto, BookFilters, PaginationParams } from '../dtos'
import { UseCaseProxy, UsecasesProxyModule } from '../usecases-proxy'

@Resolver(() => BookDto)
export class BookResolver {
  constructor(
    @Inject(UsecasesProxyModule.GET_BOOKS)
    private readonly getBooksProxy: UseCaseProxy<GetBooks>
  ) {}

  @Query(() => BookDataOutput)
  @Directive('@authSession')
  @Directive('@dbConn')
  async books(
    @Args('pagination') pagination: PaginationParams,
    @Args('filters') filters: BookFilters,
    @Context() { dbConn }: HttpCtx
  ): Promise<BookDataOutput> {
    return this.getBooksProxy.getInstance().perform(pagination, filters, dbConn)
  }
}
