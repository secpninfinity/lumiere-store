# Meow House

Domain language for Meow House — an online shop that rehomes individual pedigree cats. Every item for sale is a unique living animal, which is what shapes how reservations and availability work (unlike a clothing store with fungible stock).

## Language

**น้องแมว (Cat)**:
A single, unique animal offered for rehoming. Each Cat is one-of-a-kind — stock is always exactly one — so it can be reserved or sold to only one customer.
_Avoid_: สินค้า, product, item, SKU

**การจอง (Reservation)**:
A temporary, exclusive hold a customer places on one specific Cat while they arrange to confirm. At most one active Reservation can exist per Cat.
_Avoid_: ตะกร้า, cart, order, การสั่งซื้อ

**สถานะความพร้อม (Availability status)**:
The single state a Cat is currently in — exactly one of ว่าง, ติดจอง, or ขายแล้ว.

**ว่าง (Available)**:
A Cat with no active Reservation. It can be reserved.
_Avoid_: พร้อมขาย, in stock

**ติดจอง (On hold)**:
A Cat with an active Reservation. It cannot be reserved by anyone else.
_Avoid_: จองแล้ว, reserved

**ขายแล้ว (Sold)**:
A Cat whose Reservation has been confirmed into a completed sale. Permanently unavailable.
_Avoid_: หมด, out of stock

**การยืนยัน (Confirmation)**:
The staff action that turns an On-hold Cat into a Sold Cat, after the customer pays a deposit out-of-band.
_Avoid_: checkout, การชำระเงิน

**การหมดอายุ (Expiry)**:
The automatic release of a Reservation — returning the Cat to ว่าง — when it is not confirmed within the hold window.
_Avoid_: timeout; cancel (ยกเลิกคือการกระทำของคน ไม่ใช่อัตโนมัติ)
