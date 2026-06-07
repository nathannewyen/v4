"use client";

import { personalProjects } from "@/data/personal-projects";
import { useScrollAnimation } from "@/hooks";

const PersonalProjects = () => {
  const [sectionRef, isVisible] = useScrollAnimation(0.1);

  return (
    <section
      id="personal-projects"
      className="py-16 md:py-32 px-4 md:px-16 bg-[#f5f5f5] dark:bg-[#0a0a0f]"
    >
      <div ref={sectionRef} className="max-w-[1440px] mx-auto">
        <h2
          className={`text-5xl md:text-6xl font-bold mb-12 border-b-8 border-[#1A2234] dark:border-white pb-4 inline-block text-[#1A2234] dark:text-white transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          PROJECTS
        </h2>

        <div className="space-y-10">
          {personalProjects.map((project, index) => (
            <div
              key={index}
              className={`relative border-l-8 border-[#1A2234] dark:border-white pl-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="absolute -left-4 top-0 w-8 h-8 bg-[#1A2234] dark:bg-white" />

              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg md:text-xl font-bold italic text-[#1A2234] dark:text-[#d0d0d0] hover:underline underline-offset-4 block mb-4"
              >
                {project.name}
              </a>

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
          ))}
        </div>
      </div>
    </section>
  );
};

export default PersonalProjects;
