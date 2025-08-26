'use client';

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, CalendarPlus, ExternalLink, Utensils, Hotel, Plane, Mountain, Trees } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";

// ---------- DATA ----------
const places = [
  // Chengdu
  { city: "Chengdu", name: "Chen Mapo Tofu", type: "อาหารเสฉวน (Mapo Tofu)", maps: "https://www.google.com/maps?q=Chen%20Mapo%20Tofu%20Chengdu&output=embed", link: "https://goo.gl/maps/4KNYW2B28YQz3eMo9" },
  { city: "Chengdu", name: "Shu Daxia Hotpot", type: "Hotpot เสฉวน", maps: "https://www.google.com/maps?q=Shu%20Daxia%20Hotpot%20Chengdu&output=embed", link: "https://goo.gl/maps/jPR5Yt7oxN1jvHcb8" },
  { city: "Chengdu", name: "Kuanzhai Alley Street Food", type: "Street Food", maps: "https://www.google.com/maps?q=Kuanzhai%20Alley%20Chengdu&output=embed", link: "https://goo.gl/maps/y8poQhaAf4ptwYnS7" },

  // Rilong / Siguniangshan
  { city: "Rilong", name: "Four Girls Mountain Restaurant", type: "อาหารทิเบต + เสฉวน", maps: "https://www.google.com/maps?q=Four%20Girls%20Mountain%20Restaurant%20Rilong&output=embed", link: "https://goo.gl/maps/6g6UxSTPgeALPvGJ6" },

  // Li County / Bipenggou vicinity
  { city: "Li County", name: "Li County Farmhouse Restaurant", type: "อาหารพื้นบ้าน", maps: "https://www.google.com/maps?q=Li%20County%20Farmhouse%20Restaurant&output=embed", link: "" },

  // Shanghai
  { city: "Shanghai", name: "Jia Jia Tang Bao", type: "Xiao Long Bao", maps: "https://www.google.com/maps?q=Jia%20Jia%20Tang%20Bao%20Shanghai&output=embed", link: "https://goo.gl/maps/d2kx8SLLuXtCDhBr6" },
  { city: "Shanghai", name: "Yang's Fried Dumpling", type: "Sheng Jian Bao", maps: "https://www.google.com/maps?q=Yang's%20Fried%20Dumpling%20Shanghai&output=embed", link: "https://goo.gl/maps/DGi1s5Gq58mN1VjR6" },
  { city: "Shanghai", name: "Old Jesse", type: "อาหารเซี่ยงไฮ้ดั้งเดิม", maps: "https://www.google.com/maps?q=Old%20Jesse%20Shanghai&output=embed", link: "https://goo.gl/maps/mPHzRdrE1VhHyeyA8" },
  { city: "Shanghai", name: "Din Tai Fung (Xintiandi)", type: "ติ่มซำ / Xiao Long Bao", maps: "https://www.google.com/maps?q=Din%20Tai%20Fung%20Xintiandi%20Shanghai&output=embed", link: "https://goo.gl/maps/4cxiMnVZycnqq2Wj6" },
];

const hotels = [
  { city: "Chengdu", name: "Jinjiang Inn (เมือง)", price: "~1,000 B", maps: "https://www.google.com/maps?q=Jinjiang%20Inn%20Chengdu&output=embed" },
  { city: "Chengdu", name: "Sim's Cozy Garden Hostel", price: "~500–1,400 B", maps: "https://www.google.com/maps?q=Sim's%20Cozy%20Garden%20Hostel%20Chengdu&output=embed" },
  { city: "Rilong", name: "Local Guesthouse (เกสต์เฮาส์)", price: "~1,200–1,500 B", maps: "https://www.google.com/maps?q=Rilong%20guesthouse&output=embed" },
  { city: "Shanghai", name: "Lintin Hotel", price: "~1,000–1,300 B", maps: "https://www.google.com/maps?q=Lintin%20Hotel%20Shanghai&output=embed" },
  { city: "Shanghai", name: "Meego Hostel", price: "~1,000–1,300 B", maps: "https://www.google.com/maps?q=Meego%20Hostel%20Shanghai&output=embed" },
];

