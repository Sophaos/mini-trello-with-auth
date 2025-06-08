import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateListInput,
  DeleteListInput,
  FindListByIdInput,
  MoveListInput,
  UpdateListInput,
} from './lists.input';

@Injectable()
export class ListsService {
  constructor(private readonly prisma: PrismaService) {}

  async findListById(data: FindListByIdInput) {
    const list = await this.prisma.list.findUnique({
      where: { id: data.id },
      include: { cards: true },
    });

    if (!list) {
      throw new NotFoundException(`List with ID ${data.id} not found`);
    }

    return list;
  }

  async create(data: CreateListInput) {
    const lastList = await this.prisma.list.findFirst({
      where: { boardId: data.boardId },
      orderBy: { position: 'desc' },
    });

    const newPosition = lastList ? lastList.position + 1 : 0;

    return this.prisma.list.create({
      data: {
        title: data.title,
        position: newPosition,
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

  async delete(data: DeleteListInput) {
    const { id } = data;
    const list = await this.prisma.list.findUnique({ where: { id } });
    if (!list) throw new NotFoundException(`List with ID ${id} not found`);

    await this.prisma.list.delete({ where: { id } });
    return true;
  }

  async moveListPosition(data: MoveListInput) {
    const { id, newPosition, boardId } = data;

    const targetList = await this.prisma.list.findUnique({
      where: { id },
    });

    if (!targetList)
      throw new NotFoundException(`List with ID ${id} not found`);

    const currentPosition = targetList.position;

    if (currentPosition === newPosition) {
      return this.prisma.list.findMany({
        where: { boardId },
        orderBy: { position: 'asc' },
        include: { cards: true },
      });
    }

    const direction = newPosition > currentPosition ? 'down' : 'up';

    // Perform transaction and return updated lists
    return await this.prisma.$transaction(async (tx) => {
      if (direction === 'down') {
        await tx.list.updateMany({
          where: {
            boardId,
            position: {
              gt: currentPosition,
              lte: newPosition,
            },
          },
          data: {
            position: {
              decrement: 1,
            },
          },
        });
      } else {
        await tx.list.updateMany({
          where: {
            boardId,
            position: {
              gte: newPosition,
              lt: currentPosition,
            },
          },
          data: {
            position: {
              increment: 1,
            },
          },
        });
      }

      await tx.list.update({
        where: { id },
        data: { position: newPosition },
      });

      // ✅ Return all lists on the board, sorted by position
      return tx.list.findMany({
        where: { boardId },
        orderBy: { position: 'asc' },
        include: { cards: true },
      });
    });
  }
}
