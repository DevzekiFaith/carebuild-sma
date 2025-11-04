import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';
import ErrorBoundary from '@/components/ErrorBoundary';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CareBuild SMA - Trust & Care for Every Build",
  description: "Africa's most trusted technology-driven site management agency ensuring quality, transparency, and accountability on every construction site.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <Toaster
          position="top-right"
          expand={true}
          richColors={true}
          closeButton={true}
          duration={4000}
          theme="light"
        />
      </body>
    </html>
  );
}
