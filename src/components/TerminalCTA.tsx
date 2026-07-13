"use client";

import { useEffect, useRef, useState } from "react";

const BOOT_COMMAND = "Hi, I am Nhan's Agent";
const MAX_INPUT = 8000;
const PLACEHOLDER_EXAMPLES = [
  "tell me about nhan",
  "what are his top skills",
  "take me to his projects",
  "paste a job description…",
];

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

  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed || trimmed.length > MAX_INPUT || status === "loading" || status === "streaming")
      return;

    const question = trimmed;
    setInput("");
    setError(null);

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

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setTurns((prev) => {
          const next = [...prev];
          next[next.length - 1] = { question, answer: acc };
          return next;
        });
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
      className="relative border border-[#1A2234] dark:border-white/70 bg-[#0f0f18] font-mono overflow-hidden"
      style={{
        width: 600,
        height: 400,
        resize: "vertical",
        minHeight: 300,
        maxHeight: 520,
      }}
    >
      {/* Terminal header */}
      <div className="flex items-center justify-center border-b border-white/15 px-4 py-2.5 select-none">
        <span className="text-[11px] uppercase tracking-widest text-white/50">
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
        <div className="flex items-baseline gap-2 text-white/90">
          <span className="text-[#28c840]">$</span>
          <span>{typed}</span>
          {!cmdDone && <BlinkingCursor />}
        </div>

        {turns.map((turn, i) => {
          const isLast = i === turns.length - 1;
          const isStreaming = isLast && status === "streaming";
          const isThinking = isLast && status === "loading";
          return (
            <div key={i} className="mt-5 space-y-2">
              <div className="flex items-baseline gap-2 text-white/90">
                <span className="text-[#28c840]">›</span>
                <span className="whitespace-pre-wrap break-words">{turn.question}</span>
              </div>
              {isThinking && (
                <div className="flex items-baseline gap-2 text-white/50 pl-4">
                  <span className="text-[#febc2e]">▸</span>
                  <LoadingDots />
                </div>
              )}
              {turn.answer && (
                <div className="text-white/85 whitespace-pre-wrap break-words pl-4">
                  {turn.answer}
                  {isStreaming && <BlinkingCursor />}
                </div>
              )}
            </div>
          );
        })}

        {status === "error" && error && (
          <div className="mt-5 flex items-baseline gap-2 text-[#ff5f57]">
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
            className="mt-5 flex items-center gap-2 animate-fadeIn"
          >
            <span className="text-[#28c840] leading-none">›</span>
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
              className="flex-1 resize-none bg-transparent text-white/90 placeholder:text-white/25 focus:outline-none text-[13px] leading-relaxed min-h-[20px] disabled:opacity-40"
              aria-label="Ask the agent"
            />
          </form>
        )}
      </div>

      {/* Visible resize grip in bottom-right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1 right-1 flex flex-col items-end gap-[2px] opacity-40"
      >
        <div className="flex gap-[2px]">
          <span className="block h-[2px] w-[2px] bg-white/70" />
          <span className="block h-[2px] w-[2px] bg-white/70" />
          <span className="block h-[2px] w-[2px] bg-white/70" />
        </div>
        <div className="flex gap-[2px]">
          <span className="block h-[2px] w-[2px] bg-transparent" />
          <span className="block h-[2px] w-[2px] bg-white/70" />
          <span className="block h-[2px] w-[2px] bg-white/70" />
        </div>
        <div className="flex gap-[2px]">
          <span className="block h-[2px] w-[2px] bg-transparent" />
          <span className="block h-[2px] w-[2px] bg-transparent" />
          <span className="block h-[2px] w-[2px] bg-white/70" />
        </div>
      </div>
    </div>
  );
}

function BlinkingCursor() {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-[14px] w-[8px] ml-0.5 -mb-[2px] bg-[#28c840] animate-pulse align-middle"
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
  return <span className="text-[#febc2e]">thinking{dots}</span>;
}
