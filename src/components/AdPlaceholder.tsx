"use client";

import React, { useEffect, useState } from "react";

interface AdPlaceholderProps {
  id: string;
  type: "adsense" | "adsterra";
  size?: "horizontal" | "rectangle" | "responsive";
  slot?: string; // Specific slot ID for adsense
}

export default function AdPlaceholder({
  id,
  type,
  size = "responsive",
  slot,
}: AdPlaceholderProps) {
  const [isClient, setIsClient] = useState(false);
  
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const adsterraEnabled = process.env.NEXT_PUBLIC_ADSTERRA_ENABLED === "true";

  useEffect(() => {
    setIsClient(true);
    
    // In production, when ads are active, we let AdSense script handle its DOM
    if (typeof window !== "undefined" && adsenseClient && type === "adsense") {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.warn("AdSense script load warning:", e);
      }
    }
  }, [adsenseClient, type]);

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
    // For Adsterra, native ads are usually placed via a script element.
    // We can inject the Adsterra script inside a target container
    return (
      <div 
        id={`adsterra-placement-${id}`} 
        className={`my-4 flex justify-center items-center ${sizeClasses[size]}`}
        ref={(el) => {
          if (el && !el.querySelector("script")) {
            const script = document.createElement("script");
            script.type = "text/javascript";
            // Check if there is an Adsterra code key mapping
            script.src = `//www.highperformanceformat.com/${id}/invoke.js`;
            
            const configScript = document.createElement("script");
            configScript.type = "text/javascript";
            configScript.innerHTML = `
              atOptions = {
                'key' : '${id}',
                'format' : 'iframe',
                'height' : ${size === "horizontal" ? 90 : size === "rectangle" ? 250 : 60},
                'width' : ${size === "horizontal" ? 728 : size === "rectangle" ? 300 : 468},
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

  return null;
}
