"use client";

import { siteConfig } from "@/config/site";
import { SOCIAL_LINKS } from "@/constants";
import { GitHubIcon, XIcon, LinkedInIcon } from "@/components/icons";
import TerminalCTA from "@/components/TerminalCTA";

interface HeroProps {
  isLoaded: boolean;
}

// Hero section - Introduction with name, title, and social links
const Hero = ({ isLoaded }: HeroProps) => {
  return (
    <section id="intro" className="min-h-screen flex items-center px-4 md:px-16">
      <div className="max-w-[1440px] mx-auto w-full">
        <div className="flex items-center justify-between">
          {/* Left Content - Name, title, description, and social links */}
          <div
            className={`max-w-2xl xl:max-w-xl transition-all duration-700 delay-100 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {/* Name */}
            <h1 className="font-display text-6xl md:text-8xl leading-none mb-6 text-[#1A2234] dark:text-white">
              {siteConfig.name.first}
              <br />
              {siteConfig.name.last}
            </h1>

            {/* Thick underline decoration */}
            <div className="w-full max-w-lg h-2 bg-[#1A2234] dark:bg-white mb-8" />

            {/* Title */}
            <p className="font-mono-custom text-sm mb-6 uppercase text-xl md:text-2xl text-[#1A2234] dark:text-white font-medium">
              {siteConfig.title}
            </p>

            {/* Description */}
            <p className="text-lg md:text-xl text-[#1A2234] dark:text-[#a0a0a0] font-medium mb-8">
              {siteConfig.bio}
            </p>

            {/* Social Links - X/Twitter and GitHub */}
            <div className="flex items-center gap-4 flex-wrap">
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-2.5 border-2 border-[#1A2234] dark:border-white text-[#1A2234] dark:text-white hover:bg-[#1A2234] dark:hover:bg-white hover:text-white dark:hover:text-[#1A2234] transition-all duration-200"
              >
                <XIcon />
                <span className="text-xs font-bold tracking-wider">X / TWITTER</span>
              </a>
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-2.5 bg-[#1A2234] dark:bg-white text-white dark:text-[#1A2234] hover:bg-[#2a2a4e] dark:hover:bg-[#e0e0e0] transition-all duration-200"
              >
                <GitHubIcon />
                <span className="text-xs font-bold tracking-wider">GITHUB</span>
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-2.5 border-2 border-[#1A2234] dark:border-white text-[#1A2234] dark:text-white hover:bg-[#1A2234] dark:hover:bg-white hover:text-white dark:hover:text-[#1A2234] transition-all duration-200"
              >
                <LinkedInIcon />
                <span className="text-xs font-bold tracking-wider">LINKEDIN</span>
              </a>
            </div>
          </div>

          {/* Right Side - Interactive agent terminal */}
          <div
            className={`hidden xl:flex items-center justify-end transition-opacity duration-700 delay-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          >
            <TerminalCTA />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
