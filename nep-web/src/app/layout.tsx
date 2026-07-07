// Root layout — wraps the entire nep-web app (App Router).
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NKTech Enterprises',
  description:
    'A unified enterprise resource planning platform for manufacturing, inventory, sales, finance, and more. Built for modern businesses that demand scalability, security, and performance.',
  keywords: [
    'ERP',
    'Enterprise Platform',
    'Manufacturing',
    'Inventory Management',
    'Sales',
    'Finance',
    'NKTech',
  ],
  openGraph: {
    title: 'NEP — NKTech Enterprise Platform',
    description:
      'A unified enterprise resource planning platform for manufacturing, inventory, sales, finance, and more.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
