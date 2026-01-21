import { normalizeCategory } from "./normalizeCategory";
import type { TransactionInsert } from "@/types/transaction";

type ParsedTransaction = Omit<TransactionInsert, "user_id">;

export function parseCsv(csvText: string): ParsedTransaction[] {
  const lines = csvText.split("\n").filter(Boolean);
  const [header, ...rows] = lines;

  const headers = header.split(",").map(h => h.trim().toLowerCase());

  const dateIndex = headers.findIndex(h => h.includes("date"));
  const descIndex = headers.findIndex(h => h.includes("description"));
  const amountIndex = headers.findIndex(h => h.includes("amount"));

  if (dateIndex === -1 || descIndex === -1 || amountIndex === -1) {
    throw new Error("CSV must include date, description, and amount columns");
  }

  return rows.map(row => {
    const cols = row.split(",");

    const description = cols[descIndex].trim();
    const amount = parseFloat(cols[amountIndex]);
    const date = new Date(cols[dateIndex]);
    const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

    return {
      date: date.toISOString(),
      description,
      amount,
      category: normalizeCategory(description),
      month,
    };
  });
}
