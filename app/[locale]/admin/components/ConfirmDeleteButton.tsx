// components/ConfirmDeleteButton.tsx
"use client";

export function ConfirmDeleteButton({ label }: { label: string }) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (
          !confirm(
            "Are you sure you want to delete this shipment? This cannot be undone.",
          )
        ) {
          e.preventDefault();
        }
      }}
      className="text-red-600 text-sm hover:text-red-700"
    >
      {label}
    </button>
  );
}
