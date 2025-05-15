import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async create(data: { email: string; password: string }) {
    return this.prisma.user.create({ data });
  }

  async findOne(email: string): Promise<User | undefined> {
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
