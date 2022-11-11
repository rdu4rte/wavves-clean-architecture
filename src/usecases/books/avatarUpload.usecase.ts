import { BookAvatarInput, DefaultResponse, ImageProps } from '@/infra/dtos'
import { LoggerService } from '@/infra/logger'
import { FsProvider, ImgurProvider } from '@/infra/providers'
import { BookRepository } from '@/infra/repositories'
import { Inject, InternalServerErrorException } from '@nestjs/common'
import { Db } from 'mongodb'

export class AvatarUpload {
  constructor(
    @Inject('logger') private readonly logger: LoggerService,
    @Inject('bookRepository') private readonly bookRepository: BookRepository,
    @Inject('fsProvider') private readonly fsProvider: FsProvider,
    @Inject('imgurProvider') private readonly imgurProvider: ImgurProvider
  ) {}

  async perform(
    avatarInput: BookAvatarInput,
    dbConn: Db
  ): Promise<DefaultResponse> {
    try {
      const { bookId, file } = avatarInput
      const { createReadStream, filename } = await file
      const pathFolder = 'uploads'

      if (!this.fsProvider.checkIfFileOrDirectoryExists(pathFolder))
        this.fsProvider.createDir(pathFolder)

      createReadStream().pipe(
        this.fsProvider.createWriteStream(`${pathFolder}/${filename}`)
      )

      const uploadImgResponse = await this.imgurProvider.uploadImage(
        pathFolder,
        filename,
        bookId
      )

      const update: ImageProps = {
        id: uploadImgResponse?.id,
        title: uploadImgResponse?.title,
        description: uploadImgResponse?.description,
        type: uploadImgResponse?.type,
        deletehash: uploadImgResponse?.deletehash,
        link: uploadImgResponse?.link
      }

      await this.bookRepository.updateOne(
        bookId,
        {
          avatar: update
        },
        dbConn
      )

      this.fsProvider.removeFolder(pathFolder)

      return {
        success: true,
        message: update?.link
      }
    } catch (err) {
      this.logger.error(
        'AvatarUploadErr',
        `Failed to upload file due to ${err}`
      )
      throw new InternalServerErrorException(err)
    }
  }
}
