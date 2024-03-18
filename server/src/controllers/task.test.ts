// import { Request, Response, NextFunction } from "express";
// import { getTaskById } from "./task";
// import taskModel from "../models/task";
// import { Task } from "../models/task";
// import * as controller from "./task";
// import { CustomError } from "./task";
// jest.mock("../models/task");

// describe("getTaskById controller", () => {
//   it("should fetch tasks for a user", async () => {
//     const mockReq = {
//       params: { userID: "65c73f02e32fc26d22101e27" },
//       query: { pageNumber: "1" },
//     } as unknown as Request;

//     const mockRes = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     } as unknown as Response;

//     const mockTasks = [
//       {
//         date: new Date("2024-03-21T00:00:00.000Z"),
//         task_description: "2",
//         task_status: true,
//         userID: "65c73f02e32fc26d22101e27",
//         __v: 0,
//         _id: "65e5af7e71fbf1d8b053eec7",
//       },
//       {
//         date: new Date("2024-03-22T00:00:00.000Z"),
//         task_description: "3",
//         task_status: true,
//         userID: "65c73f02e32fc26d22101e27",
//         __v: 0,
//         _id: "65e5af8371fbf1d8b053eeca",
//       },
//     ];

//     // (taskModel.find as jest.Mock).mockReturnThis();
//     // (taskModel.find as jest.Mock).mockResolvedValue(mockTasks);

//     // Mocking the skip function
//     (taskModel.find as jest.Mock).mockReturnThis();
//     (taskModel.find as jest.Mock).mockReturnValueOnce({
//       skip: jest.fn().mockReturnThis(),
//       limit: jest.fn().mockResolvedValue(mockTasks),
//     });

//     await controller.getTaskById(mockReq, mockRes);

//     expect(mockRes.status).toHaveBeenCalledWith(200);
//     expect(mockRes.json).toHaveBeenCalledWith({ tasksToTheUser: mockTasks });
//   });
// });


// describe("updateTaskById controller", () => {
//   it("should update task status successfully", async () => {
//     const mockReq = {
//       params: { taskID: "65e5af7e71fbf1d8b053eec7" },
//       body: { task_status: true },
//       query: { userId: "65c73f02e32fc26d22101e27" },
//     } as unknown as Request;

//     const mockRes = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     } as unknown as Response;

//     // Mock the findByIdAndUpdate function of taskModel to resolve with a task
//     const mockTaskUpdated = {
//       _id: "65e5af7e71fbf1d8b053eec7",
//       userID: "65c73f02e32fc26d22101e27",
//       date: new Date("2024-03-21T00:00:00.000Z"),
//       task_description: "2",
//       task_status: true,
//       __v: 0,
//     };

    
//     (taskModel.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(mockTaskUpdated); // Updated task object
//     (taskModel.find as jest.Mock).mockResolvedValueOnce([mockTaskUpdated]); 
//     await controller.updateTaskById(mockReq, mockRes);

//     expect(mockRes.status).toHaveBeenCalledWith(200);
//     expect(mockRes.json).toHaveBeenCalledWith({
//       message: "Task Status Updated successfully",
//       tasks: [mockTaskUpdated],
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

//     await expect(async () => {
//       await controller.updateTaskById(mockReq, mockRes);
//     }).rejects.toThrow(new CustomError("This task does not exist", 404));
//   });
// });


// describe("deleteTaskById controller", () => {
//   it("should delete task successfully", async () => {
//     const mockReq = {
//       params: { taskID: "65e5af7e71fbf1d8b053eec7" },
//     } as unknown as Request;

//     const mockRes = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     } as unknown as Response;

//     // Mock the findByIdAndDelete function of taskModel to resolve with a task
//     (taskModel.findByIdAndDelete as jest.Mock).mockResolvedValueOnce({
//       date: new Date("2024-03-21T00:00:00.000Z"),
//       task_description: "2",
//       task_status: true,
//       userID: "65c73f02e32fc26d22101e27",
//       __v: 0,
//       _id: "65e5af7e71fbf1d8b053eec7",
//     });

//     await controller.deleteTaskById(mockReq, mockRes, jest.fn());

//     expect(mockRes.status).toHaveBeenCalledWith(200);
//     expect(mockRes.json).toHaveBeenCalledWith({
//       message: "Task Deleted successfully",
//     });
//   });

//   it("should handle task not found error", async () => {
//     const mockReq = {
//       params: { taskID: "nonExistentTaskID" },
//     } as unknown as Request;

//     const mockRes = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     } as unknown as Response;

//     // Mock the findByIdAndDelete function of taskModel to resolve with null
//     (taskModel.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(null);

//     const mockNext = jest.fn();

//     await controller.deleteTaskById(mockReq, mockRes, mockNext);

//     expect(mockNext).toHaveBeenCalledWith(
//       new controller.CustomError("This task does not exist", 404)
//     );
//   });
// });

// describe("postTask controller", () => {
//   it("should create a new task", async () => {
//     const mockReq = {
//       body: {
//         taskDate: new Date("2024-03-21T00:00:00.000Z"),
//         task: "Sample Task",
//         userId: "65c73f02e32fc26d22101e27",
//       },
//     } as unknown as Request;

//     const mockRes = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     } as unknown as Response;

//     // Mock the save function of taskModel to resolve with the saved task
//     const mockSavedTask = {
//       _id: "65e5af7e71fbf1d8b053eec7",
//       date: new Date("2024-03-21T00:00:00.000Z"),
//       task_description: "Sample Task",
//       task_status: false,
//       userID: "65c73f02e32fc26d22101e27",
//       __v: 0,
//     };
//     (taskModel.prototype.save as jest.Mock).mockResolvedValue(mockSavedTask);

//     await expect(
//       controller.postTask(mockReq, mockRes)
//     ).resolves.toBeUndefined();

//     expect(mockRes.status).toHaveBeenCalledWith(200);
//     expect(mockRes.json).toHaveBeenCalledWith({
//       message: "Task Creation Success",
//       details: mockSavedTask,
//     });
//   });

//   it("should throw an error if taskDate or task is empty", async () => {
//     const mockReq = {
//       body: {
//         taskDate: null,
//         task: "", 
//         userId: "65c73f02e32fc26d22101e27",
//       },
//     } as unknown as Request;

//     const mockRes = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     } as unknown as Response;

//     await expect(controller.postTask(mockReq, mockRes)).rejects.toThrow(
//       controller.CustomError
//     );
//   });

//   it("should throw an error if there is an issue with saving the task", async () => {
//     const mockReq = {
//       body: {
//         taskDate: new Date("2024-03-21T00:00:00.000Z"),
//         task: "Sample Task",
//         userId: "65c73f02e32fc26d22101e27",
//       },
//     } as unknown as Request;

//     const mockRes = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     } as unknown as Response;

//     // Mock the save function of taskModel to reject with an error
//     const mockError = new Error("Database connection error");
//     (taskModel.prototype.save as jest.Mock).mockRejectedValue(mockError);

//     await expect(controller.postTask(mockReq, mockRes)).rejects.toThrow(
//       mockError
//     );
//   });
// });