import { notFound } from "next/navigation";
import { getShipment } from "@/lib/shipments";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import type { Metadata } from "next";
import { WaslLogo } from "@/app/components/WaslLogo";
import { StageIcon } from "@/app/components/StageIcon";
import { AppHeader } from "@/app/components/AppHeader";

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
  params: Promise<{ locale: string; trackingId: string }>;
}) {
  const { locale, trackingId } = await params;
  const shipment = await getShipment(trackingId);
  if (!shipment) notFound();
  const formattedDate = new Date(shipment.lastUpdated).toLocaleString(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const t = await getTranslations("tracking");
  const tCommon = await getTranslations();

  const STAGES = [
    { key: "Order Placed", label: t("stages.orderPlaced"), icon: "package" },
    { key: "Picked Up", label: t("stages.pickedUp"), icon: "package" },
    { key: "In Transit", label: t("stages.inTransit"), icon: "truck" },
    {
      key: "Out for Delivery",
      label: t("stages.outForDelivery"),
      icon: "truck",
    },
    { key: "Delivered", label: t("stages.delivered"), icon: "home" },
  ];

  const statusIndex = STAGES.findIndex((s) => s.key === shipment.status);
  const currentIndex =
    shipment.status === "Delayed" ? 2 : statusIndex === -1 ? 2 : statusIndex;
  const isDelayed = shipment.status === "Delayed";

  const statusLabel = isDelayed
    ? t("stages.inTransit") // or a dedicated "delayed" label if you add one
    : (STAGES.find((s) => s.key === shipment.status)?.label ?? shipment.status);

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#0B1120]">
      <div className="relative z-10">
        <AppHeader brand={tCommon("brand")} trackingId={shipment.trackingId} />

        <div className="max-w-lg mx-auto px-6 py-16">
          <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.1),0_25px_50px_-12px_rgba(0,0,0,0.5)] border border-white/10 p-8">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
              {isDelayed ? t("status") : t("currentStatus")}
            </p>
            <h1 className="text-3xl font-bold text-[#0B1120] mb-1">
              {isDelayed ? "Delayed" : statusLabel}
            </h1>
            {isDelayed && (
              <p className="text-amber-600 text-sm mb-2">{t("delayedNote")}</p>
            )}
            <p className="text-sm text-slate-400 mb-8">
              {t("updated")} {formattedDate}
            </p>

            <div className="flex justify-between relative px-1">
              {STAGES.map((stage, i) => {
                const done = i <= currentIndex;
                const isCurrent = i === currentIndex;
                const isLast = i === STAGES.length - 1;
                return (
                  <div
                    key={stage.key}
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
                      className={`w-8 h-8 rounded-full flex items-center justify-center z-10 border-2 transition-colors ${
                        done
                          ? "border-amber-400 bg-amber-50"
                          : "border-slate-200 bg-white"
                      } ${isCurrent ? "ring-4 ring-amber-100" : ""}`}
                    >
                      <StageIcon type={stage.icon} active={done} />
                    </div>
                    <p
                      className={`text-[11px] mt-2.5 text-center leading-tight w-[70px] ${
                        done ? "text-[#0B1120] font-medium" : "text-slate-400"
                      } ${isCurrent ? "font-semibold text-amber-600" : ""}`}
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
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">
                {t("proofOfDelivery")}
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
