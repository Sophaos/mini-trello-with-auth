import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateListInput, UpdateListInput } from './lists.input';

@Injectable()
export class ListsService {
  constructor(private readonly prisma: PrismaService) {}

  async findByBoardId(boardId: number) {
    return this.prisma.list.findMany({
      where: { boardId },
      orderBy: { position: 'asc' },
      include: {
        cards: true,
      },
    });
  }

  async create(data: CreateListInput) {
    return this.prisma.list.create({
      data: {
        title: data.title,
        position: data.position,
        board: {
          connect: { id: data.boardId },
        },
      },
      include: {
        cards: true,
      },
    });
  }

  async update(data: UpdateListInput) {
    const list = await this.prisma.list.findUnique({ where: { id: data.id } });
    if (!list) throw new NotFoundException(`List with ID ${data.id} not found`);

    return this.prisma.list.update({
      where: { id: data.id },
      data: {
        title: data.title ?? list.title,
        position: data.position ?? list.position,
      },
      include: {
        cards: true,
      },
    });
  }

  async delete(id: number) {
    const list = await this.prisma.list.findUnique({ where: { id } });
    if (!list) throw new NotFoundException(`List with ID ${id} not found`);

    await this.prisma.list.delete({ where: { id } });
    return true;
  }
}
