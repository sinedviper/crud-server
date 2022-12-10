import { Field, InputType } from "type-graphql";
import { Length } from "class-validator";

@InputType()
export class UserInput {
  @Field()
  @Length(3, 20)
  username!: string;

  @Field()
  @Length(5, 20)
  email!: string;

  @Field()
  @Length(8, 25)
  password!: string;
}
