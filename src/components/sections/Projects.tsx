"use client";

import { Project } from "@/types";
import { SOCIAL_LINKS } from "@/constants";
import { ExternalLinkIcon } from "@/components/icons";
import { useScrollAnimation } from "@/hooks";

interface ProjectsProps {
  projects: Project[];
}

// Projects section - Open source projects grid
const Projects = ({ projects }: ProjectsProps) => {
  const [sectionRef, isVisible] = useScrollAnimation(0.1);

  return (
    <section id="projects" className="py-16 md:py-32 px-4 md:px-16 bg-[#f5f5f5] dark:bg-[#0a0a0f]">
      <div ref={sectionRef} className="max-w-[1440px] mx-auto">
        <h2
          className={`text-4xl md:text-6xl font-bold mb-4 border-b-8 border-[#1A2234] dark:border-white pb-4 inline-block text-[#1A2234] dark:text-white transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          OPEN SOURCE
        </h2>
        <h3
          className={`text-xl md:text-3xl font-bold mb-8 border-l-4 border-[#1A2234] dark:border-white pl-4 text-[#1A2234] dark:text-white transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          LIBRARIES I&apos;VE CONTRIBUTED TO
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, projectIndex) => (
            <div
              key={projectIndex}
              className={`p-6 bg-white dark:bg-[#15151f] border-4 border-[#1A2234] dark:border-[#3a3a4e] transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${200 + projectIndex * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-display text-xl text-[#1A2234] dark:text-white">
                  {project.name}
                </h3>
                <span className="flex items-center gap-1 px-3 py-1 bg-[#1A2234] dark:bg-white text-white dark:text-[#1A2234] text-sm">
                  <span>★</span>
                  {project.stars}
                </span>
              </div>
              <p className="font-body text-sm text-[#666] dark:text-[#999] mb-4 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs bg-[#e8e8e8] dark:bg-[#2a2a3e] text-[#555] dark:text-[#aaa]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={project.url}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#1A2234] dark:text-white hover:underline"
              >
                VIEW PROJECT
                <ExternalLinkIcon />
              </a>
            </div>
          ))}
        </div>

        {/* More Open Source Projects box */}
        <div
          className={`mt-8 md:mt-16 p-4 md:p-8 border-4 border-[#1A2234] dark:border-[#3a3a4e] transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: "600ms" }}
        >
          <h3 className="text-xl md:text-3xl font-bold mb-4 text-[#1A2234] dark:text-white">
            MORE OPEN SOURCE PROJECTS
          </h3>
          <p className="text-base md:text-lg text-[#1A2234] dark:text-[#999] mb-6">
            Check out my GitHub for more open source projects, tutorials, and
            resources.
          </p>
          <a
            href={SOCIAL_LINKS.github}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A2234] dark:bg-white text-white dark:text-[#1A2234] font-bold hover:bg-[#2a2a4e] dark:hover:bg-[#e0e0e0] transition-colors"
          >
            VIEW GITHUB
            <ExternalLinkIcon />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
