import { IAbreCaixa, ICaixa, IReforcoCaixa } from "../utils/interface";
import { supabase } from "./supabase";

export function useCaixaDatabase() {

  async function abreCaixa(aberturaData: IAbreCaixa) {
    // Verifica se já existe um caixa aberto
    const { data: caixaAberto } = await supabase
      .from("caixas")
      .select("*")
      .is("datafechamento", null)
      .single();

    if (caixaAberto) {
      return ({ error: "Já existe um caixa aberto" });
    }
    // Cria um novo registro de caixa
    const { data, error } = await supabase
      .from("caixas")
      .insert({
        usuario: aberturaData.usuario,
        situacao: '1',
        dataabertura: new Date(),
        saldoinicial: aberturaData.saldoinicial,
      })
      .select()
      .single();
    if (error) return ({ error: error.message });
    return (data)
  }

  async function fechaCaixa() {
    const { data: caixa } = await supabase
    .from("caixas")
    .select("*")
    .is("datafechamento", null)
    .single();
    if (!caixa) return ({ error: "Nenhum caixa aberto" });
    
    // Soma todas as movimentações do caixa atual
    const { data: movimentacoes } = await supabase
      .from("movimentacoescaixa")
      .select("tipo, valor")
      .eq("caixaid", caixa.id);
    
      // Calcula o saldo final
    let saldo_final = caixa.saldo_inicial;
    if (movimentacoes) {
      movimentacoes.forEach(mov => {
        if (mov.tipo === "venda" || mov.tipo === "reforco") {
          saldo_final += mov.valor;
        } else if (mov.tipo === "retirada") {
          saldo_final -= mov.valor;
        }
      });
    }
    
    // Fecha o caixa
    const { error } = await supabase
      .from("caixas")
      .update({ saldo_final, fechado_em: new Date() })
      .eq("id", caixa.id);
    if (error) return ({ error: error.message });
    return ({ message: "Caixa fechado com sucesso!", saldo_final });
  }

  async function reforcoCaixa(reforcoData: IReforcoCaixa) {
   // Busca o caixa aberto
    const { data: caixa } = await supabase
      .from("caixas")
      .select("id")
      .is("datafechamento", null)
      .single();

    if (!caixa) return ({ error: "Nenhum caixa aberto" });

    // Registra o reforço no caixa
    const { data, error } = await supabase
      .from("movimentacoescaixa")
      .insert({
        caixaid: caixa.id,
        tipo: 'reforco',
        descricao: reforcoData.descricao,
        valor: reforcoData.valor,
      })
      .select()
      .single();

    if (error) return ({ error: error.message });

    return (data);
  }

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

  return { abreCaixa, reforcoCaixa, fechaCaixa, list, create, update, remove }
}