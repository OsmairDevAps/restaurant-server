import { ICategory } from "../utils/interface";
import { supabase } from "./supabase";

export function useCategoryDatabase() {

  async function create(data: Omit<ICategory, 'id'>) {
    try {
      const insertedRow = await supabase.from('categories').insert({
        num: data.description,
      })
      return { insertedRow } 
    } catch(error) {
      console.log(error)
    }
  }

  async function list() {
    try {
      const { data, error } = await supabase.from('categories').select('*')
      if(error) {
        console.log(error)
      }
      return data
    } catch (error) {
      console.log(error)
    }
  }

  return { create, list }
}