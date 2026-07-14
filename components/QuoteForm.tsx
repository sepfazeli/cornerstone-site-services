"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import Reveal from "./Reveal";
import { site, services } from "@/lib/site";

const SLOT_TIMES = ["8:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"];
const MAX_PHOTOS = 5;
const MAX_TOTAL_MB = 12;

type Preview = { file: File; url: string };

function nextDays(count: number) {
  const days: Date[] = [];
  const d = new Date();
  d.setDate(d.getDate() + 1);
  while (days.length < count) {
    if (d.getDay() !== 0) days.push(new Date(d)); // closed Sundays
    d.setDate(d.getDate() + 1);
  }
  return days;
}

export default function QuoteForm() {
  const days = useMemo(() => nextDays(12), []);
  const [previews, setPreviews] = useState<Preview[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [plan, setPlan] = useState("subscription");
  const [day, setDay] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const fileInput = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function addFiles(list: FileList | null) {
    if (!list) return;
    const incoming = Array.from(list).filter((f) => f.type.startsWith("image/"));
    setPreviews((prev) => {
      const merged = [...prev];
      for (const f of incoming) {
        if (merged.length >= MAX_PHOTOS) break;
        if (!merged.some((p) => p.file.name === f.name && p.file.size === f.size)) {
          merged.push({ file: f, url: URL.createObjectURL(f) });
        }
      }
      return merged;
    });
  }

  function removePhoto(url: string) {
    setPreviews((prev) => {
      URL.revokeObjectURL(url);
      return prev.filter((p) => p.url !== url);
    });
  }

  function toggleService(key: string) {
    setSelectedServices((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const totalMb = previews.reduce((s, p) => s + p.file.size, 0) / (1024 * 1024);
    if (totalMb > MAX_TOTAL_MB) {
      alert(`Photos are ${totalMb.toFixed(1)} MB total — please keep under ${MAX_TOTAL_MB} MB, or text them to ${site.phoneDisplay}.`);
      return;
    }
    setStatus("sending");
    try {
      const fd = new FormData(form);
      fd.set("services", selectedServices.join(", ") || "General");
      fd.set("plan", plan);
      fd.set("slotDay", day);
      fd.set("slotTime", time);
      previews.forEach((p, i) => fd.append(`photo-${i}`, p.file, p.file.name));
      const res = await fetch("/api/quote", { method: "POST", body: fd });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("done");
      previews.forEach((p) => URL.revokeObjectURL(p.url));
    } catch {
      setStatus("error");
    }
  }

  const inputCls =
    "w-full rounded-xl border border-clay-500/25 bg-cream-50 px-4 py-3 text-sm text-espresso-900 placeholder:text-espresso-700/40 focus:border-clay-500 focus:outline-none focus:ring-2 focus:ring-clay-500/20 transition";

  if (status === "done") {
    return (
      <section id="quote" className="mx-auto max-w-3xl scroll-mt-24 px-5 py-24 text-center lg:py-32">
        <div className="rounded-3xl border border-clay-500/25 bg-cream-100/70 p-12">
          <p className="font-display text-5xl">✦</p>
          <h2 className="mt-4 font-display text-4xl font-semibold">Request received.</h2>
          <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-espresso-700/90">
            We&apos;re sizing your job from the photos now. Expect your firm quote by
            text within <strong>2 business hours</strong>
            {day && time ? (
              <> — and we&apos;ve penciled you in for <strong>{day} at {time}</strong>.</>
            ) : (
              "."
            )}
          </p>
          <a
            href={`tel:${site.phone}`}
            className="mt-8 inline-block rounded-full bg-clay-500 px-7 py-3.5 font-semibold text-cream-50 hover:bg-clay-600"
          >
            Questions? Call {site.phoneDisplay}
          </a>
        </div>
      </section>
    );
  }

  return (
    <section id="quote" className="relative scroll-mt-24 overflow-hidden bg-cream-100/70 py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[1fr_1.2fr] lg:px-8">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <p className="text-xs font-semibold tracking-[0.3em] text-clay-500 uppercase">
              Photo quote + booking
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Snap it. Send it. <em className="text-clay-500">Booked.</em>
            </h2>
            <ol className="mt-8 space-y-6">
              {[
                ["Upload 3–5 photos", "Driveway, facade, patio or car — whatever needs love. No site visit required."],
                ["Get a firm quote in ~2 hours", "We size the job from your photos and text you a real number, not a range."],
                ["Pick your time slot", "Reserve a window right here. We confirm by text — nothing charged until you approve."],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-clay-500 font-display text-lg font-semibold text-cream-50">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-espresso-900">{t}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-espresso-700/85">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-8 rounded-2xl border border-clay-500/20 bg-cream-50 p-5 text-sm leading-relaxed text-espresso-700/90">
              Prefer texting? Send photos straight to{" "}
              <a href={`sms:${site.phone}`} className="font-semibold text-clay-600 underline underline-offset-2">
                {site.phoneDisplay}
              </a>{" "}
              and we&apos;ll take it from there.
            </p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <form
            ref={formRef}
            onSubmit={onSubmit}
            className="rounded-3xl border border-clay-500/20 bg-cream-50 p-7 shadow-xl shadow-espresso-900/5 sm:p-9"
          >
            {/* contact */}
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold tracking-wide text-espresso-800 uppercase">Name</span>
                <input required name="name" autoComplete="name" placeholder="Alex Rivera" className={inputCls} />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold tracking-wide text-espresso-800 uppercase">Phone</span>
                <input required name="phone" type="tel" autoComplete="tel" placeholder="(310) 555-0117" className={inputCls} />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold tracking-wide text-espresso-800 uppercase">Email <span className="font-normal normal-case text-espresso-700/50">(optional)</span></span>
                <input name="email" type="email" autoComplete="email" placeholder="alex@email.com" className={inputCls} />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold tracking-wide text-espresso-800 uppercase">Zip / Neighborhood</span>
                <input required name="area" placeholder="90402 · Santa Monica" className={inputCls} />
              </label>
            </div>

            {/* services */}
            <fieldset className="mt-7">
              <legend className="text-xs font-semibold tracking-wide text-espresso-800 uppercase">What needs cleaning?</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {services.map((s) => {
                  const active = selectedServices.includes(s.key);
                  return (
                    <button
                      type="button"
                      key={s.key}
                      onClick={() => toggleService(s.key)}
                      aria-pressed={active}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        active
                          ? "border-clay-500 bg-clay-500 text-cream-50 shadow-md shadow-clay-500/25"
                          : "border-clay-500/30 bg-cream-50 text-espresso-800 hover:border-clay-500/70"
                      }`}
                    >
                      {s.title}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* plan */}
            <fieldset className="mt-7">
              <legend className="text-xs font-semibold tracking-wide text-espresso-800 uppercase">How often?</legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {[
                  ["one-time", "One-time deep clean", "Full reset, single visit"],
                  ["subscription", "Care plan (subscription)", "Deep clean + scheduled upkeep"],
                ].map(([val, label, sub]) => (
                  <button
                    type="button"
                    key={val}
                    onClick={() => setPlan(val)}
                    aria-pressed={plan === val}
                    className={`rounded-2xl border p-4 text-left transition-all duration-200 ${
                      plan === val
                        ? "border-clay-500 bg-clay-500/10 ring-2 ring-clay-500/30"
                        : "border-clay-500/25 hover:border-clay-500/60"
                    }`}
                  >
                    <span className="block text-sm font-semibold text-espresso-900">{label}</span>
                    <span className="mt-0.5 block text-xs text-espresso-700/70">{sub}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            {/* photos */}
            <fieldset className="mt-7">
              <legend className="text-xs font-semibold tracking-wide text-espresso-800 uppercase">
                Photos <span className="font-normal normal-case text-espresso-700/50">(up to {MAX_PHOTOS})</span>
              </legend>
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  addFiles(e.dataTransfer.files);
                }}
                onClick={() => fileInput.current?.click()}
                className="mt-3 flex min-h-28 cursor-pointer flex-wrap items-center gap-3 rounded-2xl border-2 border-dashed border-clay-500/35 bg-cream-100/50 p-4 transition-colors hover:border-clay-500/70 hover:bg-cream-100"
              >
                {previews.length === 0 && (
                  <p className="w-full text-center text-sm text-espresso-700/60">
                    <span className="mb-1 block text-2xl">📷</span>
                    Tap to add photos, or drag &amp; drop
                  </p>
                )}
                {previews.map((p) => (
                  <div key={p.url} className="relative h-20 w-20 overflow-hidden rounded-xl border border-clay-500/25">
                    <Image src={p.url} alt="Upload preview" fill unoptimized className="object-cover" />
                    <button
                      type="button"
                      aria-label="Remove photo"
                      onClick={(e) => {
                        e.stopPropagation();
                        removePhoto(p.url);
                      }}
                      className="absolute top-0.5 right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-espresso-900/80 text-[10px] text-cream-50"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <input
                  ref={fileInput}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    addFiles(e.target.files);
                    e.target.value = "";
                  }}
                />
              </div>
            </fieldset>

            {/* booking */}
            <fieldset className="mt-7">
              <legend className="text-xs font-semibold tracking-wide text-espresso-800 uppercase">
                Reserve a time slot <span className="font-normal normal-case text-espresso-700/50">(optional — confirmed by text)</span>
              </legend>
              <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
                {days.map((d) => {
                  const label = d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
                  const active = day === label;
                  return (
                    <button
                      type="button"
                      key={label}
                      onClick={() => setDay(active ? "" : label)}
                      aria-pressed={active}
                      className={`shrink-0 rounded-xl border px-3.5 py-2.5 text-center transition-all duration-200 ${
                        active
                          ? "border-clay-500 bg-clay-500 text-cream-50 shadow-md shadow-clay-500/25"
                          : "border-clay-500/25 bg-cream-50 text-espresso-800 hover:border-clay-500/60"
                      }`}
                    >
                      <span className="block text-[11px] font-medium uppercase opacity-70">
                        {label.split(",")[0]}
                      </span>
                      <span className="block text-sm font-semibold">
                        {label.split(", ")[1]}
                      </span>
                    </button>
                  );
                })}
              </div>
              {day && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {SLOT_TIMES.map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setTime(time === t ? "" : t)}
                      aria-pressed={time === t}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        time === t
                          ? "border-clay-500 bg-clay-500 text-cream-50"
                          : "border-clay-500/30 text-espresso-800 hover:border-clay-500/70"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </fieldset>

            <label className="mt-7 block">
              <span className="mb-1.5 block text-xs font-semibold tracking-wide text-espresso-800 uppercase">
                Anything else? <span className="font-normal normal-case text-espresso-700/50">(optional)</span>
              </span>
              <textarea
                name="notes"
                rows={3}
                placeholder="Gate code, parking notes, problem areas…"
                className={inputCls}
              />
            </label>

            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-sheen mt-8 w-full rounded-full bg-clay-500 py-4 text-base font-semibold text-cream-50 shadow-lg shadow-clay-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-clay-600 disabled:cursor-wait disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send My Photo Quote Request"}
            </button>
            {status === "error" && (
              <p role="alert" className="mt-3 text-center text-sm font-medium text-clay-700">
                Something went wrong — please try again, or text your photos to{" "}
                <a href={`sms:${site.phone}`} className="underline">{site.phoneDisplay}</a>.
              </p>
            )}
            <p className="mt-4 text-center text-xs text-espresso-700/55">
              No spam, no obligation. We only use your info to prepare your quote.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
