import { Router, Request, Response } from "express"
import { z } from 'zod'
import { useCommandDatabase } from "../database/useCommandDatabase";

const commandRoutes = Router()
const commandDatabase = useCommandDatabase()

commandRoutes.get("/", (req: Request, res: Response) => {
  try {
    const commands = commandDatabase.list()
    res.json(commands)
  } catch (error) {
    console.log(error)      
  }
});

commandRoutes.post("/", (req: Request, res: Response) => {
  const commandSchema = z.object({
    num: z.number(),
    client: z.string(),
    clientdoc: z.string(),
    price: z.number(),
    status: z.string(),
  })
  const body = commandSchema.parse(req.body)
  const idcategory = commandDatabase.create({
    num: body.num,
    client: body.client,
    clientdoc: body.clientdoc,
    price: body.price,
    status: body.status
  })
  res.json(idcategory)
});


export default commandRoutes;