import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: {
    default: 'Romance Office | Architecture & Design Studio',
    template: '%s | Romance Office',
  },
  description: 'A creative architectural design studio dedicated to thoughtful and innovative spaces.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://romanceoffice.com',
    title: 'Romance Office | Architecture & Design Studio',
    description: 'A creative architectural design studio dedicated to thoughtful and innovative spaces.',
    siteName: 'Romance Office',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Romance Office | Architecture & Design Studio',
    description: 'A creative architectural design studio dedicated to thoughtful and innovative spaces.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}