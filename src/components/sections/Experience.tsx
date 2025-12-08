"use client";

import { experience } from "@/data/experience";

interface ExperienceProps {
  isLoaded: boolean;
}

// Experience section - Work history with companies and roles
const Experience = ({ isLoaded }: ExperienceProps) => {
  return (
    <section id="experience" className="py-16 md:py-32 px-4 md:px-16 bg-white">
      <div className="max-w-[1440px] mx-auto">
        {/* Section heading with thick bottom border */}
        <h2 className="text-5xl md:text-6xl font-bold mb-12 border-b-8 border-[#1A2234] pb-4 inline-block">
          EXPERIENCE
        </h2>

        <div className="space-y-16">
          {experience.map((job, jobIndex) => (
            <div
              key={jobIndex}
              className={`transition-all duration-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${jobIndex * 100}ms` }}
            >
              {/* Company with left border and square marker */}
              <div className="relative border-l-8 border-[#1A2234] pl-8">
                {/* Square marker at top of border */}
                <div className="absolute -left-4 top-0 w-8 h-8 bg-[#1A2234]" />

                {/* Company name and location - stacked on mobile */}
                <div className="mb-4">
                  <a
                    href={job.url}
                    className="text-2xl md:text-3xl font-bold text-[#1A2234] underline underline-offset-4 decoration-2"
                  >
                    {job.company}
                  </a>
                  <span className="text-base md:text-xl text-[#888] block mt-1">
                    {job.location}
                  </span>
                </div>

                {/* Roles */}
                <div>
                  {job.roles.map((role, roleIndex) => (
                    <div key={roleIndex}>
                      {/* Gray divider line between roles */}
                      {roleIndex > 0 && (
                        <div className="border-t border-[#e0e0e0] my-6" />
                      )}
                      {/* Role title and period - stacked on mobile */}
                      <h3 className="text-lg md:text-xl font-bold text-[#4A5568]">
                        {role.title}
                      </h3>
                      <span className="text-base md:text-lg text-[#888] block mb-3">
                        {role.period}
                      </span>
                      <p className="text-base md:text-lg text-[#1A2234] leading-relaxed">
                        {role.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
