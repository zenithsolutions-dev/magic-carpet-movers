import * as React from "react";
import { cn } from "@/lib/utils/cn";

type Props = {
  as?: "div" | "section" | "header" | "footer" | "main" | "article";
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
};

export function Container({
  as: Tag = "div",
  children,
  className,
  size = "default",
}: Props) {
  const max = {
    narrow: "max-w-3xl",
    default: "max-w-[1200px]",
    wide: "max-w-[1400px]",
  }[size];
  return (
    <Tag className={cn("mx-auto px-4 sm:px-6 lg:px-8", max, className)}>
      {children}
    </Tag>
  );
}
