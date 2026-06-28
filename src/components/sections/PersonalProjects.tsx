"use client";

import Image from "next/image";
import { personalProjects } from "@/data/personal-projects";
import { useScrollAnimation } from "@/hooks";
import { ExternalLinkIcon } from "@/components/icons";

const PersonalProjects = () => {
  const [sectionRef, isVisible] = useScrollAnimation(0.1);

  return (
    <section id="projects" className="py-16 md:py-32 px-4 md:px-16 bg-[#f5f5f5] dark:bg-[#0a0a0f]">
      <div ref={sectionRef} className="max-w-[1440px] mx-auto">
        <h2
          className={`text-5xl md:text-6xl font-bold mb-12 border-b-8 border-[#1A2234] dark:border-white pb-4 inline-block text-[#1A2234] dark:text-white transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          PROJECTS
        </h2>

        <div className="space-y-16">
          {personalProjects.map((project, index) => (
            <div
              key={index}
              className={`relative border-l-8 border-[#1A2234] dark:border-white pl-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="absolute -left-4 top-0 w-8 h-8 bg-[#1A2234] dark:bg-white" />

              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 mb-3">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg md:text-2xl font-bold italic text-[#1A2234] dark:text-[#d0d0d0] hover:underline underline-offset-4"
                >
                  {project.name}
                </a>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm md:text-base text-[#1A2234] dark:text-[#a0a0a0] hover:underline"
                  >
                    Live demo
                    <ExternalLinkIcon />
                  </a>
                )}
              </div>

              {project.tagline && (
                <p className="text-base md:text-lg text-[#1A2234] dark:text-[#a0a0a0] leading-relaxed mb-4 max-w-4xl">
                  {project.tagline}
                </p>
              )}

              {project.techStack && project.techStack.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs md:text-sm bg-[#e8e8e8] dark:bg-[#2a2a3e] text-[#1A2234] dark:text-[#d0d0d0]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {project.screenshots && project.screenshots.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {project.screenshots.map((shot, shotIndex) => (
                    <a
                      key={shotIndex}
                      href={shot.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative block aspect-[16/10] overflow-hidden border-2 border-[#1A2234] dark:border-[#3a3a4e] bg-white dark:bg-[#15151f] group"
                    >
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </a>
                  ))}
                </div>
              )}

              {project.features && project.features.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-base md:text-lg font-bold text-[#1A2234] dark:text-white mb-2">
                    Key features
                  </h3>
                  <ul className="list-disc list-outside pl-5 space-y-2">
                    {project.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="text-base md:text-lg text-[#1A2234] dark:text-[#a0a0a0] leading-relaxed"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.descriptions.length > 0 && (
                <div>
                  {project.features && project.features.length > 0 && (
                    <h3 className="text-base md:text-lg font-bold text-[#1A2234] dark:text-white mb-2">
                      What I built
                    </h3>
                  )}
                  <ul className="list-disc list-outside pl-5 space-y-2">
                    {project.descriptions.map((desc, descIndex) => (
                      <li
                        key={descIndex}
                        className="text-base md:text-lg text-[#1A2234] dark:text-[#a0a0a0] leading-relaxed"
                      >
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PersonalProjects;
