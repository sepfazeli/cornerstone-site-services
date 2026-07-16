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
      {/* car */}
      <g stroke={STROKE} strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round">
        <path d="M28 76 L32 68 C33 66 35 65 37 65 L61 65 C63 65 65 66 66 68 L72 76 L75 77 C76 77.4 77 78.6 77 80 L77 84 L23 84 L23 80 C23 78.6 24 77.4 25 77 Z" />
        <path d="M36 76 L64 76" />
        <circle cx="37" cy="86" r="5" />
        <circle cx="63" cy="86" r="5" />
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
            Exterior Cleaning · Auto Detailing
          </span>
        )}
      </span>
    </span>
  );
}
