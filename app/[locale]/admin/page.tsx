// app/[locale]/admin/page.tsx
import { Suspense } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import ActiveDeliveries from "./components/ActiveDeliveries";
import DelayedShipments from "./components/DelayedShipments";
import DriverLoad from "./components/DriverLoad";
import { AppHeader } from "@/app/components/AppHeader";

function WidgetSkeleton({ label }: { label: string }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm animate-pulse">
      <p className="text-sm text-slate-400">{label}</p>
    </div>
  );
}

export default async function AdminDashboard() {
  const session = await auth();
  if (!session) redirect("/login");

  const tCommon = await getTranslations();

  return (
    <main className="min-h-screen bg-[#0B1120]">
      <AppHeader brand={tCommon("brand")} />

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-8">
          <p className="text-xs font-medium text-amber-400 uppercase tracking-wider mb-1">
            Dispatcher Dashboard
          </p>
          <h1 className="text-2xl font-bold text-white">
            Welcome, {session.user?.name}
          </h1>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Suspense
            fallback={<WidgetSkeleton label="Loading active deliveries…" />}
          >
            <ActiveDeliveries />
          </Suspense>

          <Suspense
            fallback={<WidgetSkeleton label="Loading delayed shipments…" />}
          >
            <DelayedShipments />
          </Suspense>

          <Suspense fallback={<WidgetSkeleton label="Loading driver load…" />}>
            <DriverLoad />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
