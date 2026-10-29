import type { ComponentProps } from "react";

const controlStyles =
  "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none";

function withStyles(className?: string) {
  return className ? `${controlStyles} ${className}` : controlStyles;
}

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={withStyles(className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={withStyles(className)} {...props} />;
}

export function Select({ className, ...props }: ComponentProps<"select">) {
  return <select className={withStyles(className)} {...props} />;
}
