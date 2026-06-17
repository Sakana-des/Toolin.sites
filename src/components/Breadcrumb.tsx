"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  name: string;
  item: string; // The URL path
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center">
      <ol className="flex items-center space-x-2 text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400">
        <li className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <Home className="h-3.5 w-3.5" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.item} className="flex items-center">
              <ChevronRight className="h-3.5 w-3.5 mx-1 text-slate-400 dark:text-slate-600" />
              {isLast ? (
                <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[150px] md:max-w-xs">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.item}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate max-w-[150px] md:max-w-xs"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
