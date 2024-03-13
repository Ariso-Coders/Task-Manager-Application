import { Request, Response, NextFunction } from "express";
import { getTaskById } from "../controllers/task";
import taskModel from "../models/task";
jest.mock("../models/task", () => ({
  __esModule: true,
  default: jest.fn(),
  find: jest.fn().mockResolvedValue([] as Task[]), // Mock the find method
}));

type Task = {
  userID: string | any;
  date: Date;
  task_description: string;
  task_status: boolean;
  __v: number;
  _id: string;
};
describe("getTaskById controller", () => {
  it("should fetch tasks for a user", async () => {
    // Mock request, response, and next function
    const mockReq = {
      params: { userID: "testUserID" },
      query: { pageNumber: "1" },
    } as unknown as Request;
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const mockNext = jest.fn() as unknown as NextFunction;
    // Mock task data
    const mockTasks: Task[] = [
       {
    _id: '65e5af7e71fbf1d8b053eec7',
    userID: '65c73f02e32fc26d22101e27',
    date: new Date("2024-03-21T00:00:00.000Z"),
    task_description: '2',
    task_status: true,
    __v: 0
  },
  {
    _id: '65e5af8371fbf1d8b053eeca',
    userID: '65c73f02e32fc26d22101e27',
    date: new Date ("2024-03-22T00:00:00.000Z"),
    task_description: '3',
    task_status: true,
    __v: 0
  },
    ];
    // Update mockResolvedValue to return mockTasks
    (taskModel.find as jest.Mock).mockResolvedValue(mockTasks);
    // Call the controller function
    await getTaskById(mockReq, mockRes);
    // Assertions
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ tasksToTheUser: mockTasks });
    //expect(mockNext).not.toHaveBeenCalled();
  });
  // Add more test cases as needed...
});


import { Request, Response, NextFunction } from "express";
import { getTaskById } from "../controllers/task";
import taskModel from "../models/task";
// Explicitly mock the taskModel
jest.mock("../models/task", () => ({
  __esModule: true,
  default: jest.fn(),
  find: jest.fn(),
}));
type Task = {
  userID: string | any;
  date: Date;
  task_description: string;
  task_status: boolean;
  __v: number;
  _id: string;
};
desc;
describe("getTaskById controller", () => {
  it("should fetch tasks for a user", async () => {
    // Mock request, response, and next function
    const mockReq = {
      params: { userID: "testUserID" },
      query: { pageNumber: "1" },
    } as unknown as Request;
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    // Mock task data
    const mockTasks: Task[] = [
      {
        _id: "65e5af7e71fbf1d8b053eec7",
        userID: "65c73f02e32fc26d22101e27",
        date: new Date("2024-03-21T00:00:00.000Z"),
        task_description: "2",
        task_status: true,
        __v: 0,
      },
      {
        _id: "65e5af8371fbf1d8b053eeca",
        userID: "65c73f02e32fc26d22101e27",
        date: new Date("2024-03-22T00:00:00.000Z"),
        task_description: "3",
        task_status: true,
        __v: 0,
      },
    ];
    // Update mockResolvedValue to return mockTasks
    (taskModel.find as jest.Mock).mockResolvedValue(mockTasks);
    // Call the controller function
    await getTaskById(mockReq, mockRes, jest.fn() as unknown as NextFunction);
    // Assertions
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ tasksToTheUser: mockTasks });
  });
});







