import { Request, Response } from 'express'
import { Db } from 'mongodb'

export interface HttpCtx {
  req: Request
  res: Response
  headers?: {
    authorization?: string
  }
  dbConn?: Db
  userId?: string
}
