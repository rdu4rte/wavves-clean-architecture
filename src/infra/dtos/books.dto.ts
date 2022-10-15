import {
  Field,
  Float,
  InputType,
  Int,
  ObjectType,
  registerEnumType
} from '@nestjs/graphql'
import { ObjectIdScalar } from '../config/graphql/scalars'
import { ObjectId } from 'mongodb'
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator'

export enum Category {
  biografias = 'biografias',
  folclore = 'folclore',
  literatura_brasileira = 'literatura_brasileira',
  colecoes = 'colecoes',
  genealogia = 'genealogia',
  literatura_estrangeira = 'literatura_estrangeira',
  comportamento = 'comportamento',
  humor = 'humor',
  livros_raros = 'livros_raros',
  contos = 'contos',
  infanto_juvenis = 'infanto_juvenis',
  manuscritos = 'manuscritos',
  critica_literaria = 'critica_literaria',
  jogos = 'jogos',
  poesia = 'poesia',
  ficcao_cientifica = 'ficcao_cientifica',
  jornais = 'jornais',
  outros = 'outros'
}

registerEnumType(Category, {
  name: 'Category',
  description: 'Book category type definition'
})

@ObjectType()
export class BookDto {
  constructor(init?: Partial<BookDto>) {
    Object.assign(this, init)
  }

  @Field(() => ObjectIdScalar)
  _id: ObjectId

  @Field(() => String)
  name: string

  @Field(() => String)
  author: string

  @Field(() => Int)
  pages: number

  @Field(() => Float)
  unitValue: number

  @Field(() => String)
  publisher: string

  @Field(() => Category)
  category: Category

  @Field(() => String)
  publicationDate: string

  @Field(() => Date)
  created_at: Date

  @Field(() => Date)
  updated_at: Date

  @Field(() => Boolean)
  active: boolean
}

@ObjectType()
export class BookDataOutput {
  @Field(() => [BookDto])
  data: BookDto[]

  @Field(() => Int)
  count: number
}

@InputType()
export class BookFilters {
  @Field(() => Category, { nullable: true })
  @IsOptional()
  @IsEnum(Category)
  category?: Category

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  author?: string

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  publisher?: string

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  publicationDate?: string

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  active?: boolean
}

@InputType()
export class BookInput {
  @Field(() => String)
  name: string

  @Field(() => String)
  author: string

  @Field(() => Int)
  pages: number

  @Field(() => Float)
  unitValue: number

  @Field(() => String)
  publisher: string

  @Field(() => Category)
  category: Category

  @Field(() => String) // '14-10-2022'
  publicationDate: string
}

@InputType()
export class BookUpdate {
  @Field(() => String, { nullable: true })
  name?: string

  @Field(() => String, { nullable: true })
  author?: string

  @Field(() => Int, { nullable: true })
  pages?: number

  @Field(() => Float, { nullable: true })
  unitValue?: number

  @Field(() => String, { nullable: true })
  publisher?: string

  @Field(() => Category, { nullable: true })
  category?: Category

  @Field(() => String, { nullable: true }) // '14-10-2022'
  publicationDate?: string

  @Field(() => Boolean, { nullable: true })
  active?: boolean
}
