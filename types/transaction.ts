export type TransactionInsert = {
  user_id: string;
  date: string;        // ISO string
  description: string;
  amount: number;
  category: string;
  month: string;       // YYYY-MM
};
