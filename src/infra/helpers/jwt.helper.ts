import { Injectable } from '@nestjs/common'
import { ObjectId } from 'mongodb'
import { config } from '../config/environment'
import { JwtCredentials } from '../dtos'
import * as jwt from 'jsonwebtoken'

@Injectable()
export class JwtHelper {
  async generateJwtToken(id: ObjectId): Promise<JwtCredentials> {
    const payload = { id }
    const currentDate = new Date()
    const iat: number = Math.floor(currentDate.getTime() / 1000)
    const exp: number = iat + config.jwt.sessionTtl
    const expiresIn = new Date(exp * 1000)
    const header: any = { iat, exp }

    const token: string = jwt.sign(payload, config.jwt.secret, {
      algorithm: 'HS512',
      expiresIn: config.jwt.sessionTtl,
      header
    })

    return { token, expiresIn }
  }

  decodeToken(token: string): string | jwt.JwtPayload {
    return jwt.verify(token, config.jwt.secret)
  }
}
