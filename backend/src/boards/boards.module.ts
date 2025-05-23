import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BoardsService } from './boards.service';

@Module({
  providers: [BoardsService, PrismaService],
  exports: [BoardsService],
})
export class BoardsModule {}
