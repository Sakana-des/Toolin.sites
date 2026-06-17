# Toolin - Platform Utility Tools Online Gratis & Cepat

Toolin adalah platform utility tools online gratis dan modern yang dibangun menggunakan **Next.js 15 (App Router)**, **TypeScript**, dan **Tailwind CSS v4**. Platform ini mengusung pendekatan *Mobile-First*, responsif di seluruh resolusi layar (Android, iPhone, Tablet, Desktop), serta dioptimalkan secara mendalam untuk kebutuhan SEO dan kemudahan monetization (siap dipasang Google AdSense dan Adsterra).

---

## 🚀 Fitur Utama

1. **Homepage Modern & Dinamis**
   - Pencarian real-time instan untuk menemukan tool.
   - Filter tab kategori (Gambar, Generator, Teks & Counter).
   - Daftar FAQ interaktif lengkap dengan Schema FAQPage terstruktur.
   
2. **Kumpulan 10 Core Utility Tools (100% Client-Side)**
   - **Compress Image:** Kompres PNG, JPG, JPEG, WEBP di browser dengan visual preview & slider kualitas.
   - **Resize Image:** Atur resolusi piksel lebar & tinggi baru (dilengkapi preset 3x4 dan 4x6).
   - **Crop Image:** Potong area gambar dengan aspect ratio presets (1:1, 16:9, 4:3, 3:4).
   - **PNG to JPG / JPG to PNG / WEBP to PNG:** Konverter bulk image cepat.
   - **QR Generator:** Bikin QR Code statis warna kustom dengan pilihan download format PNG & SVG.
   - **Password Generator:** Generate kata sandi acak kuat kriptografi-aman secara bulk.
   - **UUID Generator:** Hasilkan UUID v4 massal dengan custom casing dan braces.
   - **Word Counter:** Hitung kata, karakter, paragraf, waktu baca, dan kepadatan kata kunci.

3. **SEO Friendly & Cepat**
   - Sitemap otomatis dinamis (`sitemap.xml` melalui `app/sitemap.ts`).
   - Berkas `robots.txt` ramah mesin pencari (`app/robots.ts`).
   - Schema.org (JSON-LD) lengkap: `BreadcrumbList`, `SoftwareApplication`, `Article`, dan `FAQPage`.
   - Pre-generating static paths untuk performa loading cepat.

4. **Monetization & Analytics Ready**
   - Mengintegrasikan slot iklan responsif Google AdSense dan banner Adsterra.
   - Konfigurasi ID Google Analytics dan Google Search Console Verification.

---

## 🛠️ Struktur Folder Proyek

```
src/
├── app/
│   ├── layout.tsx                  # Root layout (Google Analytics, AdSense, Context Providers)
│   ├── page.tsx                    # Beranda (Hero, search, list, FAQs)
│   ├── robots.ts                   # Robots.txt generator
│   ├── sitemap.ts                  # Sitemap.xml generator
│   ├── blog/
│   │   ├── page.tsx                # Halaman depan kumpulan artikel
│   │   └── [slug]/
│   │       └── page.tsx            # Artikel dynamic detail (cara-compress-foto-200kb, dll.)
│   └── tools/
│       ├── compress-image/         # Compress Image Tool
│       ├── resize-image/           # Resize Image Tool
│       ├── crop-image/             # Crop Image Tool
│       ├── png-to-jpg/             # PNG to JPG
│       ├── jpg-to-png/             # JPG to PNG
│       ├── webp-to-png/            # WEBP to PNG
│       ├── qr-generator/           # QR Generator
│       ├── password-generator/     # Password Generator
│       ├── uuid-generator/         # UUID Generator
│       └── word-counter/           # Word Counter
├── components/
│   ├── Navbar.tsx                  # Header dengan search modal & Dark/Light toggler
│   ├── Footer.tsx                  # Menu navigasi, newsletter form, disclaimer
│   ├── Breadcrumb.tsx              # Rantai navigasi halaman
│   ├── AdPlaceholder.tsx           # Wrapper slot AdSense / Adsterra
│   ├── JsonLd.tsx                  # Injeksi schema terstruktur JSON-LD
│   └── Icon.tsx                    # Helper visualisasi Lucide React Icons
├── context/
│   └── ThemeContext.tsx            # State Provider untuk Light/Dark mode
└── data/
    ├── tools.ts                    # Katalog metadata tool online
    └── blog.ts                     # Database artikel tutorial SEO
```

---

## ⚙️ Variabel Lingkungan (Environment Variables)

Salin berkas `.env.example` menjadi `.env.local` untuk konfigurasi lokal:

```env
# Google Analytics 4 Tracking ID (contoh: G-XXXXXXXXXX)
NEXT_PUBLIC_GA_ID=

# Google Search Console Meta Verification Code
NEXT_PUBLIC_GSC_VERIFICATION=

# Google AdSense Publisher Client ID (contoh: ca-pub-XXXXXXXXXXXXXXXX)
NEXT_PUBLIC_ADSENSE_CLIENT_ID=

# Aktifkan Slot Iklan Adsterra (true/false)
NEXT_PUBLIC_ADSTERRA_ENABLED=false
```

---

## 💻 Jalankan Lokal

1. Pasang dependensi npm:
   ```bash
   npm install
   ```
2. Jalankan server pengembangan (development mode):
   ```bash
   npm run dev
   ```
3. Buka browser pada alamat [http://localhost:3000](http://localhost:3000).

---

## ⚡ Deployment ke Vercel

Proyek ini telah dikonfigurasi agar siap dideploy ke **Vercel** tanpa memerlukan pengaturan server tambahan:

1. Buat repositori Git di Github/Gitlab/Bitbucket, kemudian hubungkan kode sumber Anda.
2. Masuk ke dasbor [Vercel](https://vercel.com) dan impor repositori tersebut.
3. Di tab **Environment Variables**, masukkan key-value dari konfigurasi di atas jika Anda ingin mengaktifkan Analytics, Ads, dan Search Console.
4. Klik **Deploy**. Vercel akan otomatis mendeteksi konfigurasi Next.js 15, melakukan static pre-rendering, dan mendistribusikannya via edge network global mereka.
