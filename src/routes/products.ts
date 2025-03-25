import { Router, Request, Response } from "express"
import { z } from 'zod'
import { useProductDatabase } from "../database/useProductDatabase" 

const productRoutes = Router()
const productDatabase = useProductDatabase()

productRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const products = await productDatabase.list()
    res.json(products)
  } catch (error) {
    console.log(error)      
  }
});

productRoutes.post("/", async (req: Request, res: Response) => {
  const productSchema = z.object({
    categoryid: z.number(),
    name: z.string(),
    price: z.number(),
  })
  const body = productSchema.parse(req.body)
  const idProduct = await productDatabase.create({
    categoryid: body.categoryid,
    name: body.name,
    price: body.price,
  })
  res.json(idProduct)
});

productRoutes.put("/", async (req: Request, res: Response) => {
  const productSchema = z.object({
    id: z.number(),
    categoryid: z.number(),
    name: z.string(),
    price: z.number(),
  })
  const body = productSchema.parse(req.body)
  await productDatabase.update({
    id: body.id,
    categoryid: body.categoryid,
    name: body.name,
    price: body.price,
  })
  res.status(201).send()
});

productRoutes.delete("/:id", async (req: Request, res: Response) => {
  const productSchema = z.object({
    id: z.number(),
  })
  const { id } = productSchema.parse(req.params)
  await productDatabase.remove(id)
  res.status(201).send()
});

export default productRoutes;