"use client";

import { useScrollAnimation, useStackOverflow } from "@/hooks";
import Skeleton from "@/components/Skeleton";
import { SOCIAL_LINKS } from "@/constants";
import { ExternalLinkIcon } from "@/components/icons";

// Decode HTML entities from Stack Exchange API (e.g., &amp; -> &, &quot; -> ")
const decodeHtmlEntities = (text: string): string => {
  const htmlEntities: Record<string, string> = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&apos;": "'",
    "&nbsp;": " ",
  };

  return text.replace(/&(?:amp|lt|gt|quot|#39|apos|nbsp);/g, (match) => htmlEntities[match]);
};

// Stack Overflow section - Displays top answers and reputation
const StackOverflow = () => {
  const [sectionRef, isVisible] = useScrollAnimation(0.1);
  // Fetch Stack Overflow answers and user profile from the API
  const {
    answers: stackOverflowAnswers,
    user: stackOverflowUser,
    isLoading: stackOverflowLoading,
    isError: stackOverflowError,
  } = useStackOverflow();

  return (
    <section id="stackoverflow" className="py-16 md:py-32 px-4 md:px-16 bg-white dark:bg-[#15151f]">
      <div ref={sectionRef} className="max-w-[1440px] mx-auto">
        {/* Section title */}
        <h2
          className={`text-4xl md:text-6xl font-bold mb-4 border-b-8 border-[#1A2234] dark:border-white pb-4 inline-block text-[#1A2234] dark:text-white transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          STACK OVERFLOW
        </h2>

        {/* Section subtitle */}
        <h3
          className={`text-xl md:text-3xl font-bold mb-8 border-l-4 border-[#1A2234] dark:border-white pl-4 text-[#1A2234] dark:text-white transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          CONTRIBUTING TO THE DEV COMMUNITY
        </h3>

        {/* Top answers heading with reputation on the right */}
        <div
          className={`flex items-center justify-between mb-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: "200ms" }}
        >
          <h4 className="text-lg md:text-xl font-bold text-[#1A2234] dark:text-white">
            TOP ANSWERS
          </h4>
          {stackOverflowLoading ? (
            <Skeleton className="h-5 w-28" />
          ) : stackOverflowUser ? (
            <span className="text-sm md:text-base text-[#666] dark:text-[#a0a0a0]">
              {stackOverflowUser.reputation.toLocaleString()} reputation
            </span>
          ) : null}
        </div>

        {/* Answer list */}
        {stackOverflowLoading ? (
          // Loading skeleton
          <div className="border-4 border-[#1A2234] dark:border-[#3a3a4e] p-4 md:p-6 mb-8">
            <div className="space-y-4">
              {[...Array(5)].map((_, index) => (
                <Skeleton key={index} className="h-14 w-full" />
              ))}
            </div>
          </div>
        ) : stackOverflowError ? (
          // Error state when API call fails
          <p className="text-[#666] dark:text-[#a0a0a0] mb-8">Unable to load answers.</p>
        ) : stackOverflowAnswers.length > 0 ? (
          // List of top answers in bordered container
          <div
            className={`border-4 border-[#1A2234] dark:border-[#3a3a4e] mb-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "400ms" }}
          >
            {stackOverflowAnswers.slice(0, 5).map((answer, answerIndex) => (
              <a
                key={answer.answerId}
                href={answer.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-4 p-4 md:p-5 hover:bg-[#f5f5f5] dark:hover:bg-[#1a1a2e] cursor-pointer transition-colors group ${
                  answerIndex !== 0 ? "border-t-2 border-[#e0e0e0] dark:border-[#2a2a3e]" : ""
                }`}
              >
                {/* Upvotes badge */}
                <span className="flex items-center justify-center min-w-[90px] px-3 py-1.5 bg-[#1A2234] dark:bg-white text-white dark:text-[#1A2234] text-sm font-bold">
                  {answer.score} {answer.score === 1 ? "upvote" : "upvotes"}
                </span>
                {/* Question title with hover link icon */}
                <span className="text-sm text-[#1A2234] dark:text-white group-hover:underline flex-1 line-clamp-1 flex items-center gap-2">
                  {decodeHtmlEntities(answer.questionTitle)}
                  <ExternalLinkIcon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </span>
                {/* Tags (hidden on mobile) */}
                <div className="hidden md:flex gap-2">
                  {answer.tags?.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs bg-[#e8e8e8] dark:bg-[#2a2a3e] text-[#555] dark:text-[#aaa]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        ) : null}

        {/* Link to full Stack Overflow profile */}
        <a
          href={SOCIAL_LINKS.stackoverflow}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 px-6 py-3 bg-[#1A2234] dark:bg-white text-white dark:text-[#1A2234] font-bold hover:bg-[#2a2a4e] dark:hover:bg-[#e0e0e0] transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: "800ms" }}
        >
          VIEW STACK OVERFLOW
          <ExternalLinkIcon />
        </a>
      </div>
    </section>
  );
};

export default StackOverflow;
