# Meow House — ร้านน้องแมวสายพันธุ์แท้ (Next.js)

เว็บร้านขายน้องแมวโทนฟ้า–ม่วง–ชมพู สร้างด้วย **Next.js 16 (App Router)**

## โครงสร้างโปรเจกต์

```
webpn/
├── app/
│   ├── layout.js        # Root layout + ฟอนต์ Kanit + Tabler icons
│   ├── globals.css      # สไตล์ทั้งหมด (โทนฟ้า/ม่วง/ชมพู)
│   ├── page.js          # หน้าแรก (น้องแมว + ตะกร้าจอง + กรองสายพันธุ์ + Lookbook)
│   └── lead/
│       └── page.js      # หน้าเก็บ Lead (สมัคร VIP ทาสแมว + admin)
├── components/
│   ├── Navbar.js        # แถบเมนูใช้ร่วมกัน
│   └── Toast.js         # การแจ้งเตือน
├── lib/
│   └── products.js      # ข้อมูลน้องแมว (สายพันธุ์ ราคา รูป)
├── legacy/              # เวอร์ชัน HTML เดิม (ร้านเสื้อผ้า เก็บไว้อ้างอิง)
└── next.config.mjs      # ตั้งค่ารูปจาก Unsplash
```

## วิธีรัน

```bash
npm install      # ติดตั้ง dependencies (ครั้งแรกครั้งเดียว)
npm run dev      # เปิด dev server ที่ http://localhost:3000
```

หน้าเว็บ:
- `/` — หน้าแรก ดูน้องแมว
- `/lead` — หน้าเก็บ Lead (สมัครสมาชิก VIP ทาสแมว)

## คำสั่งอื่น ๆ

```bash
npm run build    # build สำหรับ production
npm start        # รัน production build
```

## หมายเหตุ

- ข้อมูล Lead เก็บใน **localStorage** ของเบราว์เซอร์ (เหมาะกับเดโม)
  ดูจุดเชื่อม backend จริงได้ในคอมเมนต์ `เชื่อมต่อระบบจริง` ที่ `app/lead/page.js`
- รูปน้องแมวดึงจาก Unsplash (ต้องต่ออินเทอร์เน็ต) ตั้งค่า domain ไว้ที่ `next.config.mjs`
