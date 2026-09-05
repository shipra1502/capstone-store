// components/AppHeader.tsx
import { WaslLogo } from "./WaslLogo";

export function AppHeader({ brand, trackingId }: { brand: string; trackingId?: string }) {
  return (
    <header className="border-b border-white/10 bg-[#111827]/80 backdrop-blur-sm px-6 py-4 flex items-center justify-between relative z-20 max-w-3xl mx-auto">
      <div className="flex items-center gap-2.5">
        <WaslLogo />
        <span className="font-semibold text-white text-lg tracking-tight">{brand}</span>
      </div>
      {trackingId && (
        <span className="text-sm font-mono text-amber-400 font-semibold tracking-wide bg-white/5 px-3 py-1 rounded-md">
          {trackingId}
        </span>
      )}
    </header>
  );
}