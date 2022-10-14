import { HttpServer, INestApplication } from '@nestjs/common'
import { TestingModule } from '@nestjs/testing'
import {
  MutationInactivateUserSessions,
  MutationInactivateUserSessionsErr,
  MutationLogin,
  MutationLoginErr,
  QueryGetSessionById,
  QueryGetSessionByIdErr,
  QueryGetSessions
} from './cases/sessions'
import { buildTestServer, GqlCaller } from './config'

describe('Session Module', () => {
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

  it('Should get all sessions', async () => {
    const res = await test.call(server, QueryGetSessions)

    expect(res).not.toHaveProperty('errors')
    expect(res).toHaveProperty('data')
    expect(res.data).toHaveProperty('sessions')
    expect(res.data.sessions).toHaveProperty('data')
    expect(res.data.sessions).toHaveProperty('count')
  })

  it('Should get session by id', async () => {
    const res = await test.call(server, QueryGetSessionById)

    expect(res).not.toHaveProperty('errors')
    expect(res).toHaveProperty('data')
    expect(res.data).toHaveProperty('session')
  })

  it('Should throw if session not found by id', async () => {
    const res = await test.call(server, QueryGetSessionByIdErr)

    expect(res).toHaveProperty('errors')
  })

  it('Should inactivate user sessions', async () => {
    const res = await test.call(server, MutationInactivateUserSessions)

    expect(res).not.toHaveProperty('errors')
    expect(res).toHaveProperty('data')
    expect(res.data).toHaveProperty('inactivateSessions')
    expect(res.data.inactivateSessions).toHaveProperty('success')
    expect(res.data.inactivateSessions).toHaveProperty('message')
  })

  it('Should throw if is not a valid object id on inactivate user sessions', async () => {
    const res = await test.call(server, MutationInactivateUserSessionsErr)

    expect(res).toHaveProperty('errors')
  })

  it('Should log user in', async () => {
    const res = await test.call(server, MutationLogin)

    expect(res).not.toHaveProperty('errors')
    expect(res).toHaveProperty('data')
    expect(res.data).toHaveProperty('login')
    expect(res.data.login).toHaveProperty('session_id')
  })

  it('Should throw if wrong credentials on login', async () => {
    const res = await test.call(server, MutationLoginErr)

    expect(res).toHaveProperty('errors')
  })
})
