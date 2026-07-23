import type { Metadata } from "next";
import { Geist_Mono, Archivo, Anton, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Magic Carpet Movers — We move it like it's magic",
    template: "%s · Magic Carpet Movers",
  },
  description:
    "Ottawa-Gatineau's local & long-distance movers. Packing, furniture disassembly, moving boxes, cleaning, and Canada-wide + international shipping — handled like magic.",
  applicationName: "Magic Carpet Movers",
  authors: [{ name: "Magic Carpet Movers" }],
  keywords: [
    "movers",
    "moving company",
    "Ottawa movers",
    "Gatineau movers",
    "local movers",
    "long-distance movers",
    "packing and unpacking",
    "furniture disassembly",
    "moving boxes",
    "international shipping",
  ],
  openGraph: {
    type: "website",
    siteName: "Magic Carpet Movers",
    title: "Magic Carpet Movers — We move it like it's magic",
    description:
      "Local & long-distance moving, packing, furniture assembly, and Canada-wide + international shipping.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Magic Carpet Movers — We move it like it's magic",
    description: "Local & long-distance movers who treat your move like magic.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${hanken.variable} ${geistMono.variable} ${archivo.variable} ${anton.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
