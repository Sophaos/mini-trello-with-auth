import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBoardInput, UpdateBoardInput } from './boards.input';

@Injectable()
export class BoardsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.board.findMany({
      include: {
        owner: true,
        members: true,
        lists: true,
      },
    });
  }

  async findByBoardId(boardId: number) {
    const board = await this.prisma.board.findUnique({
      where: { id: boardId },
      include: {
        owner: true,
        members: true,
        lists: {
          include: {
            cards: true,
          },
        },
      },
    });

    if (!board) {
      throw new NotFoundException(`Board with ID ${boardId} not found`);
    }

    return board;
  }

  async create(data: CreateBoardInput) {
    return this.prisma.board.create({
      data: {
        title: data.title,
        owner: {
          connect: { id: data.ownerId },
        },
      },
      include: {
        owner: true,
      },
    });
  }

  async update(data: UpdateBoardInput) {
    const board = await this.prisma.board.findUnique({
      where: { id: data.id },
    });

    if (!board) {
      throw new NotFoundException(`Board with ID ${data.id} not found`);
    }

    return this.prisma.board.update({
      where: { id: data.id },
      data: {
        title: data.title ?? board.title,
      },
      include: {
        owner: true,
        members: true,
        lists: true,
      },
    });
  }

  async delete(id: number) {
    const board = await this.prisma.board.findUnique({ where: { id } });

    if (!board) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }

    await this.prisma.board.delete({ where: { id } });
  }
}
