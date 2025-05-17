import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDTO, SignUpDTO, ValidateUserDTO } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(validateUserDTO: ValidateUserDTO) {
    const { email, password } = validateUserDTO;
    const user = await this.usersService.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDTO: LoginDTO) {
    const { email, id } = loginDTO;
    const payload = { email, sub: id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(signUpDTO: SignUpDTO) {
    const { email, password } = signUpDTO;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersService.create({ email, password: hashedPassword });
  }
}
