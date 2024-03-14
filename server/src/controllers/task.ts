import { Request, Response, NextFunction } from "express";
import taskModel from "../models/task";
import { isEmpty } from "../utills/Validations";
class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}
export const getTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userID = req.params.userID;
  const pageNumber: string = req.query.pageNumber as string;
  const pageSize = 10;
  console.log("page number", pageNumber, parseInt(pageNumber));
  try {
    const tasksToTheUser = await taskModel
      .find({ userID: userID })
      .skip((parseInt(pageNumber) - 1) * pageSize)
      .limit(pageSize);
    if (!tasksToTheUser) {
      const error = new CustomError("This user does not exist", 404);
      return next(error);
    }

    console.log("result",tasksToTheUser)
    
    res.status(200).json({ tasksToTheUser });
  } catch (err: any) {
    console.log("get task by id error",err)
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
export const updateTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const taskID = req.params.taskID;
  const { task_status } = req.body;
  const userId = req.query.userId;
  try {
    const tasksUpdating = await taskModel.findByIdAndUpdate(
      { _id: taskID },
      { task_status }
    );
    if (!tasksUpdating) {
      const error = new CustomError("This task does not exist", 404);
      return next(error);
    }
    const newTasksAfterUpdate = await taskModel.find({ userID: userId });

    res.status(200).json({
      message: "Task Status Updated successfully",
      tasks: newTasksAfterUpdate,
    });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
export const deleteTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const taskID = req.params.taskID;
  try {
    const tasksUpdating = await taskModel.findByIdAndDelete({ _id: taskID });
    if (!tasksUpdating) {
      const error = new CustomError("This task does not exist", 404);
      return next(error);
    }
    res.status(200).json({
      message: "Task Deleted successfully",
    });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const postTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const taskDate: Date = req.body.taskDate;
  const task: string = req.body.task;
  const userId: string = req.body.userId;

  if (isEmpty(taskDate) || isEmpty(task)) {
    const error: CustomError = new CustomError(
      "Date or task cannot be empty",
      400
    );
    return next(error);
  }

  try {
    const newTask = new taskModel({
      userID: userId,
      date: taskDate,
      task_description: task,
      task_status: false,
    });

    const savedTask = await newTask.save();
    if (!savedTask) {
      const error = new CustomError(
        "Erro when creating Task Please Try Again Later",
        500
      );
      return next(error);
    }

    res.status(200).json({
      message: "Task Creation Success",
      details: savedTask,
    });
  } catch (error: any) {
    next(error);
  }
};
