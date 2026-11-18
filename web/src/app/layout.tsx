import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "South Click - Digital Marketing Agency Team Management Platform",
  description: "Operations, task management, automated speed bonuses, and payouts for elite digital marketing agencies.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#168a3a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-[#f4f5f4] text-[#171717] selection:bg-[#eaf7ee] selection:text-[#0f6b2d]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
