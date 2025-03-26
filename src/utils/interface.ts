export interface IUser {
  id: number;
  name: string;
  user: string;
  password: string;
  kind: string;
}

export interface ICaixa {
  id: number;
  usuario: string;
  situacao: string;
  dataabertura: Date;
  datafechamento: Date;
  saldoinicial: number;
  saldofinal: number;
}

export interface IMovCaixa {
  id: number;
  caixaid: number;
  tipo: string;         // (venda, reforco, retirada)
  descricao: string;    // (commanda, reforco, etc)
  valor: number;
}

export interface ICategory {
  id: number;
  description: string;
}

export interface IProduct {
  id: number;
  categoryid: number;
  name: string;
  price: number;
}

export interface ICommand {
  id: number;
  num: number;
  client: string;
  clientdoc: string;
  price: number;
  status: string;
}

export interface ICommandItem {
  id: number;
  idtable: number;
  category: string;
  product: string;
  amount: number;
  price: number;
}
