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
  idtable: number;
  category: string;
  product: string;
  amount: number;
  price: number;
}
