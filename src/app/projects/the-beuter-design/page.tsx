import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { Footer } from "@/components/sections";
import { ExternalLinkIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "The Beuter Design — Case Study | Nhan Nguyen",
  description:
    "A case study on building The Beuter Design: an ecommerce frontend in Next.js 16, with three decisions that shaped the build.",
  openGraph: {
    title: "The Beuter Design — Case Study | Nhan Nguyen",
    description:
      "Three decisions that shaped an ecommerce frontend built in Next.js 16, React 19, and Tailwind v4.",
    url: "https://newyen.dev/projects/the-beuter-design",
    type: "article",
  },
};

const META = [
  { label: "Role", value: "Solo · Design + Engineering" },
  { label: "Stack", value: "Next.js 16 · React 19 · Tailwind v4 · Zustand" },
  { label: "Year", value: "2025 — 2026" },
];

const DECISIONS = [
  {
    n: "01",
    title: "Localizing the checkout for an international audience",
    problem:
      "The reference webstore is built for a Vietnamese-only audience and uses a three-tier admin structure (Tỉnh/Thành phố → Quận/Huyện → Phường/Xã) that maps to nothing outside Vietnam. Carrying that into an English-only build would have made the checkout feel foreign to most visitors.",
    choice:
      "Collapsed the three-tier picker into a single Country dropdown plus a three-column State / City / Postal grid, kept the sticky order summary on the right, and moved payment-method selection into a radio card group.",
    why: "The point of the project was to show I can adapt a real brand system, not to ship a literal pixel copy. Choosing the standard international layout meant the checkout reads as a familiar surface anywhere — which is the real test of whether the component library generalizes.",
    image: "/projects/beuter/checkout.jpg",
    imageAlt: "Beuter checkout page with shipping form and sticky order summary",
  },
  {
    n: "02",
    title: "Cart and wishlist state without overbuilding",
    problem:
      "Cart and wishlist need to survive page reloads, route changes, and SSR — but full Redux + RTK Query was overkill for what amounts to two arrays of items.",
    choice:
      "Zustand with localStorage persistence, behind an SSR-safe storage shim that returns no-ops on the server. The cart drawer and the checkout summary both subscribe to the same store, so they can never disagree.",
    why: "The interesting decision wasn't 'use Zustand' — it was deciding that the cart drawer's summary and the checkout page's summary should be the same component reading from the same source. That's the kind of choice that quietly prevents a class of bugs.",
    image: "/projects/beuter/cart.jpg",
    imageAlt: "Cart drawer with line items, totals, and a checkout CTA",
  },
  {
    n: "03",
    title: "Brand tokens in Tailwind v4, not a theme provider",
    problem:
      "The Beuter brand has a small but specific token system (typography, spacing, restrained color palette). The default React pattern would be a theme provider with props threaded through every component — a lot of plumbing for a static brand.",
    choice:
      "Defined the tokens in CSS with `@theme inline` and let every Tailwind utility class consume them directly. No theme prop on any component, no token-prop-drilling.",
    why: "Tailwind v4 makes the CSS layer the source of truth for tokens. The components stayed clean — they just compose utilities — and the brand can shift by editing one file. This is the approach I'd carry into any project where the brand is mostly fixed.",
    image: "/projects/beuter/product.jpg",
    imageAlt: "Beuter product detail page using brand tokens for typography and spacing",
  },
];

const LESSONS = [
  "Start with the design tokens, not the components. I built a handful of components first and then retro-fitted the token layer — doing it the other way would have saved a refactor.",
  "Build checkout earlier. It is the first surface where the design system, cart store, currency formatter, and routing all have to agree at once. Building it last meant retro-fitting primitives that should have existed from day one.",
  "Be more deliberate about the RSC boundary. I defaulted to client components in a few places where I did not need to — the page would have shipped less JS with a more careful split.",
];

