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
import { BoardsService } from './boards/boards.service';
import { CardsService } from './cards/cards.service';
import { ListsService } from './lists/lists.service';
import { BoardMemberResolver } from './board-member/board-member.resolver';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
    }),
  ],
  providers: [AuthResolver, UserResolver, BoardsResolver, ListsResolver, CardsResolver, BoardsService, CardsService, ListsService, BoardMemberResolver],
})
export class AppModule {}
