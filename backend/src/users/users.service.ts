import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO, FindOneUserDTO } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDTO) {
    return this.prisma.user.create({ data });
  }

  async findOneById(id: number): Promise<User | undefined> {
    try {
      const user = await this.prisma.user.findFirst({
        where: { id },
      });
      return user ?? undefined;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }

  async findOne(findOneUserDTO: FindOneUserDTO): Promise<User | undefined> {
    const { email } = findOneUserDTO;
    try {
      const user = await this.prisma.user.findFirst({
        where: { email },
      });
      return user ?? undefined;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }
}
