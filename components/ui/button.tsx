import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", asChild = false, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";
    const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
      default:
        "bg-primary-500 text-neutral-900 hover:bg-primary-600 hover:text-white active:bg-primary-700 shadow-sm hover:shadow-md",
      ghost:
        "bg-transparent text-neutral-800 hover:bg-neutral-100 active:bg-neutral-200",
      outline:
        "border-2 border-neutral-400 text-neutral-800 bg-white hover:bg-neutral-50 active:bg-neutral-100",
      danger:
        "bg-danger-500 text-white hover:bg-danger-600 active:bg-danger-700 shadow-sm hover:shadow-md"
    };
    const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
      sm: "px-4 py-2 text-sm",
      md: "px-5 py-2.5 text-base",
      lg: "px-6 py-3 text-lg"
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