export default function BeuterCaseStudyPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0a0a0f] text-[#1A2234] dark:text-[#e5e5e5] selection:bg-[#1A2234] selection:text-white dark:selection:bg-white dark:selection:text-[#1A2234] font-mono transition-colors duration-300">
      {/* Nav — mirrors /contributions */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1A2234] dark:bg-[#15151f]">
        <div className="px-4 md:px-16 py-4 md:py-5">
          <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-2 md:gap-4">
            <Link
              href="/"
              className="text-white font-mono text-base md:text-xl font-bold hover:opacity-80 transition-opacity"
            >
              NHAN.NGUYEN
            </Link>
            <div className="flex items-center gap-3 md:gap-6">
              <Link
                href="/#projects"
                className="text-white font-mono text-xs md:text-base uppercase hover:opacity-80 transition-opacity"
              >
                ← Projects
              </Link>
              <a
                href="https://notes.newyen.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-mono text-xs md:text-base uppercase hover:opacity-80 transition-opacity"
              >
                Notes
              </a>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 md:pt-32 pb-16 px-4 md:px-16">
        <article className="max-w-4xl mx-auto">
          {/* Hero */}
          <header className="mb-16 md:mb-24">
            <p className="text-xs md:text-sm uppercase tracking-widest text-[#666] dark:text-[#a0a0a0] mb-4">
              Case Study · Personal Project
            </p>
            <h1 className="text-4xl md:text-7xl font-bold uppercase leading-[1.05] mb-6 border-b-8 border-[#1A2234] dark:border-white pb-4 inline-block">
              The Beuter Design
            </h1>
            <p className="text-base md:text-xl leading-relaxed text-[#1A2234] dark:text-[#d0d0d0] max-w-3xl mb-8">
              An ecommerce frontend built as a study project — using the BEUTER® brand system as a
              forcing function to ship a real DTC storefront with the current generation of Next.js
              tooling.
            </p>

            {/* Meta strip */}
            <dl className="grid grid-cols-1 md:grid-cols-3 gap-y-3 md:gap-x-6 mb-8 text-sm md:text-base">
              {META.map((m) => (
                <div key={m.label}>
                  <dt className="text-[10px] md:text-xs uppercase tracking-widest text-[#666] dark:text-[#a0a0a0] mb-1">
                    {m.label}
                  </dt>
                  <dd className="text-[#1A2234] dark:text-[#d0d0d0]">{m.value}</dd>
                </div>
              ))}
            </dl>

            {/* Hero screenshot */}
            <div className="relative aspect-[16/10] w-full border-4 border-[#1A2234] dark:border-[#3a3a4e] overflow-hidden bg-white dark:bg-[#15151f]">
              <Image
                src="/projects/beuter/home.jpg"
                alt="Beuter homepage with full-bleed campaign hero"
                fill
                sizes="(max-width: 768px) 100vw, 1024px"
                className="object-cover"
                priority
              />
            </div>
          </header>

          {/* Three decisions */}
          <section className="mb-16 md:mb-24">
            <h2 className="text-2xl md:text-4xl font-bold uppercase mb-10 md:mb-16 border-b-4 border-[#1A2234] dark:border-white pb-3 inline-block">
              Three Decisions That Mattered
            </h2>

            <div className="space-y-16 md:space-y-24">
              {DECISIONS.map((d) => (
                <div key={d.n}>
                  <div className="flex items-baseline gap-4 md:gap-6 mb-4">
                    <span className="text-3xl md:text-5xl font-bold text-[#1A2234] dark:text-white opacity-30">
                      {d.n}
                    </span>
                    <h3 className="text-lg md:text-2xl font-bold text-[#1A2234] dark:text-white leading-tight">
                      {d.title}
                    </h3>
                  </div>

                  <div className="space-y-4 mb-6 max-w-3xl pl-0 md:pl-16">
                    <div>
                      <p className="text-[10px] md:text-xs uppercase tracking-widest text-[#666] dark:text-[#a0a0a0] mb-1">
                        Problem
                      </p>
                      <p className="text-sm md:text-base leading-7 text-[#1A2234] dark:text-[#d0d0d0]">
                        {d.problem}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] md:text-xs uppercase tracking-widest text-[#666] dark:text-[#a0a0a0] mb-1">
                        Choice
                      </p>
                      <p className="text-sm md:text-base leading-7 text-[#1A2234] dark:text-[#d0d0d0]">
                        {d.choice}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] md:text-xs uppercase tracking-widest text-[#666] dark:text-[#a0a0a0] mb-1">
                        Why it matters
                      </p>
                      <p className="text-sm md:text-base leading-7 text-[#1A2234] dark:text-[#d0d0d0]">
                        {d.why}
                      </p>
                    </div>
                  </div>

                  <div className="relative aspect-[16/10] w-full border-2 border-[#1A2234] dark:border-[#3a3a4e] overflow-hidden bg-white dark:bg-[#15151f]">
                    <Image
                      src={d.image}
                      alt={d.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 1024px"
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Lessons */}
          <section className="mb-16 md:mb-24">
            <h2 className="text-2xl md:text-4xl font-bold uppercase mb-8 md:mb-12 border-b-4 border-[#1A2234] dark:border-white pb-3 inline-block">
              What I&apos;d Do Differently
            </h2>
            <ul className="space-y-6 max-w-3xl">
              {LESSONS.map((lesson, i) => (
                <li key={i} className="flex gap-4 md:gap-6">
                  <span className="text-base md:text-lg font-bold text-[#1A2234] dark:text-white opacity-30 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm md:text-base leading-7 text-[#1A2234] dark:text-[#d0d0d0]">
                    {lesson}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* CTA strip */}
          <section className="border-t-4 border-[#1A2234] dark:border-white pt-8 md:pt-12">
            <p className="text-[10px] md:text-xs uppercase tracking-widest text-[#666] dark:text-[#a0a0a0] mb-4">
              Continue
            </p>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <a
                href="https://github.com/nathannewyen/the-beuter-design-ecommerce-platform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-base md:text-lg font-bold text-[#1A2234] dark:text-white hover:underline underline-offset-4"
              >
                Source on GitHub
                <ExternalLinkIcon />
              </a>
              <a
                href="https://notes.newyen.dev/posts/building-the-beuter-design"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-base md:text-lg font-bold text-[#1A2234] dark:text-white hover:underline underline-offset-4"
              >
                Read the build notes
                <ExternalLinkIcon />
              </a>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
