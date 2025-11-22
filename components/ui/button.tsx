import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "outline";
  size?: "sm" | "md";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", asChild = false, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-1 rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:opacity-60 disabled:cursor-not-allowed";
    const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
      default:
        "bg-amber-500 text-slate-950 hover:bg-amber-400 active:bg-amber-300",
      ghost:
        "bg-transparent text-slate-100 hover:bg-slate-800/70 active:bg-slate-700/70",
      outline:
        "border border-slate-600 text-slate-100 hover:bg-slate-800/60 active:bg-slate-700/60"
    };
    const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
      sm: "px-3 py-1 text-xs",
      md: "px-4 py-1.5 text-sm"
    };

    const classes = cn(base, variants[variant], sizes[size], className);

    if (asChild) {
      const child = React.Children.only(props.children) as React.ReactElement<any>;
      return React.cloneElement(child, {
        className: cn(child.props?.className, classes),
        ref
      });
    }

    return (
      <button
        ref={ref}
        className={classes}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
