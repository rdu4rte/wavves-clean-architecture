import { Stream } from 'stream'

export interface IFileUpload {
  filename: string
  mimetype: string
  encoding: string
  createReadStream: () => Stream
}
