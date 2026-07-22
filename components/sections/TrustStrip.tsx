import { Container } from "@/components/layout/Container";
import { trustBadges } from "@/lib/site-config";

export function TrustStrip() {
  return (
    <section
      aria-label="Trust signals"
      className="border-y border-border-soft bg-cloud/60 backdrop-blur-sm"
    >
      <Container>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-5 text-xs uppercase tracking-[0.14em] font-medium text-ink-muted">
          {trustBadges.map((b) => (
            <li key={b.label} className="flex items-center gap-2">
              <svg
                aria-hidden
                viewBox="0 0 16 16"
                className="size-3.5 text-coral"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{b.label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
