"use client";

import { useEffect, useRef, useState } from "react";
import { openCalendly } from "@/lib/openCalendly";
import { siteConfig } from "@/config/site";

const BOOT_COMMAND = "Hi, I'm Newyen.";
const MAX_INPUT = 8000;
const PLACEHOLDER_EXAMPLES = [
  "tell me about nhan",
  "what are his top skills",
  "take me to his projects",
  "book a call with nhan",
  "paste a job description…",
];

const BOOKING_INTENT =
  /\b(book|schedule|set[- ]?up|arrange|plan|reserve)\b.*\b(call|meeting|chat|time|interview|intro)\b|\bcalendly\b|\bmeet(ing)?\b/i;

const EMAIL_INTENT = /\b(email|e-mail|mailto)\b/i;

const NAV_TARGETS: { pattern: RegExp; id: string; label: string }[] = [
  {
    pattern:
      /(take me|show me|scroll|go|navigate|jump|open)( to)? (his |the )?(personal )?projects?/i,
    id: "projects",
    label: "Projects",
  },
  {
    pattern:
      /(take me|show me|scroll|go|navigate|jump|open)( to)? (his |the )?(experience|work history|jobs?|career)/i,
    id: "experience",
    label: "Experience",
  },
  {
    pattern:
      /(take me|show me|scroll|go|navigate|jump|open)( to)? (his |the )?(open[- ]?source|contributions?|oss)/i,
    id: "open-source",
    label: "Open Source",
  },
  {
    pattern:
      /(take me|show me|scroll|go|navigate|jump|open)( to)? (his |the )?(contact|connect|reach out)/i,
    id: "connect",
    label: "Contact",
  },
  {
    pattern:
      /(take me|show me|scroll|go|navigate|jump|open)( to)? (his |the )?(intro|home|top|hero|start)/i,
    id: "intro",
    label: "Intro",
  },
];

function detectNavIntent(input: string) {
  const trimmed = input.trim();
  for (const t of NAV_TARGETS) {
    if (t.pattern.test(trimmed)) return t;
  }
  return null;
}

function useTypewriter(text: string, speed = 55, startAfter = 200) {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const start = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setTyped(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(iv);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(iv);
    }, startAfter);
    return () => clearTimeout(start);
  }, [text, speed, startAfter]);

  return { typed, done };
}

type Status = "idle" | "loading" | "streaming" | "error";
type Turn = { question: string; answer: string };

