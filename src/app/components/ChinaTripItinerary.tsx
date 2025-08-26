"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  CalendarPlus,
  ExternalLink,
  Utensils,
  Hotel,
  Plane,
  Mountain,
  Trees,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// ---------- DATA ----------
const places = [
  // Chengdu
  {
    city: "Chengdu",
    name: "Chen Mapo Tofu",
    type: "อาหารเสฉวน (Mapo Tofu)",
    maps: "https://www.google.com/maps?q=Chen%20Mapo%20Tofu%20Chengdu&output=embed",
    link: "https://goo.gl/maps/4KNYW2B28YQz3eMo9",
  },
  {
    city: "Chengdu",
    name: "Shu Daxia Hotpot",
    type: "Hotpot เสฉวน",
    maps: "https://www.google.com/maps?q=Shu%20Daxia%20Hotpot%20Chengdu&output=embed",
    link: "https://goo.gl/maps/jPR5Yt7oxN1jvHcb8",
  },
  {
    city: "Chengdu",
    name: "Kuanzhai Alley Street Food",
    type: "Street Food",
    maps: "https://www.google.com/maps?q=Kuanzhai%20Alley%20Chengdu&output=embed",
    link: "https://goo.gl/maps/y8poQhaAf4ptwYnS7",
  },

  // Rilong / Siguniangshan
  {
    city: "Rilong",
    name: "Four Girls Mountain Restaurant",
    type: "อาหารทิเบต + เสฉวน",
    maps: "https://www.google.com/maps?q=Four%20Girls%20Mountain%20Restaurant%20Rilong&output=embed",
    link: "https://goo.gl/maps/6g6UxSTPgeALPvGJ6",
  },

  // Li County / Bipenggou vicinity
  {
    city: "Li County",
    name: "Li County Farmhouse Restaurant",
    type: "อาหารพื้นบ้าน",
    maps: "https://www.google.com/maps?q=Li%20County%20Farmhouse%20Restaurant&output=embed",
    link: "",
  },

  // Shanghai
  {
    city: "Shanghai",
    name: "Jia Jia Tang Bao",
    type: "Xiao Long Bao",
    maps: "https://www.google.com/maps?q=Jia%20Jia%20Tang%20Bao%20Shanghai&output=embed",
    link: "https://goo.gl/maps/d2kx8SLLuXtCDhBr6",
  },
  {
    city: "Shanghai",
    name: "Yang's Fried Dumpling",
    type: "Sheng Jian Bao",
    maps: "https://www.google.com/maps?q=Yang's%20Fried%20Dumpling%20Shanghai&output=embed",
    link: "https://goo.gl/maps/DGi1s5Gq58mN1VjR6",
  },
  {
    city: "Shanghai",
    name: "Old Jesse",
    type: "อาหารเซี่ยงไฮ้ดั้งเดิม",
    maps: "https://www.google.com/maps?q=Old%20Jesse%20Shanghai&output=embed",
    link: "https://goo.gl/maps/mPHzRdrE1VhHyeyA8",
  },
  {
    city: "Shanghai",
    name: "Din Tai Fung (Xintiandi)",
    type: "ติ่มซำ / Xiao Long Bao",
    maps: "https://www.google.com/maps?q=Din%20Tai%20Fung%20Xintiandi%20Shanghai&output=embed",
    link: "https://goo.gl/maps/4cxiMnVZycnqq2Wj6",
  },
];

const hotels = [
  {
    city: "Chengdu",
    name: "Jinjiang Inn (เมือง)",
    price: "~1,000 B",
    maps: "https://www.google.com/maps?q=Jinjiang%20Inn%20Chengdu&output=embed",
  },
  {
    city: "Chengdu",
    name: "Sim's Cozy Garden Hostel",
    price: "~500–1,400 B",
    maps: "https://www.google.com/maps?q=Sim's%20Cozy%20Garden%20Hostel%20Chengdu&output=embed",
  },
  {
    city: "Rilong",
    name: "Local Guesthouse (เกสต์เฮาส์)",
    price: "~1,200–1,500 B",
    maps: "https://www.google.com/maps?q=Rilong%20guesthouse&output=embed",
  },
  {
    city: "Shanghai",
    name: "Lintin Hotel",
    price: "~1,000–1,300 B",
    maps: "https://www.google.com/maps?q=Lintin%20Hotel%20Shanghai&output=embed",
  },
  {
    city: "Shanghai",
    name: "Meego Hostel",
    price: "~1,000–1,300 B",
    maps: "https://www.google.com/maps?q=Meego%20Hostel%20Shanghai&output=embed",
  },
];
const insurances = [
  { name: "ต้อม", file: "/insurance_tom.pdf" },
  { name: "เชลล์", file: "/insurance_shell.pdf" },
  { name: "นุ้ย", file: "/insurance_nui.pdf" },
  { name: "บีม", file: "/insurance_beam.pdf" },
  { name: "สปาย", file: "/insurance_spy.pdf" },
  { name: "พลอย", file: "/insurance_ploy.pdf" },
];

// Helper Icons
function BuildingIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <path d="M3 22h18" />
      <path d="M6 22V4h12v18" />
      <path d="M9 8h.01M9 12h.01M9 16h.01M15 8h.01M15 12h.01M15 16h.01" />
    </svg>
  );
}

function CastleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <path d="M3 22h18" />
      <path d="M6 22V10l3-2 3 2 3-2 3 2v12" />
      <path d="M9 22v-6h6v6" />
      <path d="M12 4l2 2-2 2-2-2 2-2z" />
    </svg>
  );
}

