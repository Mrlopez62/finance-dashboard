import { redirect } from "next/navigation";
import CsvUpload from "@/components/CsvUpload";
import { createServerSupabase } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createServerSupabase();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="mx-auto max-w-4xl space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Upload your transactions to see where your money goes.
        </p>
      </header>

      <section className="rounded-lg border bg-black p-4 shadow-sm">
        <h2 className="mb-2 text-lg font-medium">Upload transactions</h2>
        <CsvUpload />
      </section>

      <section className="rounded-lg border bg-black p-4 text-sm text-gray-400">
        Charts and insights coming next.
      </section>
    </main>
  );
}


