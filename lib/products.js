const CAT_IMG = (name) => `/cats/${name}.png`;

export const PRODUCTS = [
  { name: 'เปอร์เซีย หน้าบี้', type: 'ขนยาวฟู · นิสัยเงียบสงบ', cat: 'longhair', price: 18000, photo: CAT_IMG('persian'), badge: 'new' },
  { name: 'สก็อตติช โฟลด์', type: 'หูพับ · ขี้อ้อนสุดๆ', cat: 'popular', price: 15000, old: 18000, photo: CAT_IMG('scottish-fold'), badge: 'sale' },
  { name: 'บริติช ช็อตแฮร์', type: 'หน้ากลม · ใจเย็น', cat: 'shorthair', price: 16000, photo: CAT_IMG('british-shorthair'), badge: null },
  { name: 'เมนคูน', type: 'ตัวใหญ่ · เป็นมิตร', cat: 'longhair', price: 25000, photo: CAT_IMG('maine-coon'), badge: 'new' },
  { name: 'แร็กดอลล์', type: 'ตาฟ้า · ตัวนิ่ม', cat: 'longhair', price: 22000, old: 26000, photo: CAT_IMG('ragdoll'), badge: 'sale' },
  { name: 'สฟิงซ์ ไร้ขน', type: 'ผิวเปลือย · ติดคนมาก', cat: 'rare', price: 30000, photo: CAT_IMG('sphynx'), badge: null },
  { name: 'เบงกอล', type: 'ลายเสือดาว · ขี้เล่น', cat: 'rare', price: 28000, photo: CAT_IMG('bengal'), badge: 'new' },
  { name: 'วิเชียรมาศ', type: 'พันธุ์ไทยแท้ · ฉลาด', cat: 'shorthair', price: 9000, photo: CAT_IMG('siamese'), badge: null },
  { name: 'อเมริกัน ช็อตแฮร์', type: 'แข็งแรง · เลี้ยงง่าย', cat: 'shorthair', price: 12000, old: 15000, photo: CAT_IMG('american-shorthair'), badge: 'sale' },
  { name: 'มันช์กิน ขาสั้น', type: 'ขาสั้น · น่ารักมุ้งมิ้ง', cat: 'popular', price: 20000, photo: CAT_IMG('munchkin'), badge: 'new' },
  { name: 'นอร์วีเจียน ฟอเรสต์', type: 'ขนหนา · สง่างาม', cat: 'longhair', price: 24000, photo: CAT_IMG('norwegian-forest'), badge: null },
  { name: 'อบิสซิเนียน', type: 'ขนสั้นเงา · กระฉับกระเฉง', cat: 'shorthair', price: 17000, photo: CAT_IMG('abyssinian'), badge: 'new' },
];

export const CATEGORIES = [
  { key: 'all', label: 'ทั้งหมด' },
  { key: 'popular', label: 'ยอดนิยม' },
  { key: 'longhair', label: 'ขนยาว' },
  { key: 'shorthair', label: 'ขนสั้น' },
  { key: 'rare', label: 'หายาก' },
];

export const fmt = (n) => '฿' + n.toLocaleString('th-TH');
