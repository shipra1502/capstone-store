"use client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const t = useTranslations("landing");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const trackingId = formData.get("trackingId");
    if (trackingId) router.push(`/track/${trackingId}`);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-2xl font-bold">{t("title")}</h1>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          name="trackingId"
          placeholder={t("placeholder")}
          className="border px-3 py-2 rounded"
        />
        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          {t("button")}
        </button>
      </form>
    </main>
  );
}
