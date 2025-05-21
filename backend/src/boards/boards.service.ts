import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BoardsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any): Promise<any> {
    const user = await this.prisma.board.create({ data });
    return user;
  }

  async findOne(data: any): Promise<any> {
    const { email } = data;
    try {
      const user = await this.prisma.board.findFirst({
        where: { email },
      });
      if (!user) {
        throw new NotFoundException(`Board with id ${email} not found`);
      }
      return user;
    } catch (e) {
      console.error(e);
      throw new Error('Internal server error');
    }
  }
}
