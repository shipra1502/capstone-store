import { getShipment } from "@/lib/shipments";
import { updateStatus } from "./actions";
import { AppHeader } from "@/app/components/AppHeader";
import { LogoutButton } from "@/app/components/LogoutButton";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { deleteShipmentAction } from "./actions";
import { ConfirmDeleteButton } from "../../components/ConfirmDeleteButton";
import { SubmitButton } from "../../components/SubmitButton";

export default async function AdminShipmentPage({
  params,
}: {
  params: Promise<{ locale: string; trackingId: string }>;
}) {
  const { locale, trackingId } = await params;
  const shipment = await getShipment(trackingId);
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
      <div className="max-w-md mx-auto px-6 py-16">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-400 hover:text-amber-300 hover:gap-2.5 transition-all duration-150 mb-6"
        >
          ← Back to dashboard
        </Link>

        <div className="bg-white rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border border-white/10 p-8">
          {!shipment ? (
            <p className="text-slate-500">Shipment not found</p>
          ) : (
            <>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                Update Shipment
              </p>
              <h1 className="text-xl font-bold text-[#0B1120] mb-4">
                {shipment.trackingId}
              </h1>
              <p className="text-sm text-slate-500 mb-6">
                Current status: {shipment.status}
              </p>

              <form
                action={updateStatus.bind(null, trackingId, locale)}
                className="flex gap-2"
              >
                <select
                  name="status"
                  defaultValue={shipment.status}
                  className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm text-[#0B1120]"
                >
                  <option>In Transit</option>
                  <option>Out for Delivery</option>
                  <option>Delivered</option>
                  <option>Delayed</option>
                </select>
                <SubmitButton
                  pendingText="Updating…"
                  className="bg-amber-400 hover:bg-amber-300 text-[#0B1120] font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap hover:cursor-pointer"
                >
                  Update
                </SubmitButton>
              </form>
              {shipment.status === "Delivered" && (
                <form
                  action={deleteShipmentAction.bind(null, trackingId, locale)}
                  className="mt-4"
                >
                  <ConfirmDeleteButton label="Delete this shipment" />
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
