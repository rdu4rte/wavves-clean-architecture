import { HttpServer, INestApplication } from '@nestjs/common'
import { TestingModule } from '@nestjs/testing'
import { getBooksCase } from './cases'
import { buildTestServer, GqlCaller } from './config'

describe('Book Module', () => {
  let app: INestApplication
  let server: HttpServer
  const test: GqlCaller = new GqlCaller()

  beforeAll(async () => {
    jest.restoreAllMocks()
    const buildTest = await buildTestServer()
    const moduleFixture: TestingModule = buildTest

    app = moduleFixture?.createNestApplication()
    await app?.init()
    server = app?.getHttpServer()
  })

  afterEach(() => {
    jest.clearAllMocks()
    server?.close()
  })

  afterAll(async () => {
    await app?.close()
    server?.close()
  })

  it('Should get all books', async () => {
    const res = await test.call(server, getBooksCase)

    expect(res).not.toHaveProperty('errors')
    expect(res).toHaveProperty('data')
    expect(res.data).toHaveProperty('books')
    expect(res.data.books).toHaveLength(2)
  })
})
