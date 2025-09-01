import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Provider from './components/Provider';
import Navbar from './components/Navbar/Navbar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Form Pengaduan Bapenda',
  description: 'Media Pengaduan Masyarakat Indramayu',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
