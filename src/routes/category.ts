import { Router, Request, Response } from "express"
import { z } from 'zod'
import { useCategoryDatabase } from "../database/useCategoryDatabase"

const categoryRoutes = Router()
const categoryDatabase = useCategoryDatabase()

categoryRoutes.get("/", (req: Request, res: Response) => {
  try {
    const categories = categoryDatabase.list()
    res.json(categories)
  } catch (error) {
    console.log(error)      
  }
});

categoryRoutes.post("/", (req: Request, res: Response) => {
  const categorySchema = z.object({
    description: z.string(),
  })
  const body = categorySchema.parse(req.body)
  const idcategory = categoryDatabase.create({
    description: body.description
  })
  res.json(idcategory)
});


export default categoryRoutes;