// app/[locale]/login/page.tsx
"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirectTo: "/admin",
          });
        }}
        className="flex flex-col gap-2 w-64"
      >
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border px-3 py-2 rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border px-3 py-2 rounded"
        />
        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
    </main>
  );
}
