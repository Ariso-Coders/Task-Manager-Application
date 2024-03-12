// import taskModel from "models/task";
// import Mock from "jest";
// import { postTask } from "controllers/task";
// import { Response } from "express";

import { request } from "express";
import { app } from "index";

// const mockRequest = (params: any = {}, query: any = {}) => ({
//   params,
//   query,
// });

// const mockResponse = () => {
//   const res: any = {};
//   res.status = jest.fn().mockReturnValue(res);
//   res.json = jest.fn().mockReturnValue(res);
//   return res;
// };

// const mockNext = jest.fn();

// jest.mock("../models/task.ts", () => ({
//   save: jest.fn(),
// }));

// describe("task", () => {
//   it("should extract values from request correctly", async () => {
//     const mockSavedTask = {
//       _id: "mockTaskId",
//       userID: "mockuseIdr",
//       date: new Date(),
//       task_description: "mock description",
//       task_status: false,
//     };

//     const mockRequest = (params: any = {}, query: any = {}) => ({
//         params,
//         query,
//       });

//       const mockResponse = () => {
//         const res: any = {};
//         res.status = jest.fn().mockReturnValue(res);
//         res.json = jest.fn().mockReturnValue(res);
//         return res;
//       };

//     (taskModel.prototype.save).mockResolvedValueOnce(mockSavedTask);

//   });
// });

describe("task testing", () => {
  it("should create a post", async () => {
    const response = await request(app).get("/");
  });
});
