"use client";

import { siteConfig } from "@/config/site";
import { GitHubIcon, XIcon, LinkedInIcon, EmailIcon } from "@/components/icons";
import { useScrollAnimation } from "@/hooks";

// Connect section - Contact links in single line
const Connect = () => {
  const [sectionRef, isVisible] = useScrollAnimation(0.2);

  return (
    <section className="py-12 md:py-16 px-4 md:px-16 bg-white dark:bg-[#12121a] border-t-4 border-[#1A2234] dark:border-[#3a3a4e]">
      <div ref={sectionRef} className="max-w-[1440px] mx-auto">
        <h2
          className={`text-3xl md:text-5xl font-bold mb-6 md:mb-8 text-[#1A2234] dark:text-white transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          CONNECT
        </h2>
        <div
          className={`flex flex-col md:flex-row md:flex-wrap md:items-center gap-4 md:gap-10 transition-all duration-700 delay-150 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* GitHub link with icon */}
          <a
            href={siteConfig.social.github.url}
            className="flex items-center gap-3 text-lg text-[#1A2234] dark:text-white hover:underline transition-colors"
          >
            <GitHubIcon className="w-7 h-7" />
            <span>{siteConfig.social.github.displayName}</span>
          </a>
          {/* X/Twitter link with icon */}
          <a
            href={siteConfig.social.twitter.url}
            className="flex items-center gap-3 text-lg text-[#1A2234] dark:text-white hover:underline transition-colors"
          >
            <XIcon className="w-7 h-7" />
            <span>{siteConfig.social.twitter.displayName}</span>
          </a>
          {/* LinkedIn link with icon */}
          <a
            href={siteConfig.social.linkedin.url}
            className="flex items-center gap-3 text-lg text-[#1A2234] dark:text-white hover:underline transition-colors"
          >
            <LinkedInIcon className="w-7 h-7" />
            <span>{siteConfig.social.linkedin.displayName}</span>
          </a>
          {/* Email link with icon */}
          <a
            href={`mailto:${siteConfig.social.email.address}`}
            className="flex items-center gap-3 text-lg text-[#1A2234] dark:text-white hover:underline transition-colors"
          >
            <EmailIcon />
            <span>{siteConfig.social.email.displayName}</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Connect;
