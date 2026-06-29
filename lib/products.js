const IMG = (id) =>
  `https://images.unsplash.com/photo-${id}?w=600&q=80&auto=format&fit=crop`;

export const PRODUCTS = [
  { name: 'เดรสซาตินสุดหรู', type: 'ชุดเดรส', cat: 'dress', price: 1290, photo: IMG('1595777457583-95e059d581b8'), badge: 'new' },
  { name: 'เสื้อเบลาส์แขนยาว', type: 'เสื้อผ้า', cat: 'top', price: 590, old: 790, photo: IMG('1583743814966-8936f5b7be1a'), badge: 'sale' },
  { name: 'กระเป๋าหนังพรีเมียม', type: 'กระเป๋า', cat: 'bag', price: 2190, photo: IMG('1584917865442-de89df76afd3'), badge: null },
  { name: 'สร้อยคอมินิมอล', type: 'เครื่องประดับ', cat: 'acc', price: 890, photo: IMG('1611652022419-a9419f74343d'), badge: 'new' },
  { name: 'เดรสลำลองสไตล์เกาหลี', type: 'ชุดเดรส', cat: 'dress', price: 1590, old: 2090, photo: IMG('1566174053879-31528523f8ae'), badge: 'sale' },
  { name: 'รองเท้าส้นสูงคลาสสิก', type: 'รองเท้า', cat: 'shoes', price: 1890, photo: IMG('1543163521-1bf539c55dd2'), badge: null },
  { name: 'เสื้อยืดคอตตอนพรีเมียม', type: 'เสื้อผ้า', cat: 'top', price: 490, photo: IMG('1521572163474-6864f9cf17ab'), badge: null },
  { name: 'กระเป๋าสะพายข้าง', type: 'กระเป๋า', cat: 'bag', price: 1290, old: 1690, photo: IMG('1548036328-c9fa89d128fa'), badge: 'sale' },
  { name: 'เดรสยาวลายดอกไม้', type: 'ชุดเดรส', cat: 'dress', price: 1790, photo: IMG('1612336307429-8a898d10e223'), badge: 'new' },
  { name: 'ต่างหูสไตล์วินเทจ', type: 'เครื่องประดับ', cat: 'acc', price: 390, photo: IMG('1515562141207-7a88fb7ce338'), badge: null },
  { name: 'รองเท้าผ้าใบมินิมอล', type: 'รองเท้า', cat: 'shoes', price: 990, photo: IMG('1525966222134-fcfa99b8ae77'), badge: null },
  { name: 'แหวนเงินแฟชั่น', type: 'เครื่องประดับ', cat: 'acc', price: 590, photo: IMG('1599643478518-a784e5dc4c8f'), badge: 'new' },
];

export const CATEGORIES = [
  { key: 'all', label: 'ทั้งหมด' },
  { key: 'dress', label: 'ชุดเดรส' },
  { key: 'top', label: 'เสื้อผ้า' },
  { key: 'bag', label: 'กระเป๋า' },
  { key: 'acc', label: 'เครื่องประดับ' },
  { key: 'shoes', label: 'รองเท้า' },
];

export const fmt = (n) => '฿' + n.toLocaleString('th-TH');
