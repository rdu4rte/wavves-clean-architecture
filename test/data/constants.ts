import { faker } from '@faker-js/faker'
import { v4 as uuidv4 } from 'uuid'

export interface TestConstants {
  session: {
    session_id_never_expires: string
    wrong_session_id: string
  }
  user: {
    admin_id: string
    user1_id: string
    user2_id: string
    wrong_id: string
    invalid_object_id: string
  }
  email: {
    user1_email: string
  }
  password: {
    user1_password: string
  }
  random: {
    email: string
    username: string
    password: string
  }
}

export const test: TestConstants = {
  session: {
    session_id_never_expires: '5b74b412-efd0-449d-ae53-8eb4dfbc4124',
    wrong_session_id: uuidv4()
  },
  user: {
    admin_id: '61c131d825b90f003018956d',
    user1_id: '63473de347ad5f47c51a0b05',
    user2_id: '634988ea25b7a9d5d8a46f2d',
    wrong_id: faker.database.mongodbObjectId().toString(),
    invalid_object_id: 'fffff'
  },
  email: {
    user1_email: 'user1@wavves.com'
  },
  password: {
    user1_password: '123123'
  },
  random: {
    email: faker.internet.email().toLowerCase(),
    username: faker.internet.userName().toLowerCase(),
    password: faker.internet.password(6)
  }
}