const itinerary = [
  {
    date: "ศุกร์ 5 ธ.ค.", city: "เฉิงตู Chengdu", icon: <Plane className="w-4 h-4"/>,
    items: [
      { time: "09:00", title: "ถึงสนามบินเฉิงตู (CTU/T2)", note: "เตรียมซื้อซิม/เติมเงิน Alipay/WeChat" },
      { time: "10:30", title: "เช็กอินที่พักเมือง (Jinjiang Inn หรือ Sim's)", note: "ฝากกระเป๋าได้ถ้าห้องยังไม่พร้อม" },
      { time: "11:30–14:00", title: "Chengdu Research Base of Giant Panda", note: "ไปเช้า ๆ แพนด้าตื่นตัวกว่า คนยังไม่เยอะ" },
      { time: "14:30–17:00", title: "ช้อป/เดิน Taikoo Li & Chunxi Road", note: "เดินเล่น ถ่ายรูป คาเฟ่" },
      { time: "18:00", title: "เย็นที่ Kuanzhai Alley", note: "street food & ของฝากท้องถิ่น" },
      { time: "ค่ำ", title: "กินชาบูเสฉวน Shu Daxia / ร้านเทียบเคียง", note: "สั่งหม้อสองน้ำซุป เผ็ด+ไม่เผ็ด" },
    ],
  },
  {
    date: "เสาร์ 6 ธ.ค.", city: "ไปเขาสี่ดรุณี Siguniangshan", icon: <Mountain className="w-4 h-4"/>,
    items: [
      { time: "07:00", title: "ออกจากเฉิงตู", note: "เผื่อเวลา Balang Shan อาจมีหิมะ/ลม" },
      { time: "12:00", title: "ถึง Rilong → เช็กอินเกสต์เฮาส์", note: "ปรับตัวอากาศบางส่วน (สูงราว 3,000m)" },
      { time: "14:00–17:00", title: "เที่ยว Changping Valley", note: "วิวหุบเขา/ธารน้ำแข็ง ทางเดินเรียบ เหมาะวันแรก" },
      { time: "ค่ำ", title: "พักใน Rilong", note: "อาหารทิเบตอุ่น ๆ ช่วยให้หลับสบาย" },
    ],
  },
  {
    date: "อาทิตย์ 7 ธ.ค.", city: "Rilong → Bipenggou → เฉิงตู → บินไปเซี่ยงไฮ้", icon: <Trees className="w-4 h-4"/>,
    items: [
      { time: "06:00", title: "ออกจาก Rilong ไป Bipenggou (~4–5 ชม.)", note: "เช็กสภาพถนน/หิมะก่อนออก" },
      { time: "10:30–13:30", title: "เที่ยว Bipenggou + Snowmobile (~100–200 CNY)", note: "จุดทะเลสาบ/ป่าสน ถ่ายรูปหิมะ" },
      { time: "14:00–18:00", title: "กลับเฉิงตู", note: "แวะพักระหว่างทางได้ที่ Li County" },
      { time: "20:00", title: "บินไปเซี่ยงไฮ้", note: "เผื่อเวลาสนามบิน/รถติด" },
      { time: "23:30", title: "ถึงเซี่ยงไฮ้ → เข้าเมือง → เข้าที่พัก (Lintin/Meego)", note: "Check-in ดึก แจ้งที่พักล่วงหน้า" },
    ],
  },
  {
    date: "จันทร์ 8 ธ.ค.", city: "เที่ยวเมืองเซี่ยงไฮ้", icon: <BuildingIcon/>,
    items: [
      { time: "เช้า–เย็น", title: "The Bund, Yu Garden, Nanjing Road", note: "เลือกจุดตามสะดวก + แวะชิม Xiao Long Bao" },
    ],
  },
  {
    date: "อังคาร 9 ธ.ค.", city: "Shanghai Disneyland (เต็มวัน)", icon: <CastleIcon/>,
    items: [
      { time: "ทั้งวัน", title: "Shanghai Disneyland", note: "ซื้อตั๋วล่วงหน้า เข้าเช้า จัดลำดับเครื่องเล่นฮิต" },
    ],
  },
  {
    date: "พุธ 10 ธ.ค.", city: "เดินทางกลับ", icon: <Plane className="w-4 h-4"/>,
    items: [
      { time: "เช้า", title: "เดินชิลล์/ของฝาก", note: "เก็บของให้ครบ เอกสารพร้อม" },
      { time: "ต่อเวลา", title: "ออกไปสนามบิน", note: "เผื่อเวลา Security + รถติด" },
    ],
  },
];

