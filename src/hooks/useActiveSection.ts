import { useState, useEffect } from "react";

// Custom hook to track which section is currently in view
const useActiveSection = (sectionIds: readonly string[]): string => {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    // Track visible sections and their intersection ratios
    const visibleSections = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id;
          if (entry.isIntersecting) {
            visibleSections.set(sectionId, entry.intersectionRatio);
          } else {
            visibleSections.delete(sectionId);
          }
        });

        // Find the section with the highest visibility
        if (visibleSections.size > 0) {
          let maxRatio = 0;
          let mostVisibleSection = sectionIds[0];

          visibleSections.forEach((ratio, sectionId) => {
            if (ratio > maxRatio) {
              maxRatio = ratio;
              mostVisibleSection = sectionId;
            }
          });

          setActiveSection(mostVisibleSection);
        }
      },
      {
        // Multiple thresholds for better tracking
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5],
        // Adjust for fixed navbar height (80px top offset)
        rootMargin: "-80px 0px 0px 0px",
      }
    );

    // Observe all sections
    sectionIds.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    // Cleanup observer on unmount
    return () => {
      observer.disconnect();
    };
  }, [sectionIds]);

  return activeSection;
};

export default useActiveSection;
