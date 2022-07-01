import { Transaction } from '../models/transaction';

export const TRANSACTIONS: Transaction[] = [{
  amount: 300,
  currency: 'EUR',
  type: 'Expanses',
  parent_id: 42
},
  {
    amount: 500,
    currency: 'EUR',
    type: 'Expanses',
    parent_id: 49
  },
{
  amount: 100,
  currency: 'EUR',
  type: 'Restaurant',
  parent_id: 43
},
{
  amount: 200,
  currency: 'USD',
  type: 'Bank',
  parent_id: 44
},
{
  amount: 150,
  currency: 'EUR',
  type: 'Shops',
  parent_id: 45
},
{
  amount: 500,
  currency: 'USD',
  type: 'Expanses',
  parent_id: 46
},
{
  amount: 400,
  currency: 'EUR',
  type: 'Shops',
  parent_id: 47
},
{
  amount: 800,
  currency: 'USD',
  type: 'Bank',
  parent_id: 48
}]
