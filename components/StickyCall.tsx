import Link from "next/link";
import { site } from "@/lib/site";

export default function StickyCall() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t-3 border-pink-300 bg-cream-50/95 p-3 backdrop-blur-md lg:hidden">
      <a
        href={`tel:${site.phone}`}
        className="display-flat flex-1 rounded-xl border-3 border-pink-300 py-3 text-center text-lg text-azure-600"
      >
        Call {site.phoneDisplay}
      </a>
      <Link
        href="/#quote"
        className="btn-retro flex-1 rounded-xl bg-pink-300 py-3 text-center text-lg text-azure-800"
      >
        Get a Quote →
      </Link>
    </div>
  );
}
