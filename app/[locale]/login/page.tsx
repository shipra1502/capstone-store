// app/[locale]/login/page.tsx
"use client";
import { AppHeader } from "@/app/components/AppHeader";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function LoginPage() {
  const tCommon = useTranslations();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);

    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/admin",
      redirect: false,
    });

    setIsLoading(false);

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      window.location.href = "/admin";
    }
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#0B1120]">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #F59E0B 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full opacity-40 blur-3xl"
          style={{
            background: "radial-gradient(circle, #F59E0B 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-20">
        <AppHeader brand={tCommon("brand")} />
      </div>

      <div className="relative z-10 flex items-center justify-center px-6 min-h-[calc(100vh-73px)]">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border border-white/10 p-8">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
              Dispatcher Access
            </p>
            <h1 className="text-2xl font-bold text-[#0B1120] mb-6">Sign in</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                name="email"
                type="email"
                placeholder="Email"
                required
                className="px-4 py-3 rounded-xl border border-slate-200 text-[#0B1120] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                required
                className="px-4 py-3 rounded-xl border border-slate-200 text-[#0B1120] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />

              {error && <p className="text-red-600 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 disabled:opacity-60 text-[#0B1120] font-semibold px-6 py-3 rounded-xl transition-all duration-150 hover:shadow-lg hover:shadow-amber-400/30 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer  "
              >
                {isLoading ? "Signing in…" : "Sign in"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
