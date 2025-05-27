import { InputType, Field, Int } from '@nestjs/graphql';
import { BoardIdInput } from 'src/boards/boards.input';

@InputType()
export class CreateListInput extends BoardIdInput {
  @Field(() => String)
  title: string;

  @Field(() => Int)
  position: number;
}

@InputType()
export class UpdateListInput extends BoardIdInput {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => Int, { nullable: true })
  position?: number;
}

@InputType()
export class DeleteListInput extends BoardIdInput {
  @Field(() => Int)
  id: number;
}
