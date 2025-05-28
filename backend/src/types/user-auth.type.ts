import { Field, ObjectType } from '@nestjs/graphql';
import { UserType } from './user.type';

@ObjectType()
export class UserAuthType {
  @Field(() => String)
  accessToken: string;

  @Field(() => UserType)
  user: UserType;
}
