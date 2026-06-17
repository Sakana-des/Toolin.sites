import React from "react";
import { Metadata } from "next";
import { TOOLS } from "@/data/tools";
import ToolShell from "@/components/ToolShell";
import QrGeneratorClient from "./QrGeneratorClient";

const tool = TOOLS.find((t) => t.id === "qr-generator")!;

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

export default function QrGeneratorPage() {
  return (
    <ToolShell
      tool={tool}
      instructions={[
        "Ketik teks biasa, alamat email, nomor telepon, atau URL lengkap (termasuk http/https) pada kolom input.",
        "Atur warna latar depan (foreground) dan warna latar belakang (background) sesuai selera.",
        "Sesuaikan ukuran QR Code (dimensi piksel) dan tingkat Error Correction (koreksi kesalahan).",
        "Klik tombol 'Download PNG' atau 'Download SVG' untuk menyimpan hasil kode batang QR Anda."
      ]}
    >
      <QrGeneratorClient />
    </ToolShell>
  );
}
