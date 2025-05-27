import { InputType, Field, Int } from '@nestjs/graphql';
import { BoardRole } from '@prisma/client';

@InputType()
export class BoardIdInput {
  @Field(() => Int)
  boardId: number;
}
@InputType()
export class CreateBoardInput {
  @Field(() => String)
  title: string;
}

@InputType()
export class UpdateBoardInput extends BoardIdInput {
  @Field(() => String, { nullable: true })
  title?: string;
}

@InputType()
export class TransferOwnershipInput extends BoardIdInput {
  @Field(() => Int)
  newOwnerId: number;
}

@InputType()
export class AddBoardMemberInput extends BoardIdInput {
  @Field(() => Int)
  userId: number;

  @Field(() => BoardRole, { defaultValue: BoardRole.MEMBER })
  role: BoardRole;
}
