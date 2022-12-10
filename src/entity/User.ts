import { Field, ObjectType, ID } from "type-graphql";
import { Entity, Column, BaseEntity, ObjectIdColumn } from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field((type) => ID)
  @ObjectIdColumn()
  _id!: string;

  @Field()
  @Column()
  username!: string;

  @Field()
  @Column()
  email!: string;

  @Field()
  @Column()
  password!: string;
}
