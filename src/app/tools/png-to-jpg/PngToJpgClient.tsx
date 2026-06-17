"use client";

import React, { useState, useRef } from "react";
import { Upload, Download, RefreshCw, FileImage, Trash2, CheckCircle } from "lucide-react";

interface UploadedFile {
  id: string;
  file: File;
  previewUrl: string;
  status: "pending" | "converting" | "completed";
  convertedUrl?: string;
  convertedSize?: number;
}

export default function PngToJpgClient() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const addFiles = (selectedFiles: FileList) => {
    const newFiles: UploadedFile[] = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      const f = selectedFiles[i];
      if (f.type === "image/png" || f.name.toLowerCase().endsWith(".png")) {
        newFiles.push({
          id: Math.random().toString(36).substring(7),
          file: f,
          previewUrl: URL.createObjectURL(f),
          status: "pending",
        });
      }
    }
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(e.target.files);
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) addFiles(e.dataTransfer.files);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const target = prev.find((f) => f.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((f) => f.id !== id);
    });
  };

  const convertSingle = (item: UploadedFile): Promise<UploadedFile> => {
    return new Promise((resolve) => {
      setFiles((prev) =>
        prev.map((f) => (f.id === item.id ? { ...f, status: "converting" } : f))
      );

      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;

        // Fill background color with white (since PNG transparency becomes black in JPG standardly)
        if (ctx) {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
        }

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              resolve({
                ...item,
                status: "completed",
                convertedUrl: url,
                convertedSize: blob.size,
              });
            } else {
              resolve(item);
            }
          },
          "image/jpeg",
          0.92 // High quality
        );
      };
      img.src = item.previewUrl;
    });
  };

  const convertAll = async () => {
    const updatedFiles = [...files];
    for (let i = 0; i < updatedFiles.length; i++) {
      const item = updatedFiles[i];
      if (item.status !== "completed") {
        const res = await convertSingle(item);
        setFiles((prev) => prev.map((f) => (f.id === item.id ? res : f)));
      }
    }
  };

  const downloadFile = (item: UploadedFile) => {
    if (!item.convertedUrl) return;
    const link = document.createElement("a");
    link.href = item.convertedUrl;
    const nameWithoutExt = item.file.name.substring(0, item.file.name.lastIndexOf(".")) || item.file.name;
    link.download = `${nameWithoutExt}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAll = () => {
    files.forEach((f) => {
      if (f.status === "completed") {
        downloadFile(f);
      }
    });
  };

  const resetAll = () => {
    files.forEach((f) => {
      URL.revokeObjectURL(f.previewUrl);
      if (f.convertedUrl) URL.revokeObjectURL(f.convertedUrl);
    });
    setFiles([]);
  };

  const allCompleted = files.length > 0 && files.every((f) => f.status === "completed");
  const anyCompleted = files.some((f) => f.status === "completed");

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      {files.length === 0 ? (
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-2xl p-12 text-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-500/50 bg-slate-50/50 dark:bg-slate-950/20 hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-all group"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 p-4 mb-4 group-hover:scale-110 transition-transform">
            <Upload className="h-6 w-6" />
          </div>
          <p className="text-sm md:text-base font-bold text-slate-800 dark:text-slate-200">
            Tarik file PNG ke sini, atau klik untuk memilih
          </p>
          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
            Mendukung konversi banyak file sekaligus (bulk upload). Berkas Anda aman.
          </p>
        </div>
      ) : (
        /* Workspace list */
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-850 dark:text-slate-105">
                Daftar File ({files.length})
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={resetAll}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-900 text-xs font-semibold text-slate-500 transition-colors"
              >
                <span>Hapus Semua</span>
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-705 text-white text-xs font-bold transition-all"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
                <span>Tambah File PNG</span>
              </button>
            </div>
          </div>

          {/* Files queue */}
          <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
            {files.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/10 p-3 hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative h-10 w-10 bg-slate-200 dark:bg-slate-800 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.previewUrl}
                      alt="Thumbnail"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-[150px] sm:max-w-xs md:max-w-md">
                      {item.file.name}
                    </p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">
                      PNG: {formatSize(item.file.size)} 
                      {item.convertedSize && ` → JPG: ${formatSize(item.convertedSize)}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {item.status === "pending" && (
                    <span className="rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-650 dark:text-slate-400 px-2 py-0.5 uppercase tracking-wide">
                      Pending
                    </span>
                  )}
                  {item.status === "converting" && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-blue-600 dark:text-blue-400 animate-pulse uppercase">
                      <RefreshCw className="h-3 w-3 animate-spin" />
                      <span>Proses</span>
                    </span>
                  )}
                  {item.status === "completed" && (
                    <span className="inline-flex items-center gap-1 rounded bg-green-50 dark:bg-green-950/20 text-[10px] font-bold text-green-700 dark:text-green-400 px-2 py-0.5 uppercase tracking-wide">
                      <CheckCircle className="h-3.5 w-3.5" />
                      <span>Selesai</span>
                    </span>
                  )}

                  {item.status === "completed" ? (
                    <button
                      onClick={() => downloadFile(item)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-650 hover:bg-green-700 text-white transition-colors"
                      aria-label="Download File"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => removeFile(item.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-red-50 dark:hover:bg-red-950/30 hover:border-red-200 dark:hover:border-red-900/50 hover:text-red-600 transition-colors"
                      aria-label="Remove File"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            {allCompleted ? (
              <button
                onClick={downloadAll}
                className="w-full sm:flex-1 flex items-center justify-center gap-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 shadow-lg shadow-green-500/20 transition-all hover:scale-[1.01]"
              >
                <Download className="h-5 w-5" />
                <span>Unduh Semua File JPG</span>
              </button>
            ) : (
              <button
                onClick={convertAll}
                className="w-full sm:flex-1 flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.01]"
              >
                <RefreshCw className="h-5 w-5" />
                <span>Konversi ke JPG</span>
              </button>
            )}

            {anyCompleted && (
              <button
                onClick={downloadAll}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 py-3 px-6 text-sm font-bold text-slate-700 dark:text-slate-350 transition-colors"
              >
                <span>Unduh Hasil Selesai</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
