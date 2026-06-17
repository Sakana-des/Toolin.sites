import React from "react";
import { Metadata } from "next";
import { TOOLS } from "@/data/tools";
import ToolShell from "@/components/ToolShell";
import ResizeImageClient from "./ResizeImageClient";

const tool = TOOLS.find((t) => t.id === "resize-image")!;

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

export default function ResizeImagePage() {
  return (
    <ToolShell
      tool={tool}
      instructions={[
        "Unggah berkas foto JPG, PNG, atau WEBP yang ingin di-resize.",
        "Masukkan dimensi lebar (width) dan tinggi (height) baru dalam satuan piksel.",
        "Aktifkan/nonaktifkan kunci rasio aspek sesuai keperluan Anda (misal untuk ukuran pas foto 3x4).",
        "Klik tombol 'Resize & Download' untuk mengunduh gambar berukuran baru."
      ]}
    >
      <ResizeImageClient />
    </ToolShell>
  );
}
