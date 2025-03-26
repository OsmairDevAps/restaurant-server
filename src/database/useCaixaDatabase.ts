import { ICaixa } from "../utils/interface";
import { supabase } from "./supabase";

export function useCaixaDatabase() {

  async function list() {
    try {
      const { data, error } = await supabase.from('caixas').select('*')
      if(error) {
        console.log(error)
      }
      return data
    } catch (error) {
      console.log(error)
    }
  }
  
  async function create(data: Omit<ICaixa, 'id'>) {
    try {
      const insertedRow = await supabase.from('caixas').insert({
        usuario: data.usuario,
        situacao: data.situacao,
        dataabertura: data.dataabertura,
        datafechamento: data.datafechamento,
        saldoinicial: data.saldoinicial,
        saldofinal: data.saldofinal,
      })
      return { insertedRow } 
    } catch(error) {
      console.log(error)
    }
  }
  
  async function update(data: ICaixa) {
    try {
      await supabase
      .from('caixas')
      .update({
        usuario: data.usuario,
        situacao: data.situacao,
        dataabertura: data.dataabertura,
        datafechamento: data.datafechamento,
        saldoinicial: data.saldoinicial,
        saldofinal: data.saldofinal,
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
      .from('caixas')
      .delete()
      .eq('id', id)
      return
    } catch(error) {
      console.log(error)
    }
  }

  return { list, create, update, remove }
}