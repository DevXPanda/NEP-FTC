// Root layout — wraps the entire nep-web app (App Router).
import type { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'NEP',
  description: 'NKTech Enterprise Platform',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
