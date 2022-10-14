import { HttpServer, INestApplication } from '@nestjs/common'
import { TestingModule } from '@nestjs/testing'
import {
  MutationInactivateUser,
  MutationInactivateUserErr,
  MutationInsertUser,
  MutationUpdatePassword,
  MutationUpdatePasswordErr,
  QueryGetAllUsers,
  QueryGetUserById,
  QueryGetUserByIdErr
} from './cases/users'
import { buildTestServer, GqlCaller } from './config'

describe('User Module', () => {
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

  it('Should get all users', async () => {
    const res = await test.call(server, QueryGetAllUsers)

    expect(res).not.toHaveProperty('errors')
    expect(res).toHaveProperty('data')
    expect(res.data).toHaveProperty('users')
    expect(res.data.users).toHaveProperty('data')
    expect(res.data.users).toHaveProperty('count')
  })

  it('Should get user by id', async () => {
    const res = await test.call(server, QueryGetUserById)

    expect(res).not.toHaveProperty('errors')
    expect(res).toHaveProperty('data')
    expect(res.data).toHaveProperty('user')
    expect(res.data.user).toHaveProperty('_id')
  })

  it('Should throw if user not found by id', async () => {
    const res = await test.call(server, QueryGetUserByIdErr)

    expect(res).toHaveProperty('errors')
  })

  it('Should insert user', async () => {
    const res = await test.call(server, MutationInsertUser)

    expect(res).not.toHaveProperty('errors')
    expect(res).toHaveProperty('data')
    expect(res.data).toHaveProperty('insertUser')
    expect(res.data.insertUser).toHaveProperty('message')
    expect(res.data.insertUser).toHaveProperty('success')
  })

  it('Should throw if try to insert user with email/username that already exists', async () => {
    const res = await test.call(server, MutationInsertUser)

    expect(res).toHaveProperty('errors')
  })

  it('Should update user password', async () => {
    const res = await test.call(server, MutationUpdatePassword)

    expect(res).not.toHaveProperty('errors')
    expect(res).toHaveProperty('data')
    expect(res.data).toHaveProperty('updateUserPassword')
    expect(res.data.updateUserPassword).toHaveProperty('message')
    expect(res.data.updateUserPassword).toHaveProperty('success')
  })

  it('Should throw if not a valid object id on update user password', async () => {
    const res = await test.call(server, MutationUpdatePasswordErr)

    expect(res).toHaveProperty('errors')
  })

  it('Should inactivate user', async () => {
    const res = await test.call(server, MutationInactivateUser)

    expect(res).not.toHaveProperty('errors')
    expect(res).toHaveProperty('data')
    expect(res.data).toHaveProperty('inactivateUser')
    expect(res.data.inactivateUser).toHaveProperty('message')
    expect(res.data.inactivateUser).toHaveProperty('success')
  })

  it('Should throw if not a valid object id on inactivate user', async () => {
    const res = await test.call(server, MutationInactivateUserErr)

    expect(res).toHaveProperty('errors')
  })
})
