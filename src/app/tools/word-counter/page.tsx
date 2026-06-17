import React from "react";
import { Metadata } from "next";
import { TOOLS } from "@/data/tools";
import ToolShell from "@/components/ToolShell";
import WordCounterClient from "./WordCounterClient";

const tool = TOOLS.find((t) => t.id === "word-counter")!;

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

export default function WordCounterPage() {
  return (
    <ToolShell
      tool={tool}
      instructions={[
        "Ketik teks secara manual atau tempel (paste) artikel Anda ke dalam kotak teks utama.",
        "Lihat data statistik teks (Jumlah Kata, Karakter, Kalimat, Paragraf, dan Waktu Baca) secara real-time.",
        "Periksa analisis Kepadatan Kata Kunci (Keyword Density) di panel samping untuk melihat kata apa yang paling sering muncul.",
        "Gunakan tombol 'Salin' untuk menyalin seluruh teks, atau 'Hapus' untuk membersihkan area kerja."
      ]}
    >
      <WordCounterClient />
    </ToolShell>
  );
}
