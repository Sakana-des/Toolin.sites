import React from "react";
import { Metadata } from "next";
import { TOOLS } from "@/data/tools";
import ToolShell from "@/components/ToolShell";
import PasswordGeneratorClient from "./PasswordGeneratorClient";

const tool = TOOLS.find((t) => t.id === "password-generator")!;

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

export default function PasswordGeneratorPage() {
  return (
    <ToolShell
      tool={tool}
      instructions={[
        "Atur panjang kata sandi (panjang yang direkomendasikan adalah 12-16 karakter).",
        "Pilih kriteria karakter yang ingin disertakan (Huruf Besar, Huruf Kecil, Angka, Simbol).",
        "Aktifkan opsi 'Hindari Karakter Serupa' (seperti o, 0, i, l, 1) agar sandi mudah dibaca jika diperlukan.",
        "Klik tombol 'Salin' untuk menyalin kata sandi acak yang aman ke clipboard Anda."
      ]}
    >
      <PasswordGeneratorClient />
    </ToolShell>
  );
}
