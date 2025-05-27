import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BoardIdInput, UpdateBoardInput } from './boards.input';
import { BoardRole } from '@prisma/client';

@Injectable()
export class BoardsService {
  constructor(private readonly prisma: PrismaService) {}

  // async findAll() {
  //   return this.prisma.board.findMany({
  //     include: {
  //       owner: true,
  //       members: true,
  //       lists: true,
  //     },
  //   });
  // }

  async findByBoardId(data: BoardIdInput) {
    const { boardId: id } = data;
    const board = await this.prisma.board.findUnique({
      where: { id },
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
      throw new NotFoundException(`Board with ID ${id} not found`);
    }

    return board;
  }

  async create(title: string, ownerId: number) {
    return this.prisma.board.create({
      data: {
        title,
        owner: {
          connect: { id: ownerId },
        },
        members: {
          create: {
            user: {
              connect: { id: ownerId },
            },
            role: 'OWNER',
          },
        },
      },
      include: {
        owner: true,
        members: true,
      },
    });
  }

  async update(data: UpdateBoardInput) {
    const { boardId: id } = data;
    const board = await this.prisma.board.findUnique({
      where: { id },
    });

    if (!board) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }

    return this.prisma.board.update({
      where: { id },
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

  async delete(data: BoardIdInput) {
    const { boardId: id } = data;
    const board = await this.prisma.board.findUnique({ where: { id } });
    if (!board) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }

    await this.prisma.board.delete({ where: { id } });
  }

  async transferOwnership(boardId: number, newOwnerId: number) {
    const board = await this.prisma.board.findUnique({
      where: { id: boardId },
    });

    if (!board) throw new NotFoundException();

    await this.prisma.board.update({
      where: { id: boardId },
      data: { ownerId: newOwnerId },
    });

    await this.prisma.boardMember.update({
      where: {
        userId_boardId: {
          userId: board.ownerId,
          boardId: boardId,
        },
      },
      data: { role: BoardRole.MEMBER },
    });

    await this.prisma.boardMember.upsert({
      where: {
        userId_boardId: {
          boardId,
          userId: newOwnerId,
        },
      },
      update: { role: BoardRole.OWNER },
      create: {
        boardId,
        userId: newOwnerId,
        role: BoardRole.OWNER,
      },
    });

    return this.prisma.board.findUnique({
      where: { id: boardId },
      include: {
        owner: true,
        members: true,
        lists: true,
      },
    });
  }

  async addMember(boardId: number, userId: number, role: BoardRole) {
    const existing = await this.prisma.boardMember.findUnique({
      where: {
        userId_boardId: {
          userId,
          boardId,
        },
      },
    });

    if (existing) throw new ConflictException('User is already a board member');

    await this.prisma.boardMember.create({
      data: {
        boardId,
        userId,
        role,
      },
    });

    return this.prisma.board.findUnique({
      where: { id: boardId },
      include: {
        members: true,
        owner: true,
        lists: true,
      },
    });
  }
}
