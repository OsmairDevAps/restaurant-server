import { IProduct } from "../utils/interface";
import { supabase } from "./supabase";

export function useProductDatabase() {

  async function list() {
    try {
      const { data, error } = await supabase
      .from('produtos')
      .select('*')
      if(error) {
        console.log(error)
      }
      return data
    } catch (error) {
      console.log(error)
    }
  }
  
  async function create(data: Omit<IProduct, 'id'>) {
    try {
      const insertedRow = await supabase
      .from('produtos')
      .insert({
        categoryid: data.categoryid,
        name: data.name,
        price: data.price
      })
      return { insertedRow } 
    } catch(error) {
      console.log(error)
    }
  }
  
  async function update(data: IProduct) {
    try {
      await supabase
      .from('produtos')
      .update({
        categoryid: data.categoryid,
        name: data.name,
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
      .from('produtos')
      .delete()
      .eq('id', id)
      return
    } catch(error) {
      console.log(error)
    }
  }

  return { list, create, update, remove }
}