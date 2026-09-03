// app/[locale]/track/[trackingId]/error.tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="p-8">
      <h2 className="text-xl font-bold">Something went wrong</h2>
      <p>We couldn't load this shipment right now.</p>
      <button onClick={() => reset()} className="mt-2 underline">
        Try again
      </button>
    </main>
  );
}
