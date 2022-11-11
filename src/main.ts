import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js'
import { AppModule } from './app.module'
import { config } from './infra/config/environment'
import { LoggerService } from './infra/logger'

async function bootstrap() {
  const logger = new LoggerService()

  try {
    const app = await NestFactory.create(AppModule)

    app.useGlobalPipes(new ValidationPipe())
    app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }))

    await app.listen(config.port, async () => {
      logger.log('Bootstrap', `Server ready on: ${await app.getUrl()}/graphql`)
    })
  } catch (err) {
    logger.error('ServerErr', `Failed to load server due to: ${err}`)
    process.exit(1)
  }
}
bootstrap()
