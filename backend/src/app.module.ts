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
import { BoardsModule } from './boards/boards.module';
import { ListsModule } from './lists/lists.module';
import { CardsModule } from './cards/cards.module';
import { BoardMemberModule } from './board-member/board-member.module';

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
    AuthResolver,
    UserResolver,
    BoardsResolver,
    ListsResolver,
    CardsResolver,
    BoardMemberResolver,
  ],
})
export class AppModule {}
