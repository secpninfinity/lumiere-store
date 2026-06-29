'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Toast from '@/components/Toast';
import { PRODUCTS, CATEGORIES, fmt } from '@/lib/products';

export default function Home() {
  const [cart, setCart] = useState(0);
  const [activeCat, setActiveCat] = useState('all');
  const [wished, setWished] = useState(() => new Set());
  const [toast, setToast] = useState({ msg: '', show: false });
  const timer = useRef(null);

  const showToast = (msg) => {
    setToast({ msg, show: true });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast((t) => ({ ...t, show: false })), 2200);
  };

  const addCart = (name) => {
    setCart((c) => c + 1);
    showToast(`เพิ่ม "${name}" ลงตะกร้าแล้ว`);
  };

  const toggleWish = (name) => {
    setWished((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
        showToast('เพิ่มในรายการโปรดแล้ว');
      }
      return next;
    });
  };

  const list = activeCat === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.cat === activeCat);

  return (
    <>
      <Navbar cartCount={cart} />

      {/* HERO */}
      <header className="hero" id="home">
        <div className="hero-text">
          <span className="hero-tag">✨ คอลเลกชันใหม่ล่าสุด</span>
          <h1>แฟชั่นฤดูร้อน<br />2025</h1>
          <p>ค้นพบสไตล์ที่บ่งบอกความเป็นตัวคุณ สวยงาม มั่นใจ และไม่ซ้ำใคร</p>
          <a href="#shop" className="btn-primary">ช้อปเลย</a>
        </div>
        <div className="hero-badge">
          <div className="big">50%</div>
          <div className="sub">ส่วนลดสูงสุด</div>
          <div className="note">เฉพาะสินค้าเลือกสรร</div>
        </div>
      </header>

      {/* SHOP */}
      <section className="section" id="shop">
        <div className="section-head">
          <div className="section-title">สินค้าของเรา</div>
          <div className="section-sub">เลือกสไตล์ที่ใช่สำหรับคุณ</div>
        </div>

        <div className="cats">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              className={`cat ${activeCat === c.key ? 'active' : ''}`}
              onClick={() => setActiveCat(c.key)}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="products">
          {list.map((p) => {
            const isWished = wished.has(p.name);
            return (
              <article className="card" key={p.name}>
                <div className="card-img">
                  <Image
                    src={p.photo}
                    alt={p.name}
                    fill
                    sizes="(max-width: 860px) 50vw, 280px"
                    style={{ objectFit: 'cover' }}
                  />
                  {p.badge === 'new' && <span className="badge badge-new">ใหม่</span>}
                  {p.badge === 'sale' && <span className="badge badge-sale">ลดราคา</span>}
                  <button
                    className={`wishlist ${isWished ? 'active' : ''}`}
                    aria-label="เพิ่มในรายการโปรด"
                    onClick={() => toggleWish(p.name)}
                  >
                    <i className={isWished ? 'ti ti-heart-filled' : 'ti ti-heart'}></i>
                  </button>
                </div>
                <div className="card-body">
                  <div className="card-name">{p.name}</div>
                  <div className="card-type">{p.type}</div>
                  <div className="card-foot">
                    <span className="price">
                      {p.old && <span className="old">{fmt(p.old)}</span>}
                      {fmt(p.price)}
                    </span>
                    <button className="add-btn" onClick={() => addCart(p.name)}>
                      <i className="ti ti-plus"></i>ใส่ตะกร้า
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* PROMO */}
      <section className="section" id="promo" style={{ paddingTop: 0 }}>
        <div className="promo">
          <div>
            <h2>สมัครสมาชิก VIP รับส่วนลด 20% ทันที</h2>
            <p>เข้าถึงคอลเลกชันใหม่ก่อนใคร พร้อมของขวัญวันเกิดและดีลพิเศษเฉพาะสมาชิก</p>
          </div>
          <Link href="/lead" className="promo-btn">
            <i className="ti ti-crown"></i> สมัครฟรีเลย
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section" id="about" style={{ paddingTop: 0 }}>
        <div className="features">
          <div className="feature"><i className="ti ti-truck-delivery"></i><h3>จัดส่งฟรี</h3><p>เมื่อซื้อครบ ฿1,000 ทั่วประเทศ</p></div>
          <div className="feature"><i className="ti ti-refresh"></i><h3>คืนสินค้าได้</h3><p>ภายใน 30 วัน ไม่มีเงื่อนไข</p></div>
          <div className="feature"><i className="ti ti-shield-check"></i><h3>ของแท้ 100%</h3><p>รับประกันคุณภาพทุกชิ้น</p></div>
          <div className="feature"><i className="ti ti-headset"></i><h3>บริการ 24/7</h3><p>พร้อมดูแลคุณทุกเวลา</p></div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-col">
          <div className="footer-brand">✦ Lumière</div>
          <div className="footer-desc">แฟชั่นสุดชิคที่บ่งบอก<br />ความเป็นตัวคุณในทุกวัน</div>
        </div>
        <div className="footer-col">
          <h3>ลิงก์</h3>
          <a href="#">เกี่ยวกับเรา</a>
          <a href="#">ติดต่อเรา</a>
          <a href="#">บล็อกแฟชั่น</a>
          <a href="#">ร่วมงานกับเรา</a>
        </div>
        <div className="footer-col">
          <h3>บริการ</h3>
          <a href="#">นโยบายคืนสินค้า</a>
          <a href="#">ติดตามพัสดุ</a>
          <a href="#">คำถามที่พบบ่อย</a>
          <a href="#">ช่วยเหลือ</a>
        </div>
        <div className="footer-col">
          <h3>ติดตามเรา</h3>
          <a href="#"><i className="ti ti-brand-instagram" style={{ marginRight: 8 }}></i>Instagram</a>
          <a href="#"><i className="ti ti-brand-facebook" style={{ marginRight: 8 }}></i>Facebook</a>
          <a href="#"><i className="ti ti-brand-tiktok" style={{ marginRight: 8 }}></i>TikTok</a>
          <a href="#"><i className="ti ti-brand-line" style={{ marginRight: 8 }}></i>LINE</a>
        </div>
      </footer>
      <div className="footer-bottom">© 2025 Lumière Fashion. สงวนลิขสิทธิ์ทุกประการ</div>

      <Toast message={toast.msg} show={toast.show} />
    </>
  );
}
