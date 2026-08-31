"use client";

import { useEffect, useRef, useState } from "react";
import Papa from "papaparse";

// Like useScrollAnimation, but only flips on once the element is
// substantially in view (not just peeking in at the edge). The step
// panels below run multi-second animated sequences — if they started as
// soon as 10% of the section was visible, the sequence could finish
// off-screen before the user actually scrolls down to see it, especially
// on short/zoomed viewports where several sections are visible at once.
function usePanelVisible<T extends HTMLElement>() {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { elementRef, isVisible };
}

type SampleLead = {
  name: string;
  category: string;
  phone: string;
  website: string;
  address: string;
  city: string;
  rating: string;
  reviews: string;
  email: string;
  email_2: string;
  whatsapp: string;
  facebook: string;
  instagram: string;
  linkedin: string;
};

const leadColumns: { key: keyof SampleLead; label: string }[] = [
  { key: "name", label: "Business" },
  { key: "category", label: "Category" },
  { key: "phone", label: "Phone" },
  { key: "website", label: "Website" },
  { key: "address", label: "Address" },
  { key: "city", label: "City" },
  { key: "rating", label: "Rating" },
  { key: "reviews", label: "Reviews" },
  { key: "email", label: "Email" },
  { key: "email_2", label: "Email 2" },
  { key: "whatsapp", label: "WhatsApp" },
  { key: "facebook", label: "Facebook" },
  { key: "instagram", label: "Instagram" },
  { key: "linkedin", label: "LinkedIn" },
];

// Loaded once and shared by every ScrapePanel instance so we don't re-fetch
// the CSV if the section re-mounts.
let cachedLeads: SampleLead[] | null = null;

function useSampleLeadsCsv() {
  const [leads, setLeads] = useState<SampleLead[]>(cachedLeads ?? []);

  useEffect(() => {
    if (cachedLeads) return;
    Papa.parse<SampleLead>("/data/sample-leads.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        cachedLeads = results.data;
        setLeads(results.data);
      },
    });
  }, []);

  return leads;
}

// Counts up from 0 to `to` once the panel scrolls into view.
function useCountUp(to: number, isVisible: boolean, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let raf: number;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * to));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isVisible, to, duration]);

  return value;
}

// Types `text` out character by character once visible, then calls
// `onDone` — used to make the search query feel like it's being typed
// live instead of just appearing.
function useTypewriter(text: string, isVisible: boolean, onDone?: () => void) {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isVisible) return;
    let i = 0;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      i += 1;
      setTyped(text.slice(0, i));
      if (i < text.length) {
        setTimeout(tick, 55 + Math.random() * 55);
      } else {
        setDone(true);
        onDone?.();
      }
    };

    const start = setTimeout(tick, 600);
    return () => {
      cancelled = true;
      clearTimeout(start);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, text]);

  return { typed, done };
}

const SEARCH_QUERY = "Mortgage broker in Prague";

// Step 1 — a real exported CSV rendered as a scrollable data grid (see
// public/data/sample-leads.csv, trimmed from an actual LoonaFlow export):
// every column and row is there, so visitors can scroll through it like a
// spreadsheet instead of a staged three-column mockup. The search query
// types itself out, then a brief "searching" beat plays, then the table
// reveals row by row — so it feels like a real search just happened.
const FOUND_COUNT = 643;

