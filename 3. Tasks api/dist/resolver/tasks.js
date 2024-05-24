"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksResolver = void 0;
const task_1 = require("../model/task");
exports.TasksResolver = {
    Query: {
        tasks: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const tasks = yield task_1.Task.find({});
                if (!tasks)
                    throw new Error("No tasks found.");
                return {
                    success: true,
                    total: tasks.length,
                    tasks,
                };
            }
            catch (e) {
                throw e;
            }
        }),
        task: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!args.id)
                    throw new Error("No task ID provided.");
                const task = yield task_1.Task.findById(args.id);
                if (!task)
                    throw new Error("Task not found!");
                return task;
            }
            catch (e) {
                throw e;
            }
        }),
    },
    Mutation: {
        addTask: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const task = yield task_1.Task.findOne({ title: args.title });
                if (task)
                    throw new Error("Task already exists.");
                const newTask = yield task_1.Task.create({
                    title: args.title,
                    description: args.description,
                });
                return {
                    success: true,
                    message: `Task ${newTask === null || newTask === void 0 ? void 0 : newTask.title} added succesfully`,
                    id: newTask === null || newTask === void 0 ? void 0 : newTask._id,
                };
            }
            catch (e) {
                throw e;
            }
        }),
        updateTask: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const id = args.id;
                if (!id)
                    throw new Error("No ID provided");
                const task = yield task_1.Task.findById(id);
                if (!task)
                    throw new Error("No task found.");
                const updateTask = yield task_1.Task.findByIdAndUpdate(id, Object.assign({}, args), { new: true, runValidators: true });
                return {
                    success: true,
                    message: `Task ${task === null || task === void 0 ? void 0 : task.title} updated succesfully.`,
                    id: updateTask === null || updateTask === void 0 ? void 0 : updateTask._id,
                };
            }
            catch (e) {
                throw e;
            }
        }),
        deleteTask: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const id = args.id;
                if (!id)
                    throw new Error("No ID provided");
                const task = yield task_1.Task.findById(id);
                if (!task)
                    throw new Error("No task found.");
                const deleteTask = yield task_1.Task.findByIdAndDelete(id);
                return {
                    success: true,
                    message: "Product deleted succesfully.",
                    id: deleteTask === null || deleteTask === void 0 ? void 0 : deleteTask._id,
                };
            }
            catch (e) {
                throw e;
            }
        }),
    },
};
