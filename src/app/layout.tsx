import type { Metadata } from "next";
import { MuseoModerno, Poetsen_One, Poppins } from "next/font/google";
import "./globals.css";

// Termes clés / accent
const museoModerno = MuseoModerno({
  variable: "--font-museo",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

// Titres / Marque / Noms
const poetsenOne = Poetsen_One({
  variable: "--font-poetsen",
  subsets: ["latin"],
  weight: "400",
});

// Corps de texte
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "JUNO",
  description: "Apprendre à entreprendre grâce à LEGO",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${museoModerno.variable} ${poetsenOne.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-poppins">{children}</body>
    </html>
  );
}
