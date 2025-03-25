import { Router, Request, Response } from "express"
import { z } from 'zod'
import { useCategoryDatabase } from "../database/useCategoryDatabase"

const categoryRoutes = Router()
const categoryDatabase = useCategoryDatabase()

categoryRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const categories = await categoryDatabase.list()
    res.json(categories)
  } catch (error) {
    console.log(error)      
  }
});

categoryRoutes.post("/", async (req: Request, res: Response) => {
  const categorySchema = z.object({
    description: z.string(),
  })
  const body = categorySchema.parse(req.body)
  const idcategory = await categoryDatabase.create({
    description: body.description
  })
  res.json(idcategory)
});

categoryRoutes.put("/", async (req: Request, res: Response) => {
  const categorySchema = z.object({
    id: z.number(),
    description: z.string(),
  })
  const body = categorySchema.parse(req.body)
  const idcategory = await categoryDatabase.update({
    id: body.id,
    description: body.description,
  })
  res.json(idcategory)
});

categoryRoutes.delete("/:id", async (req: Request, res: Response) => {
  const categorySchema = z.object({
    id: z.number(),
  })
  const { id } = categorySchema.parse(req.params)
  await categoryDatabase.remove(id)
  res.status(201).send()
});


export default categoryRoutes;