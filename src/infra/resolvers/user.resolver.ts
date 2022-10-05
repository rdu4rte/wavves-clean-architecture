import { Query, Resolver } from '@nestjs/graphql'
import { UserDataOutput, UserDto } from '../dtos/users.dto'

@Resolver(() => UserDto)
export class UserResolver {
  constructor() {}

  // @Query(() => UserDataOutput)
}