// ---------- Small helper icons (lucide alternatives) ----------
function BuildingIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 ${props.className || ''}`}>
      <path d="M3 22h18"/><path d="M6 22V4h12v18"/><path d="M9 8h.01M9 12h.01M9 16h.01M15 8h.01M15 12h.01M15 16h.01"/>
    </svg>
  );
}
function CastleIcon(props: any){
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 ${props.className || ''}`}>
      <path d="M3 22h18"/>
      <path d="M6 22V10l3-2 3 2 3-2 3 2v12"/>
      <path d="M9 22v-6h6v6"/>
      <path d="M12 4l2 2-2 2-2-2 2-2z"/>
    </svg>
  );
}

// ---------- ICS generator ----------
function makeICS(){
  const lines = [
    "BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//RoadTrip China//EN" ];
  const tz = "Asia/Bangkok"; // local tz label
  itinerary.forEach((day, idx)=>{
    day.items.forEach((it, j)=>{
      // We only encode items that have a concrete time like HH:mm or ranges HH:mm–HH:mm
      const timeStr = it.time;
      const hasClock = /^\d{1,2}:\d{2}(–\d{1,2}:\d{2})?$/.test(timeStr);
      if(!hasClock) return;
      const [start, end] = timeStr.split("–");
      // Assume December 2025 because the request context date is 5–10 Dec (no year provided)
      const baseDay = 5 + idx; // 5..10
      const pad = (n: number)=> String(n).padStart(2,'0');
      const startDate = `2025${pad(12)}${pad(baseDay)}T${start.replace(":","")}00`;
      const endDate = end ? `2025${pad(12)}${pad(baseDay)}T${end.replace(":","")}00` : `2025${pad(12)}${pad(baseDay)}T${start.replace(":","")}00`;
      lines.push(
        "BEGIN:VEVENT",
        `UID:${idx}-${j}@roadtrip-china`,
        `DTSTAMP:20250101T000000Z`,
        `DTSTART;TZID=${tz}:${startDate}`,
        `DTEND;TZID=${tz}:${endDate}`,
        `SUMMARY:${day.city} — ${it.title}`,
        `DESCRIPTION:${it.note || ''}`,
        "END:VEVENT"
      );
    });
  });
  lines.push("END:VCALENDAR");
  const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'RoadTrip-China-Dec.ics';
  a.click();
  URL.revokeObjectURL(url);
}

