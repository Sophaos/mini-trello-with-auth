import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
  AuthTokens,
  LoginDTO,
  SignUpDTO,
  ValidateUserDTO,
} from './dto/auth.dto';
import { toUserType } from 'src/mappers/user.mapper';
import { UserType } from 'src/types/user.type';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(validateUserDTO: ValidateUserDTO): Promise<UserType> {
    const { email, password } = validateUserDTO;
    const user = await this.usersService.findOneRaw({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      return toUserType(user);
    }
    throw new UnauthorizedException();
  }

  async createAccessToken(payload: { email: string; sub: number }) {
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });
    return accessToken;
  }

  async createRefreshToken(payload: { email: string; sub: number }) {
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });
    return refreshToken;
  }

  async refreshAccessToken(refreshToken: string): Promise<AuthTokens> {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    try {
      const payload = await this.jwtService.verifyAsync(refreshToken);

      const newAccessToken = await this.jwtService.signAsync(
        {
          sub: payload.sub,
          email: payload.email,
        },
        { expiresIn: '15m' },
      );

      return { accessToken: newAccessToken };
    } catch (err) {
      console.error(err);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async login(loginDTO: LoginDTO): Promise<AuthTokens> {
    const { email, id } = loginDTO;
    const payload = { email, sub: id };

    const accessToken = await this.createAccessToken(payload);
    const refreshToken = await this.createAccessToken(payload);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async signUp(signUpDTO: SignUpDTO): Promise<UserType> {
    const { email, name, password } = signUpDTO;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersService.create({
      email,
      name,
      password: hashedPassword,
    });

    return user;
  }
}
