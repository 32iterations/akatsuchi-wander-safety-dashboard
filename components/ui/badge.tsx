import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "outline";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const base =
    "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors";
  const variants: Record<NonNullable<BadgeProps["variant"]>, string> = {
    default: "bg-neutral-100 text-neutral-800 border border-neutral-300",
    success: "bg-success-100 text-success-800 border border-success-300",
    warning: "bg-warning-100 text-warning-800 border border-warning-300",
    danger: "bg-danger-100 text-danger-800 border border-danger-300",
    outline: "border-2 border-neutral-400 text-neutral-800 bg-white"
  };

  return (
    <span className={cn(base, variants[variant], className)} {...props} />
  );
}
