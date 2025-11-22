import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "赤土崎多功能館｜失智症徘徊預警 3D Dashboard",
  description:
    "Akatsuchi Wander Safety Dashboard – 3D digital twin, real-time space utilization, and wandering early-warning for dementia care."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant">
      <body className="min-h-screen gradient-bg">
        {children}
      </body>
    </html>
  );
}
