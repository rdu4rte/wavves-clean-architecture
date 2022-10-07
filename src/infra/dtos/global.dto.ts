import {
  Field,
  InputType,
  Int,
  ObjectType,
  registerEnumType
} from '@nestjs/graphql'
import { GraphQLJSONObject } from 'graphql-type-json'

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC'
}

registerEnumType(SortDirection, {
  name: 'SortDirection',
  description: 'Sort direction definition'
})

@InputType()
export class PaginationParams {
  @Field(() => Int, { nullable: true })
  page?: number

  @Field(() => Int, { nullable: true })
  pageSize?: number

  @Field(() => [String], { nullable: true })
  sort?: string[]

  @Field(() => [SortDirection], { nullable: true })
  sortDirection?: SortDirection[]

  @Field(() => String, { nullable: true })
  search?: string
}

@ObjectType()
export class DefaultResponse {
  @Field(() => Boolean)
  success: boolean

  @Field(() => String)
  message: string
}

@ObjectType()
export class QueryParams {
  @Field(() => Int)
  skip: number

  @Field(() => Int)
  limit: number

  @Field(() => GraphQLJSONObject, { nullable: true })
  sort?: object
}
