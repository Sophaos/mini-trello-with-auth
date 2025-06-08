import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateCardInput,
  DeleteCardInput,
  GetCardsInput,
  MoveCardInput,
  UpdateCardInput,
} from './cards.input';

@Injectable()
export class CardsService {
  constructor(private readonly prisma: PrismaService) {}

  async findByListId(data: GetCardsInput) {
    const { listId } = data;
    return this.prisma.card.findMany({
      where: { listId },
      orderBy: { position: 'asc' },
      include: {
        assignees: true,
        list: true,
      },
    });
  }

  async create(data: CreateCardInput) {
    return this.prisma.card.create({
      data: {
        title: data.title,
        description: data.description,
        position: data.position,
        list: {
          connect: { id: data.listId },
        },
        assignees: data.assigneeIds?.length
          ? {
              connect: data.assigneeIds.map((id) => ({ id })),
            }
          : undefined,
      },
      include: {
        assignees: true,
      },
    });
  }

  async update(data: UpdateCardInput) {
    const card = await this.prisma.card.findUnique({ where: { id: data.id } });
    if (!card) throw new NotFoundException(`Card with ID ${data.id} not found`);

    return this.prisma.card.update({
      where: { id: data.id },
      data: {
        title: data.title ?? card.title,
        description: data.description ?? card.description,
        position: data.position ?? card.position,
        assignees: data.assigneeIds
          ? {
              set: data.assigneeIds.map((id) => ({ id })),
            }
          : undefined,
      },
      include: {
        assignees: true,
      },
    });
  }

  async delete(data: DeleteCardInput) {
    const { id } = data;
    const card = await this.prisma.card.findUnique({ where: { id } });
    if (!card) throw new NotFoundException(`Card with ID ${id} not found`);

    return this.prisma.card.delete({ where: { id } });
  }

  async moveCardPosition(data: MoveCardInput) {
    const { id, newPosition } = data;
    const card = await this.prisma.card.findUnique({ where: { id } });

    if (!card) throw new NotFoundException(`Card with ID ${id} not found`);

    const currentPosition = card.position;
    const listId = card.listId;

    if (currentPosition === newPosition) {
      return this.prisma.card.findMany({
        where: { listId },
        orderBy: { position: 'asc' },
        include: { assignees: true, list: true },
      });
    }

    const direction = newPosition > currentPosition ? 'down' : 'up';

    return await this.prisma.$transaction(async (tx) => {
      if (direction === 'down') {
        await tx.card.updateMany({
          where: {
            listId,
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
        await tx.card.updateMany({
          where: {
            listId,
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

      await tx.card.update({
        where: { id },
        data: { position: newPosition },
      });

      return tx.card.findMany({
        where: { listId },
        orderBy: { position: 'asc' },
        include: { assignees: true, list: true },
      });
    });
  }
}