function ScrapePanel({ isVisible }: { isVisible: boolean }) {
  const leads = useSampleLeadsCsv();
  const [visibleRows, setVisibleRows] = useState(0);
  const [searching, setSearching] = useState(false);
  const [resultsShown, setResultsShown] = useState(false);
  const foundCount = useCountUp(FOUND_COUNT, resultsShown, 1600);

  const { typed, done: typingDone } = useTypewriter(SEARCH_QUERY, isVisible, () => {
    setSearching(true);
  });

  useEffect(() => {
    if (!searching) return;
    const t = setTimeout(() => {
      setSearching(false);
      setResultsShown(true);
    }, 1400);
    return () => clearTimeout(t);
  }, [searching]);

  useEffect(() => {
    if (!resultsShown || leads.length === 0) return;
    const timers = leads.map((_, i) =>
      setTimeout(() => setVisibleRows((n) => Math.max(n, i + 1)), i * 220)
    );
    return () => timers.forEach(clearTimeout);
  }, [resultsShown, leads]);

  return (
    <div className="rounded-2xl bg-white shadow-2xl shadow-violet-950/10 ring-1 ring-slate-900/5 overflow-hidden w-full">
      <div className="p-5 sm:p-6 bg-gradient-to-b from-slate-50/80 to-white">
        <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3.5 sm:py-4 ring-1 ring-slate-200 shadow-sm max-w-lg mx-auto">
          <svg
            className="w-5 h-5 text-slate-400 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-sm sm:text-base text-slate-700 font-medium">
            {typed || <span className="text-slate-400">Search Google Maps…</span>}
            {!typingDone && typed && (
              <span className="inline-block w-[2px] h-4 bg-violet-400 ml-0.5 -mb-0.5 animate-pulse" />
            )}
          </span>
        </div>
      </div>

      {searching && (
        <div className="flex items-center justify-center gap-2.5 px-5 py-10 text-sm text-slate-400 border-t border-slate-100">
          <span className="flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" />
          </span>
          Searching Google Maps…
        </div>
      )}

      {resultsShown && (
        <>
          <div className="flex items-center gap-2 px-5 py-3 border-t border-slate-100 animate-fade-in">
            <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm text-slate-600">
              Found <span className="font-semibold text-slate-900 tabular-nums">{foundCount}</span> registered
              businesses
            </span>
          </div>
          <div className="max-h-72 overflow-auto animate-fade-in border-t border-slate-100">
            <table className="text-sm text-left border-collapse">
              <thead className="text-xs text-slate-400 uppercase sticky top-0 bg-white z-10">
                <tr>
                  {leadColumns.map((col) => (
                    <th
                      key={col.key}
                      className="px-4 py-2.5 font-medium whitespace-nowrap border-b border-slate-100 bg-white"
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map((r, i) => (
                  <tr
                    key={r.name}
                    className="border-t border-slate-50 transition-all duration-500 ease-out"
                    style={{
                      opacity: i < visibleRows ? 1 : 0,
                      transform: i < visibleRows ? "translateY(0)" : "translateY(6px)",
                    }}
                  >
                    {leadColumns.map((col) => (
                      <td
                        key={col.key}
                        className={`px-4 py-2.5 whitespace-nowrap max-w-[220px] truncate ${
                          col.key === "name" ? "font-medium text-slate-800" : "text-slate-500"
                        }`}
                      >
                        {r[col.key] || <span className="text-slate-300">—</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 bg-slate-50/70 border-t border-slate-100 text-xs text-slate-400 flex items-center gap-2">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9 2 2 4-4" />
            </svg>
            Real leads from an actual LoonaFlow export, scroll to see every column
          </div>
        </>
      )}
    </div>
  );
}

// Step 2, path A — "do it yourself": the exported list plus the channels
// people actually reach out on. Icons light up one by one.
function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#fff">
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#fff">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.8 14.09c-.24.68-1.4 1.32-1.93 1.37-.5.05-.96.24-3.23-.67-2.73-1.09-4.47-3.87-4.61-4.05-.13-.18-1.1-1.47-1.1-2.8 0-1.34.7-1.99.95-2.26.24-.27.53-.34.7-.34.18 0 .35 0 .5.01.16.01.38-.06.6.46.24.56.8 1.95.87 2.09.07.14.12.31.02.5-.1.18-.15.3-.3.46-.14.16-.3.36-.43.48-.14.14-.29.29-.13.57.17.28.75 1.24 1.61 2 1.11 1 2.05 1.3 2.33 1.45.28.14.44.12.61-.07.16-.19.7-.81.88-1.09.18-.28.36-.23.6-.14.24.09 1.55.73 1.81.87.27.13.44.2.51.31.07.11.07.65-.17 1.33z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#fff">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#fff">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.64.07 4.85 0 3.2-.01 3.58-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85 0-3.2.01-3.58.07-4.85.15-3.23 1.66-4.77 4.92-4.92 1.27-.06 1.64-.07 4.85-.07zM12 0C8.74 0 8.33.01 7.05.07c-4.35.2-6.78 2.62-6.98 6.98C0 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.35 2.62 6.78 6.98 6.98C8.33 24 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-10.84a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#fff">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#fff">
      <path d="M3 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H3zm1.4 2h15.2L12 12.5 4.4 7zM2.5 8.3 12 14.9l9.5-6.6V17a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V8.3z" />
    </svg>
  );
}

const channels = [
  { label: "Phone", Icon: PhoneIcon, bg: "#0EA5A4" },
  { label: "WhatsApp", Icon: WhatsAppIcon, bg: "#25D366" },
  { label: "Facebook", Icon: FacebookIcon, bg: "#1877F2" },
  { label: "Instagram", Icon: InstagramIcon, bg: "linear-gradient(135deg, #f09433, #dc2743, #bc1888)" },
  { label: "LinkedIn", Icon: LinkedInIcon, bg: "#0A66C2" },
  { label: "Email", Icon: EmailIcon, bg: "#64748B" },
];

function ExportPanel({ isVisible }: { isVisible: boolean }) {
  const [litCount, setLitCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const timers = channels.map((_, i) =>
      setTimeout(() => setLitCount((n) => Math.max(n, i + 1)), 500 + i * 320)
    );
    return () => timers.forEach(clearTimeout);
  }, [isVisible]);

  return (
    <div className="rounded-2xl bg-white shadow-2xl shadow-violet-950/10 ring-1 ring-slate-900/5 overflow-hidden w-full h-full flex flex-col">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
        <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0-4-4m4 4 4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
        </svg>
        <span className="text-sm font-medium text-slate-800">128_prague_dentists.csv</span>
      </div>
      <div className="p-6 flex-1 flex flex-col justify-center gap-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Reach out your way
        </p>
        <div className="grid grid-cols-3 gap-3">
          {channels.map(({ label, Icon, bg }, i) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-100 bg-slate-50/70 py-3 transition-all duration-500 ease-out"
              style={{
                opacity: i < litCount ? 1 : 0.25,
                transform: i < litCount ? "translateY(0) scale(1)" : "translateY(4px) scale(0.94)",
              }}
            >
              <span
                className="w-8 h-8 rounded-lg flex items-center justify-center p-[7px]"
                style={{ background: bg }}
              >
                <Icon />
              </span>
              <span className="text-[11px] font-medium text-slate-600">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// LoonaFlow paces sends over several days rather than blasting the whole
// list at once — the send phase below mirrors that as a day-by-day log
// instead of one continuous progress bar.
const SEND_SCHEDULE = [
  { day: "Day 1", count: 50 },
  { day: "Day 2", count: 50 },
  { day: "Day 3", count: 28 },
];

// Step 2, path B — the send/track result. First a "sending" beat plays:
// a day-by-day log of the campaign going out, each day landing with a
// checkmark. Then it settles into the ring + stats view, with the ring
// and reply counters animating in.
function ResultsPanel({ isVisible }: { isVisible: boolean }) {
  const sent = 128;
  const replied = 19;
  const opened = 54;

  const [daysShown, setDaysShown] = useState(0);
  const [sendingDone, setSendingDone] = useState(false);

  useEffect(() => {
    if (!isVisible) return;
    const timers = SEND_SCHEDULE.map((_, i) =>
      setTimeout(() => setDaysShown((n) => Math.max(n, i + 1)), 700 + i * 1100)
    );
    const done = setTimeout(
      () => setSendingDone(true),
      700 + SEND_SCHEDULE.length * 1100 + 900
    );
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(done);
    };
  }, [isVisible]);

  const repliedCount = useCountUp(replied, sendingDone, 1800);
  const openedCount = useCountUp(opened, sendingDone, 1800);
  const sentCount = useCountUp(sent, sendingDone, 1800);
  const [ringProgress, setRingProgress] = useState(0);

  useEffect(() => {
    if (!sendingDone) return;
    const t = setTimeout(() => setRingProgress((replied / sent) * 100), 300);
    return () => clearTimeout(t);
  }, [sendingDone]);

  const circumference = 2 * Math.PI * 40;
  const dash = (ringProgress / 100) * circumference;
  const sentSoFar = SEND_SCHEDULE.slice(0, daysShown).reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="rounded-2xl bg-white shadow-2xl shadow-violet-950/10 ring-1 ring-slate-900/5 overflow-hidden w-full h-full flex flex-col">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
        <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="m22 2-7 20-4-9-9-4Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M22 2 11 13" />
        </svg>
        <span className="text-sm font-medium text-slate-800">Prague Dentists — Outreach</span>
      </div>

      {!sendingDone ? (
        <div className="p-6 flex-1 flex flex-col justify-center gap-3">
          {SEND_SCHEDULE.map((d, i) => {
            const shown = i < daysShown;
            const isLatest = i === daysShown - 1;
            return (
              <div
                key={d.day}
                className="flex items-center gap-3 transition-all duration-500 ease-out"
                style={{
                  opacity: shown ? 1 : 0.25,
                  transform: shown ? "translateY(0)" : "translateY(4px)",
                }}
              >
                <span className="relative flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100 shrink-0">
                  {shown && isLatest && (
                    <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-300 opacity-60 animate-ping" />
                  )}
                  {shown ? (
                    <svg className="relative w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  )}
                </span>
                <span className="text-sm text-slate-600">
                  <span className="font-medium text-slate-800">{d.day}</span> — {d.count} emails sent
                </span>
              </div>
            );
          })}
          <div className="mt-1 pt-3 border-t border-slate-100 text-xs text-slate-400 tabular-nums">
            {sentSoFar} / {sent} sent so far
          </div>
        </div>
      ) : (
        <div className="p-6 flex-1 flex items-center gap-6 animate-fade-in">
          <div className="relative w-24 h-24 shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="10" />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="url(#resultsGradient)"
                strokeWidth="10"
                strokeDasharray={`${dash} ${circumference}`}
                strokeLinecap="round"
                style={{ transition: "stroke-dasharray 1.1s cubic-bezier(0.22, 1, 0.36, 1)" }}
              />
              <defs>
                <linearGradient id="resultsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-base font-bold text-slate-800 tabular-nums">
              {Math.round(ringProgress)}%
            </div>
          </div>
          <div className="space-y-2.5 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-violet-500" />
              <span className="text-slate-600 tabular-nums">{sentCount} sent</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-slate-600 tabular-nums">{openedCount} opened</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-slate-600 tabular-nums">{repliedCount} replied</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StepOne() {
  const { elementRef, isVisible } = usePanelVisible<HTMLDivElement>();

  return (
    <div ref={elementRef} className="relative">
      <div
        className={`max-w-4xl mx-auto mb-8 sm:mb-10 px-4 transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-violet-500 mb-2">
          Sourcing
        </span>
        <div className="flex items-baseline gap-3">
          <span className="text-sm font-bold text-white w-8 h-8 shrink-0 rounded-full flex items-center justify-center bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-lg shadow-violet-600/30 self-center">
            01
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight tracking-tight">
            We scrape Google Maps for you
          </h3>
        </div>
        <p className="text-base text-slate-600 leading-relaxed mt-3 max-w-xl">
          Tell us an audience, like &quot;Dentists in Prague&quot; or &quot;Gyms in Austin.&quot;
          LoonaFlow pulls real, verified listings straight from Google Maps. Already have a
          list? Upload your own CSV instead and skip straight to outreach.
        </p>
      </div>

      <div
        className="transition-all duration-700 ease-out"
        style={{
          transitionDelay: isVisible ? "150ms" : "0ms",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "scale(1) translateY(0)" : "scale(0.96) translateY(16px)",
        }}
      >
        <ScrapePanel isVisible={isVisible} />
      </div>
    </div>
  );
}

// Step 2 is a genuine fork, not a single path — shown as two side-by-side
// cards ("do it yourself" vs. "let LoonaFlow send it") joined by an "or".
function StepTwo() {
  const { elementRef, isVisible } = usePanelVisible<HTMLDivElement>();

  return (
    <div ref={elementRef} className="relative">
      <div
        className={`max-w-4xl mx-auto mb-8 sm:mb-10 px-4 transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-violet-500 mb-2">
          Your choice
        </span>
        <div className="flex items-baseline gap-3">
          <span className="text-sm font-bold text-white w-8 h-8 shrink-0 rounded-full flex items-center justify-center bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-lg shadow-violet-600/30 self-center">
            02
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight tracking-tight">
            Then it&apos;s up to you
          </h3>
        </div>
        <p className="text-base text-slate-600 leading-relaxed mt-3 max-w-xl">
          Download the list and reach out yourself, or let LoonaFlow send the emails for you.
        </p>
      </div>

      <div className="relative grid items-stretch gap-6 lg:gap-0 lg:grid-cols-[1fr_auto_1fr] max-w-4xl mx-auto">
        <div
          className="transition-all duration-700 ease-out lg:pr-8"
          style={{
            transitionDelay: isVisible ? "150ms" : "0ms",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <p className="text-sm font-semibold text-slate-700 mb-3 text-center lg:text-left">
            Download &amp; do it yourself
          </p>
          <ExportPanel isVisible={isVisible} />
        </div>

        <div className="flex lg:flex-col items-center justify-center gap-3 lg:gap-0 py-2 lg:py-0">
          <span className="hidden lg:block w-px flex-1 bg-gradient-to-b from-transparent via-slate-200 to-transparent" />
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 bg-white lg:my-3 px-3 py-1 rounded-full ring-1 ring-slate-100 shadow-sm">
            or
          </span>
          <span className="hidden lg:block w-px flex-1 bg-gradient-to-b from-transparent via-slate-200 to-transparent" />
        </div>

        <div
          className="transition-all duration-700 ease-out lg:pl-8"
          style={{
            transitionDelay: isVisible ? "300ms" : "0ms",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <p className="text-sm font-semibold text-slate-700 mb-3 text-center lg:text-left">
            Let LoonaFlow send the emails
          </p>
          <ResultsPanel isVisible={isVisible} />
        </div>
      </div>
    </div>
  );
}

export default function Journey() {
  return (
    <div className="mb-24 sm:mb-32 pt-16 sm:pt-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-center text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-14 sm:mb-20">
          How it works
        </h2>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col gap-20 sm:gap-28">
        <StepOne />
        <StepTwo />
      </div>
    </div>
  );
}
