"use client";

import React from "react";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import { BLOG_POSTS } from "@/data/blog";
import AdPlaceholder from "@/components/AdPlaceholder";
import Breadcrumb from "@/components/Breadcrumb";

export default function BlogListPage() {
  const breadcrumbItems = [{ name: "Blog", item: "/blog" }];

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Header Section */}
      <div className="space-y-2 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-xs font-bold text-blue-650 dark:text-blue-400">
          <BookOpen className="h-3.5 w-3.5" />
          <span>Blog & Tutorial</span>
        </div>
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Panduan Lengkap & Tips Optimalisasi Web
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
          Temukan trik praktis seputar pas foto pendaftaran CPNS/sekolah, generator kode unik, cara mempercepat loading gambar, dan tips SEO gratis lainnya.
        </p>
      </div>

      {/* Adsterra Top Banner */}
      <AdPlaceholder id="blog-list-top-adsterra" type="adsterra" size="horizontal" />

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.slug}
            className="group flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 shadow-sm hover:shadow-md transition-all hover:border-blue-500 dark:hover:border-blue-500/50"
          >
            {/* Meta Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-200/60 dark:bg-slate-800 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600 dark:text-slate-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h2 className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>

            {/* Description */}
            <p className="mt-2 text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex-1">
              {post.description}
            </p>

            {/* Post details */}
            <div className="mt-6 border-t border-slate-100 dark:border-slate-800 pt-4 flex items-center justify-between gap-4 text-xs text-slate-400 dark:text-slate-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{post.date}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{post.readTime}</span>
                </span>
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1 font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                <span>Baca artikel</span>
                <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Adsterra banner at bottom */}
      <AdPlaceholder id="blog-list-bottom-adsterra" type="adsterra" size="responsive" />
    </div>
  );
}
