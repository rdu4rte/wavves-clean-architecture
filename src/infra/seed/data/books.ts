import { BookDto, Category } from '../../../infra/dtos'
import { ObjectId } from 'mongodb'

export const books: BookDto[] = [
  {
    _id: new ObjectId('6336e6f385f1b8185ead833a'),
    name: 'Name1',
    author: 'Author1',
    pages: 130,
    unitValue: 29.9,
    publisher: 'Publisher1',
    category: Category.outros,
    publicationDate: '30-09-2022',
    created_at: new Date(),
    updated_at: new Date(),
    active: true
  },
  {
    _id: new ObjectId('6336e77ee63acaedffa1c216'),
    name: 'Name2',
    author: 'Author2',
    pages: 230,
    unitValue: 33.45,
    publisher: 'Publisher2',
    category: Category.biografias,
    publicationDate: '12-09-2022',
    created_at: new Date(),
    updated_at: new Date(),
    active: true
  }
]
