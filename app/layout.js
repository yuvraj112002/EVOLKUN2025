// app/layout.js
import { Inter } from 'next/font/google';
import './globals.css'; // or your SCSS entry

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700', '800'], // choose what you need
  variable: '--font-inter', // optional: for CSS variable use
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}



