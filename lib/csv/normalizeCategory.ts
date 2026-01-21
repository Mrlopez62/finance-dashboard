const CATEGORY_RULES: Record<string, string> = {
  spotify: "Entertainment",
  netflix: "Entertainment",
  uber: "Transport",
  lyft: "Transport",
  walmart: "Groceries",
  target: "Groceries",
  amazon: "Shopping",
  doordash: "Food",
  grubhub: "Food",
};

export function normalizeCategory(description: string): string {
  const lower = description.toLowerCase();

  for (const keyword in CATEGORY_RULES) {
    if (lower.includes(keyword)) {
      return CATEGORY_RULES[keyword];
    }
  }

  return "Other";
}
