import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/header';
import Footer from '@/components/footer';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { PromotionalModal } from '@/components/promotional-modal';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TEBA - Tu Tienda de Confianza',
  description: 'Encuentra los mejores productos al mejor precio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
          <PromotionalModal />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}