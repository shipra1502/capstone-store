import { Suspense } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ActiveDeliveries from "./components/ActiveDeliveries";
import DelayedShipments from "./components/DelayedShipments";
import DriverLoad from "./components/DriverLoad";

export default async function AdminDashboard() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <main className="p-8">
      <h1 className="text-xl font-bold mb-4">Dispatcher Dashboard</h1>
      <p className="mb-4">Welcome, {session.user?.name}</p>

      <div className="grid gap-4">
        <Suspense fallback={<p>Loading active deliveries…</p>}>
          <ActiveDeliveries />
        </Suspense>

        <Suspense fallback={<p>Loading delayed shipments…</p>}>
          <DelayedShipments />
        </Suspense>

        <Suspense fallback={<p>Loading driver load…</p>}>
          <DriverLoad />
        </Suspense>
      </div>
    </main>
  );
}
