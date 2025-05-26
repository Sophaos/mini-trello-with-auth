// src/auth/auth.resolver.ts
import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { LoginInput, SignUpInput } from './entities/auth.input';
import { GqlLocalAuthGuard } from './guards/gql-local.guard';
import { UserAuthType } from 'src/types/user-auth.type';
import { GqlContext } from './entities/gql-context';
import { Public } from './decorators/public.decorator';
import { UserType } from 'src/types/user.type';

@Resolver(() => UserAuthType)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Public()
  @Query(() => String)
  healthCheck(): string {
    return 'API is running!';
  }

  @Public()
  @Mutation(() => UserType)
  async signUp(@Args('data') data: SignUpInput) {
    return await this.authService.signUp(data);
  }

  @Public()
  @UseGuards(GqlLocalAuthGuard)
  @Mutation(() => UserAuthType)
  async login(@Args('data') _: LoginInput, @Context() context: GqlContext) {
    const tokenData = await this.authService.login({
      id: context.req.user.id,
      email: context.req.user.email,
      name: context.req.user.name,
    });
    return {
      user: context.req.user,
      ...tokenData,
    };
  }
}
