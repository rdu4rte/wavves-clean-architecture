import { ObjectId } from 'mongodb'
import { Role, SessionDto } from '../../dtos'

export const sessions: SessionDto[] = [
  {
    _id: new ObjectId('61c63cfdd9c931e718968500'),
    active: true,
    created_at: new Date('3000-12-21T00:00:00.000Z'),
    expires_at: new Date('3000-12-21T00:00:00.000Z'),
    session_id: '5b74b412-efd0-449d-ae53-8eb4dfbc4124',
    token:
      'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCIsImlhdCI6MTY1MTM1MTY3NH0.eyJpZCI6IjYxYzEzMWQ4MjViOTBmMDAzMDE4OTU2ZCIsImlhdCI6MTY1MTM1MTY3NH0.bMhnxiJKWI-sN1UbzhbFm-VcVf9BH9JS1GHMtXzdacjy_J3hG7udVKyTQHAVi3l48KbVimnFAJIwXaYV5VjTqQ',
    user: {
      _id: new ObjectId('61c131d825b90f003018956d'),
      role: Role.admin
    }
  }
]
