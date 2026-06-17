"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Cpu, Send, Check } from "lucide-react";
import { TOOLS } from "@/data/tools";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  // Group tools for quick links
  const imageTools = TOOLS.filter((tool) => tool.category === "image").slice(0, 5);
  const generatorTools = TOOLS.filter((tool) => tool.category === "generator");

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-slate-200/45 dark:bg-slate-950 transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo & Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900 dark:text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-md shadow-blue-500/20">
                <Cpu className="h-4.5 w-4.5" />
              </span>
              <span>
                Tool<span className="text-blue-600 dark:text-blue-500">in</span>
              </span>
            </Link>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Penyedia web utility tools gratis, cepat, dan aman. Semua pemrosesan data, gambar, dan sandi dilakukan 100% secara lokal di browser Anda. Privasi terjamin.
            </p>
            {/* Newsletter */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Dapatkan Update Tool Baru
              </h3>
              <form onSubmit={handleSubscribe} className="relative max-w-xs flex gap-2">
                <input
                  type="email"
                  placeholder="Ketik email Anda..."
                  className="flex-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-1.5 px-3 text-xs outline-none focus:border-blue-500 dark:focus:border-blue-600"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                  aria-label="Subscribe"
                >
                  {subscribed ? <Check className="h-4 w-4" /> : <Send className="h-4 w-4" />}
                </button>
              </form>
              {subscribed && (
                <p className="text-[10px] text-green-600 dark:text-green-400 font-medium">
                  Terima kasih! Email Anda telah terdaftar.
                </p>
              )}
            </div>
          </div>

          {/* Quick Links - Image Tools */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Alat Gambar
            </h3>
            <ul className="space-y-2 text-xs md:text-sm font-medium text-slate-600 dark:text-slate-400">
              {imageTools.map((tool) => (
                <li key={tool.id}>
                  <Link href={`/tools/${tool.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links - Generator Tools */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Alat Generator
            </h3>
            <ul className="space-y-2 text-xs md:text-sm font-medium text-slate-600 dark:text-slate-400">
              {generatorTools.map((tool) => (
                <li key={tool.id}>
                  <Link href={`/tools/${tool.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {tool.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/tools/word-counter" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Word Counter
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links - Information & Blog */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Informasi & Legal
            </h3>
            <ul className="space-y-2 text-xs md:text-sm font-medium text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/blog" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Blog SEO
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Ketentuan Layanan
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Hubungi Kami
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-center text-xs text-slate-400 dark:text-slate-500">
            &copy; {new Date().getFullYear()} Toolin. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-[10px] text-slate-400 dark:text-slate-500 max-w-md leading-relaxed text-right md:text-right">
            Disclaimer: Toolin tidak memproses data Anda di server. Semua konversi gambar, penghitung kata, dan generator berjalan 100% lokal di browser Anda.
          </div>
        </div>
      </div>
    </footer>
  );
}
