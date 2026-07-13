// Client-side intent detection for the terminal. Keeps these patterns out of
// the component file so they can be tested in isolation and reused.

// "book a call", "schedule a meeting", "set up an intro", standalone
// "calendly", or standalone "meet"/"meeting".
export const BOOKING_INTENT =
  /\b(book|schedule|set[- ]?up|arrange|plan|reserve)\b.*\b(call|meeting|chat|time|interview|intro)\b|\bcalendly\b|\bmeet(ing)?\b/i;

// "email", "e-mail", or "mailto" as standalone tokens.
export const EMAIL_INTENT = /\b(email|e-mail|mailto)\b/i;
