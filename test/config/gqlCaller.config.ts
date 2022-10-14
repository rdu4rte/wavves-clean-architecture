import { HttpServer } from '@nestjs/common'
import * as request from 'supertest'
import { SESSION_ID } from '../data'

export class GqlCaller {
  async call(server: HttpServer, query: string): Promise<any> {
    const res = await request(server)
      .post('/graphql')
      .set('Authorization', `Bearer ${SESSION_ID}`)
      .send({ query })

    return JSON.parse(res.text)
  }
}
