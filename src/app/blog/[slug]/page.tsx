import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, User, ArrowLeft, Cpu } from "lucide-react";
import { BLOG_POSTS } from "@/data/blog";
import { TOOLS } from "@/data/tools";
import AdPlaceholder from "@/components/AdPlaceholder";
import Breadcrumb from "@/components/Breadcrumb";
import JsonLd, { generateArticleSchema, generateBreadcrumbSchema } from "@/components/JsonLd";
import Icon from "@/components/Icon";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  
  if (!post) {
    return {
      title: "Artikel Tidak Ditemukan - Toolin",
    };
  }

  return {
    title: `${post.title} - Toolin`,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} - Toolin`,
      description: post.description,
      url: `https://toolin.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} - Toolin`,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Find related tool details
  const relatedToolsData = TOOLS.filter((tool) => post.relatedTools.includes(tool.id));

  const breadcrumbItems = [
    { name: "Blog", item: "/blog" },
    { name: post.title, item: `/blog/${post.slug}` },
  ];

  return (
    <article className="space-y-8 max-w-4xl mx-auto">
      {/* Schemas */}
      <JsonLd data={generateBreadcrumbSchema(breadcrumbItems)} />
      <JsonLd
        data={generateArticleSchema({
          title: post.title,
          description: post.description,
          url: `/blog/${post.slug}`,
          datePublished: post.date,
          author: post.author,
        })}
      />

      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Back Button */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Kembali ke Blog</span>
      </Link>

      {/* Article Header */}
      <header className="space-y-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-xs font-bold text-blue-650 dark:text-blue-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Headline */}
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white">
          {post.title}
        </h1>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-6 text-xs md:text-sm text-slate-500 dark:text-slate-400 border-y border-slate-200 dark:border-slate-800 py-3">
          <span className="flex items-center gap-1.5 font-medium">
            <User className="h-4 w-4 text-slate-450" />
            <span>{post.author}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-slate-450" />
            <span>{post.date}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-slate-450" />
            <span>{post.readTime}</span>
          </span>
        </div>
      </header>

      {/* Top Banner Slot */}
      <AdPlaceholder id={`blog-top-${post.slug}`} type="adsense" size="horizontal" slot="1234567890" />

      {/* Article Body HTML Content */}
      <div 
        className="prose dark:prose-invert max-w-none text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-6"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      {/* Related Tools Segment */}
      {relatedToolsData.length > 0 && (
        <section className="rounded-2xl border border-blue-200 dark:border-blue-900/40 bg-blue-50/70 dark:bg-blue-950/10 p-6 md:p-8 mt-12 space-y-4">
          <div>
            <h2 className="text-base md:text-lg font-bold text-slate-900 dark:text-white">
              Coba Alat Yang Disebutkan Dalam Artikel Ini:
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Gunakan utility tool gratis ini langsung secara aman di browser Anda.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedToolsData.map((tool) => (
              <Link
                key={tool.id}
                href={`/tools/${tool.slug}`}
                className="flex items-center gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-4 hover:border-blue-500 dark:hover:border-blue-500/50 transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  <Icon name={tool.icon} className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs md:text-sm font-bold text-slate-800 dark:text-slate-100">
                    {tool.name}
                  </h3>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 line-clamp-1">
                    {tool.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Bottom Adsterra Banner */}
      <AdPlaceholder id={`blog-bottom-${post.slug}`} type="adsterra" size="responsive" />
    </article>
  );
}
