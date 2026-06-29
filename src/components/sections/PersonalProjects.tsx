"use client";

import { personalProjects } from "@/data/personal-projects";
import { useScrollAnimation } from "@/hooks";

const PersonalProjects = () => {
  const [sectionRef, isVisible] = useScrollAnimation(0.1);

  return (
    <section id="projects" className="py-24 md:py-40 px-4 md:px-16 bg-[#f5f5f5] dark:bg-[#0a0a0f]">
      <div ref={sectionRef} className="max-w-[1280px] mx-auto">
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
                className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block py-8 md:py-12"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1 min-w-0 transition-transform duration-300 group-hover:translate-x-2">
                      <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-[#1A2234] dark:text-white">
                        {name}
                      </h3>
                      {subtitle && (
                        <p className="mt-3 md:mt-4 text-sm md:text-base font-normal text-[#1A2234]/60 dark:text-white/50">
                          {subtitle}
                        </p>
                      )}
                    </div>
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-2xl md:text-3xl text-[#1A2234]/40 dark:text-white/40 transition-all duration-300 group-hover:text-[#1A2234] dark:group-hover:text-white group-hover:-translate-y-1 group-hover:translate-x-1"
                    >
                      ↗
                    </span>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default PersonalProjects;
