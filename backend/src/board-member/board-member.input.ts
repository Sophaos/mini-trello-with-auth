import { Field, InputType, Int } from '@nestjs/graphql';
import { BoardRole } from '@prisma/client';
import { BoardIdInput } from 'src/boards/boards.input';

@InputType()
export class UpdateBoardMemberInput extends BoardIdInput {
  @Field(() => Int)
  userId: number;

  @Field(() => BoardRole)
  role: BoardRole;
}

@InputType()
export class CreateBoardMemberInput extends BoardIdInput {
  @Field(() => Int)
  userId: number;

  @Field(() => BoardRole, { nullable: true })
  role?: BoardRole;
}
