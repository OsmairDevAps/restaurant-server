import { ICommand } from "../utils/interface";
import { supabase } from "./supabase";

export function useCommandDatabase() {

  async function list() {
    try {
      const { data } = await supabase.from('mesas').select('*')
      return data
    } catch (error) {
      throw error
    }
  }

  async function create(data: Omit<ICommand, 'id'>) {
    try {
      const insertedRow = await supabase.from('mesas').insert({
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

  async function update(data: ICommand) {
    try {
      await supabase
      .from('mesas')
      .update({
        num: data.num,
        client: data.client,
        clientdoc: data.clientdoc,
        price: data.price,
        status: data.status
      })
      .eq('id', data.id)
      return 
    } catch(error) {
      throw error
    }
  }

  async function remove(id: number) {
    try {
      await supabase
      .from('mesas')
      .delete()
      .eq('id', id)
      return
    } catch(error) {
      throw error
    }
  }

  return { list, create, update, remove }
}