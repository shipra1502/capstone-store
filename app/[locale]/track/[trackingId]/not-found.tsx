// app/[locale]/track/[trackingId]/not-found.tsx
import { getTranslations } from "next-intl/server";
import { AppHeader } from "@/app/components/AppHeader";

export default async function NotFound() {
  const t = await getTranslations("tracking");
  const tCommon = await getTranslations();
  const tNav = await getTranslations("nav");

  return (
    <main className="min-h-screen bg-[#0B1120]">
      <AppHeader
        brand={tCommon("brand")}
        navLabels={{
          track: tNav("track"),
          dispatcherLogin: tNav("dispatcherLogin"),
        }}
      />
      <div className="flex items-center justify-center px-6 min-h-[calc(100vh-73px)]">
        <div className="bg-white rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border border-white/10 p-8 max-w-md text-center">
          <h2 className="text-xl font-bold text-[#0B1120] mb-2">
            {t("notFoundTitle")}
          </h2>
          <p className="text-slate-500 text-sm">{t("notFoundMessage")}</p>
        </div>
      </div>
    </main>
  );
}
