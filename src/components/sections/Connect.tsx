import { SOCIAL_LINKS } from "@/constants";
import { GitHubIcon, XIcon, EmailIcon } from "@/components/icons";

// Connect section - Contact links in single line
const Connect = () => {
  return (
    <section className="py-12 md:py-16 px-4 md:px-16 bg-white border-t-4 border-[#1A2234]">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8">CONNECT</h2>
        <div className="flex flex-col md:flex-row md:flex-wrap md:items-center gap-4 md:gap-10">
          {/* GitHub link with icon */}
          <a
            href={SOCIAL_LINKS.github}
            className="flex items-center gap-3 text-lg text-[#1A2234] hover:underline transition-colors"
          >
            <GitHubIcon className="w-7 h-7" />
            <span>github.com/nathannewyen</span>
          </a>
          {/* X/Twitter link with icon */}
          <a
            href={SOCIAL_LINKS.twitter}
            className="flex items-center gap-3 text-lg text-[#1A2234] hover:underline transition-colors"
          >
            <XIcon className="w-7 h-7" />
            <span>x.com/nathannewyenn</span>
          </a>
          {/* Email link with icon */}
          <a
            href={`mailto:${SOCIAL_LINKS.email}`}
            className="flex items-center gap-3 text-lg text-[#1A2234] hover:underline transition-colors"
          >
            <EmailIcon />
            <span>nhan13574 (at) gmail.com</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Connect;
