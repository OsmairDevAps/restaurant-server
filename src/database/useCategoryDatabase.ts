import { ICategory } from "../utils/interface";
import { supabase } from "./supabase";

export function useCategoryDatabase() {

  async function list() {
    try {
      const { data, error } = await supabase.from('categorias').select('*')
      if(error) {
        console.log(error)
      }
      return data
    } catch (error) {
      console.log(error)
    }
  }
  
  async function create(data: Omit<ICategory, 'id'>) {
    try {
      const insertedRow = await supabase.from('categorias').insert({
        description: data.description,
      })
      return { insertedRow } 
    } catch(error) {
      console.log(error)
    }
  }
  
  async function update(data: ICategory) {
    try {
      await supabase
      .from('categorias')
      .update({
        description: data.description,
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
      .from('categorias')
      .delete()
      .eq('id', id)
      return
    } catch(error) {
      console.log(error)
    }
  }

  return { list, create, update, remove }
}