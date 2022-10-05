import {
  Field,
  InputType,
  Int,
  ObjectType,
  registerEnumType
} from '@nestjs/graphql'
import { ObjectIdScalar } from '../config/graphql/scalars'
import { ObjectId } from 'mongodb'
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsLowercase,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator'

export enum Role {
  admin = 'admin',
  manager = 'manager',
  user = 'user'
}

registerEnumType(Role, {
  name: 'Role',
  description: 'Role type definitions'
})

@ObjectType()
export class UserDto {
  @Field(() => ObjectIdScalar)
  _id: ObjectId

  @Field(() => String)
  username: string

  @Field(() => String)
  email: string

  @Field(() => Role)
  role: Role

  @Field(() => String)
  password: string

  @Field(() => Date)
  created_at: Date

  @Field(() => Date)
  updated_at: Date

  @Field(() => Boolean)
  active: boolean
}

@InputType()
export class UserInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsLowercase()
  @MaxLength(20)
  @IsString()
  username: string

  @Field(() => String)
  @IsNotEmpty()
  @IsEmail()
  @IsLowercase()
  @IsString()
  email: string

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string

  @Field(() => Role, { nullable: true })
  @IsOptional()
  @IsEnum(Role)
  role?: Role
}

@InputType()
export class UserFiltersInput {
  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  active?: boolean

  @Field(() => Role, { nullable: true })
  @IsEnum(Role)
  @IsOptional()
  role?: Role
}

@ObjectType()
export class UserDataOutput {
  @Field(() => [UserDto])
  data: UserDto[]

  @Field(() => Int)
  count: number
}
