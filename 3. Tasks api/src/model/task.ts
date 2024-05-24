import { Schema, Model, model, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  done: boolean;
}

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  done: { type: Boolean },
});

export const Task: Model<ITask> = model<ITask>('Task', TaskSchema)
