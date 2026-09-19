"use server";
import { updateShipmentStatus } from "@/lib/shipments";
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
