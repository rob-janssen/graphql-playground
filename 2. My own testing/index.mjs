import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
type Query {
    hello: String
}
`;

const resolvers = {
  Query: {
    hello: () => "World",
  },
};

const server = new ApolloServer({
    typeDefs,
    resolvers
})

const { url } = await startStandaloneServer(server);
console.log(`Server running at ${url}`);
