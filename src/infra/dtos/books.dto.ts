import {
  Field,
  Float,
  Int,
  ObjectType,
  registerEnumType
} from '@nestjs/graphql'
import { ObjectIdScalar } from '../config/graphql/scalars'
import { ObjectId } from 'mongodb'

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
}
