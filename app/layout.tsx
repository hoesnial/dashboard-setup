import './globals.css';
import type { Metadata } from 'next';
import { inter } from '@/app/ui/fonts';
import Sidebar from '@/components/sidebar';
import TopBar from '@/components/top-bar';
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
        <div className="min-h-screen bg-gray-50">
          {/* Sidebar */}
          <Sidebar />
          
          {/* Main Content */}
          <div className="lg:pl-72">
            <TopBar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </div>
        </div>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
