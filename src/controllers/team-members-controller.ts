import { Request, Response } from "express"
import { z } from "zod"

import { AppError } from "@/utils/app-error"
import { prisma } from "@/database/prisma"

export class TeamMembersController{
  async create(req: Request, res: Response){
    const bodySchema = z.object({
      user_id: z.string().uuid("Id inválido"),
      team_id: z.string().uuid("Id inválido")
    })

    const { user_id, team_id } = bodySchema.parse(req.body)

    const user = await prisma.user.findUnique({
      where: { id: user_id }
    })

    const team = await prisma.team.findUnique({
      where: { id: team_id }
    })

    if(!user){
      throw new AppError("Usuário não encontrado", 404)
    }

    if(!team){
      throw new AppError("Time não encontrado", 404)
    }

    const teamMember = await prisma.teamMember.create({
      data: {
        userId: user_id,
        teamId: team_id
      },
      include: {
        team: true,
        user: true
      }
    })

    res.status(201).json(teamMember)
    return
  }

  async update(req: Request, res: Response){
    
  }
}
