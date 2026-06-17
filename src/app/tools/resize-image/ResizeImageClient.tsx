"use client";

import React, { useState, useEffect, useRef } from "react";
import { Upload, Download, RefreshCw, FileImage, Link as LinkIcon, Link2Off } from "lucide-react";

export default function ResizeImageClient() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [originalWidth, setOriginalWidth] = useState<number>(0);
  const [originalHeight, setOriginalHeight] = useState<number>(0);
  const [lockRatio, setLockRatio] = useState<boolean>(true);
  const [format, setFormat] = useState<string>("image/jpeg");
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

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
      setFormat(selectedFile.type);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      if (selectedFile.type.startsWith("image/")) {
        setFile(selectedFile);
        setFormat(selectedFile.type);
        setPreviewUrl(URL.createObjectURL(selectedFile));
      }
    }
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    setOriginalWidth(naturalWidth);
    setOriginalHeight(naturalHeight);
    setWidth(naturalWidth);
    setHeight(naturalHeight);
  };

  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (lockRatio && originalWidth && originalHeight) {
      const ratio = originalWidth / originalHeight;
      setHeight(Math.round(val / ratio));
    }
  };

  const handleHeightChange = (val: number) => {
    setHeight(val);
    if (lockRatio && originalWidth && originalHeight) {
      const ratio = originalWidth / originalHeight;
      setWidth(Math.round(val * ratio));
    }
  };

  const resizeAndDownload = () => {
    if (!file || !previewUrl) return;
    setIsProcessing(true);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      
      canvas.width = width;
      canvas.height = height;

      // Draw resized image
      ctx?.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
          const extMap: Record<string, string> = {
            "image/jpeg": "jpg",
            "image/png": "png",
            "image/webp": "webp",
          };
          const ext = extMap[format] || "jpg";
          link.download = `resized-${width}x${height}-${nameWithoutExt}.${ext}`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
        setIsProcessing(false);
      }, format);
    };
    img.src = previewUrl;
  };

  const resetAll = () => {
    setFile(null);
    setPreviewUrl(null);
    setWidth(0);
    setHeight(0);
    setOriginalWidth(0);
    setOriginalHeight(0);
  };

  return (
    <div className="space-y-6">
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
            Mendukung PNG, JPG, JPEG, dan WEBP. Pemrosesan dilakukan 100% lokal.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600">
                <FileImage className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate max-w-[200px] sm:max-w-xs">
                  {file.name}
                </p>
                <p className="text-xs text-slate-450 dark:text-slate-500">
                  Resolusi Asli: {originalWidth} x {originalHeight} px ({formatSize(file.size)})
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Lebar (Width - px)
                  </label>
                  <input
                    type="number"
                    value={width || ""}
                    onChange={(e) => handleWidthChange(Math.max(1, Number(e.target.value)))}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-2.5 px-4 text-sm font-semibold text-slate-900 dark:text-slate-100 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Tinggi (Height - px)
                  </label>
                  <input
                    type="number"
                    value={height || ""}
                    onChange={(e) => handleHeightChange(Math.max(1, Number(e.target.value)))}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-2.5 px-4 text-sm font-semibold text-slate-900 dark:text-slate-100 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Locks & presets */}
              <div className="flex flex-wrap items-center gap-4 justify-between">
                <button
                  type="button"
                  onClick={() => setLockRatio(!lockRatio)}
                  className={`flex items-center gap-2 rounded-xl border py-2 px-4 text-xs font-bold transition-all ${
                    lockRatio
                      ? "border-blue-200 bg-blue-50/50 dark:border-blue-900/30 dark:bg-blue-950/20 text-blue-650 dark:text-blue-400"
                      : "border-slate-200 dark:border-slate-800 text-slate-500"
                  }`}
                >
                  {lockRatio ? (
                    <>
                      <LinkIcon className="h-4 w-4" />
                      <span>Kunci Rasio Aspek</span>
                    </>
                  ) : (
                    <>
                      <Link2Off className="h-4 w-4" />
                      <span>Rasio Aspek Bebas</span>
                    </>
                  )}
                </button>

                {/* Presets */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setLockRatio(false);
                      setWidth(354);
                      setHeight(472); // 3x4
                    }}
                    className="rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-850 px-2.5 py-1.5 text-[10px] font-bold text-slate-600 dark:text-slate-350"
                  >
                    Pas Foto 3x4
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLockRatio(false);
                      setWidth(472);
                      setHeight(709); // 4x6
                    }}
                    className="rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-850 px-2.5 py-1.5 text-[10px] font-bold text-slate-600 dark:text-slate-350"
                  >
                    Pas Foto 4x6
                  </button>
                </div>
              </div>

              {/* Output format */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Format Gambar Hasil
                </label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-2.5 px-4 text-sm font-semibold text-slate-900 dark:text-slate-100 outline-none focus:border-blue-500"
                >
                  <option value="image/jpeg">JPG / JPEG</option>
                  <option value="image/png">PNG</option>
                  <option value="image/webp">WEBP</option>
                </select>
              </div>

              <button
                onClick={resizeAndDownload}
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-4 shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.01]"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5" />
                    <span>Resize & Download Gambar</span>
                  </>
                )}
              </button>
            </div>

            {/* Preview Box */}
            <div className="flex flex-col rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 p-4">
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
                Ukuran Baru: {width} x {height} px
              </p>
              
              <div className="relative flex-1 min-h-[300px] flex items-center justify-center bg-slate-100 dark:bg-slate-900/60 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800/40">
                <img
                  ref={imageRef}
                  src={previewUrl || ""}
                  alt="Preview"
                  onLoad={onImageLoad}
                  className="max-h-[350px] max-w-full object-contain rounded"
                  style={{ width: `${width}px`, height: `${height}px`, maxWidth: "100%", maxHeight: "350px" }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
