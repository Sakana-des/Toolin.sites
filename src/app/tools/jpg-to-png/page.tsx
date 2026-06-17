import React from "react";
import { Metadata } from "next";
import { TOOLS } from "@/data/tools";
import ToolShell from "@/components/ToolShell";
import JpgToPngClient from "./JpgToPngClient";

const tool = TOOLS.find((t) => t.id === "jpg-to-png")!;

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

export default function JpgToPngPage() {
  return (
    <ToolShell
      tool={tool}
      instructions={[
        "Pilih dan unggah satu atau beberapa berkas gambar JPG/JPEG Anda.",
        "Lihat pratinjau gambar JPG di panel upload.",
        "Klik tombol 'Convert & Download PNG' untuk mengubah dan mengunduh berkas.",
        "Format PNG hasil konversi tidak akan mengalami kompresi lossy sehingga kualitas tetap tajam."
      ]}
    >
      <JpgToPngClient />
    </ToolShell>
  );
}
