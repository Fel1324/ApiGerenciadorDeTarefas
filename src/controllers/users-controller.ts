import { Request, Response } from "express"
import { hash } from "bcrypt"
import { z } from "zod"

import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/app-error"
import { UserRole } from "@/generated/prisma"

const { admin, member } = UserRole

export class UsersController {
  async create(req: Request, res: Response){
    const bodySchema = z.object({
      name: z.string().trim().min(2, "O nome deve conter no mínimo 2 caracteres"),
      email: z.string().email("E-mail inválido"),
      password: z.string().min(7, "A senha deve conter no mínimo 7 caracteres"),
      role: z.enum([admin, member]).default(member)
    })

    const { name, email, password, role } = bodySchema.parse(req.body)
    const userWithSameEmail = await prisma.user.findFirst({
      where: { email }
    })

    if(userWithSameEmail){
      throw new AppError("Já existe um usuário com este email!")
    }

    const hashedPassword = await hash(password, 8)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role
      }
    })

    const { password: _, ...userWithoutPassword } = user

    res.status(201).json(userWithoutPassword)
    return
  }
}
