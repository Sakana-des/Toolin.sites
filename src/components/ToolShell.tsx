import React from "react";
import { Tool } from "@/data/tools";
import Breadcrumb from "@/components/Breadcrumb";
import AdPlaceholder from "@/components/AdPlaceholder";
import JsonLd, {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateSoftwareAppSchema,
} from "@/components/JsonLd";
import { ChevronDown, CheckCircle2 } from "lucide-react";

interface ToolShellProps {
  tool: Tool;
  children: React.ReactNode;
  instructions?: string[];
}

export default function ToolShell({
  tool,
  children,
  instructions = [
    "Unggah file atau masukkan input yang diperlukan pada kotak di bawah.",
    "Sesuaikan pengaturan parameter sesuai kebutuhan Anda.",
    "Klik tombol aksi untuk menjalankan proses secara instan.",
    "Unduh hasil akhir secara gratis tanpa watermark.",
  ],
}: ToolShellProps) {
  const breadcrumbItems = [
    { name: tool.category === "image" ? "Image Tools" : tool.category === "generator" ? "Generators" : "Text & Counters", item: `/?cat=${tool.category}` },
    { name: tool.name, item: `/tools/${tool.slug}` },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Dynamic SEO JSON-LD Schemas */}
      <JsonLd data={generateBreadcrumbSchema(breadcrumbItems)} />
      <JsonLd
        data={generateSoftwareAppSchema({
          name: tool.name,
          description: tool.description,
          url: `/tools/${tool.slug}`,
          category: tool.category === "image" ? "ImageManipulation" : "Utility",
        })}
      />
      {tool.faqs.length > 0 && <JsonLd data={generateFAQSchema(tool.faqs)} />}

      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Tool Header */}
      <div className="space-y-2 max-w-3xl">
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {tool.name}
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          {tool.description}
        </p>
      </div>

      {/* Adsterra Top Banner */}
      <AdPlaceholder
        id={`${tool.id}-top-adsterra`}
        type="adsterra"
        size="horizontal"
      />

      {/* Main Interactive Tool Container */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 md:p-8 shadow-sm">
        {children}
      </section>

      {/* Instruction Steps */}
      <section className="rounded-2xl border border-blue-200/60 dark:border-blue-900/20 bg-blue-500/5 dark:bg-blue-950/10 p-6 md:p-8 space-y-4">
        <h2 className="text-base md:text-lg font-bold text-slate-900 dark:text-white">
          Cara Menggunakan Alat Ini:
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {instructions.map((step, idx) => (
            <li key={idx} className="flex gap-3 text-xs md:text-sm text-slate-650 dark:text-slate-400 leading-relaxed">
              <CheckCircle2 className="h-5 w-5 text-blue-650 dark:text-blue-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong className="text-slate-800 dark:text-slate-200 block">Langkah {idx + 1}</strong>
                {step}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Adsterra Ads Bottom */}
      <AdPlaceholder id={`${tool.id}-bottom-adsterra`} type="adsterra" size="responsive" />

      {/* Dynamic FAQs Section */}
      {tool.faqs.length > 0 && (
        <section className="space-y-4 max-w-3xl">
          <h2 className="text-base md:text-lg font-bold text-slate-900 dark:text-white">
            FAQ - Pertanyaan Umum {tool.name}
          </h2>
          <div className="space-y-3">
            {tool.faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-4 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-slate-800 dark:text-slate-100 text-xs md:text-sm">
                  <span>{faq.question}</span>
                  <ChevronDown className="h-4 w-4 text-slate-400 group-open:-rotate-180 transition-transform duration-200" />
                </summary>
                <p className="mt-3 text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
