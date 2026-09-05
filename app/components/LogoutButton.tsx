// components/LogoutButton.tsx
"use client";
import { signOut } from "next-auth/react";

export function LogoutButton({ label }: { label: string }) {
  return (
    <button
      onClick={() => signOut({ redirectTo: "/login" })}
      className="text-sm font-medium text-white bg-white/10 hover:bg-white/20 border border-white/10 px-4 py-2 rounded-lg transition-colors cursor-pointer"
    >
      {label}
    </button>
  );
}
