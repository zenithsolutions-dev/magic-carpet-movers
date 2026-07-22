import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/primitives/Button";
import { CarpetIllustration } from "@/components/brand/CarpetIllustration";
import { Logo } from "@/components/brand/Logo";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6">
        <Container>
          <Logo />
        </Container>
      </header>
      <main className="flex-1 flex items-center">
        <Container size="narrow">
          <div className="text-center">
            <div className="max-w-sm mx-auto mb-8">
              <CarpetIllustration variant="compact" />
            </div>
            <p className="text-sm uppercase tracking-[0.18em] text-coral font-semibold mb-4">
              404
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-twilight text-balance">
              That page <span className="italic text-coral">drifted off.</span>
            </h1>
            <p className="mt-5 text-ink-muted text-pretty max-w-md mx-auto">
              We couldn&apos;t find what you were looking for — but the front door
              still works.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button href="/" variant="primary" size="md">
                Back to home
              </Button>
              <Link
                href="/quote"
                className="inline-flex items-center justify-center px-6 py-3 text-sm text-ink-muted hover:text-twilight transition-colors"
              >
                Or get a quote
              </Link>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
