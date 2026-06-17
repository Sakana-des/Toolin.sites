import React from "react";
import { Metadata } from "next";
import { TOOLS } from "@/data/tools";
import ToolShell from "@/components/ToolShell";
import CropImageClient from "./CropImageClient";

const tool = TOOLS.find((t) => t.id === "crop-image")!;

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

export default function CropImagePage() {
  return (
    <ToolShell
      tool={tool}
      instructions={[
        "Unggah gambar PNG, JPG, atau WEBP yang ingin dipotong (crop).",
        "Pilih aspek rasio pemotongan (1:1, 16:9, 4:3, atau bebas).",
        "Geser dan sesuaikan kotak area pemotongan di layar pratinjau.",
        "Klik tombol 'Crop & Download' untuk memotong dan mengunduh hasilnya."
      ]}
    >
      <CropImageClient />
    </ToolShell>
  );
}
