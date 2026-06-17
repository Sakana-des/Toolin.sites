import React from "react";
import { Metadata } from "next";
import { TOOLS } from "@/data/tools";
import ToolShell from "@/components/ToolShell";
import CompressImageClient from "./CompressImageClient";

const tool = TOOLS.find((t) => t.id === "compress-image")!;

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

export default function CompressImagePage() {
  return (
    <ToolShell
      tool={tool}
      instructions={[
        "Klik area drag-and-drop untuk mengunggah gambar JPG, JPEG, PNG, atau WEBP Anda.",
        "Sesuaikan tingkat kompresi kualitas gambar (default 80%) menggunakan slider di bawah gambar pratinjau.",
        "Lihat perkiraan ukuran file terkompresi secara real-time.",
        "Klik tombol 'Download' untuk mengunduh file gambar yang sudah berhasil diperkecil."
      ]}
    >
      <CompressImageClient />
    </ToolShell>
  );
}
