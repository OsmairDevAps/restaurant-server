import { ICommandItem } from "../utils/interface";
import { supabase } from "./supabase";

export function useCommandItemDatabase() {

  async function list() {
    try {
      const { data, error } = await supabase
      .from('itensmesa')
      .select('*')
      if(error) {
        console.log(error)
      }
      return data
    } catch (error) {
      console.log(error)
    }
  }
  
  async function create(data: Omit<ICommandItem, 'id'>) {
    try {
      const insertedRow = await supabase
      .from('itensmesa')
      .insert({
        idtable: data.idtable,
        category: data.category,
        product: data.product,
        amount: data.amount,
        price: data.price
      })
      return { insertedRow } 
    } catch(error) {
      console.log(error)
    }
  }
  
  async function update(data: ICommandItem) {
    try {
      await supabase
      .from('itensmesa')
      .update({
        idtable: data.idtable,
        category: data.category,
        product: data.product,
        amount: data.amount,
        price: data.price
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
      .from('itensmesa')
      .delete()
      .eq('id', id)
      return
    } catch(error) {
      console.log(error)
    }
  }

  return { list, create, update, remove }
}