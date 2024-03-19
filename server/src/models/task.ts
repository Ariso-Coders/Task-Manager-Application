import { Document, Schema, model, Types } from "mongoose";

export interface Task extends Document {
  userID: Types.ObjectId;
  date: Date;
  task_description: string;
  task_status: boolean;
}

const taskSchema = new Schema<Task>({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  task_description: {
    type: String,
    required: true,
  },
  task_status: {
    type: Boolean,
    required: true,
  },
});

const taskModel = model<Task>("Task", taskSchema);
export default taskModel;
