"use client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { WaslLogo } from "../components/WaslLogo";
import { AppHeader } from "../components/AppHeader";

export default function LandingPage() {
  const t = useTranslations("landing");
  const router = useRouter();
  const tCommon = useTranslations();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const trackingId = formData.get("trackingId");
    if (trackingId) router.push(`/track/${trackingId}`);
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#0B1120]">
      {/* background texture */}
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
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.08]"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 Q300,20 600,150 T1200,100"
            stroke="#F59E0B"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="6 6"
          />
          <path
            d="M0,400 Q400,300 800,420 T1600,350"
            stroke="#F59E0B"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="6 6"
          />
        </svg>
      </div>

      {/* top bar — same component, same job as the tracking page */}
      <div className="relative z-20">
        <AppHeader brand={tCommon("brand")} />
      </div>

      {/* centered hero content, no logo here — the top bar already has it */}
      <div className="relative z-10 flex items-center justify-center px-6 min-h-[calc(100vh-73px)]">
        <div className="w-full max-w-md text-center">
          <h1 className="text-3xl font-bold text-white mb-2">{t("title")}</h1>
          <p className="text-slate-400 text-sm mb-10">{t("subtitle")}</p>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border border-white/10 p-2 flex gap-2"
          >
            <input
              name="trackingId"
              placeholder={t("placeholder")}
              className="flex-1 px-4 py-3 rounded-xl text-[#0B1120] placeholder:text-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-[#0B1120] font-semibold px-6 py-3 rounded-xl transition-all duration-150 hover:shadow-lg hover:shadow-amber-400/30 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              {t("button")}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