const itinerary = [
  {
    date: "ก่อนเดินทาง (1-2 สัปดาห์ล่วงหน้า)",
    city: "เตรียมการล่วงหน้า",
    icon: <CalendarPlus className="w-4 h-4" />,
    items: [
      {
        time: "สำคัญมาก",
        title: "จองตั๋วเครื่องบิน BKK-CTU, CTU-PVG, PVG-BKK",
        note: "เช็ครอบวีซ่าจีน, หนังสือเดินทาง > 6 เดือน",
      },
      {
        time: "ทำล่วงหน้า",
        title: "จองที่พัก Chengdu (2 คืน) + Shanghai (2 คืน)",
        note: "Booking.com, Agoda หรือ Ctrip ภาษาจีน",
      },
      {
        time: "จำเป็น",
        title: "ซื้อตั๋ว Shanghai Disneyland",
        note: "เว็บ official หรือ Klook ~2,000-2,800 บาท (รอสาย)",
      },
      {
        time: "แนะนำ",
        title: "ดาวน์โหลดแอป WeChat, Alipay, Didi, Baidu Maps",
        note: "ผูก VPN และบัตรเครดิต/เดบิต",
      },
      {
        time: "ก่อนบิน",
        title: "เช็คสภาพอากาศ Balang Shan + Bipenggou",
        note: "อาจปิดถนนหิมะหนัก ต้องปรับแพลน",
      },
    ],
  },
  {
    date: "ศุกร์ 5 ธ.ค.",
    city: "เฉิงตู Chengdu",
    icon: <Plane className="w-4 h-4" />,
    items: [
      {
        time: "06:00",
        title: "เช็กอิน สนามบิน BKK (3 ชม.ก่อนบิน)",
        note: "เตรียม Passport, บัตรโดยสาร, เงินสดจีน ~3,000-5,000 CNY",
      },
      {
        time: "09:00",
        title: "ถึงสนามบินเฉิงตู (CTU Terminal 2)",
        note: "ผ่านตรวจคน, รับกระเป๋า, ซื้อซิม China Mobile/Unicom",
      },
      {
        time: "10:00",
        title: "Airport Express → เมืองเฉิงตู",
        note: "รถไฟฟ้า ~45 นาที หรือ Didi/แท็กซี่ ~1 ชม.",
      },
      {
        time: "10:30",
        title: "เช็กอิน Jinjiang Inn หรือ Sim's Hostel",
        note: "ฝากกระเป๋าได้ถ้าห้องยังไม่พร้อม, ทดสอบ WiFi + WeChat",
      },
      {
        time: "11:30–14:00",
        title: "Chengdu Research Base of Giant Panda",
        note: "ตั๋ว ~55 CNY, ไปเช้า แพนด้าตื่นตัว, รถเมล์ 87/198/532",
      },
      {
        time: "14:30–17:00",
        title: "ช้อป/เดิน Taikoo Li & Chunxi Road",
        note: "เดินเล่น ถ่ายรูป, คาเฟ่, ห้าง IFS mall",
      },
      {
        time: "18:00",
        title: "เย็นที่ Kuanzhai Alley",
        note: "Street food, ชา, ของฝากท้องถิ่น, ถ่ายรูปกับสถาปัตยกรรมเก่า",
      },
      {
        time: "19:30",
        title: "ดินเนอร์ Shu Daxia Hotpot หรือร้านเทียบเคียง",
        note: "สั่งหม้อสองน้ำซุป (เผ็ด+ไม่เผ็ด), เนื้อ+ผัก ~150-200 CNY/คน",
      },
    ],
  },
  {
    date: "เสาร์ 6 ธ.ค.",
    city: "ไปเขาสี่ดรุณี Siguniangshan",
    icon: <Mountain className="w-4 h-4" />,
    items: [
      {
        time: "06:00",
        title: "เช็กเอาท์ + รับรถเช่า หรือ จ้างคนขับ",
        note: "เส้นทาง ~4-5 ชม., SUV แนะนำ, GPS + แผนที่ออฟไลน์",
      },
      {
        time: "07:00",
        title: "ออกจากเฉิงตู → Siguniangshan",
        note: "เผื่อเวลา Balang Shan (4,523m) อาจมีหิมะ/ลม/ปิดถนน",
      },
      {
        time: "10:00",
        title: "พักแวะ Li County (ลิ่เซียน)",
        note: "เติมน้ำมัน, ซื้อขนม/น้ำ, เช็คสภาพรถ",
      },
      {
        time: "12:00",
        title: "ถึง Rilong → เช็กอิน Local Guesthouse",
        note: "ปรับตัวอากาศบาง (3,000m), ดื่มน้ำบ่อย, หลีกเลี่ยงกิจกรรมหนัก",
      },
      {
        time: "13:00",
        title: "ลันช์ + พักผ่อน",
        note: "อาหารทิเบต/เสฉวน, ชาเปียกปอ, ซุปอุ่น ๆ",
      },
      {
        time: "14:00–17:00",
        title: "เที่ยว Changping Valley",
        note: "ตั๋ว ~70 CNY, รถม้า +~80 CNY, วิวหุบเขา/ธารน้ำแข็ง, ทางเดินเรียบ",
      },
      {
        time: "18:00",
        title: "ดินเนอร์ที่เกสต์เฮาส์",
        note: "อาหารทิเบตอุ่น ๆ Tsampa, Yak meat, เตรียมตัวพักผ่อน",
      },
      {
        time: "20:00",
        title: "พักผ่อนเต็มที่",
        note: "ดื่มน้ำ, หลีกเลี่ยงแอลกอฮอล์, นอนหลับให้เพียงพอ",
      },
    ],
  },
  {
    date: "อาทิตย์ 7 ธ.ค.",
    city: "Rilong → Bipenggou → เฉิงตู → เซี่ยงไฮ้",
    icon: <Trees className="w-4 h-4" />,
    items: [
      {
        time: "06:00",
        title: "เช็กเอาท์ + ออกจาก Rilong",
        note: "เช็กสภาพถนน/หิมะ, เติมน้ำมันเต็มถัง",
      },
      {
        time: "06:30",
        title: "เดินทาง Rilong → Bipenggou (~4-5 ชม.)",
        note: "เส้นทางผ่าน Li County, จัดเตรียมอาหารกลางทาง",
      },
      {
        time: "10:30–13:30",
        title: "เที่ยว Bipenggou National Forest Park",
        note: "ตั๋ว ~150 CNY, Snowmobile +100-200 CNY, ทะเลสาบ/ป่าสน, ถ่ายรูปหิมะ",
      },
      {
        time: "11:30",
        title: "กิจกรรม Snowmobile/Hiking",
        note: "เสื้อกันหนาว, ถุงมือ, รองเท้าเดิน, กล้อง/โทรศัพท์กันน้ำ",
      },
      {
        time: "13:30",
        title: "ลันช์ + เก็บของ",
        note: "ร้านอาหารในปาร์ค หรือ packed lunch",
      },
      {
        time: "14:00–18:00",
        title: "เดินทางกลับเฉิงตู",
        note: "แวะพัก Li County, เช็คเวลาบิน, คืนรถเช่า",
      },
      {
        time: "18:30",
        title: "ไปสนามบินเฉิงตู CTU",
        note: "เผื่อเวลารถติด + เช็กอิน 2 ชม.",
      },
      {
        time: "20:00",
        title: "เที่ยวบิน CTU → PVG Shanghai",
        note: "ตั๋วราคา ~500-800 CNY, ใช้เวลาบิน ~2.5 ชม.",
      },
      {
        time: "23:30",
        title: "ถึงเซี่ยงไฮ้ Pudong Airport → เข้าเมือง",
        note: "Maglev Train หรือ Metro Line 2, เช็กอิน Lintin Hotel/Meego Hostel",
      },
    ],
  },
  {
    date: "จันทร์ 8 ธ.ค.",
    city: "เที่ยวเมืองเซี่ยงไฮ้",
    icon: <BuildingIcon />,
    items: [
      {
        time: "09:00",
        title: "อาหารเช้า + เตรียมตัว",
        note: "Soy milk + Youtiao (ปาทองโก้จีน) ตามร้านริมทาง",
      },
      {
        time: "10:00–12:00",
        title: "The Bund + Huangpu River",
        note: "ถ่ายรูปสกายไลน์, เดิน Nanjing Road, วิวตึกเก่า vs ใหม่",
      },
      {
        time: "12:30",
        title: "ลันช์ Jia Jia Tang Bao (Xiao Long Bao)",
        note: "ร้านดัง ~30-50 CNY/คน, คิวยาว แต่คุ้มค่า",
      },
      {
        time: "14:00–16:00",
        title: "Yu Garden + Old City",
        note: "ตั๋ว ~40 CNY, สวนจีนโบราณ, ซื้อของฝาก, ชาจีน",
      },
      {
        time: "16:30",
        title: "คาเฟ่พักผ่อน หรือ Massage",
        note: "เตรียมพลังสำหรับวันพรุ่งนี้ที่ Disneyland",
      },
      {
        time: "18:00",
        title: "ดินเนอร์ Yang's Fried Dumpling",
        note: "ถูกและอร่อย ~20-30 CNY/คน",
      },
      {
        time: "19:30",
        title: "เดิน Xintiandi + French Concession",
        note: "บาร์, ไนท์ไลฟ์, สถาปัตยกรรมยุโรป",
      },
      {
        time: "21:00",
        title: "กลับที่พัก + เตรียมของสำหรับ Disneyland",
        note: "รองเท้าสบาย, เสื้อกันหนาว, Power bank, น้ำ",
      },
    ],
  },
  {
    date: "อังคาร 9 ธ.ค.",
    city: "Shanghai Disneyland (เต็มวัน)",
    icon: <CastleIcon />,
    items: [
      {
        time: "07:00",
        title: "อาหารเช้าที่โรงแรม + ออกเดินทาง",
        note: "เตรียมของใช้: ตั๋ว, Passport, น้ำ, Power bank, กล้อง",
      },
      {
        time: "08:00",
        title: "Metro → Shanghai Disneyland Station",
        note: "Line 11 สุดท้าย, ใช้เวลา ~1 ชม. จากเมือง",
      },
      {
        time: "09:00",
        title: "เข้า Shanghai Disneyland",
        note: "เปิด 09:00 (เช็คเวลาอัพเดต), ซื้อ Genie+ ถ้าจำเป็น",
      },
      {
        time: "09:15",
        title: "Tron Lightcycle (เครื่องเล่นฮิตที่สุด)",
        note: "วิ่งตรงไป หรือใช้ Lightning Lane, ระวังความสูง 122cm",
      },
      {
        time: "10:00",
        title: "Pirates of the Caribbean + Adventure Isle",
        note: "เครื่องเล่นยอดฮิต, จัดลำดับตาม queue time",
      },
      {
        time: "12:00",
        title: "ลันช์ใน Disney",
        note: "ร้านใน park ~100-200 CNY/คน หรือ นำอาหารเข้าได้",
      },
      {
        time: "13:00–15:00",
        title: "Frozen, Zootopia, Peter Pan",
        note: "เลือกตาม queue + สนใจ, ถ่ายรูปกับ character",
      },
      {
        time: "15:30",
        title: "Shopping Disney Store",
        note: "ของที่ระลึก, Mickey ears, ตุ๊กตา ~100-500 CNY",
      },
      {
        time: "17:00",
        title: "Parade + Castle Show",
        note: "หาจุดชมดี ๆ เพื่อถ่ายรูป",
      },
      {
        time: "19:00",
        title: "ดินเนอร์ + เครื่องเล่นที่เหลือ",
        note: "ใช้เวลาค่ำ queue สั้นลง",
      },
      {
        time: "21:00",
        title: "Fireworks Show (ไฮไลท์)",
        note: "หาจุดยืนตรงปราสาท ~30 นาทีก่อน",
      },
      {
        time: "22:00",
        title: "กลับโรงแรม",
        note: "Metro หรือ Didi, จราจรหนาแน่น",
      },
    ],
  },
  {
    date: "พุธ 10 ธ.ค.",
    city: "เดินทางกลับไทย",
    icon: <Plane className="w-4 h-4" />,
    items: [
      {
        time: "08:00",
        title: "เช็กเอาท์ + เก็บกระเป๋า",
        note: "ดูเวลาเที่ยวบิน, คำนวณเวลาไปสนามบิน",
      },
      {
        time: "09:00–11:00",
        title: "ช้อปปิ้งของฝากสุดท้าย",
        note: "Nanjing Road, ชา, ขนม, เสื้อผ้า, อิเลคทรอนิกส์",
      },
      {
        time: "11:30",
        title: "ลันช์ Din Tai Fung Xintiandi",
        note: "ร้านสุดท้าย Xiao Long Bao ดัง ~80-120 CNY/คน",
      },
      {
        time: "13:00",
        title: "รับกระเป๋า + ออกไปสนามบิน Pudong",
        note: "Maglev Train (8 นาที) หรือ Metro Line 2 (1 ชม.)",
      },
      {
        time: "15:00",
        title: "เช็กอิน + Tax Refund (ถ้ามี)",
        note: "เช็กอินล่วงหน้า 3 ชม., เก็บใบเสร็จสำหรับ tax refund",
      },
      {
        time: "17:00",
        title: "เที่ยวบิน PVG → BKK",
        note: "ระยะเวลาบิน ~3-4 ชม. + ต่างเวลา 1 ชม.",
      },
      {
        time: "21:00",
        title: "ถึงไทย ความทรงจำดี ๆ",
        note: "ผ่านตรวจคนเข้าเมือง, รับกระเป๋า, กลับบ้านปลอดภัย",
      },
    ],
  },
];

