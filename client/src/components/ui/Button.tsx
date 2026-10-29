import type { ComponentProps } from "react";
import { Link } from "react-router";

type Variant = "primary" | "secondary";

const base =
  "inline-flex items-center justify-center rounded px-4 py-2 text-sm font-medium disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-gray-900 text-white hover:bg-gray-700",
  secondary: "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100",
};

function buttonStyles(variant: Variant, className?: string) {
  return [base, variants[variant], className].filter(Boolean).join(" ");
}

type ButtonProps = ComponentProps<"button"> & { variant?: Variant };

export function Button({ variant = "primary", className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonStyles(variant, className)} {...props} />;
}

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant };

// Same look as Button, but renders a router link for navigation.
export function ButtonLink({ variant = "primary", className, ...props }: ButtonLinkProps) {
  return <Link className={buttonStyles(variant, className)} {...props} />;
}
