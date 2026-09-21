import { Suspense } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { AppHeader } from "@/app/components/AppHeader";
import ActiveDeliveries from "./components/ActiveDeliveries";
import DelayedShipments from "./components/DelayedShipments";
import DriverLoad from "./components/DriverLoad";
import { LogoutButton } from "@/app/components/LogoutButton";
import { createShipmentAction } from "./shipments/[trackingId]/actions";
import { ShipmentManager } from "./components/ShipmentManager";

function WidgetSkeleton({ label }: { label: string }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm animate-pulse">
      <p className="text-sm text-slate-400">{label}</p>
    </div>
  );
}

export default async function AdminDashboard({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { locale } = await params;
  const { error } = await searchParams;
  const session = await auth();
  if (!session) redirect("/login");

  const t = await getTranslations("admin");
  const tCommon = await getTranslations();

  return (
    <main className="min-h-screen bg-[#0B1120]">
      <AppHeader
        brand={tCommon("brand")}
        showNav={false}
        logoHref="/admin"
        rightSlot={<LogoutButton label={t("logout")} />}
      />
      <div className="max-w-5xl mx-auto px-6 py-12">
        {error === "duplicate" && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
            A shipment with that tracking ID already exists.
          </div>
        )}
        <div className="mb-8">
          <p className="text-xs font-medium text-amber-400 uppercase tracking-wider mb-1">
            {t("eyebrow")}
          </p>
          <h1 className="text-2xl font-bold text-white">
            {t("welcome")}, {session.user?.name}
          </h1>
        </div>
        <ShipmentManager
          createAction={createShipmentAction.bind(null, locale)}
        />
        <div className="grid md:grid-cols-3 gap-4">
          <Suspense fallback={<WidgetSkeleton label="…" />}>
            <ActiveDeliveries label={t("activeDeliveries")} />
          </Suspense>
          <Suspense fallback={<WidgetSkeleton label="…" />}>
            <DelayedShipments
              label={t("delayedShipments")}
              hoursDelayedLabel={t("hoursDelayed")}
            />{" "}
          </Suspense>
          <Suspense fallback={<WidgetSkeleton label="…" />}>
            <DriverLoad
              label={t("driverLoad")}
              deliveriesLabel={t("deliveriesCount")}
            />{" "}
          </Suspense>
        </div>
      </div>
    </main>
  );
}
