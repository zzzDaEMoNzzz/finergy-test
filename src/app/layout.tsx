import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import { StoreProvider } from '@/store/provider';
import { MirageServer } from '@/mirage';
import { Providers } from '@/app/providers';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

import './globals.css';

export const metadata: Metadata = {
  title: 'Студенты',
  description: 'Тестовое задание',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      {process.env.NODE_ENV === 'development' && <MirageServer />}
      <html lang="ru">
        <body className={roboto.variable}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </StoreProvider>
  );
}
