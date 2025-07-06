import { Request, Response } from "express"
import { z } from "zod"

export class SessionsController{
  async create(req: Request, res: Response){
    res.status(201).json({ message: "Eu te amo Jesus!" })
    return
  }
}
