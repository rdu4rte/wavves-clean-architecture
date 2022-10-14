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
  },
  {
    _id: new ObjectId('63473de347ad5f47c51a0b05'),
    username: 'user1',
    email: 'user1@wavves.com',
    password: '$2a$12$UNQPUa0ulj2ikc/rSYmeQeDd2dY0Hlh66IK3EOv5XBPw7dIqXL2TW',
    role: Role.user,
    created_at: new Date('2022-02-28T10:00:00'),
    updated_at: new Date(),
    active: true
  },
  {
    _id: new ObjectId('634988ea25b7a9d5d8a46f2d'),
    username: 'user2',
    email: 'user2@wavves.com',
    password: '$2a$12$UNQPUa0ulj2ikc/rSYmeQeDd2dY0Hlh66IK3EOv5XBPw7dIqXL2TW',
    role: Role.user,
    created_at: new Date('2022-02-28T10:00:00'),
    updated_at: new Date(),
    active: true
  }
]
