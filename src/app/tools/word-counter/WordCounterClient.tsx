"use client";

import React, { useState, useMemo } from "react";
import { Copy, Trash2, Check, FileText, Clock, BarChart2, Hash } from "lucide-react";

export default function WordCounterClient() {
  const [text, setText] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  // Compute text statistics
  const stats = useMemo(() => {
    const trimmed = text.trim();
    if (!trimmed) {
      return {
        words: 0,
        charsWithSpaces: 0,
        charsNoSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        readTimeMin: 0,
      };
    }

    const wordsArray = trimmed.split(/\s+/);
    const wordsCount = wordsArray.length;
    const charsWithSpaces = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;
    
    // Split sentences by punctuation: . ! ?
    const sentencesCount = trimmed.split(/[.!?]+/).filter(Boolean).length;
    
    // Split paragraphs by newlines
    const paragraphsCount = text.split(/\n+/).filter(Boolean).length;

    // Average reading speed: 200 words per minute
    const readTimeMin = Math.ceil(wordsCount / 200);

    return {
      words: wordsCount,
      charsWithSpaces,
      charsNoSpaces,
      sentences: sentencesCount,
      paragraphs: paragraphsCount,
      readTimeMin,
    };
  }, [text]);

  // Keyword Density Analysis
  const keywordDensity = useMemo(() => {
    const trimmed = text.trim();
    if (!trimmed) return [];

    // Clean text: remove punctuation, lowercase, split by words
    const cleanText = trimmed
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'\n]/g, " ")
      .replace(/\s+/g, " ");

    const words = cleanText.split(" ").filter((w) => w.length > 2); // only words with length > 2

    // Indonesian common stop words to filter out
    const stopWords = new Set([
      "yang", "dan", "di", "dari", "untuk", "dengan", "ke", "adalah", "ini", "itu",
      "pada", "atau", "juga", "saya", "kami", "kita", "mereka", "dia", "kamu", "akan",
      "bisa", "dapat", "ada", "telah", "oleh", "dalam", "serta", "karena", "bahwa", "jika",
      "oleh", "seperti", "bagi", "secara", "sudah", "hanya", "oleh", "tentang", "maka", "namun"
    ]);

    const filteredWords = words.filter((w) => !stopWords.has(w));

    // Count frequencies
    const freqMap: Record<string, number> = {};
    filteredWords.forEach((word) => {
      freqMap[word] = (freqMap[word] || 0) + 1;
    });

    // Convert to array and sort descending
    const densityList = Object.keys(freqMap).map((word) => ({
      word,
      count: freqMap[word],
      density: ((freqMap[word] / words.length) * 100).toFixed(1),
    }));

    return densityList.sort((a, b) => b.count - a.count).slice(0, 5); // top 5 keywords
  }, [text]);

  const copyText = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearText = () => {
    setText("");
  };

  return (
    <div className="space-y-6">
      {/* Stats counter top bar */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Jumlah Kata", val: stats.words, icon: <FileText className="h-4 w-4" /> },
          { label: "Karakter (Spasi)", val: stats.charsWithSpaces, icon: <Hash className="h-4 w-4" /> },
          { label: "Karakter (No Spasi)", val: stats.charsNoSpaces, icon: <Hash className="h-4 w-4" /> },
          { label: "Kalimat", val: stats.sentences, icon: <FileText className="h-4 w-4" /> },
          { label: "Paragraf", val: stats.paragraphs, icon: <FileText className="h-4 w-4" /> },
        ].map((item, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10 p-4 space-y-1 text-center"
          >
            <div className="flex items-center justify-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
              {item.icon}
              <span>{item.label}</span>
            </div>
            <p className="text-xl font-extrabold text-slate-800 dark:text-slate-100">{item.val}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Text Area (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Mulai mengetik atau paste artikel Anda di sini..."
              rows={12}
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-4 px-5 text-sm md:text-base font-medium text-slate-900 dark:text-slate-100 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-slate-400"
            />
          </div>

          <div className="flex gap-3 justify-end">
            <button
              onClick={clearText}
              disabled={!text}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-900 disabled:opacity-50 disabled:cursor-not-allowed py-2.5 px-4 text-xs font-bold text-slate-650 dark:text-slate-450 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              <span>Hapus Semua</span>
            </button>
            <button
              onClick={copyText}
              disabled={!text}
              className="flex items-center gap-1.5 rounded-xl bg-blue-650 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-bold py-2.5 px-6 text-xs sm:text-sm shadow-md transition-colors"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span>Salin Teks</span>
            </button>
          </div>
        </div>

        {/* Sidebar Info (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Read Time Info */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <Clock className="h-4 w-4 text-blue-600" />
              <span>Estimasi Waktu Baca</span>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">
                {stats.readTimeMin} menit
              </p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold mt-1">
                Berdasarkan kecepatan membaca rata-rata 200 kata/menit.
              </p>
            </div>
          </div>

          {/* Keyword Density Info */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 p-5 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-2">
              <BarChart2 className="h-4 w-4 text-blue-600" />
              <span>Kepadatan Kata (Keyword Density)</span>
            </div>

            {keywordDensity.length > 0 ? (
              <div className="space-y-3">
                {keywordDensity.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="font-bold text-slate-700 dark:text-slate-300">
                        {idx + 1}. &ldquo;{item.word}&rdquo;
                      </span>
                      <span className="text-slate-500">
                        {item.count}x ({item.density}%)
                      </span>
                    </div>
                    {/* Percent bar */}
                    <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500"
                        style={{ width: `${Math.min(100, Number(item.density) * 10)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-450 dark:text-slate-500 text-center py-4">
                Ketik teks di samping untuk menganalisis kepadatan kata kunci.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
