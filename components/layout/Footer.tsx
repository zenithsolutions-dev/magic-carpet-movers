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

            <div className="mt-1 flex items-center gap-3">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${siteConfig.name} on Instagram`}
                className="inline-flex size-10 items-center justify-center rounded-full border border-cloud/20 text-cloud/80 transition-colors hover:border-coral hover:text-coral"
              >
                <svg viewBox="0 0 24 24" aria-hidden className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Message ${siteConfig.name} on WhatsApp`}
                className="inline-flex size-10 items-center justify-center rounded-full border border-cloud/20 text-cloud/80 transition-colors hover:border-coral hover:text-coral"
              >
                <svg viewBox="0 0 24 24" aria-hidden className="size-5" fill="currentColor">
                  <path d="M12.04 2.01a9.9 9.9 0 0 0-8.4 15.1L2 22.5l5.6-1.47a9.9 9.9 0 1 0 4.44-19.02Zm0 1.8a8.1 8.1 0 1 1-4.1 15.08l-.32-.19-3.1.81.83-3.03-.2-.33A8.1 8.1 0 0 1 12.04 3.81Z" />
                  <path d="M9.3 7.3c-.2-.44-.4-.45-.6-.46h-.5c-.17 0-.45.06-.69.32-.24.26-.9.88-.9 2.14s.92 2.48 1.05 2.65c.13.17 1.78 2.85 4.4 3.88 2.18.86 2.49.69 2.94.65.45-.04 1.45-.6 1.66-1.17.2-.58.2-1.07.14-1.17-.06-.1-.22-.17-.47-.29-.25-.12-1.45-.72-1.68-.8-.22-.09-.39-.13-.55.12-.16.26-.63.82-.77.98-.14.17-.28.19-.53.07-.25-.13-1.05-.39-2-1.24-.74-.66-1.24-1.47-1.38-1.72-.14-.26-.02-.4.1-.52.12-.12.29-.31.43-.47.14-.16.19-.27.28-.45.1-.17.05-.33-.02-.45-.06-.12-.55-1.33-.75-1.82Z" />
                </svg>
              </a>
            </div>
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
            <FooterHeading>Service area</FooterHeading>
            <address className="not-italic mt-4 text-sm text-cloud/70 leading-relaxed">
              {siteConfig.serviceArea.label}<br />
              {siteConfig.serviceArea.region}
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
