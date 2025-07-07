import { Router } from "express"

import { TaskHistoryController } from "@/controllers/task-history-controller"

const taskHistoryRoutes = Router()
const taskHistoryController = new TaskHistoryController()

taskHistoryRoutes.post("/", taskHistoryController.create)
taskHistoryRoutes.delete("/:id", taskHistoryController.remove)

export { taskHistoryRoutes }
