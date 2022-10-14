import { HttpServer } from '@nestjs/common'
import * as request from 'supertest'
import { test } from '../data'

export class GqlCaller {
  async call(
    server: HttpServer,
    query: string,
    session_id?: string
  ): Promise<any> {
    const res = await request(server)
      .post('/graphql')
      .set(
        'Authorization',
        `Bearer ${session_id || test.session.session_id_never_expires}`
      )
      .send({ query })

    return JSON.parse(res.text)
  }
}
