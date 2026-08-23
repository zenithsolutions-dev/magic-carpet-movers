"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/primitives/Button";
import { ServiceIcon } from "@/components/brand/ServiceIcon";
import type { Service } from "@/lib/site-config";
import { siteConfig } from "@/lib/site-config";

export function ServiceHero({ service }: { service: Service }) {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 70% 0%, rgba(30,107,255,0.16) 0%, transparent 60%), linear-gradient(180deg, #F5F8FF 0%, #E9F0FF 100%)",
        }}
      />

      <Container>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid gap-10 lg:grid-cols-12 items-center"
        >
          <div className="lg:col-span-8">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-3 rounded-pill bg-cloud border border-border-soft px-4 py-1.5 text-xs font-medium text-twilight mb-6"
            >
              <span className="size-1.5 rounded-full bg-coral" />
              {service.short}
            </motion.div>

            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-4xl md:text-5xl lg:text-display text-twilight text-balance leading-[1.05]"
            >
              {service.title.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="italic text-coral">
                {service.title.split(" ").slice(-1)}
              </span>
            </motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 text-lg md:text-xl text-ink-muted max-w-2xl text-pretty leading-relaxed"
            >
              {service.blurb}
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <Button href="/#quote" variant="primary" size="lg">
                Quote this move
              </Button>
              <Button href={siteConfig.phoneHref} variant="outline" size="lg">
                Call {siteConfig.phone}
              </Button>
            </motion.div>
          </div>

          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 hidden lg:flex justify-center"
          >
            <motion.div
              animate={
                reduce
                  ? undefined
                  : { y: [0, -10, 0], rotate: [-2, 2, -2] }
              }
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="flex size-48 items-center justify-center rounded-full gradient-twilight text-cloud shadow-lift"
            >
              <ServiceIcon k={service.iconKey} className="size-20 text-coral" />
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
