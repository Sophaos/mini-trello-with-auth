import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateCardInput {
  @Field(() => String)
  title: string;

  @Field(() => Int)
  position: number;

  @Field(() => Int)
  listId: number;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => [Int], { nullable: true })
  assigneeIds?: number[];

  @Field(() => Date, { nullable: true })
  dueDate?: Date;
}

@InputType()
export class UpdateCardInput {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Int, { nullable: true })
  position?: number;

  @Field(() => Int, { nullable: true })
  listId?: number;

  @Field(() => [Int], { nullable: true })
  assigneeIds?: number[];

  @Field(() => Date, { nullable: true })
  dueDate?: Date;
}
