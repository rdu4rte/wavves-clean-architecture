import { BookDto, Category } from '../../../infra/dtos'
import { ObjectId } from 'mongodb'
import { faker } from '@faker-js/faker'

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

const mapCategories = [
  'biografias',
  'folclore',
  'literatura_brasileira',
  'colecoes',
  'genealogia',
  'literatura_estrangeira',
  'comportamento',
  'humor',
  'livros_raros',
  'contos',
  'infanto_juvenis',
  'manuscritos',
  'critica_literaria',
  'jogos',
  'poesia',
  'ficcao_cientifica',
  'jornais',
  'outros'
]

function seedBooks() {
  for (let i = 0; i < 100; i += 1) {
    books.push({
      _id: new ObjectId(),
      name: faker.random.words(),
      author: `${faker.name.firstName()} ${faker.name.lastName()}`,
      pages: faker.datatype.number({
        min: 50,
        max: 600
      }),
      unitValue: +faker.commerce.price(100),
      publisher: faker.company.name(),
      category:
        Category[
          mapCategories[Math.floor(Math.random() * mapCategories.length)]
        ],
      publicationDate: `${faker.datatype.number({
        min: 1,
        max: 30
      })}-${faker.datatype.number({
        min: 1,
        max: 12
      })}-2022`,
      created_at: new Date(),
      updated_at: new Date(),
      active: faker.datatype.boolean()
    })
  }
}

seedBooks()
