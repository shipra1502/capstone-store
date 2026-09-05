import { NextResponse } from "next/server";
import crypto from "crypto";
import { updateShipmentStatus } from "@/lib/shipments";
import { revalidatePath } from "next/cache";

const SECRET = process.env.CARRIER_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  const rawBody = await request.text();
  const receivedSignature = request.headers.get("x-webhook-signature");

  const expectedSignature = crypto
    .createHmac("sha256", SECRET)
    .update(rawBody)
    .digest("hex");

  if (receivedSignature !== expectedSignature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const { trackingId, status } = JSON.parse(rawBody);
  await updateShipmentStatus(trackingId, status);
  revalidatePath(`/en/track/${trackingId}`);
  revalidatePath(`/ar/track/${trackingId}`);
  return NextResponse.json({ received: true });
}
