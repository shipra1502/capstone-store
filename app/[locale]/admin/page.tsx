import { Suspense } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { AppHeader } from "@/app/components/AppHeader";
import ActiveDeliveries from "./components/ActiveDeliveries";
import DelayedShipments from "./components/DelayedShipments";
import DriverLoad from "./components/DriverLoad";
import { LogoutButton } from "@/app/components/LogoutButton";
import { ShipmentSearch } from "./components/ShipmentSearch";
import { createShipmentAction } from "./shipments/[trackingId]/actions";

function WidgetSkeleton({ label }: { label: string }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm animate-pulse">
      <p className="text-sm text-slate-400">{label}</p>
    </div>
  );
}

export default async function AdminDashboard({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();
  if (!session) redirect("/login");

  const t = await getTranslations("admin");
  const tCommon = await getTranslations();

  return (
    <main className="min-h-screen bg-[#0B1120]">
      <AppHeader
        brand={tCommon("brand")}
        showNav={false}
        rightSlot={<LogoutButton label={t("logout")} />}
      />
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-8">
          <p className="text-xs font-medium text-amber-400 uppercase tracking-wider mb-1">
            {t("eyebrow")}
          </p>
          <h1 className="text-2xl font-bold text-white">
            {t("welcome")}, {session.user?.name}
          </h1>
        </div>
        <ShipmentSearch />
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
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm mb-6">
        <h2 className="text-sm font-semibold text-[#0B1120] mb-3">
          Create Shipment
        </h2>
        <form
          action={createShipmentAction.bind(null, locale)}
          className="flex gap-2"
        >
          <input
            name="trackingId"
            placeholder="New tracking ID"
            required
            className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm"
          />
          <input
            name="driver"
            placeholder="Driver (optional)"
            className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm"
          />
          <button
            type="submit"
            className="bg-amber-400 hover:bg-amber-300 text-[#0B1120] font-semibold text-sm px-4 py-2 rounded-lg"
          >
            Create
          </button>
        </form>
      </div>
    </main>
  );
}
