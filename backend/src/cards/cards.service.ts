import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateCardInput,
  DeleteCardInput,
  GetCardsInput,
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
}
