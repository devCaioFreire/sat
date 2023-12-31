import { AuthProvider } from '@/context/authContext';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Soft Clever - SAT',
  description: 'Soft Clever Informática',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="pt-BR">
      <AuthProvider>
        <body className={poppins.className}>
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
