import { Router } from "express";
import isAuth from "../middleware/is-auth";
const router = Router();

import * as taskControllers from "../controllers/task";

router.post("/createTask",isAuth, taskControllers.postTask);

router.get("/tasks/:userID",isAuth, taskControllers.getTaskById);
router.put("/tasks/:taskID",isAuth, taskControllers.updateTaskById);
router.delete("/tasks/:taskID",isAuth, taskControllers.deleteTaskById);
export default router;
