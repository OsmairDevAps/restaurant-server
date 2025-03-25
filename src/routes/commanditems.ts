import { Router, Request, Response } from "express"
import { z } from 'zod'
import { useCommandItemDatabase } from "../database/useCommandItemDatabase" 

const commandItemRoutes = Router()
const commandItemDatabase = useCommandItemDatabase()

commandItemRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const commandItems = await commandItemDatabase.list()
    res.json(commandItems)
  } catch (error) {
    console.log(error)      
  }
});

commandItemRoutes.post("/", async (req: Request, res: Response) => {
  const commandItemSchema = z.object({
    idtable: z.number(),
    category: z.string(),
    product: z.string(),
    amount: z.number(),
    price: z.number(),
  })
  const body = commandItemSchema.parse(req.body)
  const idProduct = await commandItemDatabase.create({
    idtable: body.idtable,
    category: body.category,
    product: body.product,
    amount: body.amount,
    price: body.price,
  })
  res.json(idProduct)
});

commandItemRoutes.put("/", async (req: Request, res: Response) => {
  const commandItemSchema = z.object({
    id: z.number(),
    idtable: z.number(),
    category: z.string(),
    product: z.string(),
    amount: z.number(),
    price: z.number(),
  })
  const body = commandItemSchema.parse(req.body)
  await commandItemDatabase.update({
    id: body.id,
    idtable: body.idtable,
    category: body.category,
    product: body.product,
    amount: body.amount,
    price: body.price,
  })
  res.status(201).send()
});

commandItemRoutes.delete("/:id", async (req: Request, res: Response) => {
  const commandItemSchema = z.object({
    id: z.number(),
  })
  const { id } = commandItemSchema.parse(req.params)
  await commandItemDatabase.remove(id)
  res.status(201).send()
});

export default commandItemRoutes;