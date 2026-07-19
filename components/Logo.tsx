const STROKE = "currentColor";

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* shield */}
      <path
        d="M50 4 C33 4 20 8 12 12 C8 14 6 18 6 22 L6 66 C6 82 20 96 42 105 C47 107 53 107 58 105 C80 96 94 82 94 66 L94 22 C94 18 92 14 88 12 C80 8 67 4 50 4 Z"
        stroke={STROKE}
        strokeWidth="6"
        strokeLinejoin="round"
      />
      {/* house */}
      <g stroke={STROKE} strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round">
        <path d="M33 45 L33 30 L50 19 L67 30 L67 45 Z" />
        <path d="M45 45 L45 36 L55 36 L55 45" />
        <path d="M29 30.5 L50 17 L71 30.5" />
      </g>
      {/* divider */}
      <line x1="30" y1="53" x2="70" y2="53" stroke={STROKE} strokeWidth="2" />
      {/* water waves */}
      <g stroke={STROKE} strokeWidth="2.4" strokeLinecap="round" fill="none">
        <path d="M28 66 C33 61 39 61 44 66 C49 71 55 71 60 66 C65 61 71 61 72 62" />
        <path d="M28 76 C33 71 39 71 44 76 C49 81 55 81 60 76 C65 71 71 71 72 72" />
        <path d="M32 86 C37 81 43 81 48 86 C53 91 59 91 64 86" />
      </g>
    </svg>
  );
}

export function Logo({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark className="h-10 w-auto shrink-0 text-azure-500" />
      <span className="flex flex-col leading-none">
        <span className="display-flat text-xl font-bold tracking-wide text-azure-500">
          CORNERSTONE
        </span>
        <span className="mt-1 text-[0.6rem] font-bold tracking-[0.42em] text-pink-500">
          SITE SERVICES
        </span>
        {!compact && (
          <span className="mt-1 text-[0.5rem] font-semibold tracking-[0.18em] text-azure-700/80 uppercase">
            Exterior Cleaning · Orange County
          </span>
        )}
      </span>
    </span>
  );
}
