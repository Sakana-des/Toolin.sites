"use client";

import React, { useState, useEffect, useRef } from "react";
import { Upload, Download, RefreshCw, FileImage, Crop, Sliders } from "lucide-react";

export default function CropImageClient() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imgElement, setImgElement] = useState<HTMLImageElement | null>(null);
  
  // Crop dimensions in pixels relative to original image size
  const [cropX, setCropX] = useState<number>(0);
  const [cropY, setCropY] = useState<number>(0);
  const [cropW, setCropW] = useState<number>(100);
  const [cropH, setCropH] = useState<number>(100);
  const [ratioMode, setRatioMode] = useState<string>("custom"); // custom, 1:1, 16:9, 4:3, 3:4
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Direct mouse/touch dragging states
  const [dragState, setDragState] = useState<{
    mode: "move" | "nw-resize" | "ne-resize" | "sw-resize" | "se-resize" | "n-resize" | "s-resize" | "e-resize" | "w-resize" | null;
    startX: number;
    startY: number;
    startCropX: number;
    startCropY: number;
    startCropW: number;
    startCropH: number;
  } | null>(null);

  const getRegion = (x: number, y: number, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const threshold = 15 * (canvas.width / rect.width);
    
    const nearLeft = Math.abs(x - cropX) < threshold;
    const nearRight = Math.abs(x - (cropX + cropW)) < threshold;
    const nearTop = Math.abs(y - cropY) < threshold;
    const nearBottom = Math.abs(y - (cropY + cropH)) < threshold;
    
    if (nearLeft && nearTop) return "nw-resize";
    if (nearRight && nearTop) return "ne-resize";
    if (nearLeft && nearBottom) return "sw-resize";
    if (nearRight && nearBottom) return "se-resize";
    
    if (nearLeft && y > cropY && y < cropY + cropH) return "w-resize";
    if (nearRight && y > cropY && y < cropY + cropH) return "e-resize";
    if (nearTop && x > cropX && x < cropX + cropW) return "n-resize";
    if (nearBottom && x > cropX && x < cropX + cropW) return "s-resize";
    
    if (x > cropX && x < cropX + cropW && y > cropY && y < cropY + cropH) {
      return "move";
    }
    
    return null;
  };

  const handleStart = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !imgElement) return;
    const rect = canvas.getBoundingClientRect();
    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);

    const region = getRegion(x, y, canvas);
    if (!region) return;

    setDragState({
      mode: region,
      startX: x,
      startY: y,
      startCropX: cropX,
      startCropY: cropY,
      startCropW: cropW,
      startCropH: cropH,
    });
  };

  const handleMove = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !imgElement) return;
    const rect = canvas.getBoundingClientRect();
    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);

    if (!dragState) {
      const region = getRegion(x, y, canvas);
      if (region === "move") {
        canvas.style.cursor = "move";
      } else if (region === "nw-resize" || region === "se-resize") {
        canvas.style.cursor = "nwse-resize";
      } else if (region === "ne-resize" || region === "sw-resize") {
        canvas.style.cursor = "nesw-resize";
      } else if (region === "w-resize" || region === "e-resize") {
        canvas.style.cursor = "ew-resize";
      } else if (region === "n-resize" || region === "s-resize") {
        canvas.style.cursor = "ns-resize";
      } else {
        canvas.style.cursor = "default";
      }
      return;
    }

    const { mode, startX, startY, startCropX, startCropY, startCropW, startCropH } = dragState;
    const dx = x - startX;
    const dy = y - startY;
    const maxW = imgElement.width;
    const maxH = imgElement.height;

    let ratio = 1;
    if (ratioMode === "1:1") ratio = 1;
    else if (ratioMode === "16:9") ratio = 16 / 9;
    else if (ratioMode === "4:3") ratio = 4 / 3;
    else if (ratioMode === "3:4") ratio = 3 / 4;
    const isFixedRatio = ratioMode !== "custom";

    if (mode === "move") {
      let newX = startCropX + dx;
      let newY = startCropY + dy;
      newX = Math.max(0, Math.min(newX, maxW - cropW));
      newY = Math.max(0, Math.min(newY, maxH - cropH));
      setCropX(newX);
      setCropY(newY);
    } else {
      let newX = cropX;
      let newY = cropY;
      let newW = cropW;
      let newH = cropH;

      if (mode === "se-resize") {
        newW = startCropW + dx;
        if (isFixedRatio) {
          newH = newW / ratio;
        } else {
          newH = startCropH + dy;
        }
        if (newW + startCropX > maxW) {
          newW = maxW - startCropX;
          if (isFixedRatio) newH = newW / ratio;
        }
        if (newH + startCropY > maxH) {
          newH = maxH - startCropY;
          if (isFixedRatio) newW = newH * ratio;
        }
      } else if (mode === "e-resize" && !isFixedRatio) {
        newW = startCropW + dx;
        if (newW + startCropX > maxW) newW = maxW - startCropX;
      } else if (mode === "s-resize" && !isFixedRatio) {
        newH = startCropH + dy;
        if (newH + startCropY > maxH) newH = maxH - startCropY;
      } else if (mode === "nw-resize") {
        newW = startCropW - dx;
        if (isFixedRatio) {
          newH = newW / ratio;
          newX = startCropX + (startCropW - newW);
          newY = startCropY + (startCropH - newH);
        } else {
          newH = startCropH - dy;
          newX = startCropX + dx;
          newY = startCropY + dy;
        }
        if (newX < 0) {
          newX = 0;
          newW = startCropX + startCropW;
          if (isFixedRatio) {
            newH = newW / ratio;
            newY = startCropY + startCropH - newH;
          }
        }
        if (newY < 0) {
          newY = 0;
          newH = startCropY + startCropH;
          if (isFixedRatio) {
            newW = newH * ratio;
            newX = startCropX + startCropW - newW;
          }
        }
      } else if (mode === "ne-resize") {
        newW = startCropW + dx;
        if (isFixedRatio) {
          newH = newW / ratio;
          newY = startCropY + (startCropH - newH);
        } else {
          newH = startCropH - dy;
          newY = startCropY + dy;
        }
        if (newW + startCropX > maxW) {
          newW = maxW - startCropX;
          if (isFixedRatio) {
            newH = newW / ratio;
            newY = startCropY + startCropH - newH;
          }
        }
        if (newY < 0) {
          newY = 0;
          newH = startCropY + startCropH;
          if (isFixedRatio) {
            newW = newH * ratio;
          }
        }
      } else if (mode === "sw-resize") {
        newW = startCropW - dx;
        newX = startCropX + dx;
        if (isFixedRatio) {
          newH = newW / ratio;
        } else {
          newH = startCropH + dy;
        }
        if (newX < 0) {
          newX = 0;
          newW = startCropX + startCropW;
          if (isFixedRatio) newH = newW / ratio;
        }
        if (newH + startCropY > maxH) {
          newH = maxH - startCropY;
          if (isFixedRatio) {
            newW = newH * ratio;
            newX = startCropX + startCropW - newW;
          }
        }
      } else if (mode === "w-resize" && !isFixedRatio) {
        newW = startCropW - dx;
        newX = startCropX + dx;
        if (newX < 0) {
          newX = 0;
          newW = startCropX + startCropW;
        }
      } else if (mode === "n-resize" && !isFixedRatio) {
        newH = startCropH - dy;
        newY = startCropY + dy;
        if (newY < 0) {
          newY = 0;
          newH = startCropY + startCropH;
        }
      }

      if (newW >= 20 && newH >= 20) {
        setCropX(Math.round(newX));
        setCropY(Math.round(newY));
        setCropW(Math.round(newW));
        setCropH(Math.round(newH));
      }
    }
  };

  const handleEnd = () => {
    setDragState(null);
  };

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
        setPreviewUrl(URL.createObjectURL(selectedFile));
      }
    }
  };

  // Create HTML Image element for canvas drawing
  useEffect(() => {
    if (!previewUrl) {
      setImgElement(null);
      return;
    }
    const img = new Image();
    img.onload = () => {
      setImgElement(img);
      // Initialize crop coordinates to fit 80% of the image center
      const w = img.width;
      const h = img.height;
      const initialSize = Math.min(w, h) * 0.8;
      
      setCropW(Math.round(initialSize));
      setCropH(Math.round(initialSize));
      setCropX(Math.round((w - initialSize) / 2));
      setCropY(Math.round((h - initialSize) / 2));
      setRatioMode("1:1"); // Default to 1:1 square
    };
    img.src = previewUrl;
  }, [previewUrl]);

  // Adjust crop dimensions based on ratio presets
  useEffect(() => {
    if (!imgElement) return;
    const maxW = imgElement.width;
    const maxH = imgElement.height;

    let targetW = cropW;
    let targetH = cropH;

    if (ratioMode === "1:1") {
      const size = Math.min(cropW, cropH, maxW, maxH);
      targetW = size;
      targetH = size;
    } else if (ratioMode === "16:9") {
      const potentialW = maxW - cropX;
      const potentialH = Math.round(potentialW / (16 / 9));
      if (potentialH <= maxH - cropY) {
        targetW = potentialW;
        targetH = potentialH;
      } else {
        targetH = maxH - cropY;
        targetW = Math.round(targetH * (16 / 9));
      }
    } else if (ratioMode === "4:3") {
      const potentialW = maxW - cropX;
      const potentialH = Math.round(potentialW / (4 / 3));
      if (potentialH <= maxH - cropY) {
        targetW = potentialW;
        targetH = potentialH;
      } else {
        targetH = maxH - cropY;
        targetW = Math.round(targetH * (4 / 3));
      }
    } else if (ratioMode === "3:4") {
      const potentialW = maxW - cropX;
      const potentialH = Math.round(potentialW / (3 / 4));
      if (potentialH <= maxH - cropY) {
        targetW = potentialW;
        targetH = potentialH;
      } else {
        targetH = maxH - cropY;
        targetW = Math.round(targetH * (3 / 4));
      }
    }

    // Sanity checks
    if (targetW + cropX > maxW) targetW = maxW - cropX;
    if (targetH + cropY > maxH) targetH = maxH - cropY;

    setCropW(targetW);
    setCropH(targetH);
  }, [ratioMode, imgElement]);

  // Redraw the canvas visual preview helper
  useEffect(() => {
    if (!imgElement || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imgW = imgElement.width;
    const imgH = imgElement.height;
    
    // Scale canvas to fit container but keep natural dimensions
    canvas.width = imgW;
    canvas.height = imgH;

    // 1. Draw base image
    ctx.drawImage(imgElement, 0, 0);

    // 2. Draw dark semitransparent layer overlay
    ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    ctx.fillRect(0, 0, imgW, imgH);

    // 3. Spotlight the crop area (draw raw image clip inside)
    ctx.drawImage(
      imgElement,
      cropX,
      cropY,
      cropW,
      cropH,
      cropX,
      cropY,
      cropW,
      cropH
    );

    // 4. Draw crop border
    ctx.strokeStyle = "#2563eb";
    ctx.lineWidth = Math.max(2, Math.round(imgW / 300));
    ctx.strokeRect(cropX, cropY, cropW, cropH);

    // 5. Draw grid lines (rule of thirds inside crop box)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.lineWidth = Math.max(1, Math.round(imgW / 500));
    
    // Vertical grid lines
    ctx.beginPath();
    ctx.moveTo(cropX + cropW / 3, cropY);
    ctx.lineTo(cropX + cropW / 3, cropY + cropH);
    ctx.moveTo(cropX + (cropW * 2) / 3, cropY);
    ctx.lineTo(cropX + (cropW * 2) / 3, cropY + cropH);
    // Horizontal grid lines
    ctx.moveTo(cropX, cropY + cropH / 3);
    ctx.lineTo(cropX + cropW, cropY + cropH / 3);
    ctx.moveTo(cropX, cropY + (cropH * 2) / 3);
    ctx.lineTo(cropX + cropW, cropY + (cropH * 2) / 3);
    ctx.stroke();

    // 6. Draw corner handles for resizing
    ctx.fillStyle = "#2563eb";
    const handleSize = Math.max(8, Math.round(imgW / 120));
    
    // Top-left
    ctx.fillRect(cropX - handleSize / 2, cropY - handleSize / 2, handleSize, handleSize);
    // Top-right
    ctx.fillRect(cropX + cropW - handleSize / 2, cropY - handleSize / 2, handleSize, handleSize);
    // Bottom-left
    ctx.fillRect(cropX - handleSize / 2, cropY + cropH - handleSize / 2, handleSize, handleSize);
    // Bottom-right
    ctx.fillRect(cropX + cropW - handleSize / 2, cropY + cropH - handleSize / 2, handleSize, handleSize);

  }, [imgElement, cropX, cropY, cropW, cropH]);

  const executeCrop = () => {
    if (!file || !imgElement) return;

    const cropCanvas = document.createElement("canvas");
    const cropCtx = cropCanvas.getContext("2d");
    
    cropCanvas.width = cropW;
    cropCanvas.height = cropH;

    // Draw the cropped section
    cropCtx?.drawImage(
      imgElement,
      cropX,
      cropY,
      cropW,
      cropH,
      0,
      0,
      cropW,
      cropH
    );

    cropCanvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
        link.download = `cropped-${cropW}x${cropH}-${nameWithoutExt}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    }, "image/png");
  };

  const resetAll = () => {
    setFile(null);
    setPreviewUrl(null);
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
                  Resolusi Asli: {imgElement?.width || 0} x {imgElement?.height || 0} px ({formatSize(file.size)})
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Control Panel (4 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Aspect Ratio Tabs */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-250">
                  <Crop className="h-4 w-4" />
                  <span>Rasio Pemotongan (Aspect Ratio)</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "custom", name: "Bebas" },
                    { id: "1:1", name: "1:1 Kotak" },
                    { id: "16:9", name: "16:9 Wide" },
                    { id: "4:3", name: "4:3 TV" },
                    { id: "3:4", name: "3:4 Dokumen" },
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setRatioMode(mode.id)}
                      className={`rounded-xl border py-2 px-3 text-xs font-bold transition-all ${
                        ratioMode === mode.id
                          ? "border-blue-200 bg-blue-50/50 dark:border-blue-900/30 dark:bg-blue-950/20 text-blue-650 dark:text-blue-400"
                          : "border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900"
                      }`}
                    >
                      {mode.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sliders adjustments */}
              {imgElement && (
                <div className="space-y-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20 p-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    <Sliders className="h-3.5 w-3.5" />
                    <span>Presisi Koordinat (Pixel)</span>
                  </div>

                  {/* Width slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>Lebar Crop: {cropW}px</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max={imgElement.width - cropX}
                      value={cropW}
                      onChange={(e) => {
                        const newW = Number(e.target.value);
                        setCropW(newW);
                        if (ratioMode === "1:1") setCropH(newW);
                      }}
                      className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>

                  {/* Height slider (only active if custom) */}
                  {ratioMode === "custom" && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span>Tinggi Crop: {cropH}px</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max={imgElement.height - cropY}
                        value={cropH}
                        onChange={(e) => setCropH(Number(e.target.value))}
                        className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>
                  )}

                  {/* Position X slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>Posisi Horisontal (X): {cropX}px</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max={imgElement.width - cropW}
                      value={cropX}
                      onChange={(e) => setCropX(Number(e.target.value))}
                      className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>

                  {/* Position Y slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>Posisi Vertikal (Y): {cropY}px</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max={imgElement.height - cropH}
                      value={cropY}
                      onChange={(e) => setCropY(Number(e.target.value))}
                      className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>
                </div>
              )}

              <button
                onClick={executeCrop}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.01]"
              >
                <Download className="h-5 w-5" />
                <span>Crop & Unduh Hasil</span>
              </button>
            </div>

            {/* Visual Canvas Container (7 cols) */}
            <div className="lg:col-span-7 flex flex-col rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 p-4">
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
                Spotlight Editor
              </p>
              
              <div className="relative flex-1 min-h-[350px] flex items-center justify-center bg-slate-100 dark:bg-slate-900/60 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800/40 p-2">
                <canvas
                  ref={canvasRef}
                  onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
                  onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
                  onMouseUp={handleEnd}
                  onMouseLeave={handleEnd}
                  onTouchStart={(e) => {
                    if (e.touches.length > 0) {
                      handleStart(e.touches[0].clientX, e.touches[0].clientY);
                    }
                  }}
                  onTouchMove={(e) => {
                    if (e.touches.length > 0) {
                      handleMove(e.touches[0].clientX, e.touches[0].clientY);
                    }
                  }}
                  onTouchEnd={handleEnd}
                  style={{ touchAction: "none" }}
                  className="max-h-[400px] max-w-full object-contain rounded shadow-lg select-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
