// components/WaslLogo.tsx
export function WaslLogo({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" fill="none">
      <path
        d="M17 2L30 9.5V24.5L17 32L4 24.5V9.5L17 2Z"
        stroke="#F59E0B"
        strokeWidth="1.5"
        fill="#111827"
      />
      <path
        d="M8 13C13 11 15 20 20 18C23 16.5 24 13 26 12"
        stroke="#F59E0B"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
        strokeDasharray="1 3.5"
      />
      <circle cx="26" cy="12" r="2.2" fill="#F59E0B" />
    </svg>
  );
}
