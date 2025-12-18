import { clsx, type ClassValue } from "clsx";

// Utility function for merging Tailwind CSS classes
// Handles conditional classes cleanly: cn("base", condition && "conditional")
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// HTML entity mapping for decoding API responses
const HTML_ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
  "&nbsp;": " ",
};

// Decode HTML entities from external APIs (e.g., Stack Exchange)
// Converts encoded characters like &amp; -> &, &quot; -> "
export function decodeHtmlEntities(text: string): string {
  return text.replace(/&(?:amp|lt|gt|quot|#39|apos|nbsp);/g, (match) => HTML_ENTITIES[match]);
}
