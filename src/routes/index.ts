import { Router } from "express";

import { usersRoutes } from "@/routes/users-routes";
import { sessionsRoutes } from "./sessions-routes";

const routes = Router()

// Public Routes
routes.use("/users", usersRoutes)
routes.use("/sessions", sessionsRoutes)

export { routes }
