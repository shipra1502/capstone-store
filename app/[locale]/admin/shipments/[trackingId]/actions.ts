"use server";
import { updateShipmentStatus } from "@/lib/shipments";
import { revalidatePath } from "next/cache";

export async function updateStatus(trackingId: string, formData: FormData) {
  const status = formData.get("status") as string;
  await updateShipmentStatus(trackingId, status);
  revalidatePath(`/en/track/${trackingId}`);
  revalidatePath(`/ar/track/${trackingId}`);
}
