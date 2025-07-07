import request from "supertest"

import { prisma } from "@/database/prisma"
import { app } from "@/app"

describe("UsersController", () => {
  let user_id: string

  afterAll(async () => {
    await prisma.user.delete({ where: { id: user_id }})
  })

  it("should create a new user sucessfully", async () => {
    const res = await request(app).post("/users").send({
      name: "test",
      email: "test@email.com",
      password: "123123123"
    })

    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty("id")
    expect(res.body.name).toBe("test")
    expect(res.body.email).toBe("test@email.com")

    user_id =  res.body.id
  })

  it("should throw an error if user with same email already exists", async () => {
    const res = await request(app).post("/users").send({
      name: "test",
      email: "test@email.com",
      password: "123321321123"
    })

    expect(res.status).toBe(400)
    expect(res.body.message).toBe("Já existe um usuário com este email!")
  })

  it("should throw an error if user with same email already exists", async () => {
    const res = await request(app).post("/users").send({
      name: "test",
      email: "test-email-com",
      password: "pwdpwd123321"
    })

    expect(res.status).toBe(400)
    expect(res.body.message).toBe("Erro de validação")
  })
})
