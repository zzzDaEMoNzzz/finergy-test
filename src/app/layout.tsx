import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

import { theme } from '@/app/theme';
import { StoreProvider } from '@/store/provider';
import { MirageServer } from '@/mirage';

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
      <html lang="en">
        <body className={roboto.variable}>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
