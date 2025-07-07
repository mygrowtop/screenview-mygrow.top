import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ScreenView - Preview and test websites on different devices and screen sizes",
  description: "All-in-one responsive design testing platform that lets you preview your website on 200+ devices and quickly identify cross-device compatibility issues",
  keywords: ["responsive testing", "device testing", "website testing", "cross-device compatibility", "responsive design", "screen sizes", "web development tool"],
  authors: [{ name: "ScreenView Team" }],
  creator: "ScreenView",
  publisher: "ScreenView",
  metadataBase: new URL("https://screenview.mygrow.top"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ScreenView - Preview and test websites on different devices and screen sizes",
    description: "All-in-one responsive design testing platform for previewing websites on 200+ devices",
    url: "https://screenview.mygrow.top",
    siteName: "ScreenView",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ScreenView - Preview websites on multiple devices",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ScreenView - Preview and test websites on different devices",
    description: "Test your website on 200+ devices and screen sizes",
    creator: "@aass0810",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: '/file.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
