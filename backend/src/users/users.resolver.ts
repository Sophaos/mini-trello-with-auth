import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from './user';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { GqlJwtGuard } from 'src/auth/guards/gql-jwt.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UsersService) {}

  @UseGuards(GqlJwtGuard)
  @Query(() => User)
  async getUser(@Args('id') email: string): Promise<User | undefined> {
    return await this.userService.findOne({ email });
  }
}
