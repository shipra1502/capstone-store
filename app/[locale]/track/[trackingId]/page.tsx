// app/[locale]/track/[trackingId]/page.tsx
import { notFound } from "next/navigation";
import { getShipment } from "@/lib/shipments";
import Image from "next/image";
import type { Metadata } from "next";
import { WaslLogo } from "@/app/components/WaslLogo";

const STAGES = [
  { label: "Order Placed", icon: "package" },
  { label: "Picked Up", icon: "package" },
  { label: "In Transit", icon: "truck" },
  { label: "Out for Delivery", icon: "truck" },
  { label: "Delivered", icon: "home" },
];

function StageIcon({ type, active }: { type: string; active: boolean }) {
  const stroke = active ? "#0B1120" : "#CBD5E1";
  if (type === "truck") {
    return (
      <svg
        width="18"
        height="18"
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
        width="18"
        height="18"
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
      width="18"
      height="18"
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ trackingId: string }>;
}): Promise<Metadata> {
  const { trackingId } = await params;
  const shipment = await getShipment(trackingId);
  if (!shipment) return { title: "Shipment Not Found" };
  return { title: `${shipment.trackingId} — ${shipment.status}` };
}

export default async function TrackPage({
  params,
}: {
  params: Promise<{ trackingId: string }>;
}) {
  const { trackingId } = await params;
  const shipment = await getShipment(trackingId);
  if (!shipment) notFound();

  const statusIndex = STAGES.findIndex((s) => s.label === shipment.status);
  const currentIndex =
    shipment.status === "Delayed" ? 2 : statusIndex === -1 ? 2 : statusIndex;
  const isDelayed = shipment.status === "Delayed";

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#0B1120]">
      {/* Background layer: dark navy base, radial glow, route-line pattern */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #F59E0B 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-40 blur-3xl"
          style={{
            background: "radial-gradient(circle, #F59E0B 0%, transparent 70%)",
          }}
        />
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.08]"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 Q300,20 600,150 T1200,100"
            stroke="#F59E0B"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="6 6"
          />
          <path
            d="M0,400 Q400,300 800,420 T1600,350"
            stroke="#F59E0B"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="6 6"
          />
        </svg>
      </div>

      {/* Foreground content */}
      <div className="relative z-10">
        <header className="border-b border-white/10 bg-[#111827]/80 backdrop-blur-sm px-6 py-4 flex items-center justify-between relative z-20 max-w-3xl mx-auto">
          <div className="flex items-center gap-2">
            <WaslLogo />
            <span className="font-semibold text-white">Wasl</span>
          </div>
          <span className="text-sm font-mono text-amber-400 font-semibold tracking-wide bg-white/5 px-3 py-1 rounded-md">
            {shipment.trackingId}
          </span>
        </header>

        <div className="max-w-lg mx-auto px-6 py-16">
          <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.1),0_25px_50px_-12px_rgba(0,0,0,0.5)] border border-white/10 p-8">
            <p className="text-xs font-medium text-slate-600 uppercase tracking-wider mb-2">
              {isDelayed ? "Status" : "Current status"}
            </p>
            <h1 className="text-3xl font-bold text-[#0B1120] mb-1">
              {isDelayed ? "Delayed" : shipment.status}
            </h1>
            {isDelayed && (
              <p className="text-amber-600 text-sm mb-2">
                Running behind schedule — we're on it.
              </p>
            )}
            <p className="text-sm text-slate-600 mb-8">
              Updated {shipment.lastUpdated}
            </p>

            <div className="flex justify-between relative px-1">
              {STAGES.map((stage, i) => {
                const done = i <= currentIndex;
                const isLast = i === STAGES.length - 1;
                return (
                  <div
                    key={stage.label}
                    className="flex flex-col items-center flex-1 relative"
                  >
                    {!isLast && (
                      <div
                        className="absolute top-4 left-1/2 w-full h-[2px]"
                        style={{
                          backgroundColor:
                            i < currentIndex ? "#FBBF24" : "#E2E8F0",
                        }}
                      />
                    )}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center z-10 border-2 ${
                        done
                          ? "border-amber-400 bg-amber-50"
                          : "border-slate-200 bg-white"
                      }`}
                    >
                      <StageIcon type={stage.icon} active={done} />
                    </div>
                    <p
                      className={`text-[11px] mt-2 text-center leading-tight max-w-[64px] ${done ? "text-[#0B1120] font-medium" : "text-slate-600"}`}
                    >
                      {stage.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {shipment.status === "Delivered" && (
            <div className="mt-6 bg-white rounded-2xl shadow-lg border border-white/10 p-6">
              <p className="text-xs font-medium text-slate-600 uppercase tracking-wider mb-3">
                Proof of delivery
              </p>
              <Image
                src={`https://picsum.photos/seed/${shipment.trackingId}/600/360`}
                alt="Proof of delivery"
                width={600}
                height={360}
                className="rounded-xl w-full"
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
