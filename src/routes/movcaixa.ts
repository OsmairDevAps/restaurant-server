import { Router, Request, Response } from "express"
import { z } from 'zod'
import { useMovCaixaDatabase } from "../database/useMovCaixaDatabase" 

const movCaixaRoutes = Router()
const movCaixaDatabase = useMovCaixaDatabase()

movCaixaRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const movcaixa = await movCaixaDatabase.list()
    res.json(movcaixa)
  } catch (error) {
    console.log(error)      
  }
});

movCaixaRoutes.post("/", async (req: Request, res: Response) => {
  const movCaixaSchema = z.object({
    caixaid: z.number(),
    tipo: z.string(),
    descricao: z.string(),
    valor: z.number(),
  })
  const body = movCaixaSchema.parse(req.body)
  const idcaixa = await movCaixaDatabase.create({
    caixaid: body.caixaid,
    tipo: body.tipo,
    descricao: body.descricao,
    valor: body.valor,
  })
  res.json(idcaixa)
});

movCaixaRoutes.put("/", async (req: Request, res: Response) => {
  const movCaixaSchema = z.object({
    id: z.number(),
    caixaid: z.number(),
    tipo: z.string(),
    descricao: z.string(),
    valor: z.number(),
  })
  const body = movCaixaSchema.parse(req.body)
  await movCaixaDatabase.update({
    id: body.id,
    caixaid: body.caixaid,
    tipo: body.tipo,
    descricao: body.descricao,
    valor: body.valor,
  })
  res.status(201).send()
});

movCaixaRoutes.delete("/:id", async (req: Request, res: Response) => {
  const movCaixaSchema = z.object({
    id: z.number(),
  })
  const { id } = movCaixaSchema.parse(req.params)
  await movCaixaDatabase.remove(id)
  res.status(201).send()
});

export default movCaixaRoutes;