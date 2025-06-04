import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
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

  @Query(() => UserType)
  me(@Context() context: GqlContext): UserType {
    const user = context.req.user;
    if (!user) throw new UnauthorizedException();
    return user;
  }

  @Public()
  @Mutation(() => UserType)
  async signUp(@Args('data') data: SignUpInput) {
    return await this.authService.signUp(data);
  }

  @Public()
  @Mutation(() => Boolean)
  logout(@Context() context: GqlContext): boolean {
    context.res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    return true;
  }

  @Public()
  @Mutation(() => String)
  async refreshAccessToken(@Context() context: GqlContext) {
    const cookies = context.req.cookies as Record<string, string>;
    const refreshToken = cookies?.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    return await this.authService.refreshAccessToken(refreshToken);
  }

  @Public()
  @UseGuards(GqlLocalAuthGuard)
  @Mutation(() => UserAuthType)
  async login(@Args('data') _: LoginInput, @Context() context: GqlContext) {
    const tokenData = await this.authService.login({
      id: context.req.user.id,
      email: context.req.user.email,
    });
    context.res.cookie('refreshToken', tokenData.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/', // or '/graphql' if needed
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return {
      user: context.req.user,
      accessToken: tokenData.accessToken,
    };
  }
}
