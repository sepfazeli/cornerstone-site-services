import Link from "next/link";
import { site } from "@/lib/site";

export default function StickyCall() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-clay-500/25 bg-cream-50/95 p-3 backdrop-blur-md lg:hidden">
      <a
        href={`tel:${site.phone}`}
        className="flex-1 rounded-full border border-clay-500/40 py-3 text-center text-sm font-semibold text-clay-700"
      >
        Call {site.phoneDisplay}
      </a>
      <Link
        href="/#quote"
        className="btn-sheen flex-1 rounded-full bg-clay-500 py-3 text-center text-sm font-semibold text-cream-50"
      >
        Photo Quote →
      </Link>
    </div>
  );
}
