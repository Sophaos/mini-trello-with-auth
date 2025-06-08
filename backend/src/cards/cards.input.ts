import { InputType, Field, Int } from '@nestjs/graphql';
import { BoardIdInput } from 'src/boards/boards.input';

@InputType()
export class CreateCardInput extends BoardIdInput {
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
export class UpdateCardInput extends BoardIdInput {
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

@InputType()
export class GetCardsInput extends BoardIdInput {
  @Field(() => Int)
  listId: number;
}

@InputType()
export class DeleteCardInput extends BoardIdInput {
  @Field(() => Int)
  id: number;
}

@InputType()
export class MoveCardInput extends BoardIdInput {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  newPosition: number;
}
