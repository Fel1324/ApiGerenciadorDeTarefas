import { Router } from "express";

import { TeamsController } from "@/controllers/teams-controller"
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization"

const teamsRoutes = Router()
const teamsController = new TeamsController()

teamsRoutes.post("/", verifyUserAuthorization(["admin"]), teamsController.create)

export { teamsRoutes }
