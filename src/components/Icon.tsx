import React from "react";
import * as Icons from "lucide-react";

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function Icon({ name, className = "h-5 w-5", size }: IconProps) {
  // @ts-ignore
  const LucideIcon = Icons[name];

  if (!LucideIcon) {
    // Fallback icon
    return <Icons.Cpu className={className} size={size} />;
  }

  return <LucideIcon className={className} size={size} />;
}
