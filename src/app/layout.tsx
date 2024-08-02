import { ThemeProvider } from '@/providers/theme-provider';
import '@/styles/globals.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Header from '@/components/header';
import { AppProvider } from '@/providers/app-provider';
config.autoAddCss = false;

const inter = Inter({ subsets: ['vietnamese'] });

export const metadata: Metadata = {
  title: 'HoLuonShop',
  description: 'HoLuon is a platform for shopping',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode; layout: String }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AppProvider>
            <Header />
            {children}
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
