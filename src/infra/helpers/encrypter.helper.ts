import { Injectable } from '@nestjs/common'
import { config } from '../config/environment'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class EncrypterHelper {
  private readonly salt: number

  constructor() {
    this.salt = +config.jwt.salt
  }

  encrypt(password: string): string {
    const salt = bcrypt.genSaltSync(this.salt)
    return bcrypt.hashSync(password, salt)
  }

  decrypt(plainPassword: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(plainPassword, hashedPassword)
  }
}
