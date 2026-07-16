import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Email attachments are capped well below the platform request limit.
const MAX_ATTACH_BYTES = 3 * 1024 * 1024;

const INBOX = process.env.QUOTE_INBOX_EMAIL ?? "cstone.services.co@gmail.com";

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const field = (k: string) => (form.get(k)?.toString() ?? "").slice(0, 500);
  const name = field("name");
  const phone = field("phone");
  if (!name || !phone) {
    return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
  }

  const photos = [...form.entries()]
    .filter((entry): entry is [string, File] => entry[0].startsWith("photo-") && entry[1] instanceof File)
    .map(([, f]) => f);

  const summary = {
    name,
    phone,
    email: field("email"),
    address: field("address"),
    services: field("services"),
    hearAbout: field("hearAbout"),
    smsConsent: field("smsConsent") === "yes" ? "yes" : "no",
    slot: [field("slotDay"), field("slotTime")].filter(Boolean).join(" at ") || "none requested",
    notes: field("notes"),
    photoCount: photos.length,
    receivedAt: new Date().toISOString(),
  };

  console.log("[quote-request]", JSON.stringify(summary));

  const apiKey = process.env.RESEND_API_KEY;
  try {
    if (apiKey) {
      // Preferred path: Resend, with photo attachments.
      let attachTotal = 0;
      const attachments: { filename: string; content: string }[] = [];
      for (const p of photos) {
        attachTotal += p.size;
        if (attachTotal > MAX_ATTACH_BYTES) break;
        attachments.push({
          filename: p.name,
          content: Buffer.from(await p.arrayBuffer()).toString("base64"),
        });
      }
      const html = `
        <h2>New quote request — ${summary.name}</h2>
        <p><b>Phone:</b> ${summary.phone}<br/>
        <b>Email:</b> ${summary.email || "—"}<br/>
        <b>Address:</b> ${summary.address || "—"}<br/>
        <b>Services:</b> ${summary.services}<br/>
        <b>Requested slot:</b> ${summary.slot}<br/>
        <b>Heard about us via:</b> ${summary.hearAbout || "—"}<br/>
        <b>SMS consent:</b> ${summary.smsConsent}<br/>
        <b>Photos:</b> ${summary.photoCount} uploaded${attachments.length < photos.length ? " (some too large to attach)" : ""}</p>
        <p>${summary.notes || ""}</p>`;
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.QUOTE_FROM_EMAIL ?? "quotes@cornerstonesiteservices.com",
          to: [INBOX],
          reply_to: summary.email || undefined,
          subject: `Quote request: ${summary.name} · ${summary.services}`,
          html,
          attachments,
        }),
      });
      if (!res.ok) {
        console.error("[quote-request] Resend error", res.status, await res.text());
      }
    } else {
      // Default path: FormSubmit relay — free, no API key. The inbox owner
      // clicks the one-time activation link FormSubmit sends on first use;
      // every submission after that is delivered straight to the inbox.
      const res = await fetch(`https://formsubmit.co/ajax/${INBOX}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Quote request: ${summary.name} · ${summary.services}`,
          _template: "table",
          Name: summary.name,
          Phone: summary.phone,
          Email: summary.email || "—",
          Address: summary.address || "—",
          Services: summary.services,
          "Requested slot": summary.slot,
          "Heard about us": summary.hearAbout || "—",
          "SMS consent": summary.smsConsent,
          "Photos uploaded": String(summary.photoCount) + (summary.photoCount > 0 ? " (text the customer for originals, or set RESEND_API_KEY to receive attachments)" : ""),
          Notes: summary.notes || "—",
          "Received at": summary.receivedAt,
        }),
      });
      const body = await res.text();
      if (!res.ok) {
        console.error("[quote-request] FormSubmit error", res.status, body);
      } else {
        console.log("[quote-request] FormSubmit accepted", body.slice(0, 200));
      }
    }
  } catch (err) {
    console.error("[quote-request] email dispatch failed", err);
  }

  return NextResponse.json({ ok: true });
}
