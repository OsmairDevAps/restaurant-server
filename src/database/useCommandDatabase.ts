import { ICommand } from "../utils/interface";
import { supabase } from "./supabase";

export function useCommandDatabase() {

  async function create(data: Omit<ICommand, 'id'>) {
    try {
      const insertedRow = await supabase.from('command').insert({
        num: data.num,
        client: data.client,
        clientdoc: data.clientdoc,
        price: data.price,
        status: data.status
      })
      return { insertedRow } 
    } catch(error) {
      throw error
    }
  }

  async function list() {
    try {
      const { data } = await supabase.from('command').select('*')
      return data
    } catch (error) {
      throw error
    }
  }

  return { create, list }
}