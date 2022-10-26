import { Injectable } from '@nestjs/common'
import { LoggerService } from '../logger'
import * as fs from 'fs'
import * as path from 'path'
import { Stream, Writable } from 'stream'
import { Base64Encode } from 'base64-stream'
// import concat from 'concat-stream'

@Injectable()
export class FsProvider {
  constructor(private readonly logger: LoggerService) {}

  checkIfFileOrDirectoryExists(pathFolder: string): boolean {
    return fs.existsSync(path.join(pathFolder))
  }

  createDir(pathFolder: string): void {
    if (!this.checkIfFileOrDirectoryExists(pathFolder)) {
      this.logger.log('FsCreateDir', 'Creating new directory')
      fs.mkdirSync(pathFolder, { recursive: true })
    }

    this.logger.log('FsCreateDir', 'Directory already exists')
  }

  removeFolder(pathFolder: string): void {
    fs.rmSync(pathFolder, { recursive: true, force: true })
  }

  saveFile(pathFile: string, data: any): void {
    fs.writeFileSync(pathFile, data)
  }

  readFile(path: string): string {
    return fs.readFileSync(path, 'utf8')
  }

  createWriteStream(pathFolder: string): fs.WriteStream {
    return fs.createWriteStream(pathFolder)
  }

  async streamToBase64(stream: Stream): Promise<Writable> {
    const base64 = new Base64Encode()
    return stream.pipe(base64)
  }
}
