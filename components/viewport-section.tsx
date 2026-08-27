import type { HTMLAttributes, ReactNode } from "react";

type ViewportSectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  chapter: string;
  tone?: "paper" | "ink" | "signal";
};

export function ViewportSection({ children, chapter, tone = "paper", className = "", ...props }: ViewportSectionProps) {
  return (
    <section className={`viewport-section viewport-section--${tone} ${className}`} data-chapter={chapter} {...props}>
      {children}
    </section>
  );
}
