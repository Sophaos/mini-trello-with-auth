import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBoardMemberInput } from './board-member.input';
import { UpdateBoardMemberInput } from './board-member.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BoardMemberService {
  constructor(private readonly prisma: PrismaService) {}

  async findByBoardId(boardId: number) {
    return this.prisma.boardMember.findMany({
      where: { boardId },
      include: {
        user: true,
        board: true,
      },
    });
  }

  async create(data: CreateBoardMemberInput) {
    const { userId, boardId, role } = data;
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

  async update(data: UpdateBoardMemberInput) {
    const existing = await this.prisma.boardMember.findUnique({
      where: {
        userId_boardId: {
          userId: data.userId,
          boardId: data.boardId,
        },
      },
    });

    if (!existing) {
      throw new NotFoundException('Board member not found');
    }

    return this.prisma.boardMember.update({
      where: {
        userId_boardId: {
          userId: data.userId,
          boardId: data.boardId,
        },
      },
      data: {
        role: data.role,
      },
    });
  }

  async delete(userId: number, boardId: number) {
    const existing = await this.prisma.boardMember.findUnique({
      where: {
        userId_boardId: {
          userId,
          boardId,
        },
      },
    });

    if (!existing) {
      throw new NotFoundException('Board member not found');
    }

    await this.prisma.boardMember.delete({
      where: {
        userId_boardId: {
          userId,
          boardId,
        },
      },
    });

    return true;
  }
}
