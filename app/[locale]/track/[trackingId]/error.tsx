"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-[#0B1120] flex items-center justify-center px-6">
      <div className="bg-white rounded-2xl shadow-lg border border-white/10 p-8 max-w-md text-center">
        <h2 className="text-xl font-bold text-[#0B1120] mb-2">
          Something went wrong
        </h2>
        <p className="text-slate-500 text-sm mb-4">
          We couldn&apos;t load this shipment right now.
        </p>
        {error.digest && (
          <p className="text-xs text-slate-400 font-mono mb-4">
            Error ref: {error.digest}
          </p>
        )}
        <button
          onClick={() => reset()}
          className="bg-amber-400 hover:bg-amber-300 text-[#0B1120] font-semibold px-4 py-2 rounded-lg text-sm"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
