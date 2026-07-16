"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { site, services, frequencies, hearAboutOptions } from "@/lib/site";

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
  const [previews, setPreviews] = useState<Preview[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [day, setDay] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const fileInput = useRef<HTMLInputElement>(null);

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
    setSelectedServices((prev) =>
      prev.includes(title) ? prev.filter((k) => k !== title) : [...prev, title]
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (selectedServices.length === 0) {
      alert("Please pick at least one service — what do you need cleaned?");
      return;
    }
    const totalMb = previews.reduce((s, p) => s + p.file.size, 0) / (1024 * 1024);
    if (totalMb > MAX_TOTAL_MB) {
      alert(`Photos are ${totalMb.toFixed(1)} MB total — please keep under ${MAX_TOTAL_MB} MB, or text them to ${site.phoneDisplay}.`);
      return;
    }
    setStatus("sending");
    try {
      const fd = new FormData(form);
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
      id="quote"
      onSubmit={onSubmit}
      className="sticker scroll-mt-28 bg-cream-100 p-6 sm:p-8"
    >
      {/* contact */}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>* First Name</span>
          <input required name="name" autoComplete="given-name" placeholder="Alex" className={inputCls} />
        </label>
        <label className="block">
          <span className={labelCls}>* Phone</span>
          <input required name="phone" type="tel" autoComplete="tel" placeholder="(949) 555-0117" className={inputCls} />
        </label>
        <label className="block">
          <span className={labelCls}>* Email</span>
          <input required name="email" type="email" autoComplete="email" placeholder="alex@email.com" className={inputCls} />
        </label>
        <label className="block">
          <span className={labelCls}>* Zip Code</span>
          <input required name="zip" inputMode="numeric" autoComplete="postal-code" placeholder="92602" className={inputCls} />
        </label>
      </div>
      <label className="mt-4 block">
        <span className={labelCls}>* Street Address</span>
        <input required name="address" autoComplete="street-address" placeholder="123 Palm Ave, Irvine" className={inputCls} />
      </label>

      {/* services */}
      <fieldset className="mt-7">
        <legend className="display-flat text-2xl tracking-wider text-azure-500">
          What do you need cleaned? <span className="text-pink-500">*</span>
        </legend>
        <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-2.5 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((s) => (
            <label
              key={s.key}
              className="flex cursor-pointer items-center gap-2.5 text-sm font-bold text-azure-700"
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
      </fieldset>

      {/* photos */}
      <fieldset className="mt-7">
        <legend className={labelCls}>
          Photos of the job <span className="font-semibold normal-case text-azure-700/50">(up to {MAX_PHOTOS} — fastest way to a firm quote)</span>
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
              <span className="mb-1 block text-2xl">📷</span>
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

      {/* booking */}
      <fieldset className="mt-7">
        <legend className={labelCls}>
          When do you need the work done by? <span className="font-semibold normal-case text-azure-700/50">(optional — confirmed by text)</span>
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

      {/* notes */}
      <label className="mt-6 block">
        <span className={labelCls}>Anything else?</span>
        <textarea
          name="notes"
          rows={3}
          placeholder="ex: Gate Codes, Pets, Service Details, Preferred Contact Method?"
          className={inputCls}
        />
      </label>

      {/* selects */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>* How often do you need it cleaned?</span>
          <select required name="frequency" defaultValue="" className={inputCls}>
            <option value="" disabled>
              - Select -
            </option>
            {frequencies.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className={labelCls}>* How did you hear about us?</span>
          <select required name="hearAbout" defaultValue="" className={inputCls}>
            <option value="" disabled>
              - Select -
            </option>
            {hearAboutOptions.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* consent */}
      <label className="mt-6 flex items-start gap-3 text-sm font-semibold text-azure-700">
        <input type="checkbox" name="smsConsent" value="yes" className="check-retro mt-0.5" />
        I agree to get text messages from Cornerstone about my quote and project.
      </label>
      <p className="mt-2 text-[11px] leading-relaxed text-azure-700/60 italic">
        By submitting, you authorize Cornerstone Site Services to reach out via phone,
        email, or text about your project needs. We never share your personal
        information with 3rd parties. Opt out at any time. Message/data rates apply.
        Consent is not a condition of purchase.
      </p>

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-retro mt-6 w-full rounded-xl bg-pink-300 py-4 text-2xl text-azure-800 disabled:cursor-wait disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Submit"}
      </button>
      {status === "error" && (
        <p role="alert" className="mt-3 text-center text-sm font-bold text-pink-500">
          Something went wrong — please try again, or text your photos to{" "}
          <a href={`sms:${site.phone}`} className="underline">{site.phoneDisplay}</a>.
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
