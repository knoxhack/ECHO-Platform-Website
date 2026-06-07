import type { ReactNode } from "react";

export function CyberGlassCard({
  children,
  className = "",
  as: Component = "article"
}: {
  children: ReactNode;
  className?: string;
  as?: "article" | "div" | "section";
}) {
  return (
    <Component className={`cyber-panel rounded-[6px] p-5 ${className}`}>
      {children}
    </Component>
  );
}
