/* Line-style icons, 24x24 viewBox, stroke = currentColor. */

type IconProps = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function CameraIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M4 8 L7 8 L9 5 L15 5 L17 8 L20 8 C21.1 8 22 8.9 22 10 L22 18 C22 19.1 21.1 20 20 20 L4 20 C2.9 20 2 19.1 2 18 L2 10 C2 8.9 2.9 8 4 8 Z" />
      <circle cx="12" cy="13.5" r="3.5" />
    </svg>
  );
}

export function PhoneIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M5 4 L9 4 L11 9 L8.5 10.5 C9.5 12.8 11.2 14.5 13.5 15.5 L15 13 L20 15 L20 19 C20 20.1 19.1 21 18 21 C10.3 20.4 3.6 13.7 3 6 C3 4.9 3.9 4 5 4 Z" />
    </svg>
  );
}

export function ClockIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7 L12 12 L15.5 14" />
    </svg>
  );
}

export function ShieldIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M12 3 L20 6 L20 12 C20 16.5 16.5 20 12 21.5 C7.5 20 4 16.5 4 12 L4 6 Z" />
      <path d="M9 12 L11.2 14.2 L15.5 9.5" />
    </svg>
  );
}

export function TruckIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M2 7 L14 7 L14 16 L2 16 Z" />
      <path d="M14 10 L18.5 10 L21 13 L21 16 L14 16" />
      <circle cx="6.5" cy="18" r="1.8" />
      <circle cx="17.5" cy="18" r="1.8" />
    </svg>
  );
}

export function HomeIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M4 11 L12 4 L20 11 L20 20 L14.5 20 L14.5 14.5 L9.5 14.5 L9.5 20 L4 20 Z" />
    </svg>
  );
}
