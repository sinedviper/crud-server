import "reflect-metadata";
import { buildSchema } from "type-graphql";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";

import { dataSource } from "./db";
import { UsersResolver } from "./user/users.resolvers";

(async () => {
  dataSource
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });

  const schema = await buildSchema({
    resolvers: [UsersResolver],
  });

  const apolloServer = new ApolloServer({
    schema,
  });

  const app = express();
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  app.use(cors());

  app.listen(3001, () => {
    console.log("Server start, http://localhost:3001/");
  });
})();
