import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BoardMemberService } from './board-member.service';

@Module({
  providers: [BoardMemberService, PrismaService],
  exports: [BoardMemberService],
})
export class BoardMemberModule {}