export default function TerminalCTA() {
  const { typed, done: cmdDone } = useTypewriter(BOOT_COMMAND);
  const [showPrompt, setShowPrompt] = useState(false);
  const [input, setInput] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (cmdDone) {
      const t = setTimeout(() => setShowPrompt(true), 200);
      return () => clearTimeout(t);
    }
  }, [cmdDone]);

  useEffect(() => {
    if (!showPrompt || input.length > 0) return;
    const iv = setInterval(() => {
      setPlaceholderIdx((i) => (i + 1) % PLACEHOLDER_EXAMPLES.length);
    }, 3200);
    return () => clearInterval(iv);
  }, [showPrompt, input.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [turns, status]);

  // Auto-grow the textarea to fit its content, capped at ~8 lines
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  }, [input]);

  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed || trimmed.length > MAX_INPUT || status === "loading" || status === "streaming")
      return;

    const question = trimmed;
    setInput("");
    setError(null);

    // Booking intent → open Calendly popup, no API call
    if (BOOKING_INTENT.test(question)) {
      setTurns((prev) => [...prev, { question, answer: "→ Opening scheduler…" }]);
      setTimeout(() => {
        openCalendly();
        inputRef.current?.focus();
      }, 150);
      return;
    }

    // Email intent → open mail client, no API call
    if (EMAIL_INTENT.test(question)) {
      const email = siteConfig.social.email.address;
      setTurns((prev) => [...prev, { question, answer: `→ Opening mail to ${email}…` }]);
      setTimeout(() => {
        window.location.href = `mailto:${email}`;
        inputRef.current?.focus();
      }, 150);
      return;
    }

    // Navigation intent → scroll page, no API call
    const nav = detectNavIntent(question);
    if (nav) {
      const answer = `→ Scrolling to ${nav.label} section.`;
      setTurns((prev) => [...prev, { question, answer }]);
      setTimeout(() => {
        document.getElementById(nav.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        inputRef.current?.focus();
      }, 150);
      return;
    }

    setStatus("loading");
    setTurns((prev) => [...prev, { question, answer: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `Request failed (${res.status})`);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("Stream unavailable.");

      setStatus("streaming");
      const decoder = new TextDecoder();
      let acc = "";
      const TYPE_DELAY_MS = 12; // ~80 chars/sec — fast typist feel

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });

        // Reveal the chunk character-by-character for a live-typing effect.
        for (const ch of chunk) {
          acc += ch;
          setTurns((prev) => {
            const next = [...prev];
            next[next.length - 1] = { question, answer: acc };
            return next;
          });
          await new Promise((resolve) => setTimeout(resolve, TYPE_DELAY_MS));
        }
      }

      setStatus("idle");
      inputRef.current?.focus();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
      setTurns((prev) => prev.slice(0, -1));
    }
  }

  return (
    <div
      className="terminal-resize group/terminal relative border border-[#1A2234] dark:border-white/70 bg-[#fdf6e3] dark:bg-[#0f0f18] font-mono overflow-hidden"
      style={{
        width: 620,
        height: 400,
        resize: "vertical",
        minHeight: 300,
        maxHeight: 520,
      }}
    >
      {/* Terminal header */}
      <div className="flex items-center justify-center border-b border-[#1A2234]/15 dark:border-white/15 px-4 py-2.5 select-none">
        <span className="text-[11px] uppercase tracking-widest text-[#1A2234]/60 dark:text-white/50">
          agent.newyen.dev
        </span>
      </div>

      {/* Body */}
      <div
        ref={scrollRef}
        className="p-5 text-[13px] leading-relaxed overflow-y-auto"
        style={{ height: "calc(100% - 44px)" }}
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex items-baseline gap-2 text-[#1A2234]/90 dark:text-white/90">
          <span className="text-[#059669] dark:text-[#28c840]">$</span>
          <span>{typed}</span>
          {!cmdDone && <BlinkingCursor />}
        </div>

        {turns.map((turn, i) => {
          const isLast = i === turns.length - 1;
          const isStreaming = isLast && status === "streaming";
          const isThinking = isLast && status === "loading";
          return (
            <div key={i} className="mt-5 space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-[#059669] dark:text-[#28c840]">›</span>
                <span className="whitespace-pre-wrap break-words text-[#1A2234] dark:text-white font-medium">
                  {turn.question}
                </span>
              </div>
              {isThinking && (
                <div className="flex items-baseline gap-2 text-[#1A2234]/60 dark:text-white/50 pl-4">
                  <span className="text-[#b45309] dark:text-[#febc2e]">▸</span>
                  <LoadingDots />
                </div>
              )}
              {turn.answer && <AnswerBlock text={turn.answer} isStreaming={isStreaming} />}
            </div>
          );
        })}

        {status === "error" && error && (
          <div className="mt-5 flex items-baseline gap-2 text-[#dc2626] dark:text-[#ff5f57]">
            <span>✗</span>
            <span>{error}</span>
          </div>
        )}

        {showPrompt && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="mt-5 flex items-start gap-2 animate-fadeIn"
          >
            <span className="text-[#059669] dark:text-[#28c840] leading-[1.55]">›</span>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              rows={1}
              disabled={status === "loading" || status === "streaming"}
              placeholder={PLACEHOLDER_EXAMPLES[placeholderIdx]}
              className="flex-1 resize-none bg-transparent text-[#1A2234] dark:text-white/90 placeholder:text-[#1A2234]/40 dark:placeholder:text-white/25 focus:outline-none text-[13px] leading-[1.55] min-h-[20px] max-h-[160px] overflow-y-auto disabled:opacity-40"
              aria-label="Ask the agent"
            />
          </form>
        )}
      </div>

      {/* Custom resize affordance — three tapered bars in the bottom-right.
          Non-interactive; the whole container is resizable via CSS. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-2 right-2 flex flex-col items-end gap-[3px] opacity-50 group-hover/terminal:opacity-100 transition-opacity"
      >
        <span className="block h-[2px] w-[6px] bg-[#1A2234] dark:bg-white/80" />
        <span className="block h-[2px] w-[10px] bg-[#1A2234] dark:bg-white/80" />
        <span className="block h-[2px] w-[14px] bg-[#1A2234] dark:bg-white/80" />
      </div>
    </div>
  );
}

// Renders a streamed answer as visually-separated sections.
// Splits on blank lines, and treats a first line ending in ":" as a section label.
function AnswerBlock({ text, isStreaming }: { text: string; isStreaming: boolean }) {
  const sections = text.split(/\n{2,}/).filter((s) => s.trim().length > 0);

  return (
    <div className="pl-4 space-y-4">
      {sections.map((section, i) => {
        const lines = section.split("\n");
        const firstLine = lines[0]?.trim() ?? "";
        const isLabeled = /^[A-Z][A-Za-z0-9 /()&+.-]{1,40}:$/.test(firstLine);
        const body = isLabeled ? lines.slice(1).join("\n") : section;
        const isLast = i === sections.length - 1;

        return (
          <div key={i} className="space-y-1.5">
            {isLabeled && (
              <div className="text-[11px] uppercase tracking-widest text-[#b45309] dark:text-[#febc2e] font-bold">
                {firstLine.replace(/:$/, "")}
              </div>
            )}
            <div className="whitespace-pre-wrap break-words text-[#1d4ed8] dark:text-[#8ec5ff] leading-relaxed">
              {body}
              {isStreaming && isLast && <BlinkingCursor />}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function BlinkingCursor() {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-[14px] w-[8px] ml-0.5 -mb-[2px] bg-[#059669] dark:bg-[#28c840] animate-pulse align-middle"
    />
  );
}

function LoadingDots() {
  const [dots, setDots] = useState("");
  useEffect(() => {
    const iv = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."));
    }, 400);
    return () => clearInterval(iv);
  }, []);
  return <span className="text-[#b45309] dark:text-[#febc2e]">thinking{dots}</span>;
}
