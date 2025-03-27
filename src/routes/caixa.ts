import { Router, Request, Response } from "express"
import { z } from 'zod'
import { useCaixaDatabase } from "../database/useCaixaDatabase" 

const caixaRoutes = Router()
const caixaDatabase = useCaixaDatabase()

caixaRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const caixas = await caixaDatabase.list()
    res.json(caixas)
  } catch (error) {
    console.log(error)      
  }
});

caixaRoutes.post("/", async (req: Request, res: Response) => {
  const caixaSchema = z.object({
    usuario: z.string(),
    situacao: z.string(),
    dataabertura: z.string(),
    datafechamento: z.string(),
    saldoinicial: z.number(),
    saldofinal: z.number(),
  })
  const body = caixaSchema.parse(req.body)
  try {
    const idcaixa = await caixaDatabase.create({
      usuario: body.usuario,
      situacao: body.situacao,
      dataabertura: new Date(body.dataabertura),
      datafechamento: new Date(body.datafechamento),
      saldoinicial: body.saldoinicial,
      saldofinal: body.saldofinal,
    })
    res.json(idcaixa)
  } catch (error) {
    res.json(error)    
  }
});

caixaRoutes.post('/abrecaixa', async (req: Request, res: Response) => {
  const caixaSchema = z.object({
    usuario: z.string(),
    saldoinicial: z.string(),
  })
  try {
    const body = caixaSchema.parse(req.body)
    const response = await caixaDatabase.abreCaixa({
      usuario: body.usuario,
      saldoinicial: Number(body.saldoinicial),
    })
    res.status(200).send(response)
  } catch (error) {
    res.send(error)
  }
}) 

caixaRoutes.post('/fechacaixa', async (req: Request, res: Response) => {
  try {
    const response = await caixaDatabase.fechaCaixa()
    res.status(200).send(response)
  } catch (error) {
    res.send(error)
  }
})

caixaRoutes.post('/reforcocaixa', async (req: Request, res: Response) => {
  const caixaSchema = z.object({
    descricao: z.string(),
    valor: z.string(),
  })
  try {
    const body = caixaSchema.parse(req.body)
    const response = await caixaDatabase.reforcoCaixa({
      descricao: body.descricao,
      valor: Number(body.valor),
    })
    res.status(200).send(response)
  } catch (error) {
    res.send(error)
  }
})

caixaRoutes.put("/", async (req: Request, res: Response) => {
  const caixaSchema = z.object({
    id: z.number(),
    usuario: z.string(),
    situacao: z.string(),
    dataabertura: z.string(),
    datafechamento: z.string(),
    saldoinicial: z.number(),
    saldofinal: z.number(),
  })
  const body = caixaSchema.parse(req.body)
  await caixaDatabase.update({
    id: body.id,
    usuario: body.usuario,
    situacao: body.situacao,
    dataabertura: new Date(body.dataabertura),
    datafechamento: new Date(body.datafechamento),
    saldoinicial: body.saldoinicial,
    saldofinal: body.saldofinal,
  })
  res.status(201).send()
});

caixaRoutes.delete("/:id", async (req: Request, res: Response) => {
  const caixaSchema = z.object({
    id: z.number(),
  })
  const { id } = caixaSchema.parse(req.params)
  await caixaDatabase.remove(id)
  res.status(201).send()
});

export default caixaRoutes;