"use server";

import { parseCsv } from "@/lib/csv/parseCsv";
import { insertTransactions } from "@/lib/db/insertTransactions";
import { createServerSupabase } from "@/lib/supabase/server";

export async function uploadCsv(formData: FormData) {
  const file = formData.get("file") as File | null;
  if (!file) return { error: "No file uploaded" };

  const supabase = await createServerSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Unauthorized" };

  const text = await file.text();

  // Parse CSV WITHOUT user_id
  const transactions = parseCsv(text);

  // Insert with user_id added on server
  await insertTransactions(transactions);

  return { success: true };
}

