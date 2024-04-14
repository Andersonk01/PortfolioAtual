import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { HeaderMain } from '@/components/HeaderMain';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Anderson K',
  description: 'Portfólio de Anderson Kauer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={roboto.className}>
        <HeaderMain />
        {children}
      </body>
    </html>
  );
}
