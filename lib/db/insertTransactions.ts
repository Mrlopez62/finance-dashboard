import { createServerSupabase } from "@/lib/supabase/server";
import { TransactionInsert } from "@/types/transaction";

export async function insertTransactions(
  transactions: Omit<TransactionInsert, "user_id">[]
) {
  const supabase = await createServerSupabase();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (!user || authError) {
    throw new Error("Unauthorized");
  }

  const rows: TransactionInsert[] = transactions.map((t) => ({
    ...t,
    user_id: user.id,
  }));

  const { error } = await supabase
    .from("transactions")
    .insert(rows);

  if (error) {
    console.error("Insert error:", error);
    throw new Error("Failed to insert transactions");
  }
}
