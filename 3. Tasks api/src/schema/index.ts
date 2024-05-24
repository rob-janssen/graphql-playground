import { mergeTypeDefs } from "@graphql-tools/merge"
import { tasksGQLSchema } from "./tasks"

export const mergedGQLSchema = mergeTypeDefs([tasksGQLSchema])