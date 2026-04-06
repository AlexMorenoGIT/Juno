import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { MuseoModerno, Poetsen_One, Poppins } from "next/font/google";
import "./globals.css";
import { SplashScreen }   from "@/components/ui/SplashScreen";
import { InstallPrompt }  from "@/components/ui/InstallPrompt";

// ── Polices ──────────────────────────────────────────────────────────────────

const museoModerno = MuseoModerno({
  variable: "--font-museo",
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
  display: "swap",
});

const poetsenOne = Poetsen_One({
  variable: "--font-poetsen",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300","400","500","600","700"],
  display: "swap",
});

// ── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "JUNO — Apprendre à Entreprendre",
  description: "Apprends à entreprendre grâce à la construction de lampes LEGO.",

  manifest: "/manifest.webmanifest",

  appleWebApp: {
    capable: true,
    title: "JUNO",
    statusBarStyle: "black-translucent",
    startupImage: [
      { url: "/icons/apple-touch-icon.png" },
    ],
  },

  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/icons/icon-192x192.png",
  },

  openGraph: {
    title: "JUNO — Apprendre à Entreprendre",
    description: "Apprends à entreprendre grâce à la construction de lampes LEGO.",
    type: "website",
    locale: "fr_FR",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",           // plein écran (notch + Dynamic Island)
  themeColor: [
    { media: "(prefers-color-scheme: dark)",  color: "#1a1a1a" },
    { media: "(prefers-color-scheme: light)", color: "#FF8C00" },
  ],
};

// ── Layout ────────────────────────────────────────────────────────────────────

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${museoModerno.variable} ${poetsenOne.variable} ${poppins.variable} h-full antialiased`}
    >
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />

        {/* Capture le prompt d'installation Android avant hydratation */}
        <Script id="pwa-install-capture" strategy="beforeInteractive">{`
          window.__deferredInstallPrompt = null;
          window.addEventListener('beforeinstallprompt', function(e) {
            e.preventDefault();
            window.__deferredInstallPrompt = e;
          });
        `}</Script>

        {/* Enregistrement du Service Worker */}
        <Script id="sw-register" strategy="afterInteractive">{`
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
              navigator.serviceWorker.register('/sw.js')
                .catch(function(err) { console.warn('SW registration failed:', err); });
            });
          }
        `}</Script>
      </head>
      <body className="font-poppins bg-slate-950">
        <SplashScreen />
        {children}
        <InstallPrompt />
      </body>
    </html>
  );
}
