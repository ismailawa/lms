import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import GlobalContextProvider from '@/context/GlobalContextProvider';

import ToastProvider from '@/components/ToastProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'My Makaranta',
  description: 'A product of mehub',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body suppressHydrationWarning={true} className={inter.className}>
        <GlobalContextProvider>
          <ToastProvider>{children}</ToastProvider>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
