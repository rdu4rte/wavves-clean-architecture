import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'
import { ObjectId } from 'mongodb'
import { ObjectIdScalar } from '../config/graphql/scalars'
import { Role } from './users.dto'

@ObjectType()
export class UserSessionDto {
  @Field(() => ObjectIdScalar)
  _id: ObjectId

  @Field(() => Role)
  role: Role
}

@ObjectType()
export class SessionDto {
  @Field(() => ObjectIdScalar)
  _id: ObjectId

  @Field(() => String)
  session_id: string

  @Field(() => Boolean)
  active: boolean

  @Field(() => UserSessionDto)
  user: UserSessionDto

  @Field(() => String)
  token: string

  @Field(() => Date)
  created_at: Date

  @Field(() => Date)
  expires_at: Date
}

@ObjectType()
export class AccessDto {
  @Field(() => String)
  session: string
}

@InputType()
export class CredentialsDto {
  @Field(() => String)
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string
}
