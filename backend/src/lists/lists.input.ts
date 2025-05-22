import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateListInput {
  @Field(() => String)
  title: string;

  @Field(() => Int)
  position: number;

  @Field(() => Int)
  boardId: number;
}

@InputType()
export class UpdateListInput {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => Int, { nullable: true })
  position?: number;
}
