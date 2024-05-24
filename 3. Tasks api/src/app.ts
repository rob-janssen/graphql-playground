//npx tsx src/app.ts

require("dotenv").config();

import { connectDB } from "./db/connect";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { mergedGQLSchema } from "./schema";
import { resolvers } from "./resolver";

const PORT = parseInt(process.env.PORT as string) || 3000;

const server = new ApolloServer({
  typeDefs: mergedGQLSchema,
  resolvers: resolvers,
  introspection: true,
});

const start = async () => {
  try {
    connectDB(process.env.MONGO_URI as string);
    startStandaloneServer(server, { listen: { port: PORT } });
    console.log(`Server is running on port: ${PORT}`);
  } catch (e) {
    console.log(e);
  }
};

start();
