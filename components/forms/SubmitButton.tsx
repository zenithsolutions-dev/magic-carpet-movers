"use client";

import * as React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/primitives/Button";

type Props = {
  children: React.ReactNode;
  pendingLabel?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline" | "ghost";
  className?: string;
};

export function SubmitButton({
  children,
  pendingLabel = "Sending…",
  size = "lg",
  variant = "primary",
  className,
}: Props) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size={size}
      variant={variant}
      disabled={pending}
      aria-busy={pending}
      className={className}
    >
      {pending ? (
        <>
          <span
            aria-hidden
            className="size-4 rounded-full border-2 border-cloud/30 border-t-cloud animate-spin"
          />
          {pendingLabel}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
