"use client";

import React, { useEffect, useState } from "react";

interface AdPlaceholderProps {
  id: string;
  type: "adsense" | "adsterra";
  size?: "horizontal" | "rectangle" | "responsive";
  slot?: string; // Specific slot ID for adsense
}

interface AdsterraBannerProps {
  placementId: string;
  width: number;
  height: number;
  className?: string;
}

function AdsterraBanner({ placementId, width, height, className = "" }: AdsterraBannerProps) {
  return (
    <div
      className={`my-4 flex justify-center items-center ${className}`}
      style={{ minHeight: `${height}px` }}
      ref={(el) => {
        if (el && !el.querySelector("iframe") && !el.querySelector("script")) {
          const script = document.createElement("script");
          script.type = "text/javascript";
          script.src = `https://www.highperformanceformat.com/${placementId}/invoke.js`;

          const configScript = document.createElement("script");
          configScript.type = "text/javascript";
          configScript.innerHTML = `
            atOptions = {
              'key' : '${placementId}',
              'format' : 'iframe',
              'height' : ${height},
              'width' : ${width},
              'params' : {}
            };
          `;
          el.appendChild(configScript);
          el.appendChild(script);
        }
      }}
    />
  );
}

export default function AdPlaceholder({
  id,
  type,
  size = "responsive",
  slot,
}: AdPlaceholderProps) {
  const [isClient, setIsClient] = useState(false);
  
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const adsterraEnabled = process.env.NEXT_PUBLIC_ADSTERRA_ENABLED !== "false";

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && typeof window !== "undefined" && adsenseClient && type === "adsense") {
      try {
        // @ts-expect-error window.adsbygoogle is injected by external script
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.warn("AdSense script load warning:", e);
      }
    }
  }, [isClient, adsenseClient, type]);

  const sizeClasses = {
    horizontal: "h-[90px] w-full max-w-[728px] mx-auto",
    rectangle: "h-[250px] w-[300px] mx-auto",
    responsive: "min-h-[100px] w-full",
  };

  // If environment variables are not specified, show a beautiful developer placeholder
  const showPlaceholder = !isClient || (type === "adsense" && !adsenseClient) || (type === "adsterra" && !adsterraEnabled);

  if (showPlaceholder) {
    return (
      <div
        id={`ad-placeholder-${id}`}
        className={`relative flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-900/30 p-4 text-center transition-colors ${sizeClasses[size]}`}
      >
        <span className="absolute top-2 right-2 rounded-md bg-blue-100 dark:bg-blue-900/40 px-1.5 py-0.5 text-[10px] font-medium text-blue-700 dark:text-blue-300 uppercase tracking-wider">
          Ad Space
        </span>
        <div className="flex items-center gap-2 text-slate-400 dark:text-slate-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-pulse"
          >
            <rect width="20" height="20" x="2" y="2" rx="2" />
            <path d="M12 2v20" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {type === "adsense" ? "Google AdSense" : "Adsterra Network"}
          </span>
        </div>
        <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500 max-w-[80%] truncate">
          {type === "adsense" ? `Slot ID: ${slot || "Auto"}` : `Placement ID: ${id}`}
        </p>
      </div>
    );
  }

  // Active Ad Implementation
  if (type === "adsense") {
    return (
      <div className={`overflow-hidden my-4 ${sizeClasses[size]}`}>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={adsenseClient}
          data-ad-slot={slot || "auto"}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  if (type === "adsterra") {
    if (size === "responsive") {
      // Native Banner
      const containerId = "container-48c6781d48c9c9bd34bbef06ee262a26";
      const scriptSrc = "https://pl29784972.effectivecpmnetwork.com/48c6781d48c9c9bd34bbef06ee262a26/invoke.js";

      return (
        <div
          id={containerId}
          className="my-4 w-full flex justify-center items-center min-h-[100px]"
          ref={(el) => {
            if (el && !el.querySelector(`script[src="${scriptSrc}"]`)) {
              const script = document.createElement("script");
              script.type = "text/javascript";
              script.async = true;
              script.src = scriptSrc;
              script.setAttribute("data-cfasync", "false");
              el.appendChild(script);
            }
          }}
        />
      );
    }

    if (size === "horizontal") {
      return (
        <div className="w-full flex flex-col items-center justify-center">
          {/* Desktop: 728x90 */}
          <AdsterraBanner
            placementId="8b030df18945d25fc20ad83de286f5ba"
            width={728}
            height={90}
            className="hidden md:flex"
          />
          {/* Mobile: 320x50 */}
          <AdsterraBanner
            placementId="60e89853e287d8c27b0106ee930cc13f"
            width={320}
            height={50}
            className="flex md:hidden"
          />
        </div>
      );
    }

    if (size === "rectangle") {
      return (
        <AdsterraBanner
          placementId="f9ee754788392bdbaa1d29404703f31a"
          width={300}
          height={250}
        />
      );
    }
  }

  return null;
}
