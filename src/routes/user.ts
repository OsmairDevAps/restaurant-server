import { Router, Request, Response } from "express"
import { z } from 'zod'
import { useUserDatabase } from "../database/useUserDatabase" 

const userRoutes = Router()
const userDatabase = useUserDatabase()

userRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const users = await userDatabase.list()
    res.json(users)
  } catch (error) {
    console.log(error)      
  }
});

userRoutes.post("/", async (req: Request, res: Response) => {
  const userSchema = z.object({
    name: z.string(),
    user: z.string(),
    password: z.string(),
    kind: z.string(),
  })
  const body = userSchema.parse(req.body)
  const idUser = await userDatabase.create({
    name: body.name,
    user: body.user,
    password: body.password,
    kind: body.kind,
  })
  res.json(idUser)
});

userRoutes.put("/", async (req: Request, res: Response) => {
  const userSchema = z.object({
    id: z.number(),
    name: z.string(),
    user: z.string(),
    password: z.string(),
    kind: z.string(),
  })
  const body = userSchema.parse(req.body)
  const idcategory = await userDatabase.update({
    id: body.id,
    name: body.name,
    user: body.user,
    password: body.password,
    kind: body.kind,
  })
  res.json(idcategory)
});

userRoutes.delete("/:id", async (req: Request, res: Response) => {
  const userSchema = z.object({
    id: z.number(),
  })
  const { id } = userSchema.parse(req.params)
  await userDatabase.remove(id)
  res.status(201).send()
});

userRoutes.post("/login", async (req: Request, res: Response) => {
  const response = await userDatabase.login(req.body.user, req.body.password)
  res.status(201).send(response)
});

export default userRoutes;