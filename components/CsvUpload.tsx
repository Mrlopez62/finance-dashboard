"use client";

import { useState } from "react";
import { uploadCsv } from "@/lib/actions/uploadCsv";

export default function CsvUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    const result = await uploadCsv(formData);

    if (result?.error) {
      setError(result.error);
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button
        type="submit"
        disabled={!file || loading}
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        {loading ? "Uploading..." : "Upload CSV"}
      </button>

      {error && <p className="text-red-600 text-sm">{error}</p>}
    </form>
  );
}
