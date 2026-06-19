"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ChevronDown, ArrowRight, Star } from "lucide-react";
import { TOOLS, CATEGORIES } from "@/data/tools";
import Icon from "@/components/Icon";
import AdPlaceholder from "@/components/AdPlaceholder";
import JsonLd, { generateFAQSchema } from "@/components/JsonLd";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Filter tools based on search and category
  const filteredTools = useMemo(() => {
    return TOOLS.filter((tool) => {
      const matchesCategory =
        selectedCategory === "all" || tool.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.searchKeywords.some((kw) =>
          kw.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Featured tools list
  const featuredTools = useMemo(() => {
    const featuredIds = ["compress-image", "qr-generator", "password-generator", "word-counter"];
    return TOOLS.filter((tool) => featuredIds.includes(tool.id));
  }, []);

  const homepageFaqs = [
    {
      question: "Apakah semua tool di Toolin gratis digunakan?",
      answer: "Ya, 100% gratis. Anda tidak perlu mendaftar akun, berlangganan, atau membayar biaya apa pun untuk mengakses seluruh fitur utilitas yang tersedia di Toolin.",
    },
    {
      question: "Bagaimana Toolin menjaga kerahasiaan data pengguna?",
      answer: "Kami menggunakan teknologi pemrosesan client-side (lokal di browser). Semua gambar yang Anda compress/resize, QR code yang Anda buat, sandi yang di-generate, atau teks yang Anda hitung diproses secara instan di perangkat Anda sendiri. Data tidak pernah dikirim atau disimpan di server kami.",
    },
    {
      question: "Dapatkah Toolin diakses melalui handphone?",
      answer: "Tentu saja. Toolin dirancang dengan prinsip Mobile-First. Tampilan website responsif dan berjalan sangat cepat baik di browser Android, iPhone, iPad, Tablet, maupun laptop/PC.",
    },
    {
      question: "Apakah file gambar saya akan dikompresi dengan watermark?",
      answer: "Tidak. Seluruh alat manipulasi gambar di Toolin bebas dari watermark. Anda dapat mengunduh hasil gambar berkualitas asli tanpa tambahan logo apa pun.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="space-y-12">
      {/* FAQ Schema for SEO */}
      <JsonLd data={generateFAQSchema(homepageFaqs)} />

      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-tr from-blue-600 via-blue-600 to-indigo-700 px-6 py-12 md:py-20 text-center text-white shadow-2xl">
        {/* Decorative Circles */}
        <div className="absolute -top-12 -left-12 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative max-w-3xl mx-auto space-y-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold tracking-wide uppercase backdrop-blur-sm">
            🚀 100% Gratis & Klien-Side
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Alat Utilitas Online Instan, Cepat & Aman
          </h1>
          <p className="text-sm md:text-base text-blue-100 max-w-xl mx-auto font-medium leading-relaxed">
            Selesaikan pekerjaan harian Anda seperti kompres foto, bikin QR code, resize gambar, buat kata sandi aman langsung di browser. Tanpa instal, tanpa upload file.
          </p>

          {/* Search Bar inside Hero */}
          <div className="relative max-w-xl mx-auto mt-8">
            <Search className="absolute top-3.5 left-4 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari tool yang Anda butuhkan (contoh: compress, qr, password)..."
              className="w-full rounded-2xl border-none bg-white py-3.5 pl-12 pr-4 text-sm md:text-base text-slate-800 outline-none shadow-lg placeholder:text-slate-400 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Google AdSense Top */}
      <AdPlaceholder id="homepage-top-adsense" type="adsense" size="horizontal" slot="1234567890" />

      {/* Categories & Filter Grid */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Semua Utility Tools
            </h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
              Pilih berdasarkan kategori untuk mempermudah pencarian alat bantu.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                selectedCategory === "all"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
              }`}
            >
              Semua ({TOOLS.length})
            </button>
            {CATEGORIES.map((cat) => {
              const count = TOOLS.filter((t) => t.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                    selectedCategory === cat.id
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                      : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Tools Display Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <Link
                key={tool.id}
                href={`/tools/${tool.slug}`}
                className="group relative flex flex-col rounded-2xl border border-blue-300/70 dark:border-blue-900/30 bg-blue-500/15 dark:bg-blue-950/30 p-6 shadow-sm hover:shadow-md hover:border-blue-500 dark:hover:border-blue-500/50 hover:bg-blue-500/25 dark:hover:bg-blue-950/50 transition-all"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                  <Icon name={tool.icon} className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {tool.name}
                </h3>
                <p className="mt-2 text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex-1">
                  {tool.description}
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400">
                  <span>Gunakan Alat</span>
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-12 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              Tidak ada tool yang cocok dengan pencarian Anda. Coba ganti kata kunci.
            </p>
          </div>
        )}
      </section>

      {/* Featured Tools Segment */}
      <section className="rounded-3xl border border-slate-200 dark:border-slate-800/60 bg-white dark:bg-slate-900/20 p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          <h2 className="text-lg md:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Alat Terpopuler Minggu Ini
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredTools.map((tool) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.slug}`}
              className="flex items-center gap-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-4 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                <Icon name={tool.icon} className="h-4.5 w-4.5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xs md:text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
                  {tool.name}
                </h3>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">
                  {tool.category === "image" ? "Gambar" : tool.category === "generator" ? "Generator" : "Teks"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ SEO Section */}
      <section className="space-y-6 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <h2 className="text-xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Pertanyaan Yang Sering Diajukan (FAQ)
          </h2>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
            Pelajari lebih lanjut mengenai privasi, kecepatan pemrosesan data, dan batasan penggunaan di platform Toolin.
          </p>
        </div>

        <div className="space-y-4">
          {homepageFaqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left font-bold text-slate-800 dark:text-slate-100 transition-colors"
                >
                  <span className="text-sm md:text-base">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-60 border-t border-slate-150 dark:border-slate-800" : "max-h-0"
                  }`}
                >
                  <p className="p-5 text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50/50 dark:bg-slate-950/20">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
