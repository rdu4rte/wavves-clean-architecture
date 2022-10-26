import {
  BadGatewayException,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common'
import { LoggerService } from '../logger'
import * as path from 'path'
import * as fs from 'fs'
import { FsProvider } from './fs.provider'
import { config } from '../config/environment'
import { ImgurClient } from 'imgur'
import { ImageData, ImgurApiResponse, Payload } from 'imgur/lib/common/types'
import { DefaultResponse, ImageProps } from '../dtos'

@Injectable()
export class ImgurProvider {
  private client: ImgurClient

  constructor(
    private readonly logger: LoggerService,
    private readonly fsProvider: FsProvider
  ) {}

  setupClient() {
    this.client = new ImgurClient({ clientId: config.imgur.clientId })
  }

  async imgurCall(data: Payload): Promise<ImgurApiResponse<ImageData>> {
    this.setupClient()
    const res = await this.client.upload(data)

    if (!res.success) {
      throw new BadGatewayException(`Status ${res?.status} due to ${res?.data}`)
    }

    return res
  }

  async uploadImage(
    pathFolder: string,
    filename: string,
    title: string
  ): Promise<ImageProps> {
    try {
      const file = path.resolve(`${pathFolder}/${filename}`)
      const stream = fs.createReadStream(file)

      const res = await this.imgurCall({
        image: stream,
        type: 'stream',
        title: title.toString(),
        album: config.imgur.clientAlbum
      })

      stream.destroy()

      return res?.data
    } catch (err) {
      this.logger.error(
        'UploadImageImgurErr',
        `Failed to upload image due to ${err}`
      )
      throw new InternalServerErrorException(err)
    }
  }

  async createAlbum(
    albumTitle: string,
    albumDescription: string
  ): Promise<DefaultResponse> {
    this.setupClient()
    const res = await this.client.createAlbum(albumTitle, albumDescription)
    return {
      success: res?.success,
      message: res?.data?.link
    }
  }
}
