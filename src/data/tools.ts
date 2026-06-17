export interface FAQItem {
  question: string;
  answer: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  slug: string;
  icon: string;
  category: "image" | "generator" | "text" | "developer" | "pdf";
  searchKeywords: string[];
  seoTitle: string;
  metaDescription: string;
  faqs: FAQItem[];
}

export const CATEGORIES = [
  { id: "image", name: "Image Tools", description: "Convert, resize, crop, and compress images easily inside your browser.", icon: "Image" },
  { id: "generator", name: "Generators", description: "Generate secure passwords, QR codes, UUIDs, and more instantly.", icon: "Settings" },
  { id: "text", name: "Text & Counters", description: "Analyze your writing with word counters, reading estimations, and keyword density checkers.", icon: "FileText" },
] as const;

export const TOOLS: Tool[] = [
  {
    id: "compress-image",
    name: "Compress Image",
    description: "Kompres file gambar PNG, JPG, JPEG, dan WEBP ke ukuran lebih kecil tanpa merusak kualitas.",
    slug: "compress-image",
    icon: "Minimize",
    category: "image",
    searchKeywords: ["compress image", "kompres foto", "perkecil ukuran foto", "compress jpeg", "compress png", "kompres gambar", "compress foto 200kb"],
    seoTitle: "Kompres Foto Online Gratis - Compress Gambar PNG/JPG - Toolin",
    metaDescription: "Kompres ukuran foto & gambar Anda online secara gratis. Ubah ukuran file PNG, JPG, dan WEBP menjadi lebih kecil di bawah 200kb dengan cepat dan aman.",
    faqs: [
      {
        question: "Apakah aman mengompres foto di Toolin?",
        answer: "Sangat aman. Proses kompresi gambar dilakukan sepenuhnya di browser Anda (client-side). Foto Anda tidak pernah diunggah ke server kami, sehingga privasi Anda terjaga 100%."
      },
      {
        question: "Berapa ukuran file maksimal yang bisa dikompres?",
        answer: "Karena dijalankan secara lokal di browser Anda, tidak ada batasan ukuran file yang kaku, namun kami menyarankan file di bawah 50MB agar browser Anda tetap responsif."
      },
      {
        question: "Bagaimana cara kompres foto hingga di bawah 200KB?",
        answer: "Cukup unggah foto Anda di tool Compress Image kami, lalu geser slider kualitas gambar ke arah kiri hingga indikator perkiraan ukuran menampilkan angka di bawah 200KB sebelum mendownload."
      }
    ]
  },
  {
    id: "resize-image",
    name: "Resize Image",
    description: "Ubah dimensi lebar (width) dan tinggi (height) gambar Anda dalam piksel dengan rasio aspek terkunci atau bebas.",
    slug: "resize-image",
    icon: "Maximize",
    category: "image",
    searchKeywords: ["resize image", "ubah ukuran foto", "resize foto 3x4", "resize jpeg", "resize png", "resolusi gambar", "resize foto online"],
    seoTitle: "Resize Foto Online Gratis - Ubah Resolusi & Ukuran Gambar - Toolin",
    metaDescription: "Ubah ukuran resolusi foto Anda online secara gratis. Resize dimensi piksel gambar PNG, JPG, WEBP untuk kebutuhan dokumen, pas foto 3x4, 4x6 dengan mudah.",
    faqs: [
      {
        question: "Bagaimana cara resize foto menjadi ukuran 3x4?",
        answer: "Unggah foto Anda, nonaktifkan opsi 'Lock Aspect Ratio', lalu masukkan lebar 354 piksel dan tinggi 472 piksel (atau setara dengan perbandingan aspek 3:4), kemudian unduh hasilnya."
      },
      {
        question: "Apakah kualitas gambar akan berkurang setelah di-resize?",
        answer: "Mengurangi dimensi gambar biasanya mempertahankan ketajaman visual. Jika Anda memperbesar dimensi melampaui resolusi asli, gambar mungkin terlihat sedikit blur atau pecah."
      }
    ]
  },
  {
    id: "crop-image",
    name: "Crop Image",
    description: "Potong gambar Anda ke rasio aspek tertentu seperti 1:1, 16:9, 4:3 secara instan.",
    slug: "crop-image",
    icon: "Crop",
    category: "image",
    searchKeywords: ["crop image", "potong foto", "potong gambar online", "crop jpeg", "crop png", "crop foto persegi"],
    seoTitle: "Potong Foto Online Gratis - Crop Gambar JPG/PNG Instan - Toolin",
    metaDescription: "Potong bagian gambar yang tidak diinginkan secara online dan gratis. Crop foto Anda dengan rasio aspek populer (1:1, 16:9, 4:3, 3:4) langsung dari browser Anda.",
    faqs: [
      {
        question: "Apakah saya harus mengunduh aplikasi untuk memotong gambar?",
        answer: "Tidak perlu. Tool Crop Image kami bekerja langsung di browser Chrome, Safari, Firefox, maupun browser mobile tanpa instalasi tambahan."
      },
      {
        question: "Apa saja rasio aspek crop yang tersedia?",
        answer: "Tersedia rasio aspek populer seperti Square (1:1), Widescreen (16:9), Standard (4:3), Portrait (3:4), serta pilihan Custom untuk memotong secara bebas."
      }
    ]
  },
  {
    id: "png-to-jpg",
    name: "PNG to JPG",
    description: "Ubah gambar format PNG dengan transparansi menjadi format JPG dengan latar belakang warna putih secara instan.",
    slug: "png-to-jpg",
    icon: "RefreshCw",
    category: "image",
    searchKeywords: ["png to jpg", "ubah png ke jpg", "convert png to jpg", "konversi gambar png", "png ke jpeg"],
    seoTitle: "Konversi PNG ke JPG Online Gratis - Cepat & Tanpa Upload - Toolin",
    metaDescription: "Ubah format file gambar PNG menjadi JPG secara gratis. Konversi cepat secara client-side, aman untuk data sensitif, tanpa batas jumlah file harian.",
    faqs: [
      {
        question: "Apa yang terjadi pada transparansi PNG saat diubah ke JPG?",
        answer: "Format JPG tidak mendukung transparansi (alpha channel). Bagian transparan pada gambar PNG Anda secara otomatis akan diubah menjadi warna putih bersih saat dikonversi ke JPG."
      },
      {
        question: "Mengapa mengubah PNG ke JPG?",
        answer: "File JPG biasanya memiliki ukuran file yang jauh lebih kecil daripada PNG, yang sangat berguna untuk mempercepat loading website atau untuk memenuhi syarat upload dokumen tertentu."
      }
    ]
  },
  {
    id: "jpg-to-png",
    name: "JPG to PNG",
    description: "Konversi gambar JPG atau JPEG menjadi format PNG berkualitas tinggi tanpa kompresi kehilangan data.",
    slug: "jpg-to-png",
    icon: "RefreshCw",
    category: "image",
    searchKeywords: ["jpg to png", "ubah jpg ke png", "convert jpg to png", "jpeg to png online", "ubah jpeg ke png"],
    seoTitle: "Konversi JPG ke PNG Online Gratis - Kualitas Tinggi - Toolin",
    metaDescription: "Ubah gambar JPG atau JPEG Anda menjadi PNG berkualitas tinggi. Konversi instan berjalan di browser, 100% lokal, aman, dan tanpa watermark.",
    faqs: [
      {
        question: "Apakah mengubah JPG ke PNG akan otomatis membuat latar belakang transparan?",
        answer: "Tidak. Mengubah JPG ke PNG hanya mengganti format wadahnya. PNG hasil konversi akan tetap memiliki latar belakang padat dari gambar asli. Untuk transparansi, Anda perlu menggunakan tool background remover."
      },
      {
        question: "Apakah ada batasan jumlah konversi file?",
        answer: "Tidak ada batasan sama sekali. Konversi berlangsung di komputer/HP Anda sendiri, sehingga Anda dapat mengonversi gambar sebanyak yang Anda inginkan."
      }
    ]
  },
  {
    id: "webp-to-png",
    name: "WEBP to PNG",
    description: "Konversi gambar format WEBP generasi baru menjadi PNG agar kompatibel dengan software editing lama.",
    slug: "webp-to-png",
    icon: "RefreshCw",
    category: "image",
    searchKeywords: ["webp to png", "ubah webp ke png", "convert webp to png", "webp converter", "webp ke png online"],
    seoTitle: "Konversi WEBP ke PNG Online Gratis - Instan & Mudah - Toolin",
    metaDescription: "Konversi file WEBP ke PNG secara gratis dan online. Pertahankan transparansi penuh dan kualitas gambar tanpa upload ke server.",
    faqs: [
      {
        question: "Apakah gambar PNG hasil konversi tetap memiliki transparansi?",
        answer: "Ya. Format WEBP dan PNG keduanya mendukung transparansi. Tool kami akan mempertahankan transparansi asli gambar selama proses konversi."
      },
      {
        question: "Mengapa saya perlu mengubah WEBP ke PNG?",
        answer: "Meskipun WEBP sangat bagus untuk web, beberapa aplikasi pengolah gambar lama, sistem operasi jadul, atau form pendaftaran online belum mendukung format WEBP secara penuh."
      }
    ]
  },
  {
    id: "qr-generator",
    name: "QR Generator",
    description: "Buat QR Code kustom untuk URL, teks biasa, email, atau nomor telepon dengan warna dan ukuran yang bisa disesuaikan.",
    slug: "qr-generator",
    icon: "QrCode",
    category: "generator",
    searchKeywords: ["qr generator", "buat qr code", "qr code generator online", "bikin barcode qr", "qr generator gratis"],
    seoTitle: "QR Code Generator Online Gratis - Kustom Warna & Ukuran - Toolin",
    metaDescription: "Buat QR Code secara instan dan gratis. Masukkan URL atau teks, kustom warna latar depan/belakang, dan unduh sebagai gambar PNG atau SVG siap pakai.",
    faqs: [
      {
        question: "Bagaimana cara membuat QR Code untuk link website?",
        answer: "Pilih opsi input teks/URL, ketikkan alamat website lengkap (misal: https://toolin.com), atur warna atau ukuran jika diinginkan, lalu klik tombol download PNG atau SVG."
      },
      {
        question: "Apakah QR Code yang dihasilkan memiliki masa kedaluwarsa?",
        answer: "Tidak. QR Code yang dihasilkan bersifat statis dan berlaku selamanya. Selama informasi di dalamnya valid (seperti URL yang aktif), QR Code tersebut akan selalu bisa dipindai."
      }
    ]
  },
  {
    id: "password-generator",
    name: "Password Generator",
    description: "Buat password acak yang kuat, aman, dan sulit didebak untuk meningkatkan keamanan akun online Anda.",
    slug: "password-generator",
    icon: "Lock",
    category: "generator",
    searchKeywords: ["password generator", "buat sandi aman", "generate password", "strong password generator", "bikin password acak"],
    seoTitle: "Password Generator Online Gratis - Buat Sandi Kuat - Toolin",
    metaDescription: "Generate password kuat dan acak secara gratis. Atur panjang karakter, kombinasikan huruf besar-kecil, angka, simbol, serta hindari karakter membingungkan.",
    faqs: [
      {
        question: "Berapa panjang password yang disarankan untuk keamanan maksimal?",
        answer: "Kami menyarankan panjang minimal 12 hingga 16 karakter yang mengombinasikan huruf kapital, huruf kecil, angka, dan simbol unik untuk mencegah peretasan brute force."
      },
      {
        question: "Apakah password yang digenerate di Toolin disimpan di database?",
        answer: "Sama sekali tidak. Generator kata sandi kami berjalan secara lokal di browser Anda menggunakan Web Cryptography API. Tidak ada data sandi yang dikirimkan atau disimpan di server."
      }
    ]
  },
  {
    id: "uuid-generator",
    name: "UUID Generator",
    description: "Hasilkan satu atau puluhan UUID v4 (Universally Unique Identifier) acak untuk keperluan testing dan software development.",
    slug: "uuid-generator",
    icon: "Hash",
    category: "generator",
    searchKeywords: ["uuid generator", "guid generator", "generate uuid v4", "uuid online", "uuid generator bulk"],
    seoTitle: "UUID Generator Online Gratis - Generate UUID v4 Bulk - Toolin",
    metaDescription: "Generate UUID (Universally Unique Identifier) versi 4 acak secara massal (bulk) hingga 100 UUID sekaligus. Mudah disalin dalam satu klik.",
    faqs: [
      {
        question: "Apa itu UUID v4?",
        answer: "UUID v4 adalah kode unik 128-bit yang dihasilkan secara acak menggunakan algoritma kriptografi yang aman. Peluang terjadinya bentrokan (collision) UUID v4 hampir mendekati nol."
      },
      {
        question: "Apakah UUID yang dihasilkan di sini bisa langsung disalin?",
        answer: "Ya, kami menyediakan tombol 'Copy all' untuk menyalin seluruh UUID yang digenerate sekaligus ke clipboard Anda, atau menyalin per item secara individual."
      }
    ]
  },
  {
    id: "word-counter",
    name: "Word Counter",
    description: "Hitung jumlah kata, karakter, kalimat, paragraf secara real-time disertai analisis kepadatan kata kunci dan waktu baca.",
    slug: "word-counter",
    icon: "FileText",
    category: "text",
    searchKeywords: ["word counter", "hitung kata online", "hitung karakter online", "analisis teks", "word density check", "penghitung kata"],
    seoTitle: "Word Counter Online Gratis - Hitung Jumlah Kata & Karakter - Toolin",
    metaDescription: "Hitung jumlah kata, karakter (dengan/tanpa spasi), kalimat, paragraf secara instan. Dilengkapi analisis kepadatan kata kunci (keyword density) gratis.",
    faqs: [
      {
        question: "Bagaimana cara kerja penghitung kata di Toolin?",
        answer: "Cukup ketik atau paste teks Anda ke dalam kotak yang disediakan. Statistik teks Anda seperti jumlah kata, karakter, dan waktu baca akan langsung terupdate secara otomatis saat Anda mengetik."
      },
      {
        question: "Apa itu analisis kepadatan kata kunci (keyword density)?",
        answer: "Fitur ini menganalisis teks Anda untuk menemukan kata apa saja yang paling sering diulang dan persentasenya. Berguna bagi penulis artikel SEO untuk memastikan kata kunci utama tidak berlebihan (keyword stuffing)."
      }
    ]
  }
];
