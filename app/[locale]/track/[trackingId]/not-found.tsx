// app/[locale]/track/[trackingId]/not-found.tsx
export default function NotFound() {
  return (
    <main className="p-8">
      <h2 className="text-xl font-bold">Shipment not found</h2>
      <p>
        We couldn't find a shipment with that tracking ID. Please check and try
        again.
      </p>
    </main>
  );
}
