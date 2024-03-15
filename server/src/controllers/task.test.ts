import { Request, Response, NextFunction } from "express";
import { getTaskById } from "../controllers/task";
import taskModel from "../models/task";
import { Task } from "../models/task";
import * as controller from "../controllers/task";
import { CustomError } from "../controllers/task";
jest.mock("../models/task");

describe("getTaskById controller", () => {
  it("should fetch tasks for a user", async () => {
    const mockReq = {
      params: { userID: "65c73f02e32fc26d22101e27" },
      query: { pageNumber: "1" },
    } as unknown as Request;

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const mockTasks = [
      {
        date: new Date("2024-03-21T00:00:00.000Z"),
        task_description: "2",
        task_status: true,
        userID: "65c73f02e32fc26d22101e27",
        __v: 0,
        _id: "65e5af7e71fbf1d8b053eec7",
      },
      {
        date: new Date("2024-03-22T00:00:00.000Z"),
        task_description: "3",
        task_status: true,
        userID: "65c73f02e32fc26d22101e27",
        __v: 0,
        _id: "65e5af8371fbf1d8b053eeca",
      },
    ];

    //(taskModel.find as jest.Mock).mockResolvedValue(mockTasks);

    //newww

    // (taskModel.find as jest.Mock).mockReturnThis();
    // (taskModel.find as jest.Mock).mockResolvedValue(mockTasks);

    // Mocking the skip function
    (taskModel.find as jest.Mock).mockReturnThis();
    (taskModel.find as jest.Mock).mockReturnValueOnce({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(mockTasks),
    });

    //neww

    await controller.getTaskById(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ tasksToTheUser: mockTasks });
  });
});

// describe("updateTaskById controller", () => {
//   it("should update task status successfully", async () => {
//     const mockReq = {
//       params: { taskID: "65e5af7e71fbf1d8b053eec7" },
//       body: { task_status: true },
//       query: { userId: "65c73f02e32fc26d22101e27" },
//     } as unknown as Request;

//     const mockRes = {
//       status: jest.fn().mockReturnThis(),
//       //json: jest.fn(),
//     } as unknown as Response;

//     // Mock the findByIdAndUpdate function of taskModel to resolve with a task
//     const mockTasks = [
//       {
//         date: new Date("2024-03-21T00:00:00.000Z"),
//         task_description: "2",
//         task_status: true,
//         userID: "65c73f02e32fc26d22101e27",
//         __v: 0,
//         _id: "65e5af7e71fbf1d8b053eec7",
//       },
//     ];

   

//     await controller.updateTaskById(mockReq, mockRes);

//     expect(mockRes.status).toHaveBeenCalledWith(200);
//     expect(jest.fn(mockRes.json)).toHaveBeenCalledWith({
//       message: "Task Status Updated successfully",
//       tasks: mockTasks,
//     });
//   });

//   it("should handle task not found error", async () => {
//     const mockReq = {
//       params: { taskID: "nonExistentTaskID" },
//       body: { task_status: true },
//       query: { userId: "65c73f02e32fc26d22101e27" },
//     } as unknown as Request;

//     const mockRes = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     } as unknown as Response;

//     // Mock the findByIdAndUpdate function of taskModel to resolve with null
//     (taskModel.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(null);

//     const mockNext = jest.fn();

//     await controller.updateTaskById(mockReq, mockRes);

//     expect(mockRes.status).toHaveBeenCalledWith(
//       new controller.CustomError("This task does not exist", 404)
//     );
//     // expect.toHaveBeenCalledWith(
//     //   new controller.CustomError("This task does not exist", 404)
//     // );
//   });
// });



describe("updateTaskById controller", () => {
  it("should update task status successfully", async () => {
    const mockReq = {
      params: { taskID: "65e5af7e71fbf1d8b053eec7" },
      body: { task_status: true },
      query: { userId: "65c73f02e32fc26d22101e27" },
    } as unknown as Request;

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    // Mock the findByIdAndUpdate function of taskModel to resolve with a task
    // const message = "Task Status Updated successfully";
    const mockTasks = [
      {
        _id: "65e5af7e71fbf1d8b053eec7",
        userID: "65c73f02e32fc26d22101e27",
        date: new Date("2024-03-21T00:00:00.000Z"),
        task_description: "2",
        task_status: true,
        __v: 0,
      }
    ];

    const mockTasksNew = {
      message: "Task Status Updated successfully",
      tasks: [
        {
          date: new Date("2024-03-21T00:00:00.000Z"),
          task_description: "2",
          task_status: true,
          userID: "65c73f02e32fc26d22101e27",
          __v: 0,
          _id: "65e5af7e71fbf1d8b053eec7",
        },
      ],
    };

    (taskModel.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(mockTasks);

    await controller.updateTaskById(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      mockTasksNew
    });
  });

  it("should handle task not found error", async () => {
    const mockReq = {
      params: { taskID: "nonExistentTaskID" },
      body: { task_status: true },
      query: { userId: "65c73f02e32fc26d22101e27" },
    } as unknown as Request;

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    // Mock the findByIdAndUpdate function of taskModel to resolve with null
    (taskModel.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(null);

    await expect(async () => {
      await controller.updateTaskById(mockReq, mockRes);
    }).rejects.toThrow(new CustomError("This task does not exist", 404));
  });
});


describe("deleteTaskById controller", () => {
  it("should delete task successfully", async () => {
    const mockReq = {
      params: { taskID: "65e5af7e71fbf1d8b053eec7" },
    } as unknown as Request;

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    // Mock the findByIdAndDelete function of taskModel to resolve with a task
    (taskModel.findByIdAndDelete as jest.Mock).mockResolvedValueOnce({
      date: new Date("2024-03-21T00:00:00.000Z"),
      task_description: "2",
      task_status: true,
      userID: "65c73f02e32fc26d22101e27",
      __v: 0,
      _id: "65e5af7e71fbf1d8b053eec7",
    });

    await controller.deleteTaskById(mockReq, mockRes, jest.fn());

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Task Deleted successfully",
    });
  });

  it("should handle task not found error", async () => {
    const mockReq = {
      params: { taskID: "nonExistentTaskID" },
    } as unknown as Request;

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    // Mock the findByIdAndDelete function of taskModel to resolve with null
    (taskModel.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(null);

    const mockNext = jest.fn();

    await controller.deleteTaskById(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(
      new controller.CustomError("This task does not exist", 404)
    );
  });
});
