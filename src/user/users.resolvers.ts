import { Query, Resolver, Mutation, Arg } from "type-graphql";
import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
import { ObjectId } from "mongodb";

import { dataSource } from "../db";
import { User } from "../entity/User";
import { UserInput } from "./user.input";

@Resolver(() => User)
export class UsersResolver {
  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    const users = await dataSource.mongoManager.find(User, {});
    users.map((val) => {
      const rehash = CryptoJS.AES.decrypt(val.password, "denisrepyev");
      const rehashPassword = rehash.toString(CryptoJS.enc.Utf8);
      val.password = rehashPassword;
    });
    return users;
  }

  @Mutation(() => [User])
  async createUser(
    @Arg("user") { username, email, password }: UserInput
  ): Promise<User[]> {
    const hashPassword = CryptoJS.AES.encrypt(
      password,
      "denisrepyev"
    ).toString();
    await User.create({
      username,
      email,
      password: String(hashPassword),
    }).save();

    const users = await dataSource.mongoManager.find(User, {});
    users.map((val) => {
      const rehash = CryptoJS.AES.decrypt(val.password, "denisrepyev");
      const rehashPassword = rehash.toString(CryptoJS.enc.Utf8);
      val.password = rehashPassword;
    });
    return users;
  }

  @Mutation(() => [User])
  async updateUser(
    @Arg("id") id: string,
    @Arg("user") { username, email, password }: UserInput
  ): Promise<User[]> {
    const _id = new ObjectId(id);
    const hashPassword = CryptoJS.AES.encrypt(
      password,
      "denisrepyev"
    ).toString();
    await dataSource.mongoManager.findOneAndUpdate(
      User,
      { _id },
      {
        $set: { username, email, password: String(hashPassword) },
      }
    );

    const userUpdate = await dataSource.mongoManager.findOneBy(User, { _id });
    if (!userUpdate) {
      throw new Error("Not found user");
    }

    const users = await dataSource.mongoManager.find(User, {});
    users.map((val) => {
      const rehash = CryptoJS.AES.decrypt(val.password, "denisrepyev");
      const rehashPassword = rehash.toString(CryptoJS.enc.Utf8);
      val.password = rehashPassword;
    });
    return users;
  }

  @Mutation(() => [User])
  async removeUser(@Arg("id") id: string): Promise<User[]> {
    const _id = new ObjectId(id);
    const user = await dataSource.mongoManager.findOneAndDelete(User, { _id });
    if (!user) {
      throw new Error("Not found user");
    }

    const users = await dataSource.mongoManager.find(User, {});
    users.map((val) => {
      const rehash = CryptoJS.AES.decrypt(val.password, "denisrepyev");
      const rehashPassword = rehash.toString(CryptoJS.enc.Utf8);
      val.password = rehashPassword;
    });
    return users;
  }
}
