'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useCart } from './CartContext';
import { fmt } from '@/lib/products';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, clear } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const total = items.reduce((sum, i) => sum + i.price, 0);

  const close = () => {
    closeCart();
    setSubmitted(false);
  };
  const checkout = () => {
    setSubmitted(true);
    clear();
  };

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={close} />
      <aside className={`cart-drawer ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
        <div className="cart-head">
          <h3><i className="ti ti-shopping-cart"></i> ตะกร้าจองน้อง</h3>
          <button onClick={close} aria-label="ปิด">&times;</button>
        </div>

        {submitted ? (
          <div className="cart-done">
            <div className="ring"><i className="ti ti-check"></i></div>
            <h4 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>ส่งคำขอจองแล้ว! 🎉</h4>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 20 }}>
              ทางร้านจะติดต่อกลับเพื่อยืนยันการจองและนัดดูน้องครับ
            </p>
            <button className="cart-checkout" onClick={close}>เริ่มดูน้องต่อ</button>
          </div>
        ) : items.length === 0 ? (
          <div className="cart-empty">
            <i className="ti ti-cat"></i>
            <p>ยังไม่มีน้องในตะกร้า</p>
            <p style={{ fontSize: 13, marginTop: 4 }}>กด "จองน้อง" ที่การ์ดน้องแมวเพื่อเพิ่ม</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <div className="cart-row" key={item.name}>
                  <Image
                    src={item.photo}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="thumb"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="cart-row-info">
                    <div className="cart-row-name">{item.name}</div>
                    <div className="cart-row-type">{item.type}</div>
                    <div className="cart-row-price">{fmt(item.price)}</div>
                  </div>
                  <button
                    className="cart-remove"
                    onClick={() => removeItem(item.name)}
                    aria-label={`เอา ${item.name} ออกจากตะกร้า`}
                  >
                    <i className="ti ti-trash"></i>
                  </button>
                </div>
              ))}
            </div>
            <div className="cart-foot">
              <div className="cart-total">
                <span className="label">รวม {items.length} ตัว</span>
                <span className="amount">{fmt(total)}</span>
              </div>
              <button className="cart-checkout" onClick={checkout}>
                <i className="ti ti-paw"></i> ดำเนินการจอง
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
