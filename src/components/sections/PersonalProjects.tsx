"use client";

import Link from "next/link";
import { Images } from "lucide-react";
import { personalProjects } from "@/data/personal-projects";
import { useScrollAnimation } from "@/hooks";

const ArrowUpRight = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <path d="M4.5 11.5L11.5 4.5" />
    <path d="M5.5 4.5H11.5V10.5" />
  </svg>
);

const GitHubMark = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

const LiveLink = ({ href }: { href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 border border-[#1A2234] dark:border-white px-4 py-2 text-sm font-mono uppercase tracking-wide text-[#1A2234] dark:text-white transition-colors hover:bg-[#1A2234] hover:text-white dark:hover:bg-white dark:hover:text-[#1A2234]"
  >
    <span>Live</span>
    <ArrowUpRight className="h-4 w-4" />
  </a>
);

const CaseStudyLink = ({ href }: { href: string }) => (
  <Link
    href={href}
    aria-label="View case study"
    className="inline-flex h-10 w-10 items-center justify-center border border-[#1A2234] dark:border-white text-[#1A2234] dark:text-white transition-colors hover:bg-[#1A2234] hover:text-white dark:hover:bg-white dark:hover:text-[#1A2234]"
  >
    <Images className="h-4 w-4" />
  </Link>
);

const GitHubLink = ({ href }: { href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="View source on GitHub"
    className="inline-flex h-10 w-10 items-center justify-center border border-[#1A2234] dark:border-white text-[#1A2234] dark:text-white transition-colors hover:bg-[#1A2234] hover:text-white dark:hover:bg-white dark:hover:text-[#1A2234]"
  >
    <GitHubMark className="h-4 w-4" />
  </a>
);

const PersonalProjects = () => {
  const [sectionRef, isVisible] = useScrollAnimation(0.1);

  return (
    <section id="projects" className="py-24 md:py-40 px-4 md:px-16 bg-[#f5f5f5] dark:bg-[#0a0a0f]">
      <div ref={sectionRef} className="max-w-[1440px] mx-auto">
        <h2
          className={`text-5xl md:text-6xl font-bold uppercase border-b-8 border-[#1A2234] dark:border-white pb-4 inline-block text-[#1A2234] dark:text-white mb-12 md:mb-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          Projects
        </h2>

        <ul className="divide-y divide-[#1A2234]/15 dark:divide-white/15 border-y border-[#1A2234]/15 dark:border-white/15">
          {personalProjects.map((project, index) => {
            const [name, ...rest] = project.name.split(" — ");
            const subtitle = rest.join(" — ");

            return (
              <li
                key={index}
                className={`py-8 md:py-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.1] tracking-tight text-[#1A2234] dark:text-white break-words">
                      {name}
                    </h3>
                    {subtitle && (
                      <p className="mt-3 md:mt-4 text-sm md:text-base font-normal text-[#1A2234]/60 dark:text-white/50">
                        {subtitle}
                      </p>
                    )}
                  </div>
                  <div className="flex shrink-0 flex-wrap items-center gap-3 md:mt-4">
                    {project.liveUrl && <LiveLink href={project.liveUrl} />}
                    {project.caseStudyUrl && <CaseStudyLink href={project.caseStudyUrl} />}
                    {project.url && <GitHubLink href={project.url} />}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default PersonalProjects;
