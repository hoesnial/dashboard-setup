import './globals.css';
import type { Metadata } from 'next';
import { inter } from '@/app/ui/fonts';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Acme Dashboard - Innovative Business Solutions',
  description: 'Empowering businesses with cutting-edge technology solutions including analytics, security, and mobile development tools.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Navigation />
        <main>{children}</main>
        <Footer />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
