'use client';

import Link from 'next/link';
import { useCart } from './CartContext';

export default function Navbar() {
  const { items, openCart } = useCart();

  return (
    <nav className="nav">
      <Link href="/" className="logo"><i className="ti ti-paw logo-star" aria-hidden="true"></i> Meow House</Link>
      <div className="nav-links">
        <Link href="/">หน้าแรก</Link>
        <Link href="/#shop">น้องแมว</Link>
        <Link href="/#promo">โปรโมชัน</Link>
        <Link href="/lead">สมาชิก VIP</Link>
        <Link href="/#about">เกี่ยวกับเรา</Link>
      </div>
      <div className="nav-right">
        <button aria-label="ค้นหา"><i className="ti ti-search"></i></button>
        <button aria-label="รายการโปรด"><i className="ti ti-heart"></i></button>
        <button aria-label="ตะกร้าจองน้อง" onClick={openCart}>
          <i className="ti ti-shopping-cart"></i>
          {items.length > 0 && <span className="cart-count">{items.length}</span>}
        </button>
        <button aria-label="บัญชี"><i className="ti ti-user"></i></button>
      </div>
    </nav>
  );
}
