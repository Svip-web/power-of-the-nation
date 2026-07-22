import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Power of the Nation — Humanitarian Alliance",
  description:
    "Громадська спілка для реалізації гуманітарних ініціатив, підтримки громадян та розвитку громадянського суспільства.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Power of the Nation — Humanitarian Alliance",
    description:
      "Гуманітарний альянс для суспільно корисних ініціатив, партнерства та підтримки України.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <head>
        <link rel="preload" as="image" href="/hero-shield-mobile.webp" type="image/webp" media="(max-width: 720px)" />
        <link rel="preload" as="image" href="/hero-shield.webp" type="image/webp" media="(min-width: 721px)" />
      </head>
      <body className={`${inter.variable} ${manrope.variable}`}>{children}</body>
    </html>
  );
}
