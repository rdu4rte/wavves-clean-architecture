import { HttpCtx } from '@/domain/graphql'
import {
  DeleteBook,
  GetBook,
  GetBooks,
  InsertBook,
  UpdateBook
} from '@/usecases/books'
import { Inject } from '@nestjs/common'
import {
  Args,
  Context,
  Directive,
  Mutation,
  Query,
  Resolver
} from '@nestjs/graphql'
import {
  BookDataOutput,
  BookDto,
  BookFilters,
  BookInput,
  BookUpdate,
  DefaultResponse,
  PaginationParams
} from '../dtos'
import { UseCaseProxy, UsecasesProxyModule } from '../usecases-proxy'

@Resolver(() => BookDto)
export class BookResolver {
  constructor(
    @Inject(UsecasesProxyModule.GET_BOOKS)
    private readonly getBooksProxy: UseCaseProxy<GetBooks>,
    @Inject(UsecasesProxyModule.GET_BOOK_BY_ID)
    private readonly getBookByIdProxy: UseCaseProxy<GetBook>,
    @Inject(UsecasesProxyModule.INSERT_BOOK)
    private readonly insertBookProxy: UseCaseProxy<InsertBook>,
    @Inject(UsecasesProxyModule.UPDATE_BOOK)
    private readonly updateBookProxy: UseCaseProxy<UpdateBook>,
    @Inject(UsecasesProxyModule.DELETE_BOOK)
    private readonly deleteBookProxy: UseCaseProxy<DeleteBook>
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

  @Query(() => BookDto)
  @Directive('@authSession')
  @Directive('@dbConn')
  async bookById(
    @Args('book_id') bookId: string,
    @Context() { dbConn }: HttpCtx
  ): Promise<BookDto> {
    return this.getBookByIdProxy.getInstance().perform(bookId, dbConn)
  }

  @Mutation(() => DefaultResponse)
  @Directive('@authSession')
  @Directive('@dbConn')
  async insertBook(
    @Args('input') input: BookInput,
    @Context() { dbConn }: HttpCtx
  ): Promise<DefaultResponse> {
    return this.insertBookProxy.getInstance().perform(input, dbConn)
  }

  @Mutation(() => DefaultResponse)
  @Directive('@authSession')
  @Directive('@dbConn')
  async updateBook(
    @Args('book_id') bookId: string,
    @Args('update') update: BookUpdate,
    @Context() { dbConn }: HttpCtx
  ): Promise<DefaultResponse> {
    return this.updateBookProxy.getInstance().perform(bookId, update, dbConn)
  }

  @Mutation(() => DefaultResponse)
  @Directive('@authSession')
  @Directive('@dbConn')
  async deleteBook(
    @Args('book_id') bookId: string,
    @Context() { dbConn }: HttpCtx
  ): Promise<DefaultResponse> {
    return this.deleteBookProxy.getInstance().perform(bookId, dbConn)
  }
}
