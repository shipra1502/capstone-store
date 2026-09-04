// app/api/shipments/route.ts
import { NextResponse } from "next/server";
import { getShipment } from "@/lib/shipments";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const trackingId = searchParams.get("trackingId");

  if (!trackingId) {
    return NextResponse.json(
      { error: "trackingId query param required" },
      { status: 400 },
    );
  }

  const shipment = await getShipment(trackingId);

  if (!shipment) {
    return NextResponse.json({ error: "Shipment not found" }, { status: 404 });
  }

  return NextResponse.json(shipment);
}
