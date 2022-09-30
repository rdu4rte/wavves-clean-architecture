import { HttpServer } from '@nestjs/common'
import * as request from 'supertest'

export class GqlCaller {
  async call(server: HttpServer, query: string): Promise<any> {
    const res = await request(server)
      .post('/graphql')
      // .set('Authorization', `Bearer ${sessionToken}`)
      .send({ query })

    return JSON.parse(res.text)
  }
}
