import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/primitives/Button";
import { Reveal } from "@/components/primitives/Reveal";

export function QuoteTeaser() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-xl gradient-twilight text-cloud p-10 md:p-16">
            <div
              aria-hidden
              className="absolute -top-32 -right-32 size-96 rounded-full bg-coral/30 blur-3xl"
            />
            <div
              aria-hidden
              className="absolute -bottom-40 -left-20 size-80 rounded-full bg-coral/15 blur-3xl"
            />

            <div className="relative grid items-center gap-8 md:grid-cols-12">
              <div className="md:col-span-7">
                <p className="text-xs uppercase tracking-[0.18em] text-coral font-semibold mb-4">
                  Three minutes, no spam
                </p>
                <h2 className="font-display text-3xl md:text-4xl text-balance">
                  See what your move will cost <span className="italic text-coral">before</span> you
                  book.
                </h2>
                <p className="mt-4 text-cloud/70 max-w-lg text-pretty">
                  Three quick questions. We come back with a real number, not a
                  ballpark — and a date you can actually book.
                </p>
              </div>

              <div className="md:col-span-5 flex flex-col gap-3 md:items-end">
                <Button href="/quote" variant="primary" size="lg">
                  Start my quote
                  <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Button>
                <Link
                  href="/contact"
                  className="text-sm text-cloud/70 hover:text-cloud underline-offset-4 hover:underline"
                >
                  Or send us a note instead
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
