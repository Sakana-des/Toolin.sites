"use client";

import React, { useState, useEffect } from "react";
import { Copy, Check, RefreshCw, Hash, Download, Sparkles } from "lucide-react";

export default function UuidGeneratorClient() {
  const [quantity, setQuantity] = useState<number>(5);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [useHyphens, setUseHyphens] = useState<boolean>(true);
  const [useBraces, setUseBraces] = useState<boolean>(false);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);

  const generateUuids = () => {
    const list: string[] = [];
    
    for (let i = 0; i < quantity; i++) {
      let uuid = "";
      
      // Try using modern window.crypto.randomUUID
      if (typeof window !== "undefined" && window.crypto && window.crypto.randomUUID) {
        uuid = window.crypto.randomUUID();
      } else {
        // Fallback generator
        uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
          const r = (Math.random() * 16) | 0;
          const v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });
      }

      // Apply format options
      if (!useHyphens) {
        uuid = uuid.replace(/-/g, "");
      }
      
      if (uppercase) {
        uuid = uuid.toUpperCase();
      } else {
        uuid = uuid.toLowerCase();
      }

      if (useBraces) {
        uuid = `{${uuid}}`;
      }

      list.push(uuid);
    }
    
    setUuids(list);
  };

  useEffect(() => {
    generateUuids();
  }, [quantity, uppercase, useHyphens, useBraces]);

  const copyIndividual = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAll = () => {
    const text = uuids.join("\n");
    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const downloadTextFile = () => {
    const text = uuids.join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `toolin-uuids-${quantity}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Settings (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quantity selector */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-800 dark:text-slate-200">
              Jumlah UUID Dibuat (1 - 100)
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={quantity}
              onChange={(e) => setQuantity(Math.min(100, Math.max(1, Number(e.target.value))))}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-2.5 px-4 text-sm font-bold text-slate-900 dark:text-slate-100 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Formatting Checkboxes */}
          <div className="space-y-3 rounded-xl border border-slate-250 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10 p-4">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Pengaturan Format UUID
            </p>

            <label className="flex items-center gap-3 cursor-pointer text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-350">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-blue-650 focus:ring-blue-500"
              />
              <span>Gunakan Huruf Kapital (UPPERCASE)</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-350">
              <input
                type="checkbox"
                checked={useHyphens}
                onChange={(e) => setUseHyphens(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-blue-650 focus:ring-blue-500"
              />
              <span>Sertakan Tanda Hubung (Hyphens)</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-350">
              <input
                type="checkbox"
                checked={useBraces}
                onChange={(e) => setUseBraces(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-blue-650 focus:ring-blue-500"
              />
              <span>Kurung Kurawal {"{UUID}"}</span>
            </label>
          </div>

          <button
            onClick={generateUuids}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-650 hover:bg-blue-700 text-white font-bold py-2.5 px-4 shadow-md transition-colors text-xs sm:text-sm"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Generate Baru</span>
          </button>
        </div>

        {/* Output Area (7 cols) */}
        <div className="lg:col-span-7 flex flex-col rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 p-6">
          <div className="flex items-center justify-between gap-4 mb-4">
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Daftar UUID ({uuids.length})
            </p>
            {uuids.length > 0 && (
              <div className="flex gap-3">
                <button
                  onClick={copyAll}
                  className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {copiedAll ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>Salin Semua</span>
                </button>
                <button
                  onClick={downloadTextFile}
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:underline"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download .txt</span>
                </button>
              </div>
            )}
          </div>

          {/* List display */}
          <div className="flex-1 space-y-2 max-h-[350px] overflow-y-auto pr-1">
            {uuids.length > 0 ? (
              uuids.map((uuid, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-2.5 shadow-sm hover:border-slate-350 dark:hover:border-slate-700 transition-all font-mono"
                >
                  <span className="text-[11px] sm:text-xs font-semibold text-slate-800 dark:text-slate-100 select-all pr-2">
                    {uuid}
                  </span>
                  <button
                    onClick={() => copyIndividual(uuid, idx)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-650 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 dark:text-blue-400 transition-colors flex-shrink-0"
                    aria-label="Salin UUID"
                  >
                    {copiedIndex === idx ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-40 text-slate-400">
                <Hash className="h-10 w-10 animate-pulse mb-2" />
                <p className="text-xs">Masukkan jumlah lebih besar dari 0</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
