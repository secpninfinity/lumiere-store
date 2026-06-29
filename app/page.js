'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Toast from '@/components/Toast';
import { useCart } from '@/components/CartContext';
import { PRODUCTS, CATEGORIES, fmt } from '@/lib/products';

const LOOKBOOK = [
  {
    title: 'เจ้าเหมียวจอมซน',
    label: 'แมวเด่นสัปดาห์นี้',
    photo: 'https://images.unsplash.com/photo-1472491235688-bdc81a63246e?w=900&q=80&auto=format&fit=crop',
  },
  {
    title: 'นอนตากแดด',
    label: 'โมเมนต์น่ารัก',
    photo: 'https://images.unsplash.com/photo-1568152950566-c1bf43f4ab28?w=900&q=80&auto=format&fit=crop',
  },
  {
    title: 'พี่น้องขนปุย',
    label: 'คู่หูซี้',
    photo: 'https://images.unsplash.com/photo-1494256997604-768d1f608cac?w=900&q=80&auto=format&fit=crop',
  },
  {
    title: 'ตากลมโต',
    label: 'สายตาวิงวอน',
    photo: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=900&q=80&auto=format&fit=crop',
  },
  {
    title: 'เจ้าชายขนยาว',
    label: 'สง่างาม',
    photo: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=900&q=80&auto=format&fit=crop',
  },
];

export default function Home() {
  const { addItem } = useCart();
  const [activeCat, setActiveCat] = useState('all');
  const [wished, setWished] = useState(() => new Set());
  const [toast, setToast] = useState({ msg: '', show: false });
  const timer = useRef(null);

  const showToast = (msg) => {
    setToast({ msg, show: true });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast((t) => ({ ...t, show: false })), 2200);
  };

  const addCart = (cat) => {
    const added = addItem(cat);
    showToast(added ? `เพิ่ม "${cat.name}" ลงตะกร้าแล้ว 🐾` : `"${cat.name}" อยู่ในตะกร้าแล้ว`);
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
      <Navbar />

      {/* HERO */}
      <header className="hero" id="home">
        <div className="hero-text">
          <span className="hero-tag">🐾 น้องแมวพร้อมย้ายบ้าน</span>
          <h1>หาเพื่อนซี้<br />ขนปุยตัวใหม่</h1>
          <p>น้องแมวสายพันธุ์แท้ สุขภาพดี ฉีดวัคซีนครบ พร้อมส่งต่อความน่ารักให้ครอบครัวคุณ</p>
          <a href="#shop" className="btn-primary">ดูน้องแมว</a>
        </div>
        <div className="hero-badge">
          <div className="big">100+</div>
          <div className="sub">น้องพร้อมบ้านใหม่</div>
          <div className="note">ฉีดวัคซีนครบทุกตัว</div>
        </div>
      </header>

      {/* SHOP */}
      <section className="section" id="shop">
        <div className="section-head">
          <div className="section-title">น้องแมวของเรา</div>
          <div className="section-sub">เลือกสายพันธุ์ที่ถูกใจคุณ</div>
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
                  {p.badge === 'new' && <span className="badge badge-new">น้องใหม่</span>}
                  {p.badge === 'sale' && <span className="badge badge-sale">โปรพิเศษ</span>}
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
                    <button className="add-btn" onClick={() => addCart(p)}>
                      <i className="ti ti-paw"></i>จองน้อง
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* LOOKBOOK */}
      <section className="section lookbook-section" id="lookbook">
        <div className="section-head">
          <div className="section-title">แกลเลอรีน้องแมว</div>
          <div className="section-sub">รวมโมเมนต์น่ารักของน้องๆ ในร้าน</div>
        </div>

        <div className="lookbook-grid">
          {LOOKBOOK.map((item, index) => (
            <article className={`lookbook-tile tile-${index + 1}`} key={item.title}>
              <Image
                src={item.photo}
                alt={`${item.label} - ${item.title}`}
                fill
                sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
              />
              <div className="lookbook-caption">
                <span>{item.label}</span>
                <strong>{item.title}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* PROMO */}
      <section className="section" id="promo" style={{ paddingTop: 0 }}>
        <div className="promo">
          <div>
            <h2>สมัครสมาชิก VIP รับส่วนลดค่าน้อง 20%</h2>
            <p>จองน้องแมวมาใหม่ก่อนใคร พร้อมของขวัญต้อนรับและสิทธิพิเศษเฉพาะสมาชิก</p>
          </div>
          <Link href="/lead" className="promo-btn">
            <i className="ti ti-crown"></i> สมัครฟรีเลย
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section" id="about" style={{ paddingTop: 0 }}>
        <div className="features">
          <div className="feature"><i className="ti ti-truck-delivery"></i><h3>ส่งน้องถึงบ้าน</h3><p>บริการจัดส่งน้องอย่างปลอดภัย</p></div>
          <div className="feature"><i className="ti ti-vaccine"></i><h3>วัคซีนครบ</h3><p>ตรวจสุขภาพและฉีดวัคซีนแล้ว</p></div>
          <div className="feature"><i className="ti ti-certificate"></i><h3>สายพันธุ์แท้ 100%</h3><p>มีใบเพ็ดดีกรีรับรอง</p></div>
          <div className="feature"><i className="ti ti-headset"></i><h3>ปรึกษาสัตวแพทย์ 24/7</h3><p>ดูแลน้องหลังรับไปแล้ว</p></div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-col">
          <div className="footer-brand"><i className="ti ti-paw"></i> Meow House</div>
          <div className="footer-desc">ส่งต่อน้องแมวสุขภาพดี<br />ให้ทุกครอบครัวมีความสุข</div>
        </div>
        <div className="footer-col">
          <h3>ลิงก์</h3>
          <a href="#">เกี่ยวกับเรา</a>
          <a href="#">ติดต่อเรา</a>
          <a href="#">บล็อกคนรักแมว</a>
          <a href="#">ร่วมงานกับเรา</a>
        </div>
        <div className="footer-col">
          <h3>บริการ</h3>
          <a href="#">นโยบายรับประกันน้อง</a>
          <a href="#">วิธีรับน้อง</a>
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
      <div className="footer-bottom">© 2025 Meow House. สงวนลิขสิทธิ์ทุกประการ</div>

      <Toast message={toast.msg} show={toast.show} />
    </>
  );
}
