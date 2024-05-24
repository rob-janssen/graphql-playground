import { buildSchema } from 'graphql'

export const tasksGQLSchema = buildSchema(`
    type Task {
        id: String!
        title: String!
        description: String!
    }

    type Query {
        tasks: tasksInfoResponse!
        task(id: String!): Task!
    }

    type Mutation {
        addTask(title: String!, description: String!): createResponse
        updateTask(id: String!, title: String, description: String): updateResponse
        deleteTask(id: String!): deleteResponse
    }

    type createResponse {
        success: Boolean!
        message: String!
        id: String!
    }

    type updateResponse {
        success: Boolean!
        message: String!
        id: String!
    }

    type deleteResponse {
        success: Boolean!
        message: String!
        id: String!
    }

    type tasksInfoResponse {
        success: Boolean!
        total: Int!
        tasks: [Task!]!
    }
`)