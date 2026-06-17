import React from "react";
import { Metadata } from "next";
import { TOOLS } from "@/data/tools";
import ToolShell from "@/components/ToolShell";
import UuidGeneratorClient from "./UuidGeneratorClient";

const tool = TOOLS.find((t) => t.id === "uuid-generator")!;

export const metadata: Metadata = {
  title: tool.seoTitle,
  description: tool.metaDescription,
  alternates: {
    canonical: `/tools/${tool.slug}`,
  },
  openGraph: {
    title: tool.seoTitle,
    description: tool.metaDescription,
    url: `https://toolin.com/tools/${tool.slug}`,
  },
};

export default function UuidGeneratorPage() {
  return (
    <ToolShell
      tool={tool}
      instructions={[
        "Tentukan jumlah UUID v4 yang ingin di-generate (maksimal 100).",
        "Pilih preferensi format UUID: gunakan Huruf Kapital (Uppercase), sertakan tanda hubung (Hyphens), atau gunakan tanda kurung kurawal (Braces).",
        "Klik tombol 'Generate UUID' untuk memicu pembuatan UUID acak baru.",
        "Gunakan tombol 'Copy all' untuk menyalin seluruh daftar UUID ke clipboard."
      ]}
    >
      <UuidGeneratorClient />
    </ToolShell>
  );
}
