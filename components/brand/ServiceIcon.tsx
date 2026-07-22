import { cn } from "@/lib/utils/cn";

type IconKey = "box" | "truck" | "shield" | "wrap" | "door";

const paths: Record<IconKey, React.ReactNode> = {
  truck: (
    <>
      <path d="M3 7h12v8H3z" />
      <path d="M15 10h4l2 3v2h-6z" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  door: (
    <>
      <path d="M5 3h14v18H5z" />
      <path d="M9 3v18M14 12h.01" />
    </>
  ),
  wrap: (
    <>
      <path d="M3 8l9-5 9 5-9 5z" />
      <path d="M3 8v8l9 5M21 8v8l-9 5M12 13v8" />
    </>
  ),
  box: (
    <>
      <path d="M3 7l9-4 9 4-9 4z" />
      <path d="M3 7v10l9 4 9-4V7M12 11v10" />
    </>
  ),
};

export function ServiceIcon({
  k,
  className,
}: {
  k: IconKey;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn("size-7", className)}
    >
      {paths[k]}
    </svg>
  );
}
