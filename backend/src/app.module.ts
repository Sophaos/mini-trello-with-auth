import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthResolver } from './auth/auth.resolver';
import { UserResolver } from './users/users.resolver';
import { BoardsResolver } from './boards/boards.resolver';
import { ListsResolver } from './lists/lists.resolver';
import { CardsResolver } from './cards/cards.resolver';
import { BoardMemberResolver } from './board-member/board-member.resolver';
import { BoardsModule } from './boards/boards.module';
import { ListsModule } from './lists/lists.module';
import { CardsModule } from './cards/cards.module';
import { BoardMemberModule } from './board-member/board-member.module';
import { APP_GUARD } from '@nestjs/core';
import { GqlJwtGuard } from './auth/guards/gql-jwt.guard';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
    }),
    BoardsModule,
    ListsModule,
    CardsModule,
    BoardMemberModule,
  ],
  providers: [
    PrismaService,
    AuthResolver,
    UserResolver,
    BoardsResolver,
    ListsResolver,
    CardsResolver,
    BoardMemberResolver,
    {
      provide: APP_GUARD,
      useClass: GqlJwtGuard,
    },
  ],
})
export class AppModule {}
