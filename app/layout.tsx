// app/layout.tsx — simplified, [locale]/layout.tsx now owns html/body
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
