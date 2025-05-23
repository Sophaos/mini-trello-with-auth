import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ListsService } from './lists.service';

@Module({
  providers: [ListsService, PrismaService],
  exports: [ListsService],
})
export class ListsModule {}
