import { ObjectId } from 'mongodb'
import { Role, UserDto } from '../../dtos'

export const users: UserDto[] = [
  {
    _id: new ObjectId('61c131d825b90f003018956d'),
    username: 'admin',
    email: 'admin@wavves.com',
    password: '$2a$12$UNQPUa0ulj2ikc/rSYmeQeDd2dY0Hlh66IK3EOv5XBPw7dIqXL2TW',
    role: Role.admin,
    created_at: new Date('2022-02-28T10:00:00'),
    updated_at: new Date(),
    active: true
  }
]
