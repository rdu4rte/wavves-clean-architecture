import { AppModule } from '../../src/app.module'
import { Test, TestingModule } from '@nestjs/testing'

export const buildTestServer = async (): Promise<TestingModule> => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule]
  }).compile()

  return moduleFixture
}
