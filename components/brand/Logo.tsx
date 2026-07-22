import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type Props = {
  size?: "sm" | "md";
  priority?: boolean;
  href?: string | null;
  className?: string;
  showWordmark?: boolean;
  tone?: "light" | "dark";
};

export function Logo({
  size = "md",
  priority = false,
  href = "/",
  className,
  showWordmark = true,
  tone = "light",
}: Props) {
  const dim = size === "sm" ? { w: 34, h: 34 } : { w: 44, h: 44 };

  const content = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/logo.webp"
        alt="Magic Carpet Movers"
        width={dim.w}
        height={dim.h}
        priority={priority}
        className={cn(
          "rounded-lg bg-cloud object-contain ring-1 ring-border-soft p-0.5",
          size === "sm" ? "size-9" : "size-11",
        )}
      />
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display font-extrabold uppercase tracking-tight text-[0.95rem] leading-none",
              tone === "dark" ? "text-cloud" : "text-twilight",
            )}
          >
            Magic Carpet
          </span>
          <span
            className={cn(
              "font-mono uppercase tracking-[0.32em] text-[0.58rem] mt-1 leading-none",
              tone === "dark" ? "text-coral-soft" : "text-coral",
            )}
          >
            Movers
          </span>
        </span>
      )}
    </span>
  );

  if (href === null) return content;
  return (
    <Link
      href={href}
      aria-label="Magic Carpet Movers — home"
      className="inline-flex items-center"
    >
      {content}
    </Link>
  );
}
