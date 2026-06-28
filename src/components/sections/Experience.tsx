"use client";

import { experience } from "@/data/experience";
import { useScrollAnimation } from "@/hooks";
import { DocumentIcon } from "@/components/icons";

const Experience = () => {
  const [sectionRef, isVisible] = useScrollAnimation(0.1);

  return (
    <section id="experience" className="py-16 md:py-32 px-4 md:px-16 bg-white dark:bg-[#12121a]">
      <div ref={sectionRef} className="max-w-[1440px] mx-auto">
        <h2
          className={`text-5xl md:text-6xl font-bold mb-12 border-b-8 border-[#1A2234] dark:border-white pb-4 inline-block text-[#1A2234] dark:text-white transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          EXPERIENCE
        </h2>

        <div className="space-y-16">
          {experience.map((job, jobIndex) => (
            <div
              key={jobIndex}
              className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${jobIndex * 150}ms` }}
            >
              <div className="relative border-l-8 border-[#1A2234] dark:border-white pl-8">
                <div className="absolute -left-4 top-0 w-8 h-8 bg-[#1A2234] dark:bg-white" />

                <div className="mb-4">
                  <a
                    href={job.url}
                    className="text-2xl md:text-3xl font-bold text-[#1A2234] dark:text-white underline underline-offset-4 decoration-2"
                  >
                    {job.company}
                  </a>
                  <span className="text-base md:text-xl text-[#888] dark:text-[#a0a0a0] block mt-1">
                    {job.location}
                  </span>
                </div>

                <div>
                  {job.roles.map((role, roleIndex) => (
                    <div key={roleIndex}>
                      {roleIndex > 0 && (
                        <div className="border-t border-[#e0e0e0] dark:border-[#3a3a4e] my-6" />
                      )}
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
                        <h3 className="text-base md:text-lg font-bold text-[#1A2234] dark:text-white">
                          {role.title}
                        </h3>
                        <span className="text-sm md:text-base text-[#888] dark:text-[#a0a0a0]">
                          · {role.period}
                        </span>
                      </div>

                      {role.summary ? (
                        <p className="text-sm md:text-base leading-7 text-[#1A2234] dark:text-[#d0d0d0] max-w-3xl">
                          {role.summary}
                        </p>
                      ) : role.projects && role.projects.length > 0 ? (
                        <div className="space-y-6">
                          {role.projects.map((project, projectIndex) => (
                            <div key={projectIndex}>
                              <p className="text-base md:text-lg font-bold italic text-[#1A2234] dark:text-[#d0d0d0] mb-3">
                                {project.name}
                              </p>
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
                      ) : (
                        <ul className="list-disc list-outside pl-5 space-y-2">
                          {role.descriptions?.map((description, descIndex) => (
                            <li
                              key={descIndex}
                              className="text-base md:text-lg text-[#1A2234] dark:text-[#a0a0a0] leading-relaxed"
                            >
                              {description}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`mt-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: `${experience.length * 150 + 150}ms` }}
        >
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-lg text-[#1A2234] dark:text-white hover:underline transition-colors"
          >
            <DocumentIcon />
            <span>View Full Resume</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Experience;
