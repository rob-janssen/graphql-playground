"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergedGQLSchema = void 0;
const merge_1 = require("@graphql-tools/merge");
const tasks_1 = require("./tasks");
exports.mergedGQLSchema = (0, merge_1.mergeTypeDefs)([tasks_1.tasksGQLSchema]);
