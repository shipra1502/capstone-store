// app/[locale]/admin/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <main className="p-8">
      <h1 className="text-xl font-bold">Dispatcher Dashboard</h1>
      <p>Welcome, {session.user?.name}</p>
    </main>
  );
}
