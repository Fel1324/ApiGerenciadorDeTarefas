import { Request, Response } from "express"
import { z } from "zod"

import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/app-error"

export class TeamTasksController{
  async index(req: Request, res: Response){
    const user_id = req.user?.id

    if(!user_id){
      throw new AppError("Não autorizado", 401)
    }

    const user = await prisma.user.findUnique({
      where: { id: user_id }
    })

    if(!user){
      throw new AppError("Usuário não encontrado", 404)
    }

    const teamTasks = await prisma.user.findUnique({
      where: {
        id: user_id
      },
      omit: {
        id: true,
        name: true,
        email: true,
        password: true,
        role: true,
        createdAt: true,
        updatedAt: true
      },
      include: {
        teamMembers: {
          select: {
            team: {
              select: {
                id: true,
                name: true,
                description: true,
                tasks: {
                  select: {
                    id: true,
                    title:true,
                    description: true,
                    status: true,
                    priority: true,
                    user: {
                      select: {
                        name: true,
                        email: true,
                        role: true,
                        taskHistories: true
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    })

    res.json(teamTasks)
    return
  }
}
