// src/auth/auth.resolver.ts
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from '../users/user';
import { UnauthorizedException } from '@nestjs/common';
import { LoginInput, SignUpInput } from './auth.input';

@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => String)
  healthCheck(): string {
    return 'API is running!';
  }

  @Mutation(() => User)
  async signUp(@Args('data') data: SignUpInput) {
    return this.authService.signUp(data);
  }

  @Mutation(() => String)
  async login(@Args('data') data: LoginInput) {
    const user = await this.authService.validateUser(data);
    if (!user) {
      throw new UnauthorizedException();
    }
    const token = await this.authService.login({
      id: user.id,
      email: user.email,
    });
    return token.access_token;
  }
}
