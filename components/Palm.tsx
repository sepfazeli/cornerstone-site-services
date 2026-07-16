/* Stylized palm-tree silhouette, fills currentColor. */
export default function Palm({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 160"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      fill="currentColor"
    >
      {/* trunk */}
      <path d="M58 62 C56 92 52 124 44 156 L56 156 C62 126 65 94 66 63 Z" />
      {/* fronds */}
      <path d="M60 62 C48 44 28 38 8 44 C24 48 40 54 52 64 Z" />
      <path d="M60 60 C46 50 24 52 10 66 C26 62 44 62 56 68 Z" />
      <path d="M62 60 C52 38 34 26 14 26 C30 34 46 46 56 62 Z" />
      <path d="M62 58 C60 36 70 16 88 8 C78 24 72 42 70 60 Z" />
      <path d="M64 60 C74 42 94 34 114 40 C98 44 80 52 70 64 Z" />
      <path d="M64 62 C78 52 100 54 112 68 C96 64 78 64 68 70 Z" />
      <path d="M62 58 C64 40 58 20 42 10 C50 26 56 44 58 60 Z" />
      {/* coconuts */}
      <circle cx="56" cy="64" r="5" />
      <circle cx="66" cy="66" r="5" />
    </svg>
  );
}
