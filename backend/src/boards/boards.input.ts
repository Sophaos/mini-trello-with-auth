import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBoardInput {
  @Field(() => String)
  title: string;
}

@InputType()
export class UpdateBoardInput {
  @Field(() => String, { nullable: true })
  title?: string;
}
