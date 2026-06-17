export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  readTime: string;
  contentHtml: string;
  tags: string[];
  seoKeywords: string[];
  relatedTools: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "cara-compress-foto-200kb",
    title: "Cara Kompres Foto hingga Di Bawah 200KB Tanpa Pecah",
    description: "Panduan lengkap cara mengompres ukuran file foto JPG atau PNG menjadi di bawah 200KB secara online, gratis, dan kualitas gambar tetap tajam.",
    date: "2026-06-15",
    author: "Tim Redaksi Toolin",
    readTime: "4 menit baca",
    tags: ["Gambar", "Tips & Trik", "Kompresi"],
    seoKeywords: ["cara kompres foto 200kb", "kompres foto online", "perkecil foto gratis", "kompres gambar jpg"],
    relatedTools: ["compress-image"],
    contentHtml: `
      <p>Mengompres foto seringkali menjadi kebutuhan wajib, terutama saat Anda ingin mendaftar CPNS, mendaftar sekolah/kuliah, atau mengunggah dokumen administrasi ke portal instansi pemerintah yang membatasi ukuran file maksimal 200KB.</p>
      
      <p>Banyak orang mengeluh bahwa setelah ukuran foto diperkecil, kualitas gambar menjadi pecah, buram, dan sulit dibaca. Namun, Anda tidak perlu khawatir! Di artikel ini, kami akan membahas cara kompres foto hingga di bawah 200KB dengan tetap menjaga kualitas visualnya.</p>
      
      <h2 class="text-xl font-bold mt-6 mb-2">Mengapa Ukuran Foto Harus Dibatasi?</h2>
      <p>Batasan ukuran file (seperti 200KB) bertujuan untuk menghemat bandwidth server penerima dan mempercepat waktu pemuatan halaman. Bayangkan jika puluhan ribu pendaftar mengunggah foto masing-masing berukuran 5MB; server akan menjadi sangat lambat dan berpotensi mengalami crash.</p>
      
      <h2 class="text-xl font-bold mt-6 mb-2">Cara Kompres Foto Online via Toolin</h2>
      <p>Cara termudah dan paling aman untuk mengompres foto adalah menggunakan aplikasi web lokal seperti <strong>Toolin Compress Image</strong>. Berikut langkah-langkahnya:</p>
      
      <ol class="list-decimal pl-6 my-4 space-y-2">
        <li>Buka tool <a href="/tools/compress-image" class="text-blue-600 dark:text-blue-400 hover:underline">Compress Image</a> di website Toolin.</li>
        <li>Drag & drop atau klik area unggah untuk memilih foto JPG, PNG, atau WEBP yang ingin dikompres.</li>
        <li>Gunakan <strong>Slider Kualitas</strong> di bawah gambar pratinjau. Geser slider untuk mengatur tingkat kompresi. Indikator ukuran file akan langsung berubah secara real-time.</li>
        <li>Atur slider hingga perkiraan ukuran file berada di kisaran 150KB - 190KB (aman di bawah 200KB).</li>
        <li>Klik tombol <strong>Download Compressed Image</strong> untuk mengunduh foto Anda yang baru.</li>
      </ol>

      <h2 class="text-xl font-bold mt-6 mb-2">Tips Tambahan: Menghindari Gambar Pecah</h2>
      <ul class="list-disc pl-6 my-4 space-y-2">
        <li><strong>Gunakan Format yang Tepat:</strong> Gunakan JPG/JPEG jika foto Anda adalah foto potret wajah asli. JPG memiliki algoritma kompresi warna yang lebih baik dibanding PNG untuk foto berwarna kompleks.</li>
        <li><strong>Jangan Kompres Berulang Kali:</strong> Melakukan kompresi berulang pada satu file JPG yang sama akan merusak piksel secara permanen. Selalu gunakan file foto asli/master Anda untuk memulai kompresi baru.</li>
        <li><strong>Sesuaikan Resolusi Terlebih Dahulu:</strong> Jika resolusi foto awal sangat besar (misal 4000x3000 piksel), gunakan tool <a href="/tools/resize-image" class="text-blue-600 dark:text-blue-400 hover:underline">Resize Image</a> terlebih dahulu untuk mengecilkan resolusi ke ukuran standar seperti 1920x1080 piksel, baru kemudian lakukan kompresi.</li>
      </ul>

      <h2 class="text-xl font-bold mt-6 mb-2">Kesimpulan</h2>
      <p>Mengompres foto di bawah 200KB kini sangat mudah dan aman dilakukan tanpa harus menginstal software berat seperti Photoshop. Melalui Toolin, seluruh pemrosesan foto Anda berjalan 100% di browser Anda sendiri, aman dari kebocoran data pribadi.</p>
    `
  },
  {
    slug: "cara-resize-foto-3x4",
    title: "Cara Resize Foto Menjadi Ukuran 3x4 dalam Piksel",
    description: "Langkah mudah mengubah ukuran pas foto menjadi 3x4 secara online dan gratis menggunakan resolusi piksel standar pendaftaran.",
    date: "2026-06-16",
    author: "Tim Redaksi Toolin",
    readTime: "3 menit baca",
    tags: ["Gambar", "Dokumen", "Tutorial"],
    seoKeywords: ["resize foto 3x4", "ukuran foto 3x4 piksel", "ubah ukuran pas foto online", "pas foto 3x4"],
    relatedTools: ["resize-image"],
    contentHtml: `
      <p>Ketika mengisi formulir pendaftaran kerja, sekolah, CPNS, atau dokumen resmi lainnya, Anda seringkali diminta mengunggah pas foto berukuran 3x4 atau 4x6. Namun, banyak dari kita yang hanya memiliki file foto berukuran besar atau memiliki aspek rasio yang berbeda.</p>
      
      <p>Bagaimana cara mengubah ukuran pas foto tersebut menjadi ukuran tepat 3x4 secara online? Di artikel ini kita akan membahas ukuran standar dalam piksel beserta panduan cara mengubahnya secara langsung menggunakan browser.</p>

      <h2 class="text-xl font-bold mt-6 mb-2">Berapa Piksel Ukuran Foto 3x4?</h2>
      <p>Secara fisik, foto 3x4 berukuran 3cm x 4cm. Untuk meresize-nya di komputer atau handphone, kita harus mengonversinya ke dalam satuan piksel (px) berdasarkan standar kerapatan cetak (DPI) yang umum:</p>
      
      <ul class="list-disc pl-6 my-4 space-y-2">
        <li><strong>Ukuran 3x4 standar (300 DPI):</strong> Lebar <strong>354 px</strong> dan Tinggi <strong>472 px</strong> (Rekomendasi kualitas tajam).</li>
        <li><strong>Ukuran 3x4 standar (150 DPI):</strong> Lebar <strong>177 px</strong> dan Tinggi <strong>236 px</strong>.</li>
      </ul>

      <h2 class="text-xl font-bold mt-6 mb-2">Cara Mengubah Foto ke Ukuran 3x4 Online</h2>
      <p>Anda bisa menggunakan tool <strong>Toolin Resize Image</strong> secara instan dengan cara berikut:</p>

      <ol class="list-decimal pl-6 my-4 space-y-2">
        <li>Kunjungi halaman tool <a href="/tools/resize-image" class="text-blue-600 dark:text-blue-400 hover:underline">Resize Image</a> di Toolin.</li>
        <li>Pilih dan upload pas foto Anda yang ingin di-resize.</li>
        <li>Matikan opsi <strong>"Lock Aspect Ratio"</strong> (atau 'Kunci Rasio Aspek') agar Anda bisa mengedit lebar dan tinggi secara bebas.</li>
        <li>Ketik <strong>354</strong> pada kolom Width (Lebar) dan ketik <strong>472</strong> pada kolom Height (Tinggi).</li>
        <li>Klik tombol <strong>Resize & Download Image</strong> untuk langsung mengunduh pas foto ukuran 3x4 Anda.</li>
      </ol>

      <p>Jika foto Anda memiliki proporsi yang terlalu melebar dan menjadi gepeng setelah di-resize tanpa kunci aspek rasio, Anda harus memotongnya terlebih dahulu menggunakan tool <a href="/tools/crop-image" class="text-blue-600 dark:text-blue-400 hover:underline">Crop Image</a> dengan rasio 3:4 sebelum melakukan resize.</p>

      <h2 class="text-xl font-bold mt-6 mb-2">Mengapa Menggunakan Toolin?</h2>
      <p>Meresize pas foto di Toolin sangat cepat karena pemrosesan gambar dijalankan sepenuhnya di browser Anda. Foto Anda tidak diunggah ke server kami, menjamin kerahasiaan foto paspor atau kartu identitas Anda dari akses luar.</p>
    `
  },
  {
    slug: "cara-membuat-qr-code",
    title: "Cara Membuat QR Code Kustom untuk Link & Teks Secara Gratis",
    description: "Cara membuat QR Code statis sendiri untuk alamat link website, teks, email, atau nomor HP gratis dengan warna kustom menarik.",
    date: "2026-06-17",
    author: "Tim Redaksi Toolin",
    readTime: "4 menit baca",
    tags: ["Generator", "Marketing", "Bisnis"],
    seoKeywords: ["cara membuat qr code", "qr code generator gratis", "bikin qr code link", "generate qr code kustom"],
    relatedTools: ["qr-generator"],
    contentHtml: `
      <p>QR Code (Quick Response Code) telah menjadi elemen wajib di era digital saat ini. Mulai dari menu restoran, link pembayaran, kemasan produk, hingga kartu nama bisnis, semuanya menggunakan QR Code untuk mempermudah akses informasi.</p>
      
      <p>Dengan kode ini, audiens Anda hanya perlu mengarahkan kamera smartphone untuk mengakses link website Anda tanpa perlu mengetik alamat URL yang panjang. Berikut panduan lengkap cara membuat QR Code statis kustom sendiri dengan mudah dan gratis.</p>

      <h2 class="text-xl font-bold mt-6 mb-2">Statis vs Dinamis: Apa Bedanya?</h2>
      <p>Sebelum membuat QR Code, Anda perlu tahu bahwa ada dua jenis utama:</p>
      <ul class="list-disc pl-6 my-4 space-y-2">
        <li><strong>QR Code Statis:</strong> Informasi (seperti URL) langsung ditanam di dalam pola kode. Sekali dibuat, isi informasi tidak dapat diubah lagi, dan tidak memiliki batas waktu kedaluwarsa. Ini 100% gratis dan aman.</li>
        <li><strong>QR Code Dinamis:</strong> Mengarahkan pengguna ke link pengantara (redirect). Link tujuan bisa diubah kapan saja tanpa perlu mengganti gambar QR Code. Biasanya membutuhkan biaya langganan bulanan di platform pembuatnya.</li>
      </ul>

      <h2 class="text-xl font-bold mt-6 mb-2">Langkah Membuat QR Code Statis di Toolin</h2>
      <p>Di Toolin, Anda bisa membuat QR Code Statis berkualitas tinggi secara gratis tanpa batasan waktu dan bebas iklan yang mengganggu:</p>

      <ol class="list-decimal pl-6 my-4 space-y-2">
        <li>Buka tool <a href="/tools/qr-generator" class="text-blue-600 dark:text-blue-400 hover:underline">QR Generator</a> di Toolin.</li>
        <li>Ketikkan isi teks atau alamat URL lengkap pada kolom input (misal: <code>https://brand-anda.com/promo</code>). Pastikan mengikutkan <code>https://</code> agar link terbaca sempurna.</li>
        <li>Gunakan pengatur warna untuk menyesuaikan dengan tema merek Anda. Atur warna latar depan (foreground) dan warna latar belakang (background). Pastikan kontras warna tetap tinggi agar mudah dipindai oleh kamera HP.</li>
        <li>Sesuaikan tingkat Koreksi Kesalahan (Error Correction Level). Tingkat lebih tinggi (H) memungkinkan QR code tetap bisa dibaca meskipun gambarnya kotor atau tergores sebagian.</li>
        <li>Unduh QR code Anda dengan menekan tombol <strong>Download PNG</strong> atau <strong>Download SVG</strong> untuk kebutuhan cetak kualitas tinggi.</li>
      </ol>

      <h2 class="text-xl font-bold mt-6 mb-2">Tips Penggunaan QR Code</h2>
      <p>Agar QR Code Anda sukses dipindai oleh semua jenis smartphone, ikuti tips berikut:</p>
      <ul class="list-disc pl-6 my-4 space-y-2">
        <li><strong>Warna Kontras:</strong> Selalu buat warna pola lebih gelap daripada warna latar belakangnya (contoh: pola hitam dengan latar putih/kuning). Pola berwarna terang di atas latar gelap terkadang sulit dibaca oleh beberapa aplikasi scanner.</li>
        <li><strong>Uji Pindai:</strong> Sebelum mencetak QR Code dalam jumlah banyak (seperti brosur atau banner), selalu lakukan uji pindai menggunakan 2 atau 3 handphone yang berbeda.</li>
      </ul>
    `
  },
  {
    slug: "cara-mengubah-png-ke-jpg",
    title: "Cara Mengubah Format PNG ke JPG Tanpa Aplikasi Tambahan",
    description: "Cara praktis mengonversi file gambar PNG menjadi JPG secara online dan instan langsung dari browser laptop atau smartphone.",
    date: "2026-06-17",
    author: "Tim Redaksi Toolin",
    readTime: "3 menit baca",
    tags: ["Gambar", "Format", "Konversi"],
    seoKeywords: ["cara mengubah png ke jpg", "convert png to jpg", "ubah png ke jpg online", "png to jpg converter"],
    relatedTools: ["png-to-jpg"],
    contentHtml: `
      <p>Format gambar PNG sangat populer karena mendukung transparansi (latar belakang kosong) dan mempertahankan kualitas gambar yang detail. Namun, gambar PNG cenderung memiliki ukuran file yang relatif besar dibandingkan JPG.</p>
      
      <p>Ketika Anda ingin mengunggah foto profil, mengirim gambar via email, atau mempostingnya di website, file PNG yang besar bisa membebani loading halaman. Oleh karena itu, mengubah format PNG ke JPG adalah pilihan terbaik untuk menghemat penyimpanan tanpa penurunan ketajaman yang kentara.</p>

      <h2 class="text-xl font-bold mt-6 mb-2">Perbedaan Utama PNG dan JPG</h2>
      <p>Sebelum melakukan konversi, penting untuk memahami perbedaan dasar kedua format ini:</p>
      <ul class="list-disc pl-6 my-4 space-y-2">
        <li><strong>PNG (Portable Network Graphics):</strong> Menggunakan kompresi lossless (tanpa kehilangan data). Mendukung transparansi. Ideal untuk logo, tangkapan layar (screenshot), dan grafis teks yang membutuhkan ketajaman tinggi.</li>
        <li><strong>JPG / JPEG (Joint Photographic Experts Group):</strong> Menggunakan kompresi lossy. Tidak mendukung transparansi. Sangat cocok untuk foto pemandangan, wajah, atau gambar dengan gradasi warna yang kompleks karena ukuran filenya yang kecil.</li>
      </ul>

      <h2 class="text-xl font-bold mt-6 mb-2">Cara Konversi PNG ke JPG di Toolin</h2>
      <p>Tidak perlu menginstal Photoshop atau aplikasi converter berbayar. Cukup ikuti langkah mudah berikut:</p>

      <ol class="list-decimal pl-6 my-4 space-y-2">
        <li>Buka halaman tool <a href="/tools/png-to-jpg" class="text-blue-600 dark:text-blue-400 hover:underline">PNG to JPG Converter</a> di Toolin.</li>
        <li>Drag & drop atau klik area file untuk mengunggah satu atau beberapa file PNG sekaligus dari galeri Anda.</li>
        <li>Gambar pratinjau PNG Anda akan muncul di layar secara otomatis.</li>
        <li>Klik tombol <strong>Convert & Download JPG</strong>. Gambar akan digambar ulang menggunakan HTML5 Canvas dengan format target JPG dan langsung terunduh secara instan.</li>
      </ol>

      <p><em>Catatan: Karena format JPG tidak mendukung transparansi, semua area transparan di file PNG Anda secara otomatis akan diubah menjadi warna latar belakang putih polos.</em></p>

      <h2 class="text-xl font-bold mt-6 mb-2">Aman dan Cepat</h2>
      <p>Tool konversi kami berjalan sepenuhnya secara lokal di browser Anda. File gambar tidak dikirim ke server luar, menjaga kerahasiaan data visual Anda seutuhnya dari risiko peretasan online.</p>
    `
  }
];
