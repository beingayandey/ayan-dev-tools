import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AppHeader } from "@/components/app-header";
import { AppRail } from "@/components/app-rail";
import { AdZone } from "@/components/ad-zone";
import { Toaster } from "@/components/ui/toaster";
import { ToastProvider } from "@/context/toast-context";
import { LenisWrapper } from "@/components/lenis-wrapper";
import { Analytics } from "@vercel/analytics/next";
import { BackgroundRenderer } from "@/components/background-renderer";
import { FavoritesProvider } from "@/context/favorites-context";
import { RecentToolsProvider } from "@/context/recent-tools-context";
import { DeveloperOSProvider } from "@/context/developer-os-context";

const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontOutfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Ayan Dey • Developer Tools",
  description:
    "Fast, privacy-first developer tools built by Ayan Dey. 100% clinet-side, zero data collection.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  verification: {
    google: "_l140NmmN3K2Y56GIQKwX0wRhY5hZaXE7uz2uz3Cv0U",
  },
};

import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontInter.variable} ${fontOutfit.variable} ${fontMono.variable} dark`}
    >
      <body className="font-sans antialiased text-foreground custom-scrollbar">
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem("theme");if(t==="light"){document.documentElement.classList.remove("dark")}}catch(e){}})()`}
        </Script>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-B5JR8YZ762"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-B5JR8YZ762');
          `}
        </Script>
        <Toaster />
        <BackgroundRenderer />
        <DeveloperOSProvider>
          <ToastProvider>
            <FavoritesProvider>
            <RecentToolsProvider>
              <LenisWrapper>
                <SidebarProvider className="bg-transparent min-h-screen relative">
                  <AppSidebar />
                  <SidebarInset className="bg-transparent flex flex-col flex-1 min-h-screen">
                    <AppHeader />
                    <div className="flex flex-1 relative">
                      <main className="flex-1 bg-transparent relative custom-scrollbar overscroll-contain pb-10 sm:pb-20">
                        {children}
                      </main>
                    </div>
                  </SidebarInset>
                </SidebarProvider>
              </LenisWrapper>
            </RecentToolsProvider>
          </FavoritesProvider>
          </ToastProvider>
        </DeveloperOSProvider>
        <Analytics />
      </body>
    </html>
  );
}
