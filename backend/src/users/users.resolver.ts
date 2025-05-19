import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserType } from '../types/user.type';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { GqlJwtGuard } from 'src/auth/guards/gql-jwt.guard';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private userService: UsersService) {}

  @UseGuards(GqlJwtGuard)
  @Query(() => UserType)
  async getUser(@Args('id') email: string): Promise<UserType> {
    return await this.userService.findOne({ email });
  }
}
