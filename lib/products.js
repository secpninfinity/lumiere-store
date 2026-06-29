const IMG = (id) =>
  `https://images.unsplash.com/photo-${id}?w=600&q=80&auto=format&fit=crop`;

export const PRODUCTS = [
  { name: 'เปอร์เซีย หน้าบี้', type: 'ขนยาวฟู · นิสัยเงียบสงบ', cat: 'longhair', price: 18000, photo: IMG('1514888286974-6c03e2ca1dba'), badge: 'new' },
  { name: 'สก็อตติช โฟลด์', type: 'หูพับ · ขี้อ้อนสุดๆ', cat: 'popular', price: 15000, old: 18000, photo: IMG('1518791841217-8f162f1e1131'), badge: 'sale' },
  { name: 'บริติช ช็อตแฮร์', type: 'หน้ากลม · ใจเย็น', cat: 'shorthair', price: 16000, photo: IMG('1495360010541-f48722b34f7d'), badge: null },
  { name: 'เมนคูน', type: 'ตัวใหญ่ · เป็นมิตร', cat: 'longhair', price: 25000, photo: IMG('1574158622682-e40e69881006'), badge: 'new' },
  { name: 'แร็กดอลล์', type: 'ตาฟ้า · ตัวนิ่ม', cat: 'longhair', price: 22000, old: 26000, photo: IMG('1533743983669-94fa5c4338ec'), badge: 'sale' },
  { name: 'สฟิงซ์ ไร้ขน', type: 'ผิวเปลือย · ติดคนมาก', cat: 'rare', price: 30000, photo: IMG('1592194996308-7b43878e84a6'), badge: null },
  { name: 'เบงกอล', type: 'ลายเสือดาว · ขี้เล่น', cat: 'rare', price: 28000, photo: IMG('1573865526739-10659fec78a5'), badge: 'new' },
  { name: 'วิเชียรมาศ', type: 'พันธุ์ไทยแท้ · ฉลาด', cat: 'shorthair', price: 9000, photo: IMG('1543852786-1cf6624b9987'), badge: null },
  { name: 'อเมริกัน ช็อตแฮร์', type: 'แข็งแรง · เลี้ยงง่าย', cat: 'shorthair', price: 12000, old: 15000, photo: IMG('1561948955-570b270e7c36'), badge: 'sale' },
  { name: 'มันช์กิน ขาสั้น', type: 'ขาสั้น · น่ารักมุ้งมิ้ง', cat: 'popular', price: 20000, photo: IMG('1596854407944-bf87f6fdd49e'), badge: 'new' },
  { name: 'นอร์วีเจียน ฟอเรสต์', type: 'ขนหนา · สง่างาม', cat: 'longhair', price: 24000, photo: IMG('1513245543132-31f507417b26'), badge: null },
  { name: 'อบิสซิเนียน', type: 'ขนสั้นเงา · กระฉับกระเฉง', cat: 'shorthair', price: 17000, photo: IMG('1511044568932-338cba0ad803'), badge: 'new' },
];

export const CATEGORIES = [
  { key: 'all', label: 'ทั้งหมด' },
  { key: 'popular', label: 'ยอดนิยม' },
  { key: 'longhair', label: 'ขนยาว' },
  { key: 'shorthair', label: 'ขนสั้น' },
  { key: 'rare', label: 'หายาก' },
];

export const fmt = (n) => '฿' + n.toLocaleString('th-TH');
