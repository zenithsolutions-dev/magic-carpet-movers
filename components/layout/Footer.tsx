import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/layout/Container";
import { siteConfig, services } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 bg-twilight text-cloud">
      <Container>
        <div className="grid gap-10 py-16 md:grid-cols-12">
          <div className="md:col-span-4 flex flex-col gap-4">
            <Logo href={null} size="md" tone="dark" />
            <p className="text-cloud/70 text-sm max-w-xs leading-relaxed">
              {siteConfig.description}
            </p>
            <a
              href={siteConfig.phoneHref}
              className="font-display text-2xl text-coral hover:text-coral-soft transition-colors"
            >
              {siteConfig.phone}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-sm text-cloud/70 hover:text-cloud transition-colors"
            >
              {siteConfig.email}
            </a>
          </div>

          <div className="md:col-span-2">
            <FooterHeading>Services</FooterHeading>
            <ul className="mt-4 flex flex-col gap-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href="/#services"
                    className="text-sm text-cloud/70 hover:text-coral transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <FooterHeading>Company</FooterHeading>
            <ul className="mt-4 flex flex-col gap-2">
              <li>
                <Link href="/#story" className="text-sm text-cloud/70 hover:text-coral transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-sm text-cloud/70 hover:text-coral transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/#quote" className="text-sm text-cloud/70 hover:text-coral transition-colors">
                  Get a quote
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-cloud/70 hover:text-coral transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-cloud/70 hover:text-coral transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <FooterHeading>Visit</FooterHeading>
            <address className="not-italic mt-4 text-sm text-cloud/70 leading-relaxed">
              {siteConfig.address.street}<br />
              {siteConfig.address.city}, {siteConfig.address.province} {siteConfig.address.postalCode}
            </address>
            <div className="mt-4">
              <FooterHeading className="text-xs">Hours</FooterHeading>
              <ul className="mt-2 text-sm text-cloud/70 space-y-1">
                {siteConfig.hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-4">
                    <span>{h.day}</span>
                    <span className="text-cloud/90">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-cloud/10 py-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between text-xs text-cloud/50">
          <div>
            © {year} {siteConfig.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>{siteConfig.credentials.license}</span>
            <span aria-hidden>·</span>
            <span>{siteConfig.credentials.cam}</span>
            <span aria-hidden>·</span>
            <span>BBB {siteConfig.credentials.bbb}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "text-[11px] uppercase tracking-[0.14em] font-semibold text-coral " +
        (className ?? "")
      }
    >
      {children}
    </div>
  );
}
