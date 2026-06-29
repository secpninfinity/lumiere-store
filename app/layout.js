import { Kanit } from 'next/font/google';
import './globals.css';

const kanit = Kanit({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

export const metadata = {
  title: 'Lumière — ร้านเสื้อผ้าแฟชั่น',
  description: 'แฟชั่นสุดชิคที่บ่งบอกความเป็นตัวคุณ โทนฟ้า ม่วง ชมพู',
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
      <body className={kanit.className}>{children}</body>
    </html>
  );
}
