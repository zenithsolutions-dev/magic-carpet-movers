import * as React from "react";
import { cn } from "@/lib/utils/cn";

export function Card({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl bg-cloud border border-border-soft shadow-soft p-6 md:p-8",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
