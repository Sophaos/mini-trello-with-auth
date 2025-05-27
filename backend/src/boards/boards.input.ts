import { InputType, Field, Int } from '@nestjs/graphql';

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
