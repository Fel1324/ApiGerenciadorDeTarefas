import { Request, Response } from "express"
import { z } from "zod"

import { AppError } from "@/utils/app-error"
import { prisma } from "@/database/prisma"

export class TeamsController{
  async create(req: Request, res: Response){
    const bodySchema = z.object({
      name: z.string().trim().min(5, "O nome do time deve ter no mínimo 5 caracteres"),
      description: z.string().trim().optional()
    })

    const { name, description } = bodySchema.parse(req.body)

    if(!req.user?.id){
      throw new AppError("Não autorizado", 401)
    }

    const teamName = await prisma.team.findFirst({ where: { name } })

    if(teamName){
      throw new AppError("Já existe um time com este nome")
    }

    const team = await prisma.team.create({
      data: {
        name,
        description,
      },
      include: {
        tasks: true,
        teamMembers: true
      }
    })

    res.status(201).json(team)
    return
  }

  async update(req: Request, res: Response){
    const paramsSchema = z.object({
      id: z.string().uuid()
    })

    const bodySchema = z.object({
      name: z.string().trim().min(5, "O nome do time deve ter no mínimo 5 caracteres").optional(),
      description: z.string().trim()
    })

    const { id } = paramsSchema.parse(req.params)
    const { name, description } = bodySchema.parse(req.body)

    const team = await prisma.team.findUnique({ where: { id } })

    if(!team){
      throw new AppError("Time não encontrado", 404)
    }

    const newTeam = await prisma.team.update({
      data: {
        name,
        description
      },
      where: {
        id
      }
    })

    res.json(newTeam)
    return
  }
}
