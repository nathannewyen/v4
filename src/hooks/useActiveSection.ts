import { useState, useEffect } from "react";

// Custom hook to track which section is currently in view
const useActiveSection = (sectionIds: readonly string[]): string => {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    // Create an observer for each section
    sectionIds.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // When section is at least 30% visible, mark it as active
            if (entry.isIntersecting) {
              setActiveSection(sectionId);
            }
          });
        },
        {
          // Trigger when 30% of the section is visible
          threshold: 0.3,
          // Adjust for fixed navbar height
          rootMargin: "-80px 0px -50% 0px",
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    // Cleanup observers on unmount
    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sectionIds]);

  return activeSection;
};

export default useActiveSection;
