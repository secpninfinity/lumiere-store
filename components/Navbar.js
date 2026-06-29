import Link from 'next/link';

export default function Navbar({ cartCount = 0 }) {
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
        <button aria-label="รายการจอง">
          <i className="ti ti-shopping-cart"></i>
          <span className="cart-count">{cartCount}</span>
        </button>
        <button aria-label="บัญชี"><i className="ti ti-user"></i></button>
      </div>
    </nav>
  );
}