// ---------- COMPONENT ----------
export default function ChinaTripItinerary(){
  const [q, setQ] = useState("");
  const filtered = useMemo(()=>{
    const s = q.trim().toLowerCase();
    if(!s) return places;
    return places.filter(p => (p.city+" "+p.name+" "+p.type).toLowerCase().includes(s));
  },[q]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800">
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div initial={{scale:0.8,opacity:0}} animate={{scale:1,opacity:1}}>
              <Plane className="w-6 h-6" />
            </motion.div>
            <h1 className="text-xl sm:text-2xl font-bold">Road Trip China — Chengdu • Siguniang • Bipenggou • Shanghai</h1>
          </div>
          <div className="hidden sm:flex gap-2">
            <Button onClick={makeICS} className="rounded-2xl shadow"> <CalendarPlus className="w-4 h-4 mr-2"/> ดาวน์โหลด .ICS </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 space-y-8">
        {/* Itinerary Section */}
        <section>
          <div className="grid md:grid-cols-2 gap-4">
            {itinerary.map((day, idx)=> (
              <motion.div key={idx} initial={{y:20,opacity:0}} whileInView={{y:0,opacity:1}} viewport={{once:true}}>
                <Card className="rounded-2xl shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      {day.icon}
                      <span>{day.date} · {day.city}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {day.items.map((it, j)=> (
                      <div key={j} className="flex gap-3 items-start">
                        <Clock className="w-4 h-4 mt-0.5 shrink-0"/>
                        <div>
                          <div className="font-medium">{it.time} — {it.title}</div>
                          {it.note && <div className="text-sm text-slate-600">{it.note}</div>}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 sm:hidden">
            <Button onClick={makeICS} className="w-full rounded-2xl"><CalendarPlus className="w-4 h-4 mr-2"/>ดาวน์โหลด .ICS</Button>
          </div>
        </section>

        {/* Maps & Places */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5"/>
            <h2 className="text-xl font-semibold">พิกัดกิน-เที่ยวแนะนำ</h2>
          </div>

          <div className="flex items-center gap-2">
            <Input placeholder="ค้นหาเมือง/ร้าน/ประเภท… (เช่น Chengdu, Hotpot, Xiao Long Bao)" value={q} onChange={(e)=>setQ(e.target.value)} className="rounded-2xl"/>
          </div>

          <Tabs defaultValue="Chengdu" className="w-full">
            <TabsList className="grid grid-cols-4 md:w-auto md:inline-grid md:grid-flow-col gap-2 rounded-2xl">
              {['Chengdu','Rilong','Li County','Shanghai'].map((c)=> (
                <TabsTrigger key={c} value={c} className="rounded-2xl px-4">{c}</TabsTrigger>
              ))}
            </TabsList>

            {['Chengdu','Rilong','Li County','Shanghai'].map((city)=> (
              <TabsContent key={city} value={city} className="mt-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {filtered.filter(p=>p.city===city).map((p, i)=> (
                    <Card key={p.name+i} className="rounded-2xl overflow-hidden shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Utensils className="w-4 h-4"/>
                          {p.name}
                        </CardTitle>
                        <div className="text-sm text-slate-600">{p.type}</div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="w-full aspect-video rounded-xl overflow-hidden border">
                          <iframe title={p.name} src={p.maps} className="w-full h-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>
                        </div>
                        <div className="flex justify-end">
                          <Button variant="outline" className="rounded-xl" asChild>
                            <a href={p.link || p.maps.replace("/embed","")} target="_blank" rel="noreferrer">
                              เปิดใน Google Maps <ExternalLink className="w-4 h-4 ml-2"/>
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* Hotels */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Hotel className="w-5 h-5"/>
            <h2 className="text-xl font-semibold">ที่พักตามงบประมาณ</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {hotels.map((h,i)=> (
              <Card key={i} className="rounded-2xl shadow">
                <CardHeader className="pb-1">
                  <CardTitle className="text-lg">{h.name}</CardTitle>
                  <div className="text-sm text-slate-600">{h.city} · {h.price}</div>
                </CardHeader>
                <CardContent>
                  <div className="w-full aspect-video rounded-xl overflow-hidden border">
                    <iframe title={h.name} src={h.maps} className="w-full h-full" loading="lazy"/>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section className="space-y-4">
          <Card className="rounded-2xl border-dashed">
            <CardHeader>
              <CardTitle>ทิปสำคัญระหว่างทาง</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-700">
              <ul className="list-disc pl-5 space-y-1">
                <li>เตรียมเงินสดสำรองเล็กน้อยในภูเขา (บางร้านรับแค่เงินสด)</li>
                <li>เขตสูง (Rilong ~3,000 ม.) ดื่มน้ำบ่อย ๆ เดินช้า ๆ ปรับตัวก่อนกิจกรรมหนัก</li>
                <li>เช็กสภาพอากาศ/ถนนผ่าน Balang Shan ช่วงหน้าหนาว อาจมีหิมะหรือปิดชั่วคราว</li>
                <li>เฉิงตู: Hotpot เผ็ดมาก แนะนำหม้อสองน้ำซุป (เผ็ด/ไม่เผ็ด)</li>
                <li>เซี่ยงไฮ้: ซื้อตั๋ว Disneyland ล่วงหน้า และเข้าแต่เช้าเพื่อเก็บเครื่องเล่นยอดฮิต</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <footer className="py-10 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Road Trip China · จัดทำเพื่อการวางแผนทริป · ปรับแก้ได้ตามต้องการ
        </footer>
      </main>
    </div>
  );
}