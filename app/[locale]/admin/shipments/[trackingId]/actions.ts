"use server";
import {
  updateShipmentStatus,
  createShipment,
  deleteShipment,
} from "@/lib/shipments";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateStatus(
  trackingId: string,
  locale: string,
  formData: FormData,
) {
  const status = formData.get("status") as string;
  await updateShipmentStatus(trackingId, status);
  revalidatePath(`/en/track/${trackingId}`);
  revalidatePath(`/ar/track/${trackingId}`);
  revalidatePath(`/en/admin/shipments/${trackingId}`);
  revalidatePath(`/ar/admin/shipments/${trackingId}`);
  redirect(`/${locale}/admin/shipments/${trackingId}`);
}

export async function createShipmentAction(locale: string, formData: FormData) {
  const trackingId = formData.get("trackingId") as string;
  const driver = formData.get("driver") as string;
  if (!trackingId) throw new Error("Tracking ID is required");

  const created = await createShipment(trackingId, driver);

  revalidatePath(`/en/admin`);
  revalidatePath(`/ar/admin`);

  if (!created) {
    redirect(`/${locale}/admin?error=duplicate`);
  }
  redirect(`/${locale}/admin`);
}

export async function deleteShipmentAction(trackingId: string, locale: string) {
  await deleteShipment(trackingId);
  revalidatePath(`/en/admin`);
  revalidatePath(`/ar/admin`);
  redirect(`/${locale}/admin`);
}
