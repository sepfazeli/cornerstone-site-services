/* Brand colors are fixed inside the badge so it renders identically on any background. */
const PINK = "#f5b2ba";
const AZURE_DEEP = "#0068ab";
const CREAM = "#f7f3ea";

const PALM = (
  <>
    <path d="M58 62 C56 92 52 124 44 156 L56 156 C62 126 65 94 66 63 Z" />
    <path d="M60 62 C48 44 28 38 8 44 C24 48 40 54 52 64 Z" />
    <path d="M60 60 C46 50 24 52 10 66 C26 62 44 62 56 68 Z" />
    <path d="M62 60 C52 38 34 26 14 26 C30 34 46 46 56 62 Z" />
    <path d="M62 58 C60 36 70 16 88 8 C78 24 72 42 70 60 Z" />
    <path d="M64 60 C74 42 94 34 114 40 C98 44 80 52 70 64 Z" />
    <path d="M64 62 C78 52 100 54 112 68 C96 64 78 64 68 70 Z" />
    <path d="M62 58 C64 40 58 20 42 10 C50 26 56 44 58 60 Z" />
    <circle cx="56" cy="64" r="5" />
    <circle cx="66" cy="66" r="5" />
  </>
);

/* Sunset scene shared by both badge sizes: sun setting into the horizon, palms planted on the line. */
function SunsetScene({ sunR, sunY, horizonY }: { sunR: number; sunY: number; horizonY: number }) {
  const clipId = `sun-clip-${sunR}`;
  const palmScale = 0.26;
  const palmTy = horizonY - 156 * palmScale;
  return (
    <>
      <defs>
        <clipPath id={clipId}>
          <rect x={100 - sunR} y={sunY - sunR} width={sunR * 2} height={horizonY - (sunY - sunR)} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <circle cx="100" cy={sunY} r={sunR} fill={PINK} />
        <g fill={AZURE_DEEP}>
          <rect x={100 - sunR} y={sunY + 4} width={sunR * 2} height="2.4" />
          <rect x={100 - sunR} y={sunY + 11} width={sunR * 2} height="3.4" />
          <rect x={100 - sunR} y={sunY + 18.5} width={sunR * 2} height="4.6" />
        </g>
      </g>
      <rect x="52" y={horizonY - 1.4} width="96" height="2.8" rx="1.4" fill={CREAM} />
      <g fill={CREAM}>
        <g transform={`translate(34 ${palmTy}) scale(${palmScale})`}>{PALM}</g>
        <g transform={`translate(166 ${palmTy}) scale(-${palmScale} ${palmScale})`}>{PALM}</g>
      </g>
    </>
  );
}

/* Full badge with arc lettering — the primary brand mark (hero sticker, social, print). */
export function Badge({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Cornerstone Site Services — Orange County sunset badge">
      <defs>
        <path id="badge-arc-top" d="M 38 100 A 62 62 0 0 1 162 100" />
        <path id="badge-arc-bottom" d="M 36 100 A 64 64 0 0 0 164 100" />
      </defs>
      <circle cx="100" cy="100" r="97" fill={PINK} />
      <circle cx="100" cy="100" r="86" fill={AZURE_DEEP} />
      <circle cx="100" cy="100" r="78" fill="none" stroke={CREAM} strokeWidth="1.6" opacity="0.55" />
      <SunsetScene sunR={28} sunY={92} horizonY={118} />
      <text
        fontFamily="var(--font-squada), sans-serif"
        fontSize="19"
        letterSpacing="2.6"
        fill={CREAM}
      >
        <textPath href="#badge-arc-top" startOffset="50%" textAnchor="middle">
          CORNERSTONE
        </textPath>
      </text>
      <text
        x="100"
        y="142"
        textAnchor="middle"
        fontFamily="var(--font-squada), sans-serif"
        fontSize="15"
        letterSpacing="2.8"
        fill={CREAM}
      >
        SITE SERVICES
      </text>
      <text fontFamily="var(--font-squada), sans-serif" fontSize="12" letterSpacing="1.8" fill={CREAM} opacity="0.95">
        <textPath href="#badge-arc-bottom" startOffset="50%" textAnchor="middle">
          ORANGE COUNTY &#183; CA
        </textPath>
      </text>
    </svg>
  );
}

/* Text-free mini badge — header, footer, favicon-scale uses. */
export function BadgeMini({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <circle cx="100" cy="100" r="97" fill={PINK} />
      <circle cx="100" cy="100" r="84" fill={AZURE_DEEP} />
      <SunsetScene sunR={36} sunY={92} horizonY={126} />
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
      <BadgeMini className="h-11 w-11 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="display-flat text-xl font-bold tracking-wide text-azure-500">
          CORNERSTONE
        </span>
        <span className="mt-1 text-[0.6rem] font-bold tracking-[0.42em] text-pink-500">
          SITE SERVICES
        </span>
        {!compact && (
          <span className="mt-1 text-[0.5rem] font-semibold tracking-[0.18em] text-azure-700/80 uppercase">
            Exterior Cleaning &middot; Orange County
          </span>
        )}
      </span>
    </span>
  );
}
