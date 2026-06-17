"use client";

import React, { useState, useEffect, useRef } from "react";
import { Upload, Download, RefreshCw, FileImage, Sparkles, CheckCircle } from "lucide-react";

export default function CompressImageClient() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState<number>(80);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      // Reset compression results
      setCompressedBlob(null);
      setCompressedUrl(null);
      setCompressedSize(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      // Check if image
      if (selectedFile.type.startsWith("image/")) {
        setFile(selectedFile);
        setPreviewUrl(URL.createObjectURL(selectedFile));
        setCompressedBlob(null);
        setCompressedUrl(null);
        setCompressedSize(null);
      }
    }
  };

  const compressImage = () => {
    if (!file) return;
    setIsProcessing(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        
        canvas.width = img.width;
        canvas.height = img.height;
        
        ctx?.drawImage(img, 0, 0);

        // Compress to JPEG format
        canvas.toBlob(
          (blob) => {
            if (blob) {
              setCompressedBlob(blob);
              setCompressedUrl(URL.createObjectURL(blob));
              setCompressedSize(blob.size);
            }
            setIsProcessing(false);
          },
          "image/jpeg",
          quality / 100
        );
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Re-run compression when quality changes
  useEffect(() => {
    if (file) {
      const timer = setTimeout(() => {
        compressImage();
      }, 300); // Debounce to prevent lag during dragging
      return () => clearTimeout(timer);
    }
  }, [quality, file]);

  const downloadImage = () => {
    if (!compressedUrl || !file) return;
    const link = document.createElement("a");
    link.href = compressedUrl;
    // Keep original filename but prepend compress- and extension to jpg
    const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
    link.download = `compressed-${nameWithoutExt}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetAll = () => {
    setFile(null);
    setPreviewUrl(null);
    setCompressedBlob(null);
    setCompressedUrl(null);
    setCompressedSize(null);
    setQuality(80);
  };

  const savingsPercent = file && compressedSize 
    ? Math.round(((file.size - compressedSize) / file.size) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Upload area */}
      {!file ? (
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-2xl p-12 text-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-500/50 bg-slate-50/50 dark:bg-slate-950/20 hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-all group"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 p-4 mb-4 group-hover:scale-110 transition-transform">
            <Upload className="h-6 w-6" />
          </div>
          <p className="text-sm md:text-base font-bold text-slate-800 dark:text-slate-200">
            Tarik foto ke sini, atau klik untuk memilih
          </p>
          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
            Mendukung PNG, JPG, JPEG, dan WEBP hingga 50MB. Pemrosesan dilakukan 100% lokal.
          </p>
        </div>
      ) : (
        /* Workspace */
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-250 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600">
                <FileImage className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate max-w-[200px] sm:max-w-xs">
                  {file.name}
                </p>
                <p className="text-xs text-slate-450 dark:text-slate-500">
                  Ukuran Asli: {formatSize(file.size)}
                </p>
              </div>
            </div>

            <button
              onClick={resetAll}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 py-1.5 px-3 text-xs font-semibold text-slate-650 dark:text-slate-400 transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Ganti Foto</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Control Panel */}
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <label className="font-bold text-slate-800 dark:text-slate-200">
                    Kualitas Kompresi (Quality)
                  </label>
                  <span className="rounded bg-blue-50 dark:bg-blue-900/40 px-2 py-0.5 text-xs font-bold text-blue-600 dark:text-blue-400">
                    {quality}%
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500">
                  <span>Ukuran Terkecil (Kualitas Rendah)</span>
                  <span>Ukuran Terbesar (Kualitas Tinggi)</span>
                </div>
              </div>

              {/* Compression Metrics Card */}
              {compressedSize && (
                <div className="rounded-xl border border-green-200 dark:border-green-900/30 bg-green-50/20 dark:bg-green-950/10 p-5 space-y-3">
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                    <Sparkles className="h-5 w-5" />
                    <h3 className="font-bold text-sm">Hasil Kompresi Siap Unduh</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold">
                        Ukuran Baru
                      </p>
                      <p className="text-base font-extrabold text-slate-800 dark:text-slate-100">
                        {formatSize(compressedSize)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold">
                        Hemat Ukuran
                      </p>
                      <p className="text-base font-extrabold text-green-650 dark:text-green-400">
                        {savingsPercent}% Lebih Kecil
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={downloadImage}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.01]"
                  >
                    <Download className="h-5 w-5" />
                    <span>Download Gambar Terkompresi</span>
                  </button>
                </div>
              )}
            </div>

            {/* Preview Box */}
            <div className="flex flex-col rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 p-4">
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
                Live Preview Comparison
              </p>
              
              <div className="relative flex-1 min-h-[300px] flex items-center justify-center bg-slate-100 dark:bg-slate-900/60 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800/40">
                {isProcessing ? (
                  <div className="flex flex-col items-center gap-2">
                    <RefreshCw className="h-8 w-8 text-blue-600 animate-spin" />
                    <p className="text-xs text-slate-500 dark:text-slate-400">Memproses kompresi...</p>
                  </div>
                ) : (
                  <img
                    src={compressedUrl || previewUrl || ""}
                    alt="Preview"
                    className="max-h-[350px] max-w-full object-contain rounded"
                  />
                )}
              </div>
              <div className="mt-3 text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-200 dark:bg-slate-800 px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-400">
                  <CheckCircle className="h-3.5 w-3.5 text-blue-600" />
                  <span>Format output: JPEG (Kualitas Optimal)</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
