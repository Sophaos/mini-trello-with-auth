import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';

@InputType()
export class SignUpInput {
  @Field()
  @IsString()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @MinLength(3)
  password: string;

  @Field()
  @IsString()
  @MinLength(3)
  name: string;
}

@InputType()
export class LoginInput {
  @Field()
  @IsString()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @MinLength(3)
  password: string;

  @Field()
  @IsString()
  @MinLength(3)
  name: string;
}
