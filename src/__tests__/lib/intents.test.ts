import { describe, expect, it } from "vitest";
import { BOOKING_INTENT, EMAIL_INTENT } from "@/lib/intents";

describe("BOOKING_INTENT", () => {
  it.each([
    "book a call with nhan",
    "can we schedule a meeting",
    "let's set up a chat",
    "set-up a call",
    "arrange an intro",
    "plan a call next week",
    "reserve some time",
    "calendly",
    "meet",
    "meeting",
    "BOOK A CALL",
  ])("matches %j", (input) => {
    expect(BOOKING_INTENT.test(input)).toBe(true);
  });

  it.each(["book I'm reading", "great book", "schedule", "gmail", "hometown", ""])(
    "does not match %j",
    (input) => {
      expect(BOOKING_INTENT.test(input)).toBe(false);
    }
  );
});

describe("EMAIL_INTENT", () => {
  it.each(["email me", "send me an email", "e-mail", "EMAIL", "use mailto"])(
    "matches %j",
    (input) => {
      expect(EMAIL_INTENT.test(input)).toBe(true);
    }
  );

  it.each(["gmail", "emailing later", "mailer", ""])("does not match %j", (input) => {
    expect(EMAIL_INTENT.test(input)).toBe(false);
  });
});
