export interface Transaction {
  amount: number;
  currency: string;
  type: string;
  parent_id?: number
}
