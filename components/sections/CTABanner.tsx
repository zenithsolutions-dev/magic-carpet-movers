import { Container } from "@/components/layout/Container";
import { Button } from "@/components/primitives/Button";
import { Reveal } from "@/components/primitives/Reveal";
import { siteConfig } from "@/lib/site-config";

type Props = {
  title?: React.ReactNode;
  subtitle?: string;
  primaryHref?: string;
  primaryLabel?: string;
};

export function CTABanner({
  title = (
    <>
      Ready to book <span className="italic text-coral">your move?</span>
    </>
  ),
  subtitle = "Tell us about your move. We're available 24/7 and come straight back with a real number and a real date.",
  primaryHref = "/#quote",
  primaryLabel = "Get a quote",
}: Props) {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl text-twilight text-balance">
            {title}
          </h2>
          <p className="mt-5 text-lg text-ink-muted text-pretty">{subtitle}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button href={primaryHref} variant="primary" size="lg">
              {primaryLabel}
            </Button>
            <Button href={siteConfig.phoneHref} variant="outline" size="lg">
              {siteConfig.phone}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
