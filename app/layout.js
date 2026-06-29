import { Kanit } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/components/CartContext';
import CartDrawer from '@/components/CartDrawer';

const kanit = Kanit({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

export const metadata = {
  title: 'Meow House — ร้านน้องแมวสายพันธุ์แท้',
  description: 'ร้านขายน้องแมวสายพันธุ์แท้ สุขภาพดี ฉีดวัคซีนครบ พร้อมส่งต่อความน่ารักให้ครอบครัวคุณ',
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.7.0/dist/tabler-icons.min.css"
        />
      </head>
      <body className={kanit.className}>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
