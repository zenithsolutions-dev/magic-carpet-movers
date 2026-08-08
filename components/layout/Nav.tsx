"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/primitives/Button";
import { Container } from "@/components/layout/Container";
import { navLinks, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils/cn";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activeId, setActiveId] = React.useState("");
  const reduce = useReducedMotion();

  // Scrollspy: highlight the nav link of the section currently in view.
  React.useEffect(() => {
    if (pathname !== "/") return;
    const ids = navLinks
      .map((l) => l.href.split("#")[1])
      .filter(Boolean) as string[];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.2, 0.5] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => setMobileOpen(false), [pathname]);

  React.useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const onHome = pathname === "/";
  // Only the homepage has a dark full-bleed hero for the nav to float over.
  const solid = scrolled || mobileOpen || !onHome;
  const light = !solid; // light text while transparent over the dark hero

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        solid ? "bg-cloud/90 backdrop-blur-md shadow-soft" : "bg-transparent",
      )}
    >
      <Container>
        <div className="flex h-16 md:h-20 items-center justify-between">
          <Logo priority size="md" tone={light ? "dark" : "light"} />

          <nav aria-label="Primary" className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active =
                pathname === "/" && link.href === `/#${activeId}`;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-pill transition-colors",
                    light
                      ? active
                        ? "text-cloud"
                        : "text-cloud/75 hover:text-cloud"
                      : active
                        ? "text-twilight"
                        : "text-ink-muted hover:text-twilight",
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className={cn(
                        "absolute inset-0 -z-10 rounded-pill",
                        light ? "bg-cloud/15" : "bg-sand",
                      )}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={siteConfig.phoneHref}
              className={cn(
                "inline-flex items-center gap-2 text-sm font-semibold transition-colors",
                light ? "text-cloud hover:text-coral-soft" : "text-twilight hover:text-coral",
              )}
            >
              <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M3 4c0 5 4 9 9 9l1-2.5-2.5-1L9.5 11C8 10.5 5.5 8 5 6.5l1.5-1L5.5 3 3 4z" strokeLinejoin="round" />
              </svg>
              {siteConfig.phone}
            </a>
            <Button href="/#quote" variant="primary" size="sm">
              Get a free quote
            </Button>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
            className={cn(
              "md:hidden flex size-10 items-center justify-center rounded-pill transition-colors",
              light ? "bg-cloud/15 text-cloud" : "bg-sand text-twilight",
            )}
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, height: "auto" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-cloud border-t border-border-soft"
          >
            <Container>
              <nav
                aria-label="Mobile"
                className="flex flex-col py-4 gap-1"
              >
                {navLinks.map((link) => {
                  const active =
                    pathname === "/" && link.href === `/#${activeId}`;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "px-4 py-3 rounded-md text-base font-medium",
                        active ? "bg-sand text-twilight" : "text-ink-muted",
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <div className="flex flex-col gap-3 mt-3 pt-4 border-t border-border-soft">
                  <a
                    href={siteConfig.phoneHref}
                    className="px-4 py-2 text-sm text-ink-muted"
                  >
                    Call {siteConfig.phone}
                  </a>
                  <Button href="/#quote" variant="primary" size="md" className="w-full">
                    Get a free quote
                  </Button>
                </div>
              </nav>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>

      {/* sticky click-to-call + quote bar on mobile */}
      {!mobileOpen && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex gap-2 border-t border-border bg-cloud/95 backdrop-blur px-3 py-2.5 shadow-[0_-6px_20px_-8px_rgba(12,26,62,0.25)]">
          <a
            href={siteConfig.phoneHref}
            className="flex-1 inline-flex h-11 items-center justify-center gap-2 rounded-pill border border-twilight/20 text-sm font-semibold text-twilight"
          >
            <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M3 4c0 5 4 9 9 9l1-2.5-2.5-1L9.5 11C8 10.5 5.5 8 5 6.5l1.5-1L5.5 3 3 4z" strokeLinejoin="round" />
            </svg>
            Call now
          </a>
          <Button href="/#quote" variant="primary" size="md" className="flex-1">
            Free quote
          </Button>
        </div>
      )}
    </header>
  );
}
