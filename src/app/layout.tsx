import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Toolin - Kumpulan Utility Tools Online Gratis & Cepat",
  description: "Toolin menyediakan alat bantu utilitas gratis seperti kompres gambar, resize foto, generator sandi, pembuat QR code, dan penghitung kata secara offline di browser Anda.",
  metadataBase: new URL("https://toolin.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Toolin - Kumpulan Utility Tools Online Gratis & Cepat",
    description: "Toolin menyediakan alat bantu utilitas gratis seperti kompres gambar, resize foto, generator sandi, pembuat QR code, dan penghitung kata secara offline di browser Anda.",
    url: "https://toolin.com",
    siteName: "Toolin",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Toolin - Kumpulan Utility Tools Online Gratis",
    description: "Utility tools online gratis seperti kompres gambar, resize foto, generator sandi, pembuat QR code, dan penghitung kata.",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Google AdSense Account Verification Meta */}
        <meta name="google-adsense-account" content="ca-pub-7937601712495858" />

        {/* Google AdSense Script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7937601712495858"
          crossorigin="anonymous"
        />
        
        {/* Google Analytics Script */}
        {gaId && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="min-h-full flex flex-col bg-[#f8fafc] text-[#0f172a] dark:bg-[#0b0f19] dark:text-[#f8fafc] font-sans antialiased">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
