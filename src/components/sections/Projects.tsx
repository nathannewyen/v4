"use client";

import { Project } from "@/types";
import { SOCIAL_LINKS } from "@/constants";
import { ExternalLinkIcon } from "@/components/icons";

interface ProjectsProps {
  projects: Project[];
  isLoaded: boolean;
}

// Projects section - Open source projects grid
const Projects = ({ projects, isLoaded }: ProjectsProps) => {
  return (
    <section id="projects" className="py-16 md:py-32 px-4 md:px-16 bg-[#f5f5f5]">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold mb-4 border-b-8 border-[#1A2234] pb-4 inline-block">
          OPEN SOURCE
        </h2>
        <h3 className="text-xl md:text-3xl font-bold mb-8 border-l-4 border-[#1A2234] pl-4 text-[#1A2234]">
          LIBRARIES I&apos;VE CONTRIBUTED TO
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, projectIndex) => (
            <div
              key={projectIndex}
              className={`p-6 bg-white border-4 border-[#1A2234] transition-all duration-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${projectIndex * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-display text-xl text-[#1A2234]">
                  {project.name}
                </h3>
                <span className="flex items-center gap-1 px-3 py-1 bg-[#1A2234] text-white text-sm">
                  <span>★</span>
                  {project.stars}
                </span>
              </div>
              <p className="font-body text-sm text-[#666] mb-4 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs bg-[#e8e8e8] text-[#555]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={project.url}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#1A2234] hover:underline"
              >
                VIEW PROJECT
                <ExternalLinkIcon />
              </a>
            </div>
          ))}
        </div>

        {/* More Open Source Projects box */}
        <div className="mt-8 md:mt-16 p-4 md:p-8 border-4 border-[#1A2234]">
          <h3 className="text-xl md:text-3xl font-bold mb-4">
            MORE OPEN SOURCE PROJECTS
          </h3>
          <p className="text-base md:text-lg text-[#1A2234] mb-6">
            Check out my GitHub for more open source projects, tutorials, and
            resources.
          </p>
          <a
            href={SOCIAL_LINKS.github}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A2234] text-white font-bold hover:bg-[#2a2a4e] transition-colors"
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
