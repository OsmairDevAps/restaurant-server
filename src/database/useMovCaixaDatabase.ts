import { IMovCaixa } from "../utils/interface";
import { supabase } from "./supabase";

export function useMovCaixaDatabase() {

  async function list() {
    try {
      const { data, error } = await supabase.from('movimentacoescaixa').select('*')
      if(error) {
        console.log(error)
      }
      return data
    } catch (error) {
      console.log(error)
    }
  }
  
  async function create(data: Omit<IMovCaixa, 'id'>) {
    try {
      const insertedRow = await supabase.from('movimentacoescaixa').insert({
        caixaid: data.caixaid,
        tipo: data.tipo,
        descricao: data.descricao,
        valor: data.valor,
      })
      return { insertedRow } 
    } catch(error) {
      console.log(error)
    }
  }
  
  async function update(data: IMovCaixa) {
    try {
      await supabase
      .from('movimentacoescaixa')
      .update({
        caixaid: data.caixaid,
        tipo: data.tipo,
        descricao: data.descricao,
        valor: data.valor,
    })
      .eq('id', data.id)
      return
    } catch(error) {
      console.log(error)
    }
  }
  
  async function remove(id: number) {
    try {
      await supabase
      .from('movimentacoescaixa')
      .delete()
      .eq('id', id)
      return
    } catch(error) {
      console.log(error)
    }
  }

  return { list, create, update, remove }
}