import { IUser } from "../utils/interface";
import { supabase } from "./supabase";
import { compare, hash } from 'bcrypt'

export function useUserDatabase() {

  async function list() {
    try {
      const { data, error } = await supabase.from('usuarios').select('*')
      if(error) {
        console.log(error)
      }
      return data
    } catch (error) {
      console.log(error)
    }
  }
  
  async function create(data: Omit<IUser, 'id'>) {
    const passwordHash = await hash(data.password, 8)
    try {
      const insertedRow = await supabase.from('usuarios').insert({
        name: data.name,
        user: data.user,
        password: passwordHash,
        kind: data.kind
      })
      return { insertedRow } 
    } catch(error) {
      console.log(error)
    }
  }

  async function update(data: IUser) {
    try {
      await supabase
      .from('usuarios')
      .update({
        name: data.name,
        user: data.user,
        password: data.password,
        kind: data.kind
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
      .from('usuarios')
      .delete()
      .eq('id', id)
      return
    } catch(error) {
      console.log(error)
    }
  }

  async function login(user: string, password: string) {
    try {
      const { data, error } = await supabase
      .from("usuarios")
      .select("user, password")
      .eq("user", user)
      .single();

    if (!data) {
      return ({ user: null, message: "Usuário não encontrado" });
    }

    const senhaCorreta = await compare(password, data.password);
    if (!senhaCorreta) {
      return ({ user: null, message: "Senha incorreta" });
    }
    
    return ({ user: data, message: "" });
  } catch (error) {
      console.log(error)
    }
  }

  return { list, create, update, remove, login }
}