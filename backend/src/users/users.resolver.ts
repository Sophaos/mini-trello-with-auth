import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from './user';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UsersService) {}

  @Query(() => User)
  async getUser(@Args('id') email: string): Promise<User | undefined> {
    return await this.userService.findOne({ email });
  }
}
