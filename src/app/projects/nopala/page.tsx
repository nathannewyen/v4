import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { Footer } from "@/components/sections";
import { ExternalLinkIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Nopala AI — Case Study | Nhan Nguyen",
  description:
    "A case study on Nopala AI: a conversational language coach that drops learners into real dialogue and coaches them the moment they stop speaking.",
  openGraph: {
    title: "Nopala AI — Case Study | Nhan Nguyen",
    description:
      "A conversational AI language coach — practice speaking in realistic scenarios with real-time feedback.",
    url: "https://newyen.dev/projects/nopala",
    type: "article",
  },
};

const SECTIONS = [
  {
    n: "01",
    title: "Real conversations, not flashcards",
    body: "Nopala drops learners into scenarios that feel like actual conversations — you pick a situation, speak your part, and the coach responds the moment you stop talking. The whole loop is built around the mouth, not the mouse: nothing to click through, nothing to memorize out of context.",
    image: "/projects/nopala/session.png",
    imageAlt: "Laptop mockup of a Nopala speaking session, framed by a garland of country flags",
  },
  {
    n: "02",
    title: "Coaching that adapts, not just corrects",
    body: "Feedback isn't just right/wrong. When a learner says something technically fine, the coach still surfaces the natural alternative a fluent speaker would reach for in that moment — so learners spend their time closing the gap to fluency, not memorizing a rulebook.",
    image: "/projects/nopala/feedback.png",
    imageAlt: "Realtime feedback panel showing a Spanish coaching correction inside a chat UI",
  },
];

export default function NopalaCaseStudyPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0a0a0f] text-[#1A2234] dark:text-[#e5e5e5] selection:bg-[#1A2234] selection:text-white dark:selection:bg-white dark:selection:text-[#1A2234] font-mono transition-colors duration-300">
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
          <header className="mb-16 md:mb-24">
            <p className="text-xs md:text-sm uppercase tracking-widest text-[#666] dark:text-[#a0a0a0] mb-4">
              Case Study · Personal Project
            </p>
            <h1 className="text-4xl md:text-7xl font-bold uppercase leading-[1.05] mb-6 border-b-8 border-[#1A2234] dark:border-white pb-4 inline-block">
              Nopala AI
            </h1>
            <p className="text-base md:text-xl leading-relaxed text-[#1A2234] dark:text-[#d0d0d0] max-w-3xl mb-8">
              A conversational AI language coach. Learners pick a scenario, speak their part, and
              get real-time feedback the moment they stop — the loop is built around the mouth, not
              the mouse.
            </p>

            <div className="relative aspect-[16/10] w-full overflow-hidden bg-white dark:bg-[#15151f]">
              <Image
                src="/projects/nopala/hero.png"
                alt="Nopala AI landing page with multilingual chat bubbles and 'Don't overthink it, just speak' headline"
                fill
                sizes="(max-width: 768px) 100vw, 1024px"
                className="object-cover object-top"
                priority
              />
            </div>
          </header>

          <section className="mb-16 md:mb-24">
            <h2 className="text-2xl md:text-4xl font-bold uppercase mb-10 md:mb-16 border-b-4 border-[#1A2234] dark:border-white pb-3 inline-block">
              How It Works
            </h2>

            <div className="space-y-16 md:space-y-24">
              {SECTIONS.map((s) => (
                <div key={s.n}>
                  <div className="flex items-baseline gap-4 md:gap-6 mb-4">
                    <span className="text-3xl md:text-5xl font-bold text-[#1A2234] dark:text-white opacity-30">
                      {s.n}
                    </span>
                    <h3 className="text-lg md:text-2xl font-bold text-[#1A2234] dark:text-white leading-tight">
                      {s.title}
                    </h3>
                  </div>

                  <p className="text-sm md:text-base leading-7 text-[#1A2234] dark:text-[#d0d0d0] mb-6 max-w-3xl pl-0 md:pl-16">
                    {s.body}
                  </p>

                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-white dark:bg-[#15151f]">
                    <Image
                      src={s.image}
                      alt={s.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 1024px"
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="border-t-4 border-[#1A2234] dark:border-white pt-8 md:pt-12">
            <p className="text-[10px] md:text-xs uppercase tracking-widest text-[#666] dark:text-[#a0a0a0] mb-4">
              Continue
            </p>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <a
                href="https://nopala-web.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-base md:text-lg font-bold text-[#1A2234] dark:text-white hover:underline underline-offset-4"
              >
                Try Nopala live
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
