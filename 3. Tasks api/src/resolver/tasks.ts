import { Task } from "../model/task";

interface Args {
  title: string;
  id: string;
  description: string;
  done: boolean;
}

export const TasksResolver = {
  Query: {
    tasks: async () => {
      try {
        const tasks = await Task.find({});
        if (!tasks) throw new Error("No tasks found.");
        return {
          success: true,
          total: tasks.length,
          tasks,
        };
      } catch (e) {
        throw e;
      }
    },
    task: async (_: any, args: Args) => {
      try {
        if (!args.id) throw new Error("No task ID provided.");
        const task = await Task.findById(args.id);
        if (!task) throw new Error("Task not found!");
        return task;
      } catch (e) {
        throw e;
      }
    },
  },
  Mutation: {
    addTask: async (_: any, args: Args) => {
      try {
        const task = await Task.findOne({ title: args.title });
        if (task) throw new Error("Task already exists.");
        const newTask = await Task.create({
          title: args.title,
          description: args.description,
        });
        return {
          success: true,
          message: `Task ${newTask?.title} added succesfully`,
          id: newTask?._id,
        };
      } catch (e) {
        throw e;
      }
    },
    updateTask: async (_: any, args: Args) => {
      try {
        const id = args.id;
        if (!id) throw new Error("No ID provided");
        const task = await Task.findById(id);
        if (!task) throw new Error("No task found.");
        const updateTask = await Task.findByIdAndUpdate(
          id,
          { ...args },
          { new: true, runValidators: true }
        );
        return {
          success: true,
          message: `Task ${task?.title} updated succesfully.`,
          id: updateTask?._id,
        };
      } catch (e) {
        throw e;
      }
    },
    deleteTask: async (_: any, args: Args) => {
      try {
        const id = args.id;
        if (!id) throw new Error("No ID provided");
        const task = await Task.findById(id);
        if (!task) throw new Error("No task found.");
        const deleteTask = await Task.findByIdAndDelete(id);
        return {
          success: true,
          message: "Product deleted succesfully.",
          id: deleteTask?._id,
        };
      } catch (e) {
        throw e;
      }
    },
  },
};
