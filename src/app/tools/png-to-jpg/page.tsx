import React from "react";
import { Metadata } from "next";
import { TOOLS } from "@/data/tools";
import ToolShell from "@/components/ToolShell";
import PngToJpgClient from "./PngToJpgClient";

const tool = TOOLS.find((t) => t.id === "png-to-jpg")!;

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

export default function PngToJpgPage() {
  return (
    <ToolShell
      tool={tool}
      instructions={[
        "Pilih dan unggah satu atau beberapa berkas gambar PNG Anda.",
        "Lihat pratinjau gambar PNG di panel upload.",
        "Klik tombol 'Convert & Download JPG' untuk mengubah dan mengunduh berkas.",
        "Transparansi pada file PNG asli Anda akan diubah otomatis menjadi latar belakang berwarna putih."
      ]}
    >
      <PngToJpgClient />
    </ToolShell>
  );
}