// ICS generator
function makeICS() {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//RoadTrip China//EN",
  ];
  const tz = "Asia/Bangkok";
  itinerary.forEach((day, idx) => {
    day.items.forEach((it, j) => {
      const timeStr = it.time;
      const hasClock = /^\d{1,2}:\d{2}(–\d{1,2}:\d{2})?$/.test(timeStr);
      if (!hasClock) return;
      const [start, end] = timeStr.split("–");
      const baseDay = 5 + idx;
      const pad = (n: number) => String(n).padStart(2, "0");
      const startDate = `2025${pad(12)}${pad(baseDay)}T${start.replace(
        ":",
        ""
      )}00`;
      const endDate = end
        ? `2025${pad(12)}${pad(baseDay)}T${end.replace(":", "")}00`
        : `2025${pad(12)}${pad(baseDay)}T${start.replace(":", "")}00`;
      lines.push(
        "BEGIN:VEVENT",
        `UID:${idx}-${j}@roadtrip-china`,
        `DTSTAMP:20250101T000000Z`,
        `DTSTART;TZID=${tz}:${startDate}`,
        `DTEND;TZID=${tz}:${endDate}`,
        `SUMMARY:${day.city} — ${it.title}`,
        `DESCRIPTION:${it.note || ""}`,
        "END:VEVENT"
      );
    });
  });
  lines.push("END:VCALENDAR");
  const blob = new Blob([lines.join("\r\n")], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "RoadTrip-China-Dec.ics";
  a.click();
  URL.revokeObjectURL(url);
}

