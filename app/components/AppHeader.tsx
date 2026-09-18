// components/AppHeader.tsx
import Link from "next/link";
import { WaslLogo } from "./WaslLogo";

export function AppHeader({
  brand,
  trackingId,
  rightSlot,
  showNav = true,
  navLabels,
}: {
  brand: string;
  trackingId?: string;
  rightSlot?: React.ReactNode;
  showNav?: boolean;
  navLabels?: { track: string; dispatcherLogin: string };
}) {
  return (
    <header className="border-b border-white/10 bg-[#111827]/80 backdrop-blur-sm px-6 py-4 flex items-center justify-between relative z-20 max-w-3xl mx-auto">
      <div className="flex items-center gap-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
        >
          <WaslLogo />
          <span className="font-semibold text-white text-lg tracking-tight">
            {brand}
          </span>
        </Link>

        {showNav && navLabels && (
          <nav className="hidden sm:flex items-center gap-4">
            <Link
              href="/"
              className="text-sm text-slate-300 hover:text-white transition-colors"
            >
              {navLabels.track}
            </Link>
            <Link
              href="/login"
              className="text-sm text-slate-300 hover:text-white transition-colors"
            >
              {navLabels.dispatcherLogin}
            </Link>
          </nav>
        )}
      </div>

      <div className="flex items-center gap-3">
        {trackingId && (
          <span className="text-sm font-mono text-amber-400 font-semibold tracking-wide bg-white/5 px-3 py-1 rounded-md">
            {trackingId}
          </span>
        )}
        {rightSlot}
      </div>
    </header>
  );
}
