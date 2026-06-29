'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Toast from '@/components/Toast';

const STORE_KEY = 'meowhouse_leads';
const STYLE_OPTIONS = ['เปอร์เซีย', 'สก็อตติช โฟลด์', 'บริติช', 'เมนคูน', 'พันธุ์อื่นๆ'];
const AVATARS = [
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=80&q=60&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=80&q=60&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=80&q=60&auto=format&fit=crop',
];

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isPhone = (v) => /^0\d{8,9}$/.test(v.replace(/\D/g, ''));
const esc = (s) => (s || '').toString();

export default function LeadPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', birthday: '' });
  const [styles, setStyles] = useState(() => new Set());
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({ name: false, email: false, phone: false });
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState({ msg: '', show: false });
  const [adminOpen, setAdminOpen] = useState(false);
  const [leads, setLeads] = useState([]);
  const timer = useRef(null);

  const showToast = (msg) => {
    setToast({ msg, show: true });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast((t) => ({ ...t, show: false })), 2400);
  };

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const toggleChip = (v) => {
    setStyles((prev) => {
      const next = new Set(prev);
      next.has(v) ? next.delete(v) : next.add(v);
      return next;
    });
  };

  const getLeads = () => JSON.parse(localStorage.getItem(STORE_KEY) || '[]');

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();

    const okName = name.length >= 2;
    const okEmail = isEmail(email);
    const okPhone = isPhone(phone);
    setErrors({ name: !okName, email: !okEmail, phone: !okPhone });

    if (!okName || !okEmail || !okPhone) return;
    if (!consent) {
      showToast('กรุณายอมรับนโยบายความเป็นส่วนตัวก่อน');
      return;
    }

    const lead = {
      name,
      email,
      phone,
      birthday: form.birthday,
      styles: [...styles].join(', '),
      date: new Date().toLocaleString('th-TH'),
    };

    // --- บันทึก Lead ลง localStorage ---
    const all = getLeads();
    all.push(lead);
    localStorage.setItem(STORE_KEY, JSON.stringify(all));

    /* === เชื่อมต่อระบบจริง (ถ้าต้องการ) ===
       เพิ่มการส่งข้อมูลไป backend ตรงนี้:
       await fetch('https://YOUR-ENDPOINT', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(lead),
       });
       ใช้ได้กับ Google Sheets, Formspree, n8n webhook ฯลฯ
    ====================================== */

    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyCode = () => {
    navigator.clipboard.writeText('MEOW20').then(() => showToast('คัดลอกโค้ด MEOW20 แล้ว'));
  };

  const openAdmin = () => {
    setLeads(getLeads());
    setAdminOpen(true);
  };

  const exportCSV = () => {
    const all = getLeads();
    if (!all.length) {
      showToast('ยังไม่มีข้อมูลให้ดาวน์โหลด');
      return;
    }
    const head = ['ชื่อ', 'อีเมล', 'เบอร์โทร', 'วันเกิด', 'สายพันธุ์ที่สนใจ', 'วันที่สมัคร'];
    const rows = all.map((l) =>
      [l.name, l.email, l.phone, l.birthday, l.styles, l.date]
        .map((v) => `"${(v || '').replace(/"/g, '""')}"`)
        .join(',')
    );
    const csv = '﻿' + [head.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'meowhouse-leads.csv';
    a.click();
    showToast(`ดาวน์โหลด CSV ${all.length} รายการแล้ว`);
  };

  const clearLeads = () => {
    if (!getLeads().length) {
      showToast('ไม่มีข้อมูลให้ลบ');
      return;
    }
    if (confirm('ต้องการลบข้อมูล Lead ทั้งหมดใช่หรือไม่?')) {
      localStorage.removeItem(STORE_KEY);
      setLeads([]);
      showToast('ลบข้อมูลทั้งหมดแล้ว');
    }
  };

  return (
    <>
      <Navbar />

      <main className="lead-wrap">
        {/* LEFT: PITCH */}
        <section className="pitch">
          <span className="eyebrow"><i className="ti ti-crown"></i> Meow House VIP Club</span>
          <h1>สมัครสมาชิกวันนี้<br />รับส่วนลดค่าน้อง <span className="hl">20%</span></h1>
          <p className="lead-sub">เข้าร่วมครอบครัวทาสแมว Meow House รับสิทธิ์จองน้องก่อนใคร พร้อมดีลสุดพิเศษที่หาไม่ได้จากที่อื่น</p>

          <div className="benefits">
            <div className="benefit"><i className="ti ti-discount-2"></i><div><b>ส่วนลด 20%</b><span>ค่าน้องตัวแรก</span></div></div>
            <div className="benefit"><i className="ti ti-paw"></i><div><b>จองก่อนใคร</b><span>น้องแมวมาใหม่</span></div></div>
            <div className="benefit"><i className="ti ti-gift"></i><div><b>ของขวัญต้อนรับ</b><span>อาหารและของเล่นน้อง</span></div></div>
            <div className="benefit"><i className="ti ti-stethoscope"></i><div><b>ปรึกษาสัตวแพทย์</b><span>ฟรีสำหรับสมาชิก</span></div></div>
          </div>

          <div className="proof">
            <div className="avatars">
              {AVATARS.map((url, i) => (
                <span key={i} style={{ backgroundImage: `url('${url}')` }} />
              ))}
            </div>
            <div className="proof-text">
              <div className="stars">★★★★★</div>
              <div style={{ fontSize: 13, color: '#ecd9f7' }}>
                มีทาสแมวแล้วกว่า <b>12,400+</b> คน
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT: FORM / SUCCESS */}
        <section className="form-side">
          <div className="form-card">
            {!submitted ? (
              <div>
                <h2>สมัครฟรี ไม่มีค่าใช้จ่าย</h2>
                <p className="desc">กรอกข้อมูลด้านล่างเพื่อรับโค้ดส่วนลดทันที</p>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="field">
                    <label>ชื่อ-นามสกุล <span className="req">*</span></label>
                    <input
                      type="text"
                      placeholder="เช่น สมหญิง ใจดี"
                      autoComplete="name"
                      className={errors.name ? 'err' : ''}
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                    />
                    <div className={`msg ${errors.name ? 'show' : ''}`}>กรุณากรอกชื่อของคุณ</div>
                  </div>

                  <div className="field">
                    <label>อีเมล <span className="req">*</span></label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      autoComplete="email"
                      className={errors.email ? 'err' : ''}
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                    />
                    <div className={`msg ${errors.email ? 'show' : ''}`}>กรุณากรอกอีเมลให้ถูกต้อง</div>
                  </div>

                  <div className="field">
                    <label>เบอร์โทรศัพท์ <span className="req">*</span></label>
                    <input
                      type="tel"
                      placeholder="08X-XXX-XXXX"
                      autoComplete="tel"
                      maxLength={10}
                      className={errors.phone ? 'err' : ''}
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value.replace(/\D/g, ''))}
                    />
                    <div className={`msg ${errors.phone ? 'show' : ''}`}>กรุณากรอกเบอร์โทร 10 หลัก</div>
                  </div>

                  <div className="field">
                    <label>สายพันธุ์ที่คุณสนใจ <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>(เลือกได้หลายอย่าง)</span></label>
                    <div className="chips">
                      {STYLE_OPTIONS.map((v) => (
                        <button
                          type="button"
                          key={v}
                          className={`chip ${styles.has(v) ? 'on' : ''}`}
                          onClick={() => toggleChip(v)}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="field">
                    <label>วันเกิด <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>(เพื่อรับของขวัญพิเศษ)</span></label>
                    <input
                      type="date"
                      value={form.birthday}
                      onChange={(e) => update('birthday', e.target.value)}
                    />
                  </div>

                  <div className="consent">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                    />
                    <label htmlFor="consent">
                      ฉันยินยอมให้ Meow House จัดเก็บและใช้ข้อมูลส่วนบุคคลเพื่อรับข่าวสารและสิทธิประโยชน์ ตาม
                      <a href="#">นโยบายความเป็นส่วนตัว (PDPA)</a>
                    </label>
                  </div>

                  <button type="submit" className="submit">
                    <i className="ti ti-gift"></i> รับส่วนลด 20% เลย
                  </button>
                  <p className="form-foot">
                    <i className="ti ti-lock"></i> ข้อมูลของคุณปลอดภัย เราไม่ส่งต่อให้บุคคลที่สาม
                  </p>
                </form>
              </div>
            ) : (
              <div className="success">
                <div className="ring"><i className="ti ti-check"></i></div>
                <h2>ยินดีต้อนรับสู่ Meow House! 🎉</h2>
                <p>เราส่งรายละเอียดไปที่อีเมลของคุณแล้ว<br />นี่คือโค้ดส่วนลด 20% สำหรับคุณ</p>
                <div className="code-box">
                  <div className="clabel">โค้ดส่วนลดของคุณ</div>
                  <div className="code">MEOW20</div>
                  <button className="copy-btn" onClick={copyCode}>
                    <i className="ti ti-copy"></i> คัดลอกโค้ด
                  </button>
                </div>
                <Link href="/" className="shop-link">
                  <i className="ti ti-paw"></i> เริ่มดูน้องแมว
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>

      <div className="lead-foot">
        <span>© 2025 Meow House. สงวนลิขสิทธิ์ทุกประการ</span>
        <a onClick={openAdmin}><i className="ti ti-database"></i> จัดการ Leads</a>
      </div>

      {/* ADMIN MODAL */}
      <div
        className={`modal-bg ${adminOpen ? 'show' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setAdminOpen(false);
        }}
      >
        <div className="modal">
          <div className="modal-head">
            <div>
              <h3>รายชื่อ Leads ที่เก็บได้</h3>
              <div className="count">{leads.length} รายการ</div>
            </div>
            <button onClick={() => setAdminOpen(false)} aria-label="ปิด">&times;</button>
          </div>
          <div className="modal-body">
            {leads.length === 0 ? (
              <div className="empty">
                <i className="ti ti-inbox" style={{ fontSize: 40 }}></i>
                <p>ยังไม่มีข้อมูล Lead</p>
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>#</th><th>ชื่อ</th><th>อีเมล</th><th>เบอร์โทร</th><th>สายพันธุ์</th><th>วันที่</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((l, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{esc(l.name)}</td>
                      <td>{esc(l.email)}</td>
                      <td>{esc(l.phone)}</td>
                      <td>{esc(l.styles) || '-'}</td>
                      <td>{esc(l.date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="modal-foot">
            <button className="btn-ghost btn-danger" onClick={clearLeads}>
              <i className="ti ti-trash"></i> ล้างทั้งหมด
            </button>
            <button className="btn-solid" onClick={exportCSV}>
              <i className="ti ti-download"></i> ดาวน์โหลด CSV
            </button>
          </div>
        </div>
      </div>

      <Toast message={toast.msg} show={toast.show} />
    </>
  );
}
