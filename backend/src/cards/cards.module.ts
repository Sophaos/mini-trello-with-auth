import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CardsService } from './cards.service';

@Module({
  providers: [CardsService, PrismaService],
  exports: [CardsService],
})
export class CardsModule {}
