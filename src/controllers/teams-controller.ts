import { Request, Response } from "express"
import { z } from "zod"

export class TeamsController{
  async create(req: Request, res: Response){
    res.status(201).json({})
    return
  }
}
