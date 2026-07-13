export const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/nhan13574/15min";

type CalendlyWindow = Window & {
  Calendly?: { initPopupWidget: (opts: { url: string }) => void };
};

export function openCalendly() {
  const w = window as CalendlyWindow;

  if (w.Calendly) {
    w.Calendly.initPopupWidget({ url: CALENDLY_URL });
    return;
  }

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://assets.calendly.com/assets/external/widget.css";
  document.head.appendChild(link);

  const script = document.createElement("script");
  script.src = "https://assets.calendly.com/assets/external/widget.js";
  script.async = true;
  script.onload = () => {
    (window as CalendlyWindow).Calendly?.initPopupWidget({ url: CALENDLY_URL });
  };
  document.body.appendChild(script);
}
