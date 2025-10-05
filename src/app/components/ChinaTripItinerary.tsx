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
  // --- Chengdu ---
  {
    city: "Chengdu",
    name: "Chengdu Research Base of Giant Panda Breeding",
    type: "สถานที่เที่ยว",
    maps: "https://www.google.com/maps?q=Chengdu+Research+Base+of+Giant+Panda+Breeding&output=embed",
    link: "https://goo.gl/maps/FRaJcqKuCL19rZxC6",
  },
  {
    city: "Chengdu",
    name: "Jinli Ancient Street",
    type: "ถนนโบราณ / Street Food",
    maps: "https://www.google.com/maps?q=Jinli+Ancient+Street+Chengdu&output=embed",
    link: "https://goo.gl/maps/Va5GevVjXw62",
  },
  {
    city: "Chengdu",
    name: "Daci Temple (大慈寺)",
    type: "วัดพุทธโบราณ",
    maps: "https://www.google.com/maps?q=Daci+Temple+Chengdu&output=embed",
    link: "https://goo.gl/maps/Uz7fepYhrd7m43gM9",
  },
  {
    city: "Chengdu",
    name: "Chen Mapo Tofu",
    type: "อาหารเสฉวน (Mapo Tofu)",
    maps: "https://www.google.com/maps?q=Chen+Mapo+Tofu+Chengdu&output=embed",
    link: "https://goo.gl/maps/4KNYW2B28YQz3eMo9",
  },
  {
    city: "Chengdu",
    name: "Shu Daxia Hotpot",
    type: "Hotpot เสฉวน",
    maps: "https://www.google.com/maps?q=Shu+Daxia+Hotpot+Chengdu&output=embed",
    link: "https://goo.gl/maps/jPR5Yt7oxN1jvHcb8",
  },


  // --- Rilong / Siguniangshan ---
  {
    city: "Rilong",
    name: "Shuangqiao Valley",
    type: "ธรรมชาติ / หุบเขา",
    maps: "https://www.google.com/maps?q=Shuangqiao+Valley+Siguniangshan&output=embed",
    link: "https://goo.gl/maps/1ebfLbHx5V8hTbpq9",
  },
  {
    city: "Rilong",
    name: "Changping Valley",
    type: "ธรรมชาติ / เดินป่า",
    maps: "https://www.google.com/maps?q=Changping+Valley+Siguniangshan&output=embed",
    link: "https://goo.gl/maps/7Z6q2X8pYvSpPbUf8",
  },
  {
    city: "Rilong",
    name: "Four Girls Mountain Restaurant",
    type: "อาหารทิเบต + เสฉวน",
    maps: "https://www.google.com/maps?q=Four+Girls+Mountain+Restaurant+Rilong&output=embed",
    link: "https://goo.gl/maps/6g6UxSTPgeALPvGJ6",
  },


  // --- Shanghai ---
  {
    city: "Shanghai",
    name: "The Bund (外滩)",
    type: "แลนด์มาร์ก / Skyline",
    maps: "https://www.google.com/maps?q=The+Bund+Shanghai&output=embed",
    link: "https://goo.gl/maps/XtNH2wVXp9u",
  },
  {
    city: "Shanghai",
    name: "Yu Garden (豫园)",
    type: "สวนโบราณ + Bazaar",
    maps: "https://www.google.com/maps?q=Yu+Garden+Shanghai&output=embed",
    link: "https://goo.gl/maps/PMgE4fKq4Z82",
  },
  {
    city: "Shanghai",
    name: "Shanghai Disneyland",
    type: "สวนสนุก",
    maps: "https://www.google.com/maps?q=Shanghai+Disneyland&output=embed",
    link: "https://goo.gl/maps/EeSS3DqL6yK2",
  },
  {
    city: "Shanghai",
    name: "Jia Jia Tang Bao",
    type: "Xiao Long Bao",
    maps: "https://www.google.com/maps?q=Jia+Jia+Tang+Bao+Shanghai&output=embed",
    link: "https://goo.gl/maps/d2kx8SLLuXtCDhBr6",
  },
  {
    city: "Shanghai",
    name: "Yang's Fried Dumpling",
    type: "Sheng Jian Bao",
    maps: "https://www.google.com/maps?q=Yang's+Fried+Dumpling+Shanghai&output=embed",
    link: "https://goo.gl/maps/DGi1s5Gq58mN1VjR6",
  },
  {
    city: "Shanghai",
    name: "Din Tai Fung (Xintiandi)",
    type: "ติ่มซำ",
    maps: "https://www.google.com/maps?q=Din+Tai+Fung+Xintiandi+Shanghai&output=embed",
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
const infographicData = {
Chengdu: {
titleTH: "เฉิงตู",
titleEN: "Chengdu",
items: [
{ th: "วัด Daci (大慈寺)", en: "Daci Temple", note: "เดิน 5-10 นาทีจาก Taikoo Li" },
{ th: "ถนน Jinli", en: "Jinli Ancient Street", note: "แหล่ง street food เก่าแก่" },
{ th: "ฐานเพาะพันธุ์แพนด้า", en: "Panda Base", note: "ควรไปเช้าเพื่อเห็นแพนด้า" },
{ th: "วัด Wenshu", en: "Wenshu Monastery", note: "วัดสงบ ใกล้ Taikoo Li" },
],
},
Siguniang: {
titleTH: "สี่ดรุณี",
titleEN: "Siguniang Shan",
items: [
{ th: "หมู่บ้าน Rilong", en: "Rilong Village", note: "basecamp, ปรับตัวความสูง (~3000m)" },
{ th: "หุบเขา Changping", en: "Changping Valley", note: "เดินป่าเบาๆ 3–4 ชม." },
{ th: "หุบเขา Shuangqiao", en: "Shuangqiao Valley", note: "วิวภูเขาหิมะและธารน้ำ" },
{ th: "Bipenggou (ขับเล่น/หิมะ)", en: "Bipenggou", note: "กิจกรรมหิมะ/รถสโนว์โมบิล (ฤดูหนาว)" },
],
},
Heishui: {
titleTH: "เฮ่ยซุ่ย",
titleEN: "Heishui",
items: [
{ th: "ธารน้ำแข็งต๋ากู่", en: "Dagu Glacier", note: "กระเช้าชมธารน้ำแข็ง" },
{ th: "ตลาดท้องถิ่น", en: "Local Market", note: "ของพื้นเมือง/อาหารทิเบต" },
{ th: "วิวเส้นทาง Balang", en: "Balang Pass views", note: "จุดถ่ายรูประหว่างทาง" },
],
},
Shanghai: {
titleTH: "เซี่ยงไฮ้",
titleEN: "Shanghai",
items: [
{ th: "The Bund (外滩)", en: "The Bund", note: "เส้นขอบฟ้า/ถ่ายภาพตอนเย็น" },
{ th: "Yu Garden (豫园)", en: "Yu Garden", note: "สวนจีนดั้งเดิม + Bazaar" },
{ th: "Shanghai Disneyland", en: "Shanghai Disneyland", note: "ทั้งวัน/ซื้อบัตรล่วงหน้า" },
{ th: "Xintiandi / Nanjing Road", en: "Xintiandi / Nanjing Rd.", note: "ช้อปปิ้ง/คาเฟ่" },
],
},
};
function IconMountain() {
return (
<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 20 L12 4 L22 20 Z" stroke="#0ea5e9" strokeWidth="1.2" fill="#e0f7ff" />
</svg>
);
}
function IconTemple() {
return (
<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="3" y="7" width="18" height="10" stroke="#0284c7" strokeWidth="1.2" fill="#f0fbff" />
<path d="M3 7 L12 3 L21 7" stroke="#0284c7" strokeWidth="1.2" />
</svg>
);
}
function IconPanda() {
return (
<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="12" cy="12" r="9" stroke="#0369a1" strokeWidth="1.2" fill="#e6f7ff" />
<circle cx="9" cy="11" r="1.6" fill="#0369a1" />
<circle cx="15" cy="11" r="1.6" fill="#0369a1" />
</svg>
);
}
function VerticalInfographic({ cityKey }: { cityKey: keyof typeof infographicData }) {
const data = infographicData[cityKey];


return (
<div className="w-full max-w-xs mx-auto bg-white rounded-2xl shadow-lg p-4 border border-sky-100">
<div className="flex items-center gap-3 mb-3">
<div className="p-2 rounded-lg bg-gradient-to-br from-sky-50 to-white border border-sky-100">
{cityKey === 'Chengdu' && <IconPanda />}
{cityKey === 'Siguniang' && <IconMountain />}
{cityKey === 'Heishui' && <IconMountain />}
{cityKey === 'Shanghai' && <IconTemple />}
</div>
<div>
<div className="text-lg font-bold text-sky-700">{data.titleTH}</div>
<div className="text-xs text-sky-400">{data.titleEN}</div>
</div>
</div>


<div className="space-y-2">
{data.items.map((it, i) => (
<div key={i} className="flex gap-3 items-start p-2 rounded-lg bg-gradient-to-r from-white to-sky-50 border border-sky-50">
<div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/60">
{/* small icon */}
{i % 3 === 0 ? (
<svg width="22" height="22" viewBox="0 0 24 24" className="text-sky-500">
<circle cx="12" cy="12" r="9" fill="#e6f7ff" stroke="#0284c7" strokeWidth="1" />
</svg>
) : i % 3 === 1 ? (
<svg width="22" height="22" viewBox="0 0 24 24" className="text-sky-500">
<rect x="3" y="6" width="18" height="12" fill="#f0fbff" stroke="#0284c7" strokeWidth="1" />
</svg>
) : (
<svg width="22" height="22" viewBox="0 0 24 24" className="text-sky-500">
<path d="M2 20 L12 6 L22 20 Z" fill="#e0f7ff" stroke="#0ea5e9" strokeWidth="1" />
</svg>
)}
</div>
<div>
<div className="text-sm font-semibold text-sky-800">{it.th}</div>
<div className="text-xs text-sky-500">{it.en}</div>
<div className="text-xs text-slate-500 mt-1">{it.note}</div>
</div>
</div>
))}
</div>


<div className="mt-4 text-xs text-slate-500">
<strong>Distance / Travel time (est.)</strong>
<div>• Rilong ↔ Heishui: ~4–5 hrs by car</div>
<div>• Heishui ↔ Chengdu: ~3–4 hrs by car</div>
<div>• Chengdu ↔ Shanghai: ~2.5 hrs flight</div>
</div>
</div>
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
    date: "ศุกร์ 5 ธ.ค.",
    city: "Chengdu → Siguniangshan",
    icon: <Plane className="w-4 h-4" />,
    items: [
      {
        time: "12:00",
        title: "เดินทางจาก Chengdu → Siguniangshan",
        note: "รถส่วนตัว ~4-5 ชม. ผ่านภูเขา Balang Shan",
      },
      {
        time: "17:00",
        title: "เช็กอินที่ Changping Inn",
        note: "พักที่ Siguniang Shan 1 คืน",
      },
      {
        time: "18:00",
        title: "เดินเล่นหมู่บ้าน Rilong",
        note: "ชมวิวภูเขาและวิถีชีวิตท้องถิ่น",
      },
      {
        time: "19:00",
        title: "ดินเนอร์ที่ Four Girls Mountain Restaurant",
        note: "อาหารทิเบต + เสฉวนท้องถิ่น",
      },
    ],
  },
  {
    date: "เสาร์ 6 ธ.ค.",
    city: "Siguniangshan → Heishui",
    icon: <Mountain className="w-4 h-4" />,
    items: [
      {
        time: "07:30–12:00",
        title: "เที่ยว Changping Valley (เดินป่า/ถ่ายรูป)",
        note: "หุบเขาสวย มีลำธารและภูเขาหิมะ",
      },
      {
        time: "12:30",
        title: "อาหารกลางวันที่ Rilong",
        note: "แนะนำอาหารทิเบตแบบดั้งเดิม",
      },
      {
        time: "13:00–18:30",
        title: "เดินทางไป Heishui",
        note: "ใช้เวลาประมาณ 4–5 ชม. ระหว่างทางชมวิวหุบเขา",
      },
      {
        time: "19:00",
        title: "เช็กอินที่ Cailin Holiday Manor",
        note: "พักผ่อนที่เมือง Heishui",
      },
    ],
  },
  {
    date: "อาทิตย์ 7 ธ.ค.",
    city: "Heishui → Chengdu",
    icon: <Trees className="w-4 h-4" />,
    items: [
      {
        time: "08:00–12:00",
        title: "เที่ยว Dagu Glacier (Heishui)",
        note: "นั่งกระเช้าชมธารน้ำแข็งและภูเขาหิมะ",
      },
      {
        time: "12:30",
        title: "อาหารกลางวันที่ Heishui",
        note: "อาหารท้องถิ่น เสฉวน",
      },
      {
        time: "14:00–17:00",
        title: "เดินทางกลับ Chengdu",
        note: "ใช้เวลาประมาณ 3–4 ชม.",
      },
      {
        time: "17:00",
        title: "เช็กอินที่โรงแรมชูปิน (Taikoo Li, ถนนชุนซี)",
        note: "พักในเมืองเฉิงตู",
      },
      {
        time: "18:00",
        title: "เยี่ยมชมวัด Daci Temple",
        note: "ใกล้โรงแรม เดินถึงได้",
      },
      {
        time: "19:30",
        title: "ร้านTaode Casseole + เดินเล่น Taikoo Li + ถนนชุนซี",
        note: "อาหารค่ำ + ช้อปปิ้ง",
      },
    ],
  },
  {
    date: "จันทร์ 8 ธ.ค.",
    city: "Chengdu → Shanghai",
    icon: <Plane className="w-4 h-4" />,
    items: [
      {
        time: "08:00–11:00",
        title: "เที่ยว Wenshu Monastery (วัดเจ้าแม่กวนอิม)",
        note: "วัดดังในเฉิงตู บรรยากาศสงบ",
      },
      {
        time: "14:00",
        title: "บิน Chengdu → Shanghai (PVG)",
        note: "เวลาบิน ~2.5 ชม.",
      },
      {
        time: "18:00",
        title: "เดินเล่น The Bund + Nanjing Road",
        note: "วิว skyline, shopping street",
      },
    ],
  },
  {
    date: "อังคาร 9 ธ.ค.",
    city: "Shanghai Disneyland",
    icon: <CastleIcon />,
    items: [
      {
        time: "09:00–21:00",
        title: "Shanghai Disneyland (เต็มวัน)",
        note: "TRON, Pirates, Castle show, Fireworks",
      },
    ],
  },
  {
    date: "พุธ 10 ธ.ค.",
    city: "Shanghai → Bangkok",
    icon: <Plane className="w-4 h-4" />,
    items: [
      {
        time: "09:00–12:00",
        title: "Yu Garden + Old Town Bazaar",
        note: "สถาปัตยกรรมจีนเก่า + ช้อปของฝาก",
      },
      {
        time: "13:00–17:00",
        title: "Xintiandi + ช้อปปิ้ง Nanjing Road",
        note: "คาเฟ่, ช้อปปิ้ง, เดินเล่น",
      },
      {
        time: "21:00",
        title: "ออกเดินทางไปสนามบิน PVG",
        note: "Maglev train ~8 นาที หรือ Metro Line 2",
      },
      {
        time: "23:59",
        title: "บิน Shanghai → Bangkok",
        note: "ถึงไทยเช้ามืดวันที่ 11 ธ.ค.",
      },
    ],
  },
];

type DayItem = {
  time: string;
  title: string;
  note: string;
};

type DayCardProps = {
  date: string;
  city: string;
  icon: React.ReactNode;
  items: DayItem[];
};

function DayCard({ date, city, icon, items }: DayCardProps) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {date} - {city}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map((it, idx) => (
            <li key={idx} className="p-2 border rounded bg-sky-50">
              <div className="font-semibold">
                {it.time} - {it.title}
              </div>
              <div className="text-sm text-slate-600">{it.note}</div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
function makeICS() {
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//RoadTrip China//EN"];
  const tz = "Asia/Bangkok";

  itinerary.forEach((day, idx) => {
    day.items.forEach((it, j) => {
      const timeStr = it.time;
      const hasClock = /^\d{1,2}:\d{2}(–\d{1,2}:\d{2})?$/.test(timeStr);
      if (!hasClock) return;

      const [start, end] = timeStr.split("–");
      const baseDay = 6 + idx; // วันที่เริ่มคือ 5 ธ.ค.
      const pad = (n: number) => String(n).padStart(2, "0");
      const startDate = `2025${pad(12)}${pad(baseDay)}T${start.replace(":", "")}00`;
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

  // สร้างไฟล์ .ics แล้วดาวน์โหลด
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
              <CalendarPlus className="w-4 h-4 mr-2" /> ดาวน์โหลด .ICS
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-2xl shadow-lg bg-white text-blue-600 hover:bg-blue-50 border-2 border-white">
                  <ExternalLink className="w-4 h-4 mr-2" /> ประกันเดินทาง PDF
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
                  className={`rounded-2xl shadow-lg border-0 bg-gradient-to-br ${idx % 3 === 0
                    ? "from-emerald-100 to-teal-100"
                    : idx % 3 === 1
                      ? "from-blue-100 to-indigo-100"
                      : "from-purple-100 to-pink-100"
                    } hover:shadow-xl transition-all duration-300`}
                >
                  <CardHeader className="pb-2">
                    <CardTitle
                      className={`flex items-center gap-2 text-lg ${idx % 3 === 0
                        ? "text-emerald-800"
                        : idx % 3 === 1
                          ? "text-blue-800"
                          : "text-purple-800"
                        }`}
                    >
                      <span
                        className={`p-2 rounded-full ${idx % 3 === 0
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
                          className={`w-4 h-4 mt-0.5 shrink-0 ${idx % 3 === 0
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
                  className={`rounded-2xl px-4 font-medium transition-all duration-300 ${i === 0
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
                          className={`rounded-2xl overflow-hidden shadow-lg border-0 bg-gradient-to-br hover:shadow-xl transition-all duration-300 ${cityIdx === 0
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
                              className={`text-lg flex items-center gap-2 ${cityIdx === 0
                                ? "text-red-700"
                                : cityIdx === 1
                                  ? "text-emerald-700"
                                  : cityIdx === 2
                                    ? "text-blue-700"
                                    : "text-purple-700"
                                }`}
                            >
                              <Utensils
                                className={`w-4 h-4 p-1 rounded-full ${cityIdx === 0
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
                                className={`rounded-xl shadow-sm border-2 font-medium transition-all duration-300 ${cityIdx === 0
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
                className={`rounded-2xl shadow-lg border-0 bg-gradient-to-br hover:shadow-xl transition-all duration-300 ${i % 4 === 0
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
                    className={`text-lg ${i % 4 === 0
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
<div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100 text-sky-900 p-6">
<h1 className="text-2xl font-bold mb-6">China Trip Itinerary</h1>


{/* Itinerary Section */}
<div className="mb-10">
{itinerary.map((day, idx) => (
<DayCard key={idx} {...day} />
))}
</div>


{/* Infographic Section */}
<h2 className="text-xl font-bold mb-4">Infographics by City</h2>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
<VerticalInfographic cityKey="Chengdu" />
<VerticalInfographic cityKey="Siguniang" />
<VerticalInfographic cityKey="Heishui" />
<VerticalInfographic cityKey="Shanghai" />
</div>
</div>
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
                      เอกสารสำคัญ: Passport ({">"}6 เดือน),
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
