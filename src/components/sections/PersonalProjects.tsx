"use client";

import { personalProjects } from "@/data/personal-projects";
import { useScrollAnimation } from "@/hooks";

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
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 border border-[#1A2234] dark:border-white px-4 py-2 text-sm font-mono uppercase tracking-wide text-[#1A2234] dark:text-white transition-colors hover:bg-[#1A2234] hover:text-white dark:hover:bg-white dark:hover:text-[#1A2234]"
                      >
                        Live
                        <span
                          aria-hidden="true"
                          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        >
                          ↗
                        </span>
                      </a>
                    )}
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 border border-[#1A2234] dark:border-white px-4 py-2 text-sm font-mono uppercase tracking-wide text-[#1A2234] dark:text-white transition-colors hover:bg-[#1A2234] hover:text-white dark:hover:bg-white dark:hover:text-[#1A2234]"
                    >
                      GitHub
                      <span
                        aria-hidden="true"
                        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      >
                        ↗
                      </span>
                    </a>
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
