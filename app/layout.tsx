import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://enqueue.co"),
  title: "Enqueue | Technology. Strategy. Execution.",
  description: "Enqueue is a premier technology agency helping startups and businesses scale through software engineering, AI automation, cybersecurity, product strategy, and digital transformation solutions.",
  keywords: "technology agency, software engineering, AI automation, cybersecurity, product strategy, digital transformation, startup, SaaS",
  icons: {
    icon: "/fonts/logo.png",
    apple: "/fonts/logo.png",
    shortcut: "/fonts/logo.png",
  },
  openGraph: {
    title: "Enqueue | Technology. Strategy. Execution.",
    description: "Premier technology agency built to help startups and businesses scale.",
    type: "website",
    images: [{ url: "/fonts/logo.png", width: 1024, height: 1024, alt: "Enqueue" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
