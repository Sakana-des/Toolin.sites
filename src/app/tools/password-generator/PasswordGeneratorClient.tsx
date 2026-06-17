"use client";

import React, { useState, useEffect } from "react";
import { Copy, Check, RefreshCw, Key, Shield, ShieldCheck, ShieldAlert, Sparkles } from "lucide-react";

export default function PasswordGeneratorClient() {
  const [length, setLength] = useState<number>(16);
  const [includeUpper, setIncludeUpper] = useState<boolean>(true);
  const [includeLower, setIncludeLower] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [excludeSimilar, setExcludeSimilar] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [passwords, setPasswords] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generatePasswords = () => {
    let charset = "";
    if (includeUpper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLower) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (excludeSimilar) {
      // Exclude similar looking characters: i, l, 1, L, o, 0, O, |, I
      const similarChars = /[il1Lo0O|I]/g;
      charset = charset.replace(similarChars, "");
    }

    if (!charset) {
      setPasswords([]);
      return;
    }

    const generated: string[] = [];
    
    // Use Web Crypto API for secure random numbers
    const array = new Uint32Array(length);

    for (let q = 0; q < quantity; q++) {
      window.crypto.getRandomValues(array);
      let pwd = "";
      for (let i = 0; i < length; i++) {
        pwd += charset[array[i] % charset.length];
      }
      generated.push(pwd);
    }

    setPasswords(generated);
  };

  useEffect(() => {
    generatePasswords();
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols, excludeSimilar, quantity]);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Evaluate Password Strength for the first password in the list
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { score: 0, label: "Kosong", color: "bg-slate-200 dark:bg-slate-800 text-slate-500" };
    
    let score = 0;
    
    // Length weight
    if (pwd.length >= 8) score += 1;
    if (pwd.length >= 12) score += 1;
    if (pwd.length >= 16) score += 1;

    // Diversity weight
    let sets = 0;
    if (/[A-Z]/.test(pwd)) sets++;
    if (/[a-z]/.test(pwd)) sets++;
    if (/[0-9]/.test(pwd)) sets++;
    if (/[^A-Za-z0-9]/.test(pwd)) sets++;
    
    score += sets;

    if (score <= 3) {
      return {
        score,
        label: "Lemah (Weak)",
        color: "bg-red-100 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/30",
        progressColor: "bg-red-500",
        icon: <ShieldAlert className="h-4 w-4" />,
      };
    } else if (score <= 5) {
      return {
        score,
        label: "Sedang (Medium)",
        color: "bg-yellow-100 text-yellow-750 border-yellow-250 dark:bg-yellow-950/20 dark:text-yellow-400 dark:border-yellow-900/30",
        progressColor: "bg-yellow-500",
        icon: <Shield className="h-4 w-4" />,
      };
    } else {
      return {
        score,
        label: "Sangat Kuat (Very Strong)",
        color: "bg-green-150 text-green-700 border-green-200 dark:bg-green-950/20 dark:text-green-400 dark:border-green-900/30",
        progressColor: "bg-green-500",
        icon: <ShieldCheck className="h-4 w-4" />,
      };
    }
  };

  const currentStrength = passwords.length > 0 ? getPasswordStrength(passwords[0]) : null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Settings Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Length slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <label className="font-bold text-slate-800 dark:text-slate-200">
                Panjang Sandi (Length)
              </label>
              <span className="rounded bg-blue-50 dark:bg-blue-900/40 px-2 py-0.5 text-xs font-bold text-blue-600 dark:text-blue-400">
                {length} Karakter
              </span>
            </div>
            <input
              type="range"
              min="6"
              max="64"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Criteria Checkboxes */}
          <div className="space-y-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10 p-4">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Kriteria Karakter
            </p>

            <label className="flex items-center gap-3 cursor-pointer text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-350">
              <input
                type="checkbox"
                checked={includeUpper}
                onChange={(e) => setIncludeUpper(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-blue-650 focus:ring-blue-500"
              />
              <span>Huruf Besar (A-Z)</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-350">
              <input
                type="checkbox"
                checked={includeLower}
                onChange={(e) => setIncludeLower(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-blue-650 focus:ring-blue-500"
              />
              <span>Huruf Kecil (a-z)</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-350">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-blue-650 focus:ring-blue-500"
              />
              <span>Angka (0-9)</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-350">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-blue-650 focus:ring-blue-500"
              />
              <span>Karakter Simbol (!@#$...)</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-350 border-t border-slate-200 dark:border-slate-800 pt-2.5">
              <input
                type="checkbox"
                checked={excludeSimilar}
                onChange={(e) => setExcludeSimilar(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-blue-650 focus:ring-blue-500"
              />
              <span>Hindari Karakter Serupa (o, 0, i, l, 1)</span>
            </label>
          </div>

          {/* Quantity selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Jumlah Kata Sandi Dibuat
            </label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-2 px-3 text-xs font-semibold text-slate-900 dark:text-slate-100 outline-none"
            >
              <option value="1">1 Kata Sandi</option>
              <option value="5">5 Kata Sandi sekaligus</option>
              <option value="10">10 Kata Sandi sekaligus</option>
            </select>
          </div>
        </div>

        {/* Output Panel (7 cols) */}
        <div className="lg:col-span-7 flex flex-col rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 p-6">
          <div className="flex items-center justify-between gap-4 mb-4">
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Generated Passwords
            </p>
            <button
              onClick={generatePasswords}
              className="flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Acak Ulang</span>
            </button>
          </div>

          {/* Strength Bar */}
          {currentStrength && quantity === 1 && (
            <div className={`mb-6 flex flex-col gap-2 rounded-xl border p-4 ${currentStrength.color}`}>
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-1.5">
                  {currentStrength.icon}
                  <span>Kekuatan Kata Sandi: {currentStrength.label}</span>
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-250 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${currentStrength.progressColor} transition-all`}
                  style={{ width: `${(currentStrength.score / 6) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Passwords list */}
          <div className="flex-1 space-y-3">
            {passwords.length > 0 ? (
              passwords.map((pwd, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-3 shadow-sm hover:border-slate-350 dark:hover:border-slate-700 transition-all font-mono"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 select-all break-all pr-2">
                    {pwd}
                  </span>
                  <button
                    onClick={() => copyToClipboard(pwd, idx)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-650 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 dark:text-blue-400 transition-colors flex-shrink-0"
                    aria-label="Salin Sandi"
                  >
                    {copiedIndex === idx ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-40 text-slate-400">
                <Key className="h-10 w-10 animate-bounce mb-2" />
                <p className="text-xs">Aktifkan minimal satu kriteria karakter</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
