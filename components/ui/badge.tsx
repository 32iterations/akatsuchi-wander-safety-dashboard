import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "danger";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium";
  const variants: Record<NonNullable<BadgeProps["variant"]>, string> = {
    default: "bg-slate-800 text-slate-100",
    outline: "border border-slate-500/50 text-slate-200",
    danger: "bg-red-500/20 text-red-300 border border-red-500/40"
  };

  return (
    <span className={cn(base, variants[variant], className)} {...props} />
  );
}
