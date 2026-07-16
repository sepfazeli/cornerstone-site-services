"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { CameraIcon } from "./Icons";
import { site, services, hearAboutOptions } from "@/lib/site";

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
  const days = useMemo(() => nextDays(10), []);
  const [step, setStep] = useState<1 | 2>(1);
  const [previews, setPreviews] = useState<Preview[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [day, setDay] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [error, setError] = useState<string>("");
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

  function toggleService(title: string) {
    setError("");
    setSelectedServices((prev) =>
      prev.includes(title) ? prev.filter((k) => k !== title) : [...prev, title]
    );
  }

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function goNext() {
    if (selectedServices.length === 0) {
      setError("Pick at least one service to continue.");
      return;
    }
    setError("");
    setStep(2);
    scrollToForm();
  }

  function goBack() {
    setError("");
    setStep(1);
    scrollToForm();
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = fd.get("name")?.toString().trim();
    const phone = fd.get("phone")?.toString().trim();
    if (!name || !phone) {
      setError("Name and phone are all we need — please fill both.");
      return;
    }
    const totalMb = previews.reduce((s, p) => s + p.file.size, 0) / (1024 * 1024);
    if (totalMb > MAX_TOTAL_MB) {
      setError(`Photos are ${totalMb.toFixed(1)} MB total — keep under ${MAX_TOTAL_MB} MB, or text them to ${site.phoneDisplay}.`);
      return;
    }
    setError("");
    setStatus("sending");
    try {
      fd.set("services", selectedServices.join(", "));
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
    "w-full rounded-xl border-3 border-pink-300 bg-cream-50 px-4 py-3 text-sm font-semibold text-azure-700 placeholder:text-azure-700/40 focus:border-azure-500 focus:outline-none transition";
  const labelCls =
    "mb-1.5 block text-xs font-bold tracking-wide text-azure-600 uppercase";

  if (status === "done") {
    return (
      <div id="quote" className="sticker scroll-mt-28 bg-cream-100 p-10 text-center">
        <p className="display text-6xl">✦</p>
        <h2 className="display mt-3 text-5xl">Request received</h2>
        <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed">
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
          className="btn-retro mt-8 inline-block rounded-xl bg-pink-300 px-7 py-3.5 text-lg text-azure-800"
        >
          Questions? Call {site.phoneDisplay}
        </a>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      id="quote"
      onSubmit={onSubmit}
      noValidate
      className="sticker scroll-mt-28 bg-cream-100 p-6 sm:p-8"
    >
      {/* step indicator */}
      <div className="mb-6 flex items-center gap-3">
        {[
          { n: 1 as const, label: "The job" },
          { n: 2 as const, label: "Your details" },
        ].map((s, i) => (
          <div key={s.n} className="flex items-center gap-3">
            {i > 0 && <span className="h-1 w-8 rounded-full bg-pink-300" aria-hidden />}
            <button
              type="button"
              onClick={() => (s.n === 1 ? goBack() : goNext())}
              aria-current={step === s.n ? "step" : undefined}
              className={`flex items-center gap-2 rounded-full border-3 px-4 py-1.5 transition-colors ${
                step === s.n
                  ? "border-azure-500 bg-azure-500 text-cream-50"
                  : "border-pink-300 bg-cream-50 text-azure-600"
              }`}
            >
              <span className="display-flat text-lg">{s.n}</span>
              <span className="text-xs font-bold tracking-wide uppercase">{s.label}</span>
            </button>
          </div>
        ))}
      </div>

      {/* ---------- STEP 1: the job ---------- */}
      <div hidden={step !== 1}>
        <h3 className="display-flat text-3xl tracking-wider text-azure-500">
          What do you need cleaned? <span className="text-pink-500">*</span>
        </h3>
        <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-2.5 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((s) => (
            <label
              key={s.key}
              className="flex cursor-pointer items-center gap-2.5 rounded-xl border-3 border-transparent px-2 py-1.5 text-sm font-bold text-azure-700 transition-colors has-checked:border-pink-300 has-checked:bg-cream-50"
            >
              <input
                type="checkbox"
                className="check-retro"
                checked={selectedServices.includes(s.title)}
                onChange={() => toggleService(s.title)}
              />
              {s.title}
            </label>
          ))}
        </div>

        <fieldset className="mt-6">
          <legend className={labelCls}>
            Photos of the job{" "}
            <span className="font-semibold normal-case text-azure-700/50">
              (optional — but it&apos;s the fastest way to a firm quote)
            </span>
          </legend>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              addFiles(e.dataTransfer.files);
            }}
            onClick={() => fileInput.current?.click()}
            className="mt-2 flex min-h-24 cursor-pointer flex-wrap items-center gap-3 rounded-xl border-3 border-dashed border-pink-400 bg-cream-50 p-4 transition-colors hover:border-azure-500"
          >
            {previews.length === 0 && (
              <p className="w-full text-center text-sm font-semibold text-azure-700/60">
                <CameraIcon className="mx-auto mb-1.5 h-8 w-8 text-azure-500" />
                Tap to add photos, or drag &amp; drop
              </p>
            )}
            {previews.map((p) => (
              <div key={p.url} className="relative h-20 w-20 overflow-hidden rounded-xl border-3 border-pink-300">
                <Image src={p.url} alt="Upload preview" fill unoptimized className="object-cover" />
                <button
                  type="button"
                  aria-label="Remove photo"
                  onClick={(e) => {
                    e.stopPropagation();
                    removePhoto(p.url);
                  }}
                  className="absolute top-0.5 right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-azure-600 text-[10px] text-cream-50"
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

        <button
          type="button"
          onClick={goNext}
          className="btn-retro mt-6 w-full rounded-xl bg-pink-300 py-4 text-2xl text-azure-800"
        >
          Next: Your details →
        </button>
      </div>

      {/* ---------- STEP 2: your details ---------- */}
      <div hidden={step !== 2}>
        {/* picked services recap */}
        <div className="mb-5 flex flex-wrap gap-2">
          {selectedServices.map((s) => (
            <span
              key={s}
              className="rounded-full border-2 border-pink-300 bg-cream-50 px-3 py-1 text-xs font-bold text-azure-600"
            >
              ✦ {s}
            </span>
          ))}
          {previews.length > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-pink-300 bg-cream-50 px-3 py-1 text-xs font-bold text-azure-600">
              <CameraIcon className="h-3.5 w-3.5" /> {previews.length} photo{previews.length > 1 ? "s" : ""}
            </span>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className={labelCls}>* First Name</span>
            <input name="name" autoComplete="given-name" placeholder="Alex" className={inputCls} />
          </label>
          <label className="block">
            <span className={labelCls}>* Phone</span>
            <input name="phone" type="tel" autoComplete="tel" placeholder="(949) 555-0117" className={inputCls} />
          </label>
        </div>
        <label className="mt-4 block">
          <span className={labelCls}>
            Address or Zip{" "}
            <span className="font-semibold normal-case text-azure-700/50">(so we can route the crew)</span>
          </span>
          <input name="address" autoComplete="street-address" placeholder="123 Palm Ave, Irvine · 92602" className={inputCls} />
        </label>

        <fieldset className="mt-6">
          <legend className={labelCls}>
            When do you need it done by?{" "}
            <span className="font-semibold normal-case text-azure-700/50">(optional — confirmed by text)</span>
          </legend>
          <div className="mt-2 flex gap-2 overflow-x-auto pb-2">
            {days.map((d) => {
              const label = d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
              const active = day === label;
              return (
                <button
                  type="button"
                  key={label}
                  onClick={() => setDay(active ? "" : label)}
                  aria-pressed={active}
                  className={`shrink-0 rounded-xl border-3 px-3.5 py-2 text-center transition-all duration-150 ${
                    active
                      ? "border-azure-500 bg-azure-500 text-cream-50"
                      : "border-pink-300 bg-cream-50 text-azure-700 hover:border-azure-400"
                  }`}
                >
                  <span className="block text-[11px] font-bold uppercase opacity-70">
                    {label.split(",")[0]}
                  </span>
                  <span className="block text-sm font-bold">{label.split(", ")[1]}</span>
                </button>
              );
            })}
          </div>
          {day && (
            <div className="mt-2 flex flex-wrap gap-2">
              {SLOT_TIMES.map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setTime(time === t ? "" : t)}
                  aria-pressed={time === t}
                  className={`rounded-xl border-3 px-4 py-2 text-sm font-bold transition-all duration-150 ${
                    time === t
                      ? "border-azure-500 bg-azure-500 text-cream-50"
                      : "border-pink-300 text-azure-700 hover:border-azure-400"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </fieldset>

        <label className="mt-4 block">
          <span className={labelCls}>
            Email <span className="font-semibold normal-case text-azure-700/50">(optional)</span>
          </span>
          <input name="email" type="email" autoComplete="email" placeholder="alex@email.com" className={inputCls} />
        </label>

        <details className="mt-4">
          <summary className="cursor-pointer text-xs font-bold tracking-wide text-azure-600/70 uppercase">
            + Anything else? (gate codes, pets, how you found us)
          </summary>
          <div className="mt-3 space-y-4">
            <textarea
              name="notes"
              rows={3}
              placeholder="ex: Gate code 1234, dog in yard, prefer texts"
              className={inputCls}
            />
            <label className="block">
              <span className={labelCls}>How did you hear about us?</span>
              <select name="hearAbout" defaultValue="" className={inputCls}>
                <option value="">- Optional -</option>
                {hearAboutOptions.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </details>

        <label className="mt-5 flex items-start gap-3 text-sm font-semibold text-azure-700">
          <input type="checkbox" name="smsConsent" value="yes" className="check-retro mt-0.5" />
          I agree to get text messages from Cornerstone about my quote and project.
        </label>
        <p className="mt-2 text-[11px] leading-relaxed text-azure-700/60 italic">
          By submitting, you authorize Cornerstone Site Services to reach out via
          phone, email, or text about your project needs. We never share your
          personal information. Opt out at any time. Message/data rates apply.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={goBack}
            className="rounded-xl border-3 border-pink-300 px-6 py-4 text-lg font-bold text-azure-600 transition-colors hover:bg-pink-100"
          >
            ← Back
          </button>
          <button
            type="submit"
            disabled={status === "sending"}
            className="btn-retro flex-1 rounded-xl bg-pink-300 py-4 text-2xl text-azure-800 disabled:cursor-wait disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Get My Quote"}
          </button>
        </div>
      </div>

      {(error || status === "error") && (
        <p role="alert" className="mt-4 text-center text-sm font-bold text-pink-500">
          {error || (
            <>
              Something went wrong — please try again, or text your photos to{" "}
              <a href={`sms:${site.phone}`} className="underline">{site.phoneDisplay}</a>.
            </>
          )}
        </p>
      )}
      <p className="mt-3 text-center text-xs font-semibold text-azure-700/60">
        Prefer texting? Send photos straight to{" "}
        <a href={`sms:${site.phone}`} className="text-azure-500 underline underline-offset-2">
          {site.phoneDisplay}
        </a>
        .
      </p>
    </form>
  );
}
