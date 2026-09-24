import { cn } from "@/lib/utils";

export function SectionHeader({
  number,
  label,
  title,
  className,
  light = false,
}: {
  number: string;
  label: string;
  title: string;
  className?: string;
  light?: boolean;
}) {
  return (
    <header className={cn("max-w-4xl", className)}>
      <p
        className={cn(
          "font-mono text-[11px] tracking-[0.22em] uppercase",
          light ? "text-white/50" : "text-muted",
        )}
      >
        {number} — {label}
      </p>
      <h2
        className={cn(
          "mt-4 text-[2rem] leading-[1.05] font-medium tracking-[-0.03em] sm:text-4xl md:text-5xl lg:text-[56px]",
          light ? "text-white" : "text-foreground",
        )}
      >
        {title}
      </h2>
    </header>
  );
}
