"use client";

import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import { Download, RefreshCw, QrCode, Paintbrush, Sliders } from "lucide-react";

export default function QrGeneratorClient() {
  const [text, setText] = useState<string>("https://toolin.com");
  const [size, setSize] = useState<number>(300);
  const [fgColor, setFgColor] = useState<string>("#000000");
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [errorLevel, setErrorLevel] = useState<"L" | "M" | "Q" | "H">("M");
  const [pngDataUrl, setPngDataUrl] = useState<string>("");
  const [svgString, setSvgString] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQRCode = async () => {
    if (!text.trim()) {
      setPngDataUrl("");
      setSvgString("");
      return;
    }

    try {
      // 1. Draw to canvas for preview & PNG download
      if (canvasRef.current) {
        await QRCode.toCanvas(canvasRef.current, text, {
          width: size,
          margin: 2,
          color: {
            dark: fgColor,
            light: bgColor,
          },
          errorCorrectionLevel: errorLevel,
        });
        
        // Save PNG URL
        setPngDataUrl(canvasRef.current.toDataURL("image/png"));
      }

      // 2. Generate SVG string for vector download
      const svg = await QRCode.toString(text, {
        type: "svg",
        width: size,
        margin: 2,
        color: {
          dark: fgColor,
          light: bgColor,
        },
        errorCorrectionLevel: errorLevel,
      });
      setSvgString(svg);
    } catch (err) {
      console.error("Gagal men-generate QR Code:", err);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      generateQRCode();
    }, 200); // Debounce typing
    return () => clearTimeout(timer);
  }, [text, size, fgColor, bgColor, errorLevel]);

  const downloadPNG = () => {
    if (!pngDataUrl) return;
    const link = document.createElement("a");
    link.href = pngDataUrl;
    link.download = "toolin-qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadSVG = () => {
    if (!svgString) return;
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "toolin-qrcode.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setText("https://toolin.com");
    setSize(300);
    setFgColor("#000000");
    setBgColor("#ffffff");
    setErrorLevel("M");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Settings (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Input text */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-800 dark:text-slate-200">
              Isi QR Code (Teks atau URL)
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Ketikkan teks atau tempel link di sini..."
              rows={4}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-2.5 px-4 text-sm font-medium text-slate-900 dark:text-slate-100 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Color Selection */}
          <div className="space-y-4 rounded-xl border border-slate-250 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10 p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <Paintbrush className="h-3.5 w-3.5" />
              <span>Desain & Warna</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold">Warna QR (Dark)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="h-8 w-10 border-0 rounded cursor-pointer"
                  />
                  <span className="font-mono text-xs text-slate-500 uppercase">{fgColor}</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold">Warna Latar (Light)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="h-8 w-10 border-0 rounded cursor-pointer"
                  />
                  <span className="font-mono text-xs text-slate-500 uppercase">{bgColor}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Custom specifications */}
          <div className="space-y-4 rounded-xl border border-slate-250 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10 p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <Sliders className="h-3.5 w-3.5" />
              <span>Pengaturan Lanjutan</span>
            </div>

            {/* Sizes */}
            <div className="space-y-1">
              <label className="text-xs font-semibold">Ukuran Hasil (Size)</label>
              <select
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-2 px-3 text-xs font-semibold text-slate-900 dark:text-slate-100 outline-none"
              >
                <option value="200">200 x 200 px</option>
                <option value="300">300 x 300 px</option>
                <option value="400">400 x 400 px</option>
                <option value="500">500 x 500 px</option>
              </select>
            </div>

            {/* Error correction levels */}
            <div className="space-y-1">
              <label className="text-xs font-semibold">Koreksi Kesalahan (Error Correction)</label>
              <select
                value={errorLevel}
                onChange={(e) => setErrorLevel(e.target.value as any)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-2 px-3 text-xs font-semibold text-slate-900 dark:text-slate-100 outline-none"
              >
                <option value="L">L - Low (7% corection)</option>
                <option value="M">M - Medium (15% corection)</option>
                <option value="Q">Q - Quartile (25% corection)</option>
                <option value="H">H - High (30% corection)</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 py-2.5 px-4 text-xs font-bold text-slate-650 dark:text-slate-400 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Reset</span>
            </button>
            <div className="flex-1" />
          </div>
        </div>

        {/* Display Preview (7 cols) */}
        <div className="lg:col-span-7 flex flex-col rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 p-6">
          <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">
            QR Code Live Preview
          </p>

          <div className="flex-1 flex flex-col items-center justify-center min-h-[300px]">
            {text.trim() ? (
              <div className="p-4 bg-white rounded-xl shadow-lg border border-slate-100 flex items-center justify-center">
                <canvas ref={canvasRef} className="max-w-[250px] max-h-[250px] object-contain" />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-slate-400">
                <QrCode className="h-12 w-12 stroke-[1.5] animate-pulse" />
                <p className="text-xs">Ketik isi teks untuk menghasilkan QR Code</p>
              </div>
            )}
          </div>

          {text.trim() && (
            <div className="mt-6 grid grid-cols-2 gap-4">
              <button
                onClick={downloadPNG}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-650 hover:bg-blue-700 text-white font-bold py-2.5 px-4 shadow-md transition-colors text-xs sm:text-sm"
              >
                <Download className="h-4 w-4" />
                <span>Download PNG</span>
              </button>
              <button
                onClick={downloadSVG}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold py-2.5 px-4 shadow-md transition-colors text-xs sm:text-sm"
              >
                <Download className="h-4 w-4" />
                <span>Download SVG (Vector)</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
