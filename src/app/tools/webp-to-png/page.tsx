import React from "react";
import { Metadata } from "next";
import { TOOLS } from "@/data/tools";
import ToolShell from "@/components/ToolShell";
import WebpToPngClient from "./WebpToPngClient";

const tool = TOOLS.find((t) => t.id === "webp-to-png")!;

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

export default function WebpToPngPage() {
  return (
    <ToolShell
      tool={tool}
      instructions={[
        "Pilih dan unggah satu atau beberapa berkas gambar WEBP Anda.",
        "Lihat pratinjau gambar WEBP di panel upload.",
        "Klik tombol 'Convert & Download PNG' untuk mengubah dan mengunduh berkas.",
        "Proses konversi sepenuhnya offline dan akan menjaga transparansi alpha channel gambar asli."
      ]}
    >
      <WebpToPngClient />
    </ToolShell>
  );
}
