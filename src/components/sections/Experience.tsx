"use client";

import { experience } from "@/data/experience";
import { useScrollAnimation } from "@/hooks";
import { DocumentIcon } from "@/components/icons";

// Experience section - Work history with companies and roles
const Experience = () => {
  const [sectionRef, isVisible] = useScrollAnimation(0.1);

  return (
    <section id="experience" className="py-16 md:py-32 px-4 md:px-16 bg-white dark:bg-[#12121a]">
      <div ref={sectionRef} className="max-w-[1440px] mx-auto">
        {/* Section heading with thick bottom border */}
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
              {/* Company with left border and square marker */}
              <div className="relative border-l-8 border-[#1A2234] dark:border-white pl-8">
                {/* Square marker at top of border */}
                <div className="absolute -left-4 top-0 w-8 h-8 bg-[#1A2234] dark:bg-white" />

                {/* Company name and location - stacked on mobile */}
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

                {/* Roles */}
                <div>
                  {job.roles.map((role, roleIndex) => (
                    <div key={roleIndex}>
                      {/* Gray divider line between roles */}
                      {roleIndex > 0 && (
                        <div className="border-t border-[#e0e0e0] dark:border-[#3a3a4e] my-6" />
                      )}
                      {/* Role title and period - stacked on mobile */}
                      <h3 className="text-lg md:text-xl font-bold text-[#4A5568] dark:text-[#9CA3AF]">
                        {role.title}
                      </h3>
                      <span className="text-base md:text-lg text-[#888] dark:text-[#a0a0a0] block mb-3">
                        {role.period}
                      </span>
                      <ul className="list-disc list-outside pl-5 space-y-2">
                        {role.descriptions.map((description, descIndex) => (
                          <li
                            key={descIndex}
                            className="text-base md:text-lg text-[#1A2234] dark:text-[#a0a0a0] leading-relaxed"
                          >
                            {description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Resume link at bottom of experience section */}
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
