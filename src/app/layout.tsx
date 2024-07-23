import AppProvider from "@/providers/app-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import "@/app/styles/globals.css";
import { Metadata } from "next";
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['vietnamese'] })

export const metadata: Metadata = {
  title: "HoLuonShop",
  description: "HoLuon is a platform for shopping",
};

export default function RootLayout ({ children }: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ThemeProvider 
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <AppProvider>
            {children}
          </AppProvider>

        </ThemeProvider>
      </body>
    </html>
  );
};

