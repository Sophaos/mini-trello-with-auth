// src/auth/auth.resolver.ts
import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from '../users/user';
import { UseGuards } from '@nestjs/common';
import { LoginInput, SignUpInput } from './entities/auth.input';
import { GqlLocalAuthGuard } from './guards/gql-local.guard';

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

  @UseGuards(GqlLocalAuthGuard)
  @Mutation(() => String)
  async login(@Args('data') _: LoginInput, @Context() context) {
    const token = await this.authService.login({
      id: context.id,
      email: context.email,
    });
    return token.access_token;
  }
}
