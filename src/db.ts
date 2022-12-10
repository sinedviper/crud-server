import { DataSource } from "typeorm";
import { User } from "./entity/User";

export const dataSource = new DataSource({
  type: "mongodb",
  url: "mongodb+srv://admin:889668@cluster0.hvinuo1.mongodb.net/test?retryWrites=true&w=majority",
  synchronize: true,
  logging: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  entities: [User],
});