// Main Component
export default function ChinaTripItinerary() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return places;
    return places.filter((p) =>
      (p.city + " " + p.name + " " + p.type).toLowerCase().includes(s)
    );
  }, [q]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-slate-800">
      <header className="sticky top-0 z-10 backdrop-blur bg-gradient-to-r from-red-500/90 via-orange-500/90 to-amber-500/90 border-b border-orange-200 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <Plane className="w-6 h-6" />
            </motion.div>
            <h1 className="text-xl sm:text-2xl font-bold">
              แผนการเที่ยวเมืองจีน
            </h1>
          </div>
          <div className="hidden sm:flex gap-2">
  <Button 
    onClick={makeICS} 
    className="rounded-2xl shadow-lg bg-white text-red-600 hover:bg-red-50 border-2 border-white"
  >
    <CalendarPlus className="w-4 h-4 mr-2"/> ดาวน์โหลด .ICS
  </Button>

  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button className="rounded-2xl shadow-lg bg-white text-blue-600 hover:bg-blue-50 border-2 border-white">
        <ExternalLink className="w-4 h-4 mr-2"/> ประกันเดินทาง PDF
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      {[
        { name: "ต้อม", file: "/SOONTONSIN.pdf" },
        { name: "เชลล์", file: "/SURADACH.pdf" },
        { name: "นุ้ย", file: "/RUTTANACHOT.pdf" },
        { name: "บีม", file: "/PHUMARAT.pdf" },
        { name: "สปาย", file: "/CHANAPA.pdf" },
        { name: "พลอย", file: "/DUANGPORN.pdf" },
      ].map((p, i) => (
        <DropdownMenuItem key={i} onClick={() => window.open(p.file, "_blank")}>
          {p.name}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
</div>

{/* Mobile buttons */}
<div className="flex sm:hidden gap-2">
  <Button 
    onClick={makeICS} 
    size="icon"
    className="rounded-full shadow-lg bg-white text-red-600 hover:bg-red-50 border-2 border-white"
  >
    <CalendarPlus className="w-5 h-5" />
  </Button>

  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button size="icon" className="rounded-full shadow-lg bg-white text-blue-600 hover:bg-blue-50 border-2 border-white">
        <ExternalLink className="w-5 h-5" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      {[
        { name: "ต้อม", file: "/SOONTONSIN.pdf" },
        { name: "เชลล์", file: "/SURADACH.pdf" },
        { name: "นุ้ย", file: "/RUTTANACHOT.pdf" },
        { name: "บีม", file: "/PHUMARAT.pdf" },
        { name: "สปาย", file: "/CHANAPA.pdf" },
        { name: "พลอย", file: "/DUANGPORN.pdf" },
      ].map((p, i) => (
        <DropdownMenuItem key={i} onClick={() => window.open(p.file, "_blank")}>
          {p.name}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
</div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 space-y-8">
        {/* Itinerary Section */}
        <section>
          <div className="grid md:grid-cols-2 gap-4">
            {itinerary.map((day, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`rounded-2xl shadow-lg border-0 bg-gradient-to-br ${
                    idx % 3 === 0
                      ? "from-emerald-100 to-teal-100"
                      : idx % 3 === 1
                      ? "from-blue-100 to-indigo-100"
                      : "from-purple-100 to-pink-100"
                  } hover:shadow-xl transition-all duration-300`}
                >
                  <CardHeader className="pb-2">
                    <CardTitle
                      className={`flex items-center gap-2 text-lg ${
                        idx % 3 === 0
                          ? "text-emerald-800"
                          : idx % 3 === 1
                          ? "text-blue-800"
                          : "text-purple-800"
                      }`}
                    >
                      <span
                        className={`p-2 rounded-full ${
                          idx % 3 === 0
                            ? "bg-emerald-200 text-emerald-700"
                            : idx % 3 === 1
                            ? "bg-blue-200 text-blue-700"
                            : "bg-purple-200 text-purple-700"
                        }`}
                      >
                        {day.icon}
                      </span>
                      <span>
                        {day.date} · {day.city}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {day.items.map((it, j) => (
                      <div
                        key={j}
                        className="flex gap-3 items-start p-3 rounded-xl bg-white/50 backdrop-blur border border-white/30"
                      >
                        <Clock
                          className={`w-4 h-4 mt-0.5 shrink-0 ${
                            idx % 3 === 0
                              ? "text-emerald-600"
                              : idx % 3 === 1
                              ? "text-blue-600"
                              : "text-purple-600"
                          }`}
                        />
                        <div>
                          <div className="font-medium text-slate-800">
                            {it.time} — {it.title}
                          </div>
                          {it.note && (
                            <div className="text-sm text-slate-600 mt-1">
                              {it.note}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 sm:hidden">
            <Button
              onClick={makeICS}
              className="w-full rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white shadow-lg"
            >
              <CalendarPlus className="w-4 h-4 mr-2" />
              ดาวน์โหลด .ICS
            </Button>
          </div>
        </section>

        {/* Maps & Places */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl border-l-4 border-amber-500">
            <MapPin className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl font-semibold text-amber-800">
              พิกัดกิน-เที่ยวแนะนำ
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <Input
              placeholder="ค้นหาเมือง/ร้าน/ประเภท… (เช่น Chengdu, Hotpot, Xiao Long Bao)"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="rounded-2xl border-2 border-amber-200 focus:border-amber-400 bg-white shadow-sm"
            />
          </div>

          <Tabs defaultValue="Chengdu" className="w-full">
            <TabsList className="grid grid-cols-4 md:w-auto md:inline-grid md:grid-flow-col gap-2 rounded-2xl bg-gradient-to-r from-red-100 to-orange-100 p-1">
              {["Chengdu", "Rilong", "Li County", "Shanghai"].map((c, i) => (
                <TabsTrigger
                  key={c}
                  value={c}
                  className={`rounded-2xl px-4 font-medium transition-all duration-300 ${
                    i === 0
                      ? "data-[state=active]:bg-red-500 data-[state=active]:text-white"
                      : i === 1
                      ? "data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
                      : i === 2
                      ? "data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                      : "data-[state=active]:bg-purple-500 data-[state=active]:text-white"
                  }`}
                >
                  {c}
                </TabsTrigger>
              ))}
            </TabsList>

            {["Chengdu", "Rilong", "Li County", "Shanghai"].map(
              (city, cityIdx) => (
                <TabsContent key={city} value={city} className="mt-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    {filtered
                      .filter((p) => p.city === city)
                      .map((p, i) => (
                        <Card
                          key={p.name + i}
                          className={`rounded-2xl overflow-hidden shadow-lg border-0 bg-gradient-to-br hover:shadow-xl transition-all duration-300 ${
                            cityIdx === 0
                              ? "from-red-50 to-orange-50 border-l-4 border-red-400"
                              : cityIdx === 1
                              ? "from-emerald-50 to-teal-50 border-l-4 border-emerald-400"
                              : cityIdx === 2
                              ? "from-blue-50 to-indigo-50 border-l-4 border-blue-400"
                              : "from-purple-50 to-pink-50 border-l-4 border-purple-400"
                          }`}
                        >
                          <CardHeader className="pb-2">
                            <CardTitle
                              className={`text-lg flex items-center gap-2 ${
                                cityIdx === 0
                                  ? "text-red-700"
                                  : cityIdx === 1
                                  ? "text-emerald-700"
                                  : cityIdx === 2
                                  ? "text-blue-700"
                                  : "text-purple-700"
                              }`}
                            >
                              <Utensils
                                className={`w-4 h-4 p-1 rounded-full ${
                                  cityIdx === 0
                                    ? "bg-red-200 text-red-600"
                                    : cityIdx === 1
                                    ? "bg-emerald-200 text-emerald-600"
                                    : cityIdx === 2
                                    ? "bg-blue-200 text-blue-600"
                                    : "bg-purple-200 text-purple-600"
                                }`}
                              />
                              {p.name}
                            </CardTitle>
                            <div className="text-sm text-slate-600 font-medium">
                              {p.type}
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="w-full aspect-video rounded-xl overflow-hidden border-2 border-white shadow-md">
                              <iframe
                                title={p.name}
                                src={p.maps}
                                className="w-full h-full"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                              />
                            </div>
                            <div className="flex justify-end">
                              <Button
                                variant="outline"
                                className={`rounded-xl shadow-sm border-2 font-medium transition-all duration-300 ${
                                  cityIdx === 0
                                    ? "border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
                                    : cityIdx === 1
                                    ? "border-emerald-300 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-400"
                                    : cityIdx === 2
                                    ? "border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400"
                                    : "border-purple-300 text-purple-600 hover:bg-purple-50 hover:border-purple-400"
                                }`}
                                asChild
                              >
                                <a
                                  href={p.link || p.maps.replace("/embed", "")}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  เปิดใน Google Maps{" "}
                                  <ExternalLink className="w-4 h-4 ml-2" />
                                </a>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
              )
            )}
          </Tabs>
        </section>

        {/* Hotels */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-teal-100 to-blue-100 rounded-2xl border-l-4 border-teal-500">
            <Hotel className="w-5 h-5 text-teal-600" />
            <h2 className="text-xl font-semibold text-teal-800">
              ที่พักตามงบประมาณ
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {hotels.map((h, i) => (
              <Card
                key={i}
                className={`rounded-2xl shadow-lg border-0 bg-gradient-to-br hover:shadow-xl transition-all duration-300 ${
                  i % 4 === 0
                    ? "from-cyan-50 to-blue-50 border-l-4 border-cyan-400"
                    : i % 4 === 1
                    ? "from-teal-50 to-emerald-50 border-l-4 border-teal-400"
                    : i % 4 === 2
                    ? "from-indigo-50 to-purple-50 border-l-4 border-indigo-400"
                    : "from-pink-50 to-rose-50 border-l-4 border-pink-400"
                }`}
              >
                <CardHeader className="pb-1">
                  <CardTitle
                    className={`text-lg ${
                      i % 4 === 0
                        ? "text-cyan-700"
                        : i % 4 === 1
                        ? "text-teal-700"
                        : i % 4 === 2
                        ? "text-indigo-700"
                        : "text-pink-700"
                    }`}
                  >
                    {h.name}
                  </CardTitle>
                  <div className="text-sm text-slate-600 font-medium">
                    {h.city} · {h.price}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="w-full aspect-video rounded-xl overflow-hidden border-2 border-white shadow-md">
                    <iframe
                      title={h.name}
                      src={h.maps}
                      className="w-full h-full"
                      loading="lazy"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Budget Planning - UPDATED WITH ACCURATE PRICES */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl border-l-4 border-green-500">
            <span className="text-2xl">💰</span>
            <h2 className="text-xl font-semibold text-green-800">
              งบประมาณรายละเอียด (ต่อคน) - อัพเดต 2025
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="rounded-2xl shadow-lg border-0 bg-gradient-to-br from-red-50 to-orange-50 border-l-4 border-red-400">
              <CardHeader>
                <CardTitle className="text-red-700 flex items-center gap-2">
                  <Plane className="w-5 h-5 text-red-600" />
                  การเดินทาง
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between p-2 bg-white/60 rounded">
                  <span>✈️ ตั๋วเครื่องบิน BKK-CTU-PVG-BKK</span>
                  <span className="font-medium text-red-700">
                    15,000-25,000฿
                  </span>
                </div>
                <div className="flex justify-between p-2 bg-white/60 rounded">
                  <span>✈️ เที่ยวบินภายใน CTU→PVG</span>
                  <div className="text-right">
                    <span className="font-medium text-red-700">
                      2,500-4,000฿
                    </span>
                    <div className="text-xs text-gray-500">~500-800 CNY</div>
                  </div>
                </div>
                <div className="flex justify-between p-2 bg-white/60 rounded">
                  <span>🚗 รถเช่า + คนขับ (2 วัน)</span>
                  <span className="font-medium">8,000-12,000฿</span>
                </div>
                <div className="flex justify-between p-2 bg-white/60 rounded">
                  <span>🚇 รถไฟ/แท็กซี่ในเมือง</span>
                  <span className="font-medium">1,500-3,000฿</span>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg border-0 bg-gradient-to-br from-blue-50 to-cyan-50 border-l-4 border-blue-400">
              <CardHeader>
                <CardTitle className="text-blue-700 flex items-center gap-2">
                  <Hotel className="w-5 h-5 text-blue-600" />
                  ที่พัก
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between p-2 bg-white/60 rounded">
                  <span>🏨 เฉิงตู (2 คืน)</span>
                  <div className="text-right">
                    <span className="font-medium">2,000-3,500฿</span>
                    <div className="text-xs text-gray-500">
                      Budget - Mid-range
                    </div>
                  </div>
                </div>
                <div className="flex justify-between p-2 bg-white/60 rounded">
                  <span>🏔️ Rilong เกสต์เฮาส์ (1 คืน)</span>
                  <span className="font-medium">1,200-1,800฿</span>
                </div>
                <div className="flex justify-between p-2 bg-white/60 rounded">
                  <span>🏨 เซี่ยงไฮ้ (2 คืน)</span>
                  <span className="font-medium">2,500-4,000฿</span>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg border-0 bg-gradient-to-br from-amber-50 to-yellow-50 border-l-4 border-amber-400">
              <CardHeader>
                <CardTitle className="text-amber-700 flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-amber-600" />
                  อาหาร (6 วัน)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between p-2 bg-white/60 rounded">
                  <span>🍜 อาหารเช้า (เฉลี่ย 15-30 CNY)</span>
                  <span className="font-medium">600-1,200฿</span>
                </div>
                <div className="flex justify-between p-2 bg-white/60 rounded">
                  <span>🥘 กลางวัน + เย็น (80-150 CNY/มื้อ)</span>
                  <span className="font-medium">5,500-10,000฿</span>
                </div>
                <div className="flex justify-between p-2 bg-white/60 rounded">
                  <span>🧋 เครื่องดื่ม + ขนม</span>
                  <span className="font-medium">800-1,500฿</span>
                </div>
                <div className="text-xs p-2 bg-amber-100 rounded mt-2">
                  <strong>💡 ตัวอย่างราคา:</strong> Hotpot เสฉวน ~150-200
                  CNY/คน, Xiao Long Bao ~30-50 CNY/คน
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg border-0 bg-gradient-to-br from-purple-50 to-pink-50 border-l-4 border-purple-400">
              <CardHeader>
                <CardTitle className="text-purple-700 flex items-center gap-2">
                  <span className="text-lg">🎢</span>
                  กิจกรรม + สถานที่
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between p-2 bg-white/60 rounded">
                  <span>🎫 Shanghai Disneyland</span>
                  <div className="text-right">
                    <span className="font-medium text-purple-700">
                      2,000-3,500฿
                    </span>
                    <div className="text-xs text-gray-500">475-799 CNY</div>
                  </div>
                </div>
                <div className="flex justify-between p-2 bg-white/60 rounded">
                  <span>🐼 Panda Base เฉิงตู</span>
                  <div className="text-right">
                    <span className="font-medium">250฿</span>
                    <div className="text-xs text-gray-500">55 CNY</div>
                  </div>
                </div>
                <div className="flex justify-between p-2 bg-white/60 rounded">
                  <span>🏔️ Changping Valley</span>
                  <div className="text-right">
                    <span className="font-medium">350฿</span>
                    <div className="text-xs text-gray-500">70 CNY + รถม้า</div>
                  </div>
                </div>
                <div className="flex justify-between p-2 bg-white/60 rounded">
                  <span>❄️ Bipenggou + Snowmobile</span>
                  <div className="text-right">
                    <span className="font-medium">1,200-1,800฿</span>
                    <div className="text-xs text-gray-500">250-350 CNY</div>
                  </div>
                </div>
                <div className="flex justify-between p-2 bg-white/60 rounded">
                  <span>🏛️ Yu Garden Shanghai</span>
                  <div className="text-right">
                    <span className="font-medium">180฿</span>
                    <div className="text-xs text-gray-500">40 CNY</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="rounded-2xl shadow-lg border-0 bg-gradient-to-r from-green-400 to-emerald-400 text-white">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">
                  รวมทั้งหมด: 20,000 - 30,000 บาท/คน
                </div>
                <div className="text-sm opacity-90 mb-4">
                  *ไม่รวมของฝาก และค่าใช้จ่ายส่วนตัว
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white/20 p-3 rounded-xl">
                    <div className="font-bold">งบ Budget</div>
                    <div>20,000-30,000฿</div>
                  </div>
                  <div className="bg-white/20 p-3 rounded-xl">
                    <div className="font-bold">งบ Comfortable</div>
                    <div>35,000-55,000฿</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Price Breakdown */}
          <Card className="rounded-2xl shadow-lg border-0 bg-gradient-to-br from-teal-50 to-cyan-50 border-l-4 border-teal-400">
            <CardHeader>
              <CardTitle className="text-teal-700 flex items-center gap-2">
                <span className="text-lg">🧮</span>
                ราคารายละเอียดเพิ่มเติม
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="bg-white p-4 rounded-xl space-y-2">
                <h4 className="font-bold text-teal-700 mb-2">
                  💴 อัตราแลกเปลี่ยน (ประมาณ)
                </h4>
                <div className="text-xs space-y-1">
                  <div>• 1 CNY = 4.8-5.2 บาท (ขึ้นอยู่กับวันที่แลก)</div>
                  <div>• แนะนำเตรียมเงินสด 3,000-5,000 CNY</div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl space-y-2">
                <h4 className="font-bold text-red-600 mb-2">
                  🎫 Shanghai Disneyland ราคาแบบละเอียด
                </h4>
                <div className="text-xs space-y-1">
                  <div>
                    • <strong>Regular Days:</strong> 475 CNY (~2,400฿)
                  </div>
                  <div>
                    • <strong>Peak Days:</strong> 599-719 CNY (~3,000-3,600฿)
                  </div>
                  <div>
                    • <strong>Super Peak:</strong> 799 CNY (~4,000฿)
                  </div>
                  <div>
                    • <strong>Early Bird (10-30 วันก่อน):</strong> ลด 60 CNY
                  </div>
                  <div>
                    • <strong>เด็ก 3-11 ปี:</strong> ลด 25% จากราคาผู้ใหญ่
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl space-y-2">
                <h4 className="font-bold text-blue-600 mb-2">
                  ✈️ เที่ยวบินเฉิงตู-เซี่ยงไฮ้
                </h4>
                <div className="text-xs space-y-1">
                  <div>
                    • <strong>ราคาปกติ:</strong> 500-800 CNY (~2,500-4,000฿)
                  </div>
                  <div>
                    • <strong>สายการบินแนะนำ:</strong> Air China, China Eastern,
                    Sichuan Airlines
                  </div>
                  <div>
                    • <strong>เวลาบิน:</strong> 2 ชม. 45 นาที
                  </div>
                  <div>
                    • <strong>ความถี่:</strong> 100+ เที่ยวบิน/สัปดาห์
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Packing Checklist */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl border-l-4 border-purple-500">
            <span className="text-2xl">🧳</span>
            <h2 className="text-xl font-semibold text-purple-800">
              Packing Checklist
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <Card className="rounded-2xl shadow-lg border-0 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-purple-700 text-lg">
                  📄 เอกสาร
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-1">
                <div className="flex items-center gap-2 p-2 bg-white/60 rounded">
                  <span>✅</span> <span>Passport (เหลือ {">"} 6 เดือน)</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-white/60 rounded">
                  <span>✅</span> <span>วีซ่าจีน</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-white/60 rounded">
                  <span>✅</span> <span>ตั๋วเครื่องบิน (PDF + Print)</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-white/60 rounded">
                  <span>✅</span> <span>ใบจองโรงแรม</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-white/60 rounded">
                  <span>✅</span> <span>ประกันเดินทาง</span>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-blue-700 text-lg">
                  👕 เสื้อผ้า
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-1">
                <div className="flex items-center gap-2 p-2 bg-white/60 rounded">
                  <span>🧥</span> <span>เสื้อกันหนาวหนา (Bipenggou)</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-white/60 rounded">
                  <span>👖</span> <span>กางเกงขายาว กันลม</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-white/60 rounded">
                  <span>🧤</span> <span>ถุงมือ + หมวกกันหนาว</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-white/60 rounded">
                  <span>👟</span> <span>รองเท้าเดิน กันน้ำ</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-white/60 rounded">
                  <span>🧦</span> <span>ถุงเท้าหนา + ชุดใน</span>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg border-0 bg-gradient-to-br from-emerald-50 to-teal-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-emerald-700 text-lg">
                  📱 อุปกรณ์
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-1">
                <div className="flex items-center gap-2 p-2 bg-white/60 rounded">
                  <span>🔋</span> <span>Power bank ขนาดใหญ่</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-white/60 rounded">
                  <span>📷</span> <span>กล้อง/โทรศัพท์ กันน้ำ</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-white/60 rounded">
                  <span>🔌</span> <span>ปลั๊กแปลง (Type A, C, I)</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-white/60 rounded">
                  <span>💊</span> <span>ยาส่วนตัว + ยาแก้ปวดหัว</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-white/60 rounded">
                  <span>💧</span> <span>กระติกน้ำ + ลิปบาล์ม</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Emergency Contacts */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-red-100 to-orange-100 rounded-2xl border-l-4 border-red-500">
            <span className="text-2xl">🚨</span>
            <h2 className="text-xl font-semibold text-red-800">
              หมายเลขฉุกเฉิน + แอปสำคัญ
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="rounded-2xl shadow-lg border-0 bg-gradient-to-br from-red-50 to-pink-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-red-700 text-lg flex items-center gap-2">
                  <span>📞</span> เบอร์ฉุกเฉิน
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div className="p-3 bg-white/60 rounded-xl border border-red-200">
                  <div className="font-bold text-red-700">🚨 ตำรวจ: 110</div>
                  <div className="font-bold text-red-700">🚑 รถพยาบาล: 120</div>
                  <div className="font-bold text-red-700">🔥 ดับเพลิง: 119</div>
                </div>
                <div className="p-3 bg-white/60 rounded-xl">
                  <div className="font-medium">🇹🇭 สถานทูตไทยปักกิ่ง</div>
                  <div>+86-10-8531-8729</div>
                </div>
                <div className="p-3 bg-white/60 rounded-xl">
                  <div className="font-medium">🇹🇭 สถานกงสุลเซี่ยงไฮ้</div>
                  <div>+86-21-5260-9899</div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-blue-700 text-lg flex items-center gap-2">
                  <span>📱</span> แอปจำเป็น
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div className="p-2 bg-white/60 rounded flex justify-between items-center">
                  <span>
                    💬 <strong>WeChat</strong>
                  </span>
                  <span className="text-xs bg-green-100 px-2 py-1 rounded">
                    Payment + Chat
                  </span>
                </div>
                <div className="p-2 bg-white/60 rounded flex justify-between items-center">
                  <span>
                    💰 <strong>Alipay</strong>
                  </span>
                  <span className="text-xs bg-blue-100 px-2 py-1 rounded">
                    Payment
                  </span>
                </div>
                <div className="p-2 bg-white/60 rounded flex justify-between items-center">
                  <span>
                    🚗 <strong>Didi</strong>
                  </span>
                  <span className="text-xs bg-yellow-100 px-2 py-1 rounded">
                    Taxi
                  </span>
                </div>
                <div className="p-2 bg-white/60 rounded flex justify-between items-center">
                  <span>
                    🗺️ <strong>Baidu Maps</strong>
                  </span>
                  <span className="text-xs bg-purple-100 px-2 py-1 rounded">
                    Navigation
                  </span>
                </div>
                <div className="p-2 bg-white/60 rounded flex justify-between items-center">
                  <span>
                    🛡️ <strong>VPN</strong>
                  </span>
                  <span className="text-xs bg-red-100 px-2 py-1 rounded">
                    Google Services
                  </span>
                </div>
                <div className="p-2 bg-white/60 rounded flex justify-between items-center">
                  <span>
                    🌦️ <strong>Weather App</strong>
                  </span>
                  <span className="text-xs bg-teal-100 px-2 py-1 rounded">
                    Mountain Forecast
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Tips */}
        <section className="space-y-4">
          <Card className="rounded-2xl border-0 bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 shadow-lg border-l-4 border-amber-400">
            <CardHeader>
              <CardTitle className="text-amber-800 flex items-center gap-2">
                <span className="p-2 bg-amber-200 text-amber-700 rounded-full">
                  💡
                </span>
                ทิปสำคัญระหว่างทาง
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-700">
              <ul className="list-none space-y-3">
                <li className="flex items-start gap-3 p-3 bg-white/60 rounded-xl border border-red-200">
                  <span className="text-red-600 font-bold">🎫</span>
                  <div>
                    <strong>ซื้อตั๋ว Shanghai Disneyland ล่วงหน้า!</strong>
                    <div className="text-xs mt-1">
                      Official Disney site, Klook, หรือ KKday ~2,000-2,800฿
                      (หลีกเลี่ยงรอคิว + ราคาแพงที่หน้างาน)
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 bg-white/60 rounded-xl border border-blue-200">
                  <span className="text-blue-600 font-bold">📱</span>
                  <div>
                    <strong>
                      เตรียมแอปจำเป็น: WeChat, Alipay, Didi, Baidu Maps
                    </strong>
                    <div className="text-xs mt-1">
                      ผูกบัตรเครดิต/เดบิต ล่วงหน้า + VPN เพื่อใช้ Google
                      Services
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 bg-white/60 rounded-xl border border-amber-200">
                  <span className="text-amber-600 font-bold">💰</span>
                  <span>
                    เตรียมเงินสดจีน ~3,000-5,000 CNY (ภูเขาบางร้านรับแค่เงินสด)
                  </span>
                </li>
                <li className="flex items-start gap-3 p-3 bg-white/60 rounded-xl border border-emerald-200">
                  <span className="text-emerald-600 font-bold">🏔️</span>
                  <div>
                    <strong>
                      เขตสูง Rilong ~3,000m: ดื่มน้ำบ่อย ๆ เดินช้า ๆ
                    </strong>
                    <div className="text-xs mt-1">
                      หลีกเลี่ยงแอลกอฮอล์ วันแรก, นำยาแก้ปวดหัว/คลื่นไส้
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 bg-white/60 rounded-xl border border-purple-200">
                  <span className="text-purple-600 font-bold">🛣️</span>
                  <div>
                    <strong>เช็คสภาพอากาศ Balang Shan ก่อนไป</strong>
                    <div className="text-xs mt-1">
                      ช่วงหน้าหนาวอาจมีหิมะหนัก/ปิดถนนชั่วคราว ต้องมีแผน B
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 bg-white/60 rounded-xl border border-orange-200">
                  <span className="text-orange-600 font-bold">🌶️</span>
                  <span>
                    Hotpot เฉิงตูเผ็ดมาก! สั่งหม้อสองน้ำซุป (เผ็ด + ไม่เผ็ด) +
                    นมเย็น
                  </span>
                </li>
                <li className="flex items-start gap-3 p-3 bg-white/60 rounded-xl border border-teal-200">
                  <span className="text-teal-600 font-bold">📄</span>
                  <div>
                    <strong>
                      เอกสารสำคัญ: Passport ({">"}6 เดือน), วีซ่าจีน,
                      ตั๋วเครื่องบิน
                    </strong>
                    <div className="text-xs mt-1">
                      ถ่ายสำเนาเก็บแยก + เซฟไฟล์ใน Cloud
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 bg-white/60 rounded-xl border border-pink-200">
                  <span className="text-pink-600 font-bold">🧳</span>
                  <div>
                    <strong>
                      ของจำเป็น: เสื้อกันหนาว, รองเท้าเดิน, Power bank, ยา
                    </strong>
                    <div className="text-xs mt-1">
                      Bipenggou อุณหภูมิติดลบ, Disney เดินเยอะ, โรงพยาบาลไกล
                    </div>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <footer className="py-10 text-center text-sm bg-gradient-to-r from-slate-100 to-slate-200 rounded-2xl mt-8">
          <div className="text-slate-600">
            © {new Date().getFullYear()} Road Trip China ·
            จัดทำเพื่อการวางแผนทริป
          </div>
          <div className="text-xs text-slate-500 mt-2">
            🇨🇳 เที่ยวจีนอย่างมีสไตล์ · สนุก และ มีความทรงจำ 🎋
          </div>
        </footer>
      </main>
    </div>
  );
}
