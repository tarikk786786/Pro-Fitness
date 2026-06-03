import type { Metadata } from "next";
import { Poppins, Montserrat, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Suspense } from "react";
import LoginModal from "@/components/auth/LoginModal";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Preloader from "@/components/layout/Preloader";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://profitness.in"),
  title: {
    default: "PRO FITNESS | Transform Your Body. Transform Your Life.",
    template: "%s | PRO FITNESS",
  },
  description:
    "PRO FITNESS — Balasore's premier AI-powered gym. Personalized workout plans, custom diet programs, expert trainer guidance, and real transformation. Join today.",
  keywords: [
    "gym Balasore",
    "fitness center Balasore Odisha",
    "PRO FITNESS",
    "AI fitness",
    "workout planner",
    "diet planner",
    "personal training",
    "health management",
    "body transformation",
    "weight loss gym",
    "muscle gain",
  ],
  authors: [{ name: "PRO FITNESS", url: "https://profitness.in" }],
  creator: "PRO FITNESS",
  publisher: "PRO FITNESS",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://profitness.in",
    siteName: "PRO FITNESS",
    title: "PRO FITNESS | Transform Your Body. Transform Your Life.",
    description:
      "Balasore's premier AI-powered gym. Expert trainers, personalized plans, real transformation.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "PRO FITNESS Balasore" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PRO FITNESS | Transform Your Body. Transform Your Life.",
    description: "Balasore's premier gym with AI-powered fitness programs.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  verification: {
    google: "your-google-site-verification-token",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${montserrat.variable} ${bebasNeue.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-brand-black text-brand-white font-poppins">
        <SmoothScroll>
          <Preloader />
          <Providers>
            {children}
            <Suspense fallback={null}>
              <LoginModal />
            </Suspense>
          </Providers>
        </SmoothScroll>
      </body>
    </html>
  );
}
