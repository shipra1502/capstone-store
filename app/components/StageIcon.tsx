export function StageIcon({ type, active }: { type: string; active: boolean }) {
  const stroke = active ? "#0B1120" : "#CBD5E1";
  if (type === "truck") {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth="2"
      >
        <path d="M1 3h13v13H1zM14 8h4l3 3v5h-7z" />
        <circle cx="6" cy="18" r="1.5" fill={stroke} />
        <circle cx="17" cy="18" r="1.5" fill={stroke} />
      </svg>
    );
  }
  if (type === "home") {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth="2"
      >
        <path d="M3 11l9-8 9 8M5 10v10h14V10" />
      </svg>
    );
  }
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="2"
    >
      <path d="M21 8l-9-5-9 5v8l9 5 9-5V8z" />
      <path d="M3 8l9 5 9-5M12 13v8" />
    </svg>
  );
}
