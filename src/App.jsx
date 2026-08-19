import { useState, useEffect, useCallback } from "react";

const C = {
  orange:"#E8712B",ol:"#FFF0E5",op:"#FFF8F0",
  teal:"#2AAFAF",tl:"#E6F7F7",td:"#1E8A8A",
  dark:"#2B2320",dc:"#352E28",muted:"#8A7E76",ml:"#B5ADA5",
  white:"#FFFFFF",cream:"#FFF8F0",green:"#34C759",gl:"#E8F5E9",
  yellow:"#FFD54F",yl:"#FFF8E1",red:"#FF6B6B",rl:"#FFEBEE",
  border:"#F0E8E0",shadow:"0 2px 12px rgba(43,35,32,0.06)",
  purple:"#9C7CDB",pl:"#F0E6FF",blue:"#4A90D9",bl:"#E3F2FD",
  pink:"#FF4081",
  // clickable tint
  tapBg:"#FFF6EE",tapBorder:"#E8712B",tapShadow:"0 3px 14px rgba(232,113,43,0.10)",
};

const CG=[
  {id:1,name:"Ashatai",full:"Ashatai (Aai)",age:"~58",role:"PRIMARY CAREGIVER",emoji:"👵",desc:"Feeds, walks & logs daily care",pets:[1,2,3],color:C.orange,notifs:3,phone:"+91 98765 43210"},
  {id:2,name:"Aditya",full:"Aditya (You)",age:"~32",role:"PAYER & DECISION-MAKER",emoji:"👨",desc:"Books vets, pays bills, manages hostels",pets:[1,2,3],color:C.teal,notifs:5,phone:"+91 98765 12345"},
  {id:3,name:"Priya",full:"Priya",age:"~27",role:"WEEKEND CAREGIVER",emoji:"👩",desc:"Handles playdates & grooming weekends",pets:[1],color:C.purple,notifs:1,phone:"+91 98765 67890"},
];
const PETS=[
  {id:1,name:"Bruno",type:"Golden Retriever",age:"3y 2m",weight:"31 kg",emoji:"🐶",color:C.orange,gradient:["#E8712B","#D4A574"],sex:"Male",dob:"14 Jun 2023",chip:"IN-982736",allergies:"None known",nextVax:"DHPP Booster — Sep 15",weights:[{m:"Mar",v:28},{m:"Apr",v:29},{m:"May",v:29.5},{m:"Jun",v:30},{m:"Jul",v:30.5},{m:"Aug",v:31}]},
  {id:2,name:"Mia",type:"Persian Cat",age:"2y 5m",weight:"4.2 kg",emoji:"🐱",color:C.teal,gradient:["#2AAFAF","#7DD4C8"],sex:"Female",dob:"22 Mar 2024",chip:"IN-553829",allergies:"Chicken liver (mild)",nextVax:"Calicivirus — Sep 20",weights:[{m:"Mar",v:3.8},{m:"Apr",v:3.9},{m:"May",v:4.0},{m:"Jun",v:4.0},{m:"Jul",v:4.1},{m:"Aug",v:4.2}]},
  {id:3,name:"Rio",type:"Indian Ringneck",age:"1y 8m",weight:"135 g",emoji:"🐦",color:"#4ECDC4",gradient:["#4ECDC4","#96E6DC"],sex:"Male",dob:"05 Jan 2025",chip:"N/A",allergies:"Avocado (toxic)",nextVax:"PBFD Test — Sep 28",weights:[{m:"Mar",v:128},{m:"Apr",v:130},{m:"May",v:131},{m:"Jun",v:133},{m:"Jul",v:134},{m:"Aug",v:135}]},
];
const DIETS={
  1:[{task:"Morning kibble + wet food",st:"done",time:"Done, 7:30 AM",by:"Ashatai",cal:"420"},{task:"Post-walk hydration",st:"done",time:"Done, 9:15 AM",by:"Ashatai",cal:""},{task:"Midday bone broth",st:"pending",time:"Due 1:00 PM",by:null,cal:"80"},{task:"Joint supplement",st:"pending",time:"Tue & Fri",by:null,cal:""},{task:"Evening meal + dental chew",st:"pending",time:"Due 6:30 PM",by:null,cal:"380"}],
  2:[{task:"Morning wet food (chicken)",st:"done",time:"Done, 8:00 AM",by:"Ashatai",cal:"180"},{task:"Fresh water change",st:"done",time:"Done, 8:05 AM",by:"Ashatai",cal:""},{task:"Afternoon treat",st:"pending",time:"Due 2:00 PM",by:null,cal:"40"},{task:"Hairball paste",st:"pending",time:"Mon & Thu",by:null,cal:""},{task:"Evening dry food",st:"pending",time:"Due 7:00 PM",by:null,cal:"160"}],
  3:[{task:"Morning seed & pellet mix",st:"done",time:"Done, 8:10 AM",by:"Priya",cal:"30"},{task:"Fresh veggies",st:"pending",time:"Due 1:00 PM",by:null,cal:"15"},{task:"Calcium supplement",st:"pending",time:"Tue & Fri",by:null,cal:""},{task:"Misting / bath",st:"pending",time:"Due 4:00 PM",by:null,cal:""},{task:"Fresh water change",st:"pending",time:"Due 6:00 PM",by:null,cal:""}],
};
const ACT=[
  {time:"9:15 AM",who:"Ashatai",action:"Completed Bruno's morning walk",detail:"2.1 km · 35 min · Jubilee Park",icon:"🚶",pet:"Bruno"},
  {time:"8:10 AM",who:"Priya",action:"Fed Rio morning seed mix",detail:"Zupreem pellets + safflower",icon:"🌾",pet:"Rio"},
  {time:"8:00 AM",who:"Ashatai",action:"Fed Mia morning wet food",detail:"Whiskas chicken & tuna 85g",icon:"🍽️",pet:"Mia"},
  {time:"7:30 AM",who:"Ashatai",action:"Fed Bruno morning meal",detail:"Royal Canin + wet food mix",icon:"🍽️",pet:"Bruno"},
  {time:"Yesterday",who:"Aditya",action:"Booked DHPP booster for Bruno",detail:"Dr. Mehta · Sep 15, 11 AM · ₹800",icon:"💉",pet:"Bruno"},
  {time:"Yesterday",who:"Priya",action:"Bruno playdate with Rocky",detail:"Labrador · Jubilee Park · 1 hr",icon:"🐾",pet:"Bruno"},
  {time:"Yesterday",who:"Aditya",action:"Paid ₹1,200 for Mia's grooming",detail:"PawSpa · Full coat trim + bath",icon:"💳",pet:"Mia"},
];
const VETS=[
  {name:"Dr. Kulkarni Avian Care",dist:"1.6 km",rating:4.9,reviews:127,spec:"Exotic bird specialist",emoji:"🪺",price:"₹500",hours:"9–6 PM"},
  {name:"Exotic Pet Wellness",dist:"2.9 km",rating:4.7,reviews:89,spec:"Multi-species",emoji:"🪺",price:"₹650",hours:"10–7 PM"},
  {name:"Dr. Mehta Multi-Pet",dist:"3.4 km",rating:4.6,reviews:214,spec:"Dogs, cats, birds",emoji:"🩹",price:"₹450",hours:"9–8 PM"},
  {name:"City Vet Hospital",dist:"4.1 km",rating:4.8,reviews:342,spec:"24/7 emergency",emoji:"🏥",price:"₹800",hours:"24/7"},
];
const HOSTELS=[
  {name:"Happy Tails Pet Home",price:450,rating:4.9,reviews:186,tags:["🐶 Dogs","🐱 Cats","Same-room"],color:C.tl,features:["CCTV live","Daily photos","AC rooms","In-house vet","Garden play","Custom diet"],emoji:"🏡",owner:"Meena Patil",phone:"+91 98765 11111"},
  {name:"Whiskers & Wag",price:500,rating:4.7,reviews:93,tags:["🐶 Dogs","🐱 Cats"],color:C.ol,features:["Daily photos","Outdoor play","Grooming incl.","Webcam"],emoji:"🐱",owner:"Rahul Joshi",phone:"+91 98765 22222"},
  {name:"Dr. Mehta's Boarding",price:520,rating:4.8,reviews:156,tags:["🐶 Dogs","🐱 Cats","🐦 Birds"],color:C.pl,features:["Attached clinic","24/7 vet","Bird-safe","Med mgmt","Temp-controlled"],emoji:"🏨",owner:"Dr. Mehta",phone:"+91 98765 33333"},
];
const INIT_VAX=[
  {pet:"Bruno",petId:1,name:"Rabies Annual",date:"12 Aug 2026",st:"done",vet:"Dr. Mehta Multi-Pet",cost:"₹650"},
  {pet:"Bruno",petId:1,name:"DHPP Booster",date:"15 Sep 2026",st:"upcoming",vet:"Dr. Mehta Multi-Pet",cost:"₹800"},
  {pet:"Mia",petId:2,name:"FVRCP Annual",date:"01 Sep 2026",st:"done",vet:"Dr. Mehta Multi-Pet",cost:"₹550"},
  {pet:"Mia",petId:2,name:"Calicivirus",date:"20 Sep 2026",st:"upcoming",vet:"Dr. Mehta Multi-Pet",cost:"₹600"},
  {pet:"Rio",petId:3,name:"PBFD Test",date:"28 Sep 2026",st:"upcoming",vet:"Dr. Kulkarni Avian Care",cost:"₹900"},
];
const MEDS=[
  {pet:"Bruno",name:"Glucosamine Supplement",dose:"1 tablet",freq:"Tue & Fri",rem:18,tot:30},
  {pet:"Mia",name:"Hairball Paste",dose:"1 inch strip",freq:"Mon & Thu",rem:22,tot:30},
  {pet:"Rio",name:"Calcium Powder",dose:"¼ tsp",freq:"Tue & Fri",rem:40,tot:60},
];
const EXPENSES=[
  {date:"19 Aug",desc:"Bruno — Royal Canin 3kg",amount:1850,cat:"Food",by:"Aditya"},
  {date:"18 Aug",desc:"Mia — Grooming",amount:1200,cat:"Grooming",by:"Aditya"},
  {date:"15 Aug",desc:"Rio — Zupreem 1kg",amount:680,cat:"Food",by:"Priya"},
  {date:"12 Aug",desc:"Bruno — Rabies Vaccine",amount:650,cat:"Vet",by:"Aditya"},
  {date:"10 Aug",desc:"All — Flea treatment",amount:950,cat:"Health",by:"Aditya"},
];
const INIT_PLAY=[
  {id:1,pet:"Bruno",buddy:"Rocky (Labrador)",owner:"Rahul",location:"Jubilee Park Dog Zone",date:"Today",time:"5:00 PM",st:"confirmed",notes:"Bring tennis ball"},
  {id:2,pet:"Mia",buddy:"Whiskers (Persian)",owner:"Sneha",location:"Cat Café Pawfect",date:"Tomorrow",time:"4:00 PM",st:"pending",notes:"Indoor play only"},
  {id:3,pet:"Bruno",buddy:"Max (Beagle)",owner:"Vikram",location:"Paws & Play Arena",date:"23 Aug",time:"6:00 PM",st:"confirmed",notes:"Both vaccinated"},
];
const SPOTS=[
  {name:"Jubilee Park Dog Zone",dist:"1.2 km",rating:4.8,active:5,type:"Outdoor"},
  {name:"Paws & Play Arena",dist:"2.8 km",rating:4.6,active:3,type:"Outdoor"},
  {name:"Cat Café Pawfect",dist:"3.1 km",rating:4.9,active:0,type:"Indoor"},
  {name:"PetMeet Community Ground",dist:"4.5 km",rating:4.5,active:7,type:"Outdoor"},
];
const REELS=[
  {id:1,user:"@golden_bruno",caption:"Bruno learning shake hands! 🐾",emoji:"🐶",likes:"12.4K",comments:"342",bg:"linear-gradient(135deg,#E8712B,#D4A574)",type:"Dog"},
  {id:2,user:"@whiskers_daily",caption:"Mia's morning stretch routine 🐱",emoji:"🐱",likes:"8.7K",comments:"198",bg:"linear-gradient(135deg,#2AAFAF,#7DD4C8)",type:"Cat"},
  {id:3,user:"@aqua_world",caption:"Perfect planted tank setup 🐠",emoji:"🐠",likes:"5.2K",comments:"87",bg:"linear-gradient(135deg,#4A90D9,#87CEEB)",type:"Fish"},
  {id:4,user:"@snake_sanctuary",caption:"Ball python feeding day 🐍",emoji:"🐍",likes:"15.1K",comments:"567",bg:"linear-gradient(135deg,#6B8E23,#9ACD32)",type:"Snake"},
  {id:5,user:"@parrot_rio",caption:"Rio talking in Marathi! 🐦",emoji:"🐦",likes:"22.3K",comments:"1.2K",bg:"linear-gradient(135deg,#4ECDC4,#96E6DC)",type:"Bird"},
  {id:6,user:"@puppy_tales",caption:"Golden Retriever puppy first swim",emoji:"🐶",likes:"45.6K",comments:"2.1K",bg:"linear-gradient(135deg,#FFB347,#FF6B6B)",type:"Dog"},
  {id:7,user:"@cat_cafe_india",caption:"Persian cats with laser pointer 😸",emoji:"🐱",likes:"9.8K",comments:"234",bg:"linear-gradient(135deg,#9C7CDB,#DDA0DD)",type:"Cat"},
  {id:8,user:"@exotic_reptiles",caption:"Corn snake habitat tour 🌿",emoji:"🐍",likes:"7.3K",comments:"156",bg:"linear-gradient(135deg,#556B2F,#8FBC8F)",type:"Snake"},
];

/* ══════════════════════════════════════
   DESIGN SYSTEM — Clickable vs Static
   ══════════════════════════════════════
   CLICKABLE (Tap):  warm bg (#FFF6EE), orange left-border (3px),
                     orange chevron ›, pointer cursor,
                     slightly elevated shadow
   STATIC (Info):    white bg, neutral border, no chevron,
                     default cursor, flat shadow
   BUTTONS (CTA):    filled orange + shadow = primary
                     outlined orange = secondary
   CHECKBOXES:       empty square = pending, green filled = done
   ══════════════════════════════════════ */

// ── Primitives ──
function SBar({dark}){return <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 20px 4px",fontSize:12,fontWeight:600,color:dark?C.white:C.dark,flexShrink:0}}><span>9:41</span><div style={{width:80,height:22,borderRadius:12,background:dark?"rgba(255,255,255,.2)":C.dark}}/><div style={{display:"flex",gap:4,alignItems:"center",fontSize:12}}>●●● 📶🔋</div></div>}
function Toast({msg,show}){return <div style={{position:"absolute",top:show?50:-60,left:"50%",transform:"translateX(-50%)",background:C.dark,color:C.white,padding:"10px 20px",borderRadius:12,fontSize:13,fontWeight:600,zIndex:100,transition:"top 0.35s",boxShadow:"0 4px 20px rgba(0,0,0,.3)",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:8}}><span style={{color:C.green}}>✓</span>{msg}</div>}
function Bdg({n,s}){if(!n)return null;return <div style={{position:"absolute",top:-4,right:-4,minWidth:16,height:16,borderRadius:8,background:typeof n==="string"?C.orange:C.red,color:C.white,fontSize:typeof n==="string"?7:9,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 4px",...s}}>{n}</div>}

// TAP CARD — warm bg, orange left accent, chevron, elevated
function Tap({children,onClick,style:s,label}){return <div className="tap" onClick={onClick} style={{background:C.tapBg,borderRadius:14,padding:"14px 16px",borderLeft:`3.5px solid ${C.tapBorder}`,borderTop:`1px solid ${C.border}`,borderRight:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`,boxShadow:C.tapShadow,cursor:"pointer",display:"flex",alignItems:"center",gap:12,...s}}><div style={{flex:1,display:"flex",alignItems:"center",gap:12}}>{children}</div><div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:1,flexShrink:0}}><span style={{fontSize:18,color:C.orange,fontWeight:600}}>›</span>{label&&<span style={{fontSize:7,color:C.orange,fontWeight:700,letterSpacing:0.3}}>{label}</span>}</div></div>}

// STATIC CARD — white, flat, no accent
function Box({children,style:s}){return <div style={{background:C.white,borderRadius:14,padding:"14px 16px",border:`1px solid ${C.border}`,boxShadow:C.shadow,...s}}>{children}</div>}

// CTA BUTTON — primary (filled) or secondary (outlined)
function Btn({children,onClick,secondary,disabled,style:s}){return <button className="btn-primary" onClick={onClick} disabled={disabled} style={{width:"100%",padding:"14px",borderRadius:14,border:secondary?`2px solid ${C.orange}`:"none",background:disabled?C.green:secondary?"transparent":C.orange,color:secondary?C.orange:C.white,fontSize:14,fontWeight:700,cursor:disabled?"default":"pointer",boxShadow:disabled||secondary?"none":"0 4px 14px rgba(232,113,43,0.3)",display:"flex",alignItems:"center",justifyContent:"center",gap:8,...s}}>{children}</button>}

function Hdr({icon,label,color,action,onAction}){return <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}><div style={{display:"flex",alignItems:"center",gap:6}}>{icon&&<span style={{fontSize:14}}>{icon}</span>}<span style={{fontSize:11,fontWeight:800,color:color||C.teal,letterSpacing:.5}}>{label}</span></div>{action&&<button onClick={onAction} style={{background:"none",border:"none",color:C.orange,fontSize:11,fontWeight:700,cursor:"pointer",padding:0}}>{action} ›</button>}</div>}
function Pill({label,active,onClick}){return <button onClick={onClick} style={{padding:"5px 12px",borderRadius:8,border:"none",cursor:"pointer",background:active?C.orange:C.ol,color:active?C.white:C.dark,fontSize:11,fontWeight:600}}>{label}</button>}
function Inp({label,value,onChange,placeholder,type}){return <div style={{marginBottom:12}}><label style={{fontSize:11,fontWeight:700,color:C.dark,display:"block",marginBottom:4}}>{label}</label><input type={type||"text"} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={{width:"100%",padding:"10px 14px",borderRadius:10,border:`1.5px solid ${C.border}`,fontSize:13,fontFamily:"inherit",color:C.dark,background:C.white,boxSizing:"border-box",outline:"none"}} onFocus={e=>e.target.style.borderColor=C.orange} onBlur={e=>e.target.style.borderColor=C.border}/></div>}
function Sel({label,value,onChange,options}){return <div style={{marginBottom:12}}><label style={{fontSize:11,fontWeight:700,color:C.dark,display:"block",marginBottom:4}}>{label}</label><select value={value} onChange={e=>onChange(e.target.value)} style={{width:"100%",padding:"10px 14px",borderRadius:10,border:`1.5px solid ${C.border}`,fontSize:13,fontFamily:"inherit",color:C.dark,background:C.white,boxSizing:"border-box",outline:"none",cursor:"pointer"}}>{options.map(o=><option key={o} value={o}>{o}</option>)}</select></div>}
function MiniChart({data,color,h}){const max=Math.max(...data.map(d=>d.v));const min=Math.min(...data.map(d=>d.v));const r=max-min||1;return <div style={{display:"flex",alignItems:"flex-end",gap:6,height:h||60,marginTop:8}}>{data.map((d,i)=>{const bH=((d.v-min)/r)*((h||60)-20)+16;return <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2}}><span style={{fontSize:8,fontWeight:700,color:C.dark}}>{d.v}</span><div style={{width:"100%",height:bH,borderRadius:4,background:i===data.length-1?color:color+"50"}}/><span style={{fontSize:8,color:C.muted}}>{d.m}</span></div>})}</div>}

function BotNav({active,onNav,nc,onFab}){
  const tabs=[{id:"home",l:"Home",i:"🏠"},{id:"activity",l:"Activity",i:"📋"},{id:"fab"},{id:"hostel",l:"Hostel",i:"🏨"},{id:"profile",l:"Profile",i:"👤"}];
  return <div style={{position:"relative",flexShrink:0}}>
    <button onClick={onFab} style={{position:"absolute",top:-22,left:"50%",transform:"translateX(-50%)",width:52,height:52,borderRadius:"50%",background:C.pink,border:"none",cursor:"pointer",zIndex:10,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 16px rgba(255,64,129,0.4)",fontSize:24,color:C.white,fontWeight:800}} className="fab-btn">+</button>
    <div style={{position:"absolute",top:-2,left:"50%",transform:"translateX(-50%)",width:66,height:30,borderRadius:"0 0 33px 33px",background:C.white,borderTop:`1px solid ${C.border}`}}/>
    <div style={{display:"flex",justifyContent:"space-around",padding:"6px 0 14px",borderTop:`1px solid ${C.border}`,background:C.white}}>
      {tabs.map(t=>{if(t.id==="fab")return <div key="fab" style={{width:52}}/>;return <button key={t.id} onClick={()=>onNav(t.id)} style={{background:"none",border:"none",display:"flex",flexDirection:"column",alignItems:"center",gap:1,cursor:"pointer",padding:"4px 8px",color:active===t.id?C.orange:C.muted,fontSize:18,position:"relative"}}><span>{t.i}</span>{t.id==="activity"&&nc>0&&<Bdg n={nc} s={{top:-2,right:0}}/>}<span style={{fontSize:9,fontWeight:active===t.id?700:400}}>{t.l}</span>{active===t.id&&<div style={{width:4,height:4,borderRadius:2,background:C.orange,marginTop:1}}/>}</button>})}
    </div>
  </div>;
}

// ── Reels ──
function ReelsSc({onBack}){const[s,sS]=useState("");const[f,sF]=useState("All");const types=["All","Dog","Cat","Fish","Snake","Bird"];const fl=REELS.filter(r=>(f==="All"||r.type===f)&&(s===""||r.caption.toLowerCase().includes(s.toLowerCase())));return <div style={{flex:1,background:C.dark,display:"flex",flexDirection:"column",overflow:"hidden"}}><div style={{padding:"8px 16px",flexShrink:0}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}><button onClick={onBack} style={{background:"none",border:"none",color:C.white,fontSize:18,cursor:"pointer",padding:0}}>✕</button><h2 style={{margin:0,fontSize:18,fontWeight:800,color:C.white,flex:1}}>PawCircle Reels</h2><span style={{fontSize:18}}>🐾</span></div><div style={{display:"flex",alignItems:"center",gap:8,background:C.dc,borderRadius:10,padding:"8px 12px",marginBottom:8}}><span style={{fontSize:14}}>🔍</span><input value={s} onChange={e=>sS(e.target.value)} placeholder="Search pets, breeds, tips..." style={{flex:1,background:"transparent",border:"none",color:C.white,fontSize:13,fontFamily:"inherit",outline:"none"}}/></div><div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:4}}>{types.map(t=><button key={t} onClick={()=>sF(t)} style={{padding:"4px 12px",borderRadius:8,border:"none",cursor:"pointer",background:f===t?C.pink:C.dc,color:f===t?C.white:"#aaa",fontSize:11,fontWeight:600,whiteSpace:"nowrap",flexShrink:0}}>{t}</button>)}</div></div><div className="scroll-area" style={{flex:1,overflowY:"auto",padding:"8px 16px"}}>{fl.map(r=><div key={r.id} style={{background:r.bg,borderRadius:16,marginBottom:12,overflow:"hidden",cursor:"pointer"}}><div style={{padding:"40px 20px",textAlign:"center"}}><div style={{fontSize:64,marginBottom:8}}>{r.emoji}</div><div style={{width:48,height:48,borderRadius:"50%",background:"rgba(255,255,255,0.25)",display:"inline-flex",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:24,color:C.white}}>▶</span></div></div><div style={{background:"rgba(0,0,0,0.45)",padding:"12px 16px"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}><span style={{fontWeight:700,fontSize:13,color:C.white}}>{r.user}</span><span style={{fontSize:10,color:"rgba(255,255,255,.7)",background:"rgba(255,255,255,.15)",padding:"2px 8px",borderRadius:6}}>{r.type}</span></div><div style={{fontSize:12,color:"rgba(255,255,255,.9)"}}>{r.caption}</div><div style={{display:"flex",gap:16,marginTop:8}}><span style={{fontSize:11,color:"rgba(255,255,255,.7)"}}>❤️ {r.likes}</span><span style={{fontSize:11,color:"rgba(255,255,255,.7)"}}>💬 {r.comments}</span><span style={{fontSize:11,color:"rgba(255,255,255,.7)"}}>↗️ Share</span></div></div></div>)}</div></div>}

// ── Screens ──
function Splash({onStart}){const[f,sF]=useState(false);useEffect(()=>{setTimeout(()=>sF(true),100)},[]);return <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:C.dark}}><div style={{opacity:f?1:0,transform:f?"translateY(0)":"translateY(20px)",transition:"all 0.6s",textAlign:"center"}}><div style={{fontSize:64,marginBottom:8}}>🐾</div><h1 style={{fontSize:40,fontWeight:900,color:C.orange,margin:"0 0 4px"}}>PawCircle</h1><p style={{fontSize:13,color:C.ml,margin:"0 0 6px"}}>Shared Pet Care for Indian Families</p><div style={{width:40,height:2,background:C.orange,margin:"0 auto 20px"}}/><p style={{fontSize:14,color:C.muted,margin:"0 0 36px",lineHeight:1.6,padding:"0 30px"}}>Built for the family that raises the pet.<br/>Not just the person who got it.</p><Btn onClick={onStart} style={{width:"auto",padding:"14px 52px"}}>Get Started</Btn></div></div>}

function CgSc({onSelect,selId}){const[sel,sS]=useState(selId||1);return <div className="scroll-area" style={{padding:"0 20px",flex:1,overflowY:"auto"}}><h1 style={{fontSize:24,fontWeight:800,margin:"12px 0 4px",color:C.dark}}>Who's checking in?</h1><p style={{fontSize:13,color:C.muted,margin:"0 0 16px"}}>Switch caregivers to see their reminders & tasks</p>{CG.map(c=><button key={c.id} onClick={()=>sS(c.id)} style={{width:"100%",textAlign:"left",padding:"14px 16px",marginBottom:10,borderRadius:14,border:sel===c.id?`2.5px solid ${C.orange}`:`1.5px solid ${C.border}`,background:sel===c.id?C.ol:C.white,cursor:"pointer",display:"flex",alignItems:"center",gap:14,position:"relative",boxShadow:sel===c.id?"0 2px 12px rgba(232,113,43,.12)":C.shadow}}><div style={{width:50,height:50,borderRadius:"50%",background:sel===c.id?C.orange+"18":C.ol,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0}}>{c.emoji}</div><div style={{flex:1}}><div style={{fontWeight:700,fontSize:15,color:C.dark}}>{c.full} <span style={{fontSize:11,color:C.muted}}>· {c.age}</span></div><div style={{fontSize:10,fontWeight:700,color:c.color,marginTop:2}}>{c.role}</div><div style={{fontSize:11,color:C.muted,marginTop:3}}>{c.desc}</div><div style={{marginTop:6,display:"flex",gap:4}}>{c.pets.map(pid=><span key={pid} style={{fontSize:16}}>{PETS.find(p=>p.id===pid)?.emoji}</span>)}</div></div>{sel===c.id&&<div style={{position:"absolute",top:14,right:14,width:24,height:24,borderRadius:"50%",background:C.orange,display:"flex",alignItems:"center",justifyContent:"center",color:C.white,fontSize:13}}>✓</div>}</button>)}<button style={{width:"100%",padding:"14px",borderRadius:14,border:`2px dashed ${C.border}`,background:"transparent",cursor:"pointer",fontSize:13,color:C.muted,marginBottom:12}}>+ Invite a family member</button><Btn onClick={()=>onSelect(sel)} style={{marginBottom:20}}>Continue as {CG.find(c=>c.id===sel)?.name}</Btn></div>}

function HomeSc({cg,onToast,onViewPet}){
  const[ap,sAP]=useState(1);const[diets,sD]=useState(JSON.parse(JSON.stringify(DIETS)));const pet=PETS.find(p=>p.id===ap);const diet=diets[ap];const cgD=CG.find(c=>c.id===cg);const done=diet.filter(d=>d.st==="done").length;
  const mark=idx=>{const u={...diets};u[ap]=[...u[ap]];u[ap][idx]={...u[ap][idx],st:"done",time:`Done, ${new Date().toLocaleTimeString([],{hour:"numeric",minute:"2-digit"})}`,by:cgD.name};sD(u);onToast(`Marked "${u[ap][idx].task}" done`)};
  return <div className="scroll-area" style={{padding:"0 20px",flex:1,overflowY:"auto"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div><div style={{fontSize:12,color:C.muted}}>Good morning</div><div style={{fontSize:22,fontWeight:800,color:C.dark}}>{cgD.name} 👋</div></div><div style={{width:40,height:40,borderRadius:"50%",background:C.ol,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,position:"relative"}}>🔔<Bdg n={cgD.notifs}/></div></div>
    <div style={{display:"flex",gap:8,marginBottom:14}}>{PETS.map(p=><button key={p.id} onClick={()=>sAP(p.id)} style={{flex:1,padding:"10px 4px",borderRadius:12,border:ap===p.id?`2.5px solid ${C.orange}`:`1.5px solid ${C.border}`,background:ap===p.id?C.ol:C.white,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3}}><span style={{fontSize:24}}>{p.emoji}</span><span style={{fontSize:11,fontWeight:ap===p.id?700:400,color:ap===p.id?C.dark:C.muted}}>{p.name}</span></button>)}</div>
    {/* Pet hero — CLICKABLE (Tap card) */}
    <Tap onClick={()=>onViewPet(ap)} label="TAP" style={{background:`linear-gradient(135deg,${pet.gradient[0]},${pet.gradient[1]})`,borderLeft:"none",border:"none",color:C.white,marginBottom:6}}><div style={{width:52,height:52,borderRadius:"50%",background:"rgba(255,255,255,.22)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0}}>{pet.emoji}</div><div style={{flex:1}}><div style={{fontWeight:800,fontSize:18}}>{pet.name}</div><div style={{fontSize:11,opacity:.9}}>{pet.type} · {pet.age} · {pet.weight}</div></div></Tap>
    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6,marginTop:10}}><div style={{flex:1,height:6,borderRadius:3,background:C.border}}><div style={{width:`${(done/diet.length)*100}%`,height:6,borderRadius:3,background:C.green,transition:"width 0.4s"}}/></div><span style={{fontSize:11,fontWeight:700,color:C.muted}}>{done}/{diet.length}</span></div>
    <Hdr icon="📦" label="TODAY'S CARE PLAN"/>
    {/* Diet — checkboxes are CLICKABLE */}
    <Box style={{marginBottom:14}}>{diet.map((d,i)=><div key={i} style={{display:"flex",alignItems:"center",padding:"8px 0",borderTop:i>0?`1px solid ${C.border}`:"none",gap:10}}><button onClick={()=>d.st!=="done"&&mark(i)} style={{width:22,height:22,borderRadius:6,border:d.st==="done"?"none":`2px solid ${d.st==="pending"?C.orange:C.border}`,background:d.st==="done"?C.green:"transparent",cursor:d.st==="done"?"default":"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,padding:0}}>{d.st==="done"?<span style={{color:C.white,fontSize:12}}>✓</span>:<span style={{fontSize:8,color:C.orange}}>tap</span>}</button><div style={{flex:1}}><span style={{fontSize:12,fontWeight:600,color:d.st==="done"?C.muted:C.dark,textDecoration:d.st==="done"?"line-through":"none"}}>{d.task}</span>{d.cal&&<span style={{fontSize:9,color:C.teal,background:C.tl,padding:"1px 5px",borderRadius:3,marginLeft:4}}>{d.cal} kcal</span>}{d.by&&<span style={{fontSize:10,color:C.teal,display:"block",marginTop:1}}>by {d.by}</span>}</div><span style={{fontSize:10,fontWeight:600,color:d.st==="done"?C.green:C.muted,whiteSpace:"nowrap"}}>{d.st==="done"?"✓":d.time}</span></div>)}</Box>
    {MEDS.filter(m=>m.pet===pet.name).map((m,i)=><Box key={i} style={{marginBottom:10,display:"flex",alignItems:"center",gap:12}}><div style={{width:36,height:36,borderRadius:10,background:C.bl,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>💊</div><div style={{flex:1}}><div style={{fontWeight:700,fontSize:12,color:C.dark}}>{m.name}</div><div style={{fontSize:10,color:C.muted}}>{m.dose} · {m.freq}</div></div><span style={{fontSize:12,fontWeight:800,color:m.rem<10?C.red:C.dark}}>{m.rem}/{m.tot}</span></Box>)}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:10,marginBottom:20}}>{[{icon:"🩺",l:"Vet Visits",s:"Next: Sat 11 AM",c:C.tl},{icon:"💉",l:"Vaccinations",s:`${INIT_VAX.filter(v=>v.st==="upcoming"&&v.petId===ap).length} upcoming`,c:C.gl},{icon:"🏠",l:"Hostels",s:"Book for trip",c:C.ol},{icon:"🐾",l:"Playdates",s:"2 nearby",c:C.pl}].map((item,i)=><Box key={i}><div style={{width:36,height:36,borderRadius:10,background:item.c,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,marginBottom:8}}>{item.icon}</div><div style={{fontWeight:700,fontSize:13,color:C.dark}}>{item.l}</div><div style={{fontSize:10,color:C.muted,marginTop:2}}>{item.s}</div></Box>)}</div>
  </div>;
}

function PetProf({petId,onBack}){const pet=PETS.find(p=>p.id===petId);const pV=INIT_VAX.filter(v=>v.petId===petId);const pM=MEDS.filter(m=>m.pet===pet.name);return <div className="scroll-area" style={{padding:"0 20px",flex:1,overflowY:"auto"}}><button onClick={onBack} style={{background:"none",border:"none",color:C.orange,fontSize:13,fontWeight:600,cursor:"pointer",padding:"8px 0"}}>← Back</button><div style={{background:`linear-gradient(135deg,${pet.gradient[0]},${pet.gradient[1]})`,borderRadius:20,padding:"20px",color:C.white,marginBottom:16,textAlign:"center"}}><div style={{width:72,height:72,borderRadius:"50%",background:"rgba(255,255,255,.22)",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:38,marginBottom:8}}>{pet.emoji}</div><h2 style={{margin:"0 0 2px",fontSize:24,fontWeight:900}}>{pet.name}</h2><p style={{margin:0,fontSize:12,opacity:.9}}>{pet.type} · {pet.sex} · {pet.age}</p></div><div style={{display:"flex",gap:8,marginBottom:16}}>{[{l:"Weight",v:pet.weight,i:"⚖️"},{l:"DOB",v:pet.dob.slice(0,6),i:"🎂"},{l:"Chip",v:pet.chip==="N/A"?"None":pet.chip.slice(-4),i:"📟"}].map((s,i)=><Box key={i} style={{flex:1,textAlign:"center",padding:"10px 8px"}}><div style={{fontSize:16,marginBottom:4}}>{s.i}</div><div style={{fontSize:14,fontWeight:800,color:C.dark}}>{s.v}</div><div style={{fontSize:9,color:C.muted}}>{s.l}</div></Box>)}</div>{pet.allergies!=="None known"&&<Box style={{marginBottom:14,display:"flex",alignItems:"center",gap:10,border:`1px solid ${C.red}30`}}><span style={{fontSize:18}}>⚠️</span><div><div style={{fontSize:11,fontWeight:700,color:C.red}}>ALLERGY</div><div style={{fontSize:12,color:C.dark}}>{pet.allergies}</div></div></Box>}<Hdr icon="📈" label="WEIGHT TREND"/><Box style={{marginBottom:14}}><MiniChart data={pet.weights} color={pet.color} h={70}/></Box><Hdr icon="💉" label="VACCINATIONS"/><Box style={{marginBottom:14,padding:"6px 14px"}}>{pV.map((v,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderTop:i>0?`1px solid ${C.border}`:"none"}}><div style={{width:10,height:10,borderRadius:"50%",background:v.st==="done"?C.green:C.yellow,flexShrink:0}}/><div style={{flex:1}}><div style={{fontWeight:600,fontSize:12,color:C.dark}}>{v.name}</div><div style={{fontSize:10,color:C.muted}}>{v.date} · {v.vet} · {v.cost}</div></div><span style={{fontSize:10,fontWeight:700,color:v.st==="done"?C.green:C.orange,padding:"3px 8px",borderRadius:6,background:v.st==="done"?C.gl:C.ol}}>{v.st==="done"?"✓":"Due"}</span></div>)}</Box>{pM.length>0&&<><Hdr icon="💊" label="MEDICATIONS"/>{pM.map((m,i)=><Box key={i} style={{marginBottom:10}}><div style={{fontWeight:700,fontSize:13,color:C.dark}}>{m.name}</div><div style={{fontSize:11,color:C.muted,marginTop:3}}>{m.dose} · {m.freq}</div><div style={{display:"flex",alignItems:"center",gap:8,marginTop:8}}><div style={{flex:1,height:6,borderRadius:3,background:C.border}}><div style={{width:`${(m.rem/m.tot)*100}%`,height:6,borderRadius:3,background:m.rem<10?C.red:C.green}}/></div><span style={{fontSize:10,color:C.muted}}>{m.rem}/{m.tot}</span></div></Box>)}</>}<div style={{height:20}}/></div>}

// ── Activity ──
function ActivitySc({cg,onNav}){
  const cgD=CG.find(c=>c.id===cg);const today=ACT.filter(a=>a.time!=="Yesterday");const yest=ACT.filter(a=>a.time==="Yesterday");
  return <div className="scroll-area" style={{padding:"0 20px",flex:1,overflowY:"auto"}}><h1 style={{fontSize:22,fontWeight:800,margin:"8px 0 2px",color:C.dark}}>Activity Feed</h1><p style={{fontSize:12,color:C.muted,margin:"0 0 14px"}}>What every caregiver did — visible to all</p>

    {/* CLICKABLE quick actions — warm bg + chevron */}
    <Hdr label="QUICK ACTIONS" color={C.muted}/>
    <div style={{display:"flex",gap:8,marginBottom:16}}>
      {[{icon:"🐾",l:"Playdates",s:"Schedule new",tab:"play"},{icon:"💉",l:"Vaccinations",s:"Book / add",tab:"health"},{icon:"🏨",l:"Hostel",s:"Book a stay",tab:"hostel"}].map((a,i)=>
        <Tap key={i} onClick={()=>onNav(a.tab)} label="TAP" style={{flex:1,flexDirection:"column",textAlign:"center",padding:"12px 8px",alignItems:"center"}}><div style={{fontSize:22,marginBottom:4}}>{a.icon}</div><div style={{fontWeight:700,fontSize:11,color:C.dark}}>{a.l}</div><div style={{fontSize:9,color:C.orange,marginTop:2,fontWeight:600}}>{a.s}</div></Tap>
      )}
    </div>

    <Hdr label="TODAY" color={C.muted}/>{today.map((a,i)=><div key={i} style={{display:"flex",gap:12,marginBottom:2}}><div style={{display:"flex",flexDirection:"column",alignItems:"center",minWidth:50}}><span style={{fontSize:10,color:C.muted,fontWeight:600}}>{a.time}</span>{i<today.length-1&&<div style={{width:2,flex:1,background:C.border,minHeight:16,marginTop:4}}/>}</div><Box style={{flex:1,marginBottom:8}}><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}><span style={{fontSize:14}}>{a.icon}</span><span style={{fontWeight:700,fontSize:12,color:a.who===cgD.name?C.orange:C.teal}}>{a.who}</span><span style={{fontSize:9,color:C.muted,background:C.ol,padding:"1px 6px",borderRadius:4}}>{a.pet}</span></div><div style={{fontSize:12,color:C.dark,fontWeight:600}}>{a.action}</div>{a.detail&&<div style={{fontSize:10,color:C.muted,marginTop:3}}>{a.detail}</div>}</Box></div>)}
    <Hdr label="YESTERDAY" color={C.muted}/>{yest.map((a,i)=><Box key={i} style={{marginBottom:8}}><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}><span style={{fontSize:14}}>{a.icon}</span><span style={{fontWeight:700,fontSize:12,color:a.who===cgD.name?C.orange:C.teal}}>{a.who}</span><span style={{fontSize:9,background:C.ol,padding:"1px 6px",borderRadius:4,color:C.muted}}>{a.pet}</span></div><div style={{fontSize:12,color:C.dark,fontWeight:600}}>{a.action}</div>{a.detail&&<div style={{fontSize:10,color:C.muted,marginTop:3}}>{a.detail}</div>}</Box>)}

    <Hdr icon="💳" label="EXPENSES — AUG"/><Box style={{marginBottom:8}}><span style={{fontSize:16,fontWeight:800,color:C.dark}}>₹{EXPENSES.reduce((s,e)=>s+e.amount,0).toLocaleString()}</span><span style={{fontSize:10,color:C.muted,marginLeft:8}}>this month</span></Box>
    {EXPENSES.map((e,i)=><Box key={i} style={{marginBottom:6,padding:"10px 14px",display:"flex",justifyContent:"space-between"}}><div><div style={{fontSize:12,fontWeight:600,color:C.dark}}>{e.desc}</div><div style={{fontSize:10,color:C.muted,marginTop:1}}>{e.date} · {e.by}</div></div><span style={{fontSize:13,fontWeight:700,color:C.dark}}>₹{e.amount.toLocaleString()}</span></Box>)}

    {/* CLICKABLE manage section */}
    <div style={{marginTop:14,marginBottom:20}}>
      <Hdr label="MANAGE" color={C.muted}/>
      {[{icon:"🐾",l:"Schedule a Playdate",s:"Find a buddy for Bruno, Mia or Rio",tab:"play"},{icon:"💉",l:"Book a Vaccination",s:"Add a new record or book an appointment",tab:"health"},{icon:"🏨",l:"Book a Pet Hostel",s:"Verified boarding for your next trip",tab:"hostel"},{icon:"🩺",l:"Book a Vet Visit",s:"Find nearby specialists & book a slot",tab:"health"}].map((a,i)=>
        <Tap key={i} onClick={()=>onNav(a.tab)} label="TAP" style={{marginBottom:8}}>
          <div style={{width:40,height:40,borderRadius:10,background:C.ol,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{a.icon}</div>
          <div style={{flex:1}}><div style={{fontWeight:700,fontSize:13,color:C.dark}}>{a.l}</div><div style={{fontSize:10,color:C.muted,marginTop:2}}>{a.s}</div></div>
        </Tap>
      )}
    </div>
  </div>;
}

// ── Play ──
function PlaySc({onToast}){
  const[plays,sP]=useState(INIT_PLAY);const[sf,sSF]=useState(false);
  const[fP,sFP]=useState("Bruno");const[fB,sFB]=useState("");const[fO,sFO]=useState("");const[fL,sFL]=useState(SPOTS[0].name);const[fD,sFD]=useState("");const[fT,sFT]=useState("");const[fN,sFN]=useState("");
  const add=()=>{if(!fB||!fD||!fT)return;sP(p=>[...p,{id:Date.now(),pet:fP,buddy:fB,owner:fO||"—",location:fL,date:fD,time:fT,st:"pending",notes:fN}]);sSF(false);sFB("");sFO("");sFD("");sFT("");sFN("");onToast(`Playdate scheduled: ${fP} with ${fB}`)};
  return <div className="scroll-area" style={{padding:"0 20px",flex:1,overflowY:"auto"}}><h1 style={{fontSize:22,fontWeight:800,margin:"8px 0 2px",color:C.dark}}>Playdates & Social</h1><p style={{fontSize:12,color:C.muted,margin:"0 0 14px"}}>Find trusted companions near you</p>
    <Btn onClick={()=>sSF(!sf)} style={{marginBottom:16}}>{sf?"✕ Close Form":"+ Schedule a New Playdate"}</Btn>
    {sf&&<Box style={{marginBottom:16,border:`2px solid ${C.orange}`}}><h3 style={{margin:"0 0 12px",fontSize:14,fontWeight:800,color:C.dark}}>New Playdate</h3><Sel label="Your Pet" value={fP} onChange={sFP} options={PETS.map(p=>p.name)}/><Inp label="Buddy's Name & Breed" value={fB} onChange={sFB} placeholder="e.g. Rocky (Labrador)"/><Inp label="Buddy's Owner" value={fO} onChange={sFO} placeholder="e.g. Rahul"/><Sel label="Location" value={fL} onChange={sFL} options={SPOTS.map(s=>s.name)}/><div style={{display:"flex",gap:8}}><div style={{flex:1}}><Inp label="Date" value={fD} onChange={sFD} placeholder="e.g. 25 Aug"/></div><div style={{flex:1}}><Inp label="Time" value={fT} onChange={sFT} placeholder="e.g. 5:00 PM"/></div></div><Inp label="Notes (optional)" value={fN} onChange={sFN} placeholder="e.g. Bring tennis ball"/><div style={{display:"flex",gap:8}}><Btn onClick={()=>sSF(false)} secondary style={{flex:1}}>Cancel</Btn><Btn onClick={add} style={{flex:1}}>Schedule</Btn></div></Box>}
    <Hdr icon="📅" label="UPCOMING PLAYDATES" action={`${plays.length} total`}/>{plays.map(p=><Box key={p.id} style={{marginBottom:10,display:"flex",alignItems:"center",gap:14}}><div style={{width:44,height:44,borderRadius:"50%",background:C.ol,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{PETS.find(x=>x.name===p.pet)?.emoji}</div><div style={{flex:1}}><div style={{fontWeight:700,fontSize:13,color:C.dark}}>{p.pet} & {p.buddy}</div><div style={{fontSize:10,color:C.muted,marginTop:2}}>{p.location}</div><div style={{fontSize:10,color:C.muted,marginTop:1}}>{p.date}, {p.time}{p.owner!=="—"?` · ${p.owner}`:""}</div>{p.notes&&<div style={{fontSize:9,color:C.teal,marginTop:2,fontStyle:"italic"}}>{p.notes}</div>}</div><span style={{fontSize:10,fontWeight:700,padding:"4px 8px",borderRadius:6,background:p.st==="confirmed"?C.gl:C.ol,color:p.st==="confirmed"?C.green:C.orange}}>{p.st==="confirmed"?"Confirmed":"Pending"}</span></Box>)}
    <Hdr icon="📍" label="NEARBY SPOTS"/>{SPOTS.map((n,i)=><Box key={i} style={{marginBottom:8}}><div style={{fontWeight:700,fontSize:12,color:C.dark}}>{n.name}</div><div style={{fontSize:10,color:C.muted,marginTop:2}}>{n.dist} · ⭐ {n.rating} · {n.type}{n.active>0?` · ${n.active} pets playing now`:""}</div></Box>)}<div style={{height:16}}/>
  </div>;
}

// ── Health ──
function HealthSc({onToast}){
  const[sD,sSD]=useState(2);const[sT,sST]=useState("11:00 AM");const[sV,sSV]=useState(0);const[booked,sB]=useState(false);const[vF,sVF]=useState("all");const[svf,sSVF]=useState(false);const[aV,sAV]=useState([]);
  const[fP,sFP]=useState("Bruno");const[fV,sFV]=useState("");const[fD,sFD]=useState("");const[fVt,sFVt]=useState(VETS[0].name);const[fC,sFC]=useState("");
  const days=[{d:"MON",n:"3"},{d:"TUE",n:"4"},{d:"WED",n:"5"},{d:"THU",n:"6"},{d:"FRI",n:"7"}];const times=["9:00 AM","11:00 AM","1:00 PM","3:00 PM","4:30 PM","6:00 PM"];
  const all=[...INIT_VAX,...aV];const flt=vF==="all"?all:all.filter(v=>v.pet.toLowerCase()===vF);
  const addV=()=>{if(!fV||!fD)return;sAV(p=>[...p,{pet:fP,petId:PETS.find(p2=>p2.name===fP)?.id,name:fV,date:fD,st:"upcoming",vet:fVt,cost:fC||"—"}]);sSVF(false);sFV("");sFD("");sFC("");onToast(`Added: ${fV} for ${fP}`)};
  return <div className="scroll-area" style={{padding:"0 20px",flex:1,overflowY:"auto"}}><h1 style={{fontSize:22,fontWeight:800,margin:"8px 0 2px",color:C.dark}}>Book a Vet Visit</h1><p style={{fontSize:12,color:C.muted,margin:"0 0 14px"}}>For Rio · Wing & nail trim + wellness check</p>
    <div style={{display:"flex",gap:6,marginBottom:12}}>{days.map((d,i)=><button key={i} onClick={()=>sSD(i)} style={{flex:1,padding:"8px 2px",borderRadius:10,border:"none",cursor:"pointer",background:sD===i?C.orange:"transparent",color:sD===i?C.white:C.dark,display:"flex",flexDirection:"column",alignItems:"center",gap:1,boxShadow:sD===i?"0 2px 8px rgba(232,113,43,.3)":"none"}}><span style={{fontSize:9,fontWeight:600}}>{d.d}</span><span style={{fontSize:18,fontWeight:800}}>{d.n}</span></button>)}</div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:16}}>{times.map(t=><button key={t} onClick={()=>sST(t)} style={{padding:"9px 4px",borderRadius:10,border:sT===t?`2px solid ${C.orange}`:`1.5px solid ${C.border}`,background:sT===t?C.orange:C.white,color:sT===t?C.white:C.dark,fontWeight:600,fontSize:12,cursor:"pointer"}}>{t}</button>)}</div>
    <Hdr icon="🏥" label="NEARBY SPECIALISTS"/>
    {/* Vet cards — CLICKABLE */}
    {VETS.map((v,i)=><Tap key={i} onClick={()=>sSV(i)} label={sV===i?"SELECTED":"TAP"} style={{marginBottom:8,borderLeft:sV===i?`3.5px solid ${C.teal}`:`3.5px solid ${C.tapBorder}`,background:sV===i?C.tl:C.tapBg}}><div style={{width:44,height:44,borderRadius:12,background:sV===i?C.teal+"22":C.tl,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{v.emoji}</div><div style={{flex:1}}><div style={{fontWeight:700,fontSize:13,color:C.dark}}>{v.name}</div><div style={{fontSize:10,color:C.muted,marginTop:2}}>{v.dist} · ⭐ {v.rating} ({v.reviews})</div><div style={{fontSize:10,color:C.teal,fontWeight:600,marginTop:2}}>{v.price} · {v.hours}</div></div></Tap>)}
    {booked&&<Box style={{marginBottom:12,border:`2px solid ${C.green}`,background:C.gl}}><div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:20}}>✅</span><span style={{fontWeight:800,fontSize:14,color:C.dark}}>Confirmed!</span></div><div style={{fontSize:12,color:C.dark,marginTop:4}}>{VETS[sV].name} · Wed {days[sD].n} · {sT} · {VETS[sV].price}</div><div style={{fontSize:11,color:C.teal,marginTop:4,fontWeight:600}}>Reminder sent to all caregivers ✓</div></Box>}
    <Btn onClick={()=>{if(!booked){sB(true);onToast(`Booked: ${VETS[sV].name}`)}}} disabled={booked} style={{marginBottom:16,background:booked?C.green:C.teal,boxShadow:booked?"none":`0 4px 16px ${C.teal}40`}}>{booked?"✓ Confirmed":"Confirm Appointment"}</Btn>

    <Hdr icon="💉" label="VACCINATION TRACKER" action="+ Add Record" onAction={()=>sSVF(!svf)}/>
    {svf&&<Box style={{marginBottom:12,border:`2px solid ${C.orange}`}}><h3 style={{margin:"0 0 12px",fontSize:14,fontWeight:800,color:C.dark}}>Add Vaccination / Appointment</h3><Sel label="Pet" value={fP} onChange={sFP} options={PETS.map(p=>p.name)}/><Inp label="Vaccine / Test Name" value={fV} onChange={sFV} placeholder="e.g. Rabies Booster"/><Inp label="Scheduled Date" value={fD} onChange={sFD} placeholder="e.g. 15 Oct 2026"/><Sel label="Vet / Clinic" value={fVt} onChange={sFVt} options={VETS.map(v=>v.name)}/><Inp label="Estimated Cost" value={fC} onChange={sFC} placeholder="e.g. ₹750"/><div style={{display:"flex",gap:8}}><Btn onClick={()=>sSVF(false)} secondary style={{flex:1}}>Cancel</Btn><Btn onClick={addV} style={{flex:1}}>Save Record</Btn></div></Box>}
    <div style={{display:"flex",gap:6,marginBottom:12}}>{["all","bruno","mia","rio"].map(f=><Pill key={f} label={f} active={vF===f} onClick={()=>sVF(f)}/>)}</div>
    <Box style={{marginBottom:20,padding:"6px 14px"}}>{flt.map((v,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderTop:i>0?`1px solid ${C.border}`:"none"}}><div style={{width:10,height:10,borderRadius:"50%",background:v.st==="done"?C.green:C.yellow,flexShrink:0}}/><div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontWeight:600,fontSize:12,color:C.dark}}>{v.name}</span><span style={{fontSize:9,color:C.muted,background:C.cream,padding:"1px 5px",borderRadius:4}}>{v.pet}</span></div><div style={{fontSize:10,color:C.muted,marginTop:2}}>{v.date} · {v.vet} · {v.cost}</div></div><span style={{fontSize:10,fontWeight:700,color:v.st==="done"?C.green:C.orange,padding:"3px 8px",borderRadius:6,background:v.st==="done"?C.gl:C.ol}}>{v.st==="done"?"✓ Done":"Due"}</span></div>)}</Box>
  </div>;
}

// ── Hostel ──
function HostelSc({onToast}){
  const[exp,sE]=useState(null);const[bk,sB]=useState(null);const[sb,sSB]=useState(null);
  const[bF,sBF]=useState("2 Aug 2026");const[bT,sBT]=useState("6 Aug 2026");const[bP,sBP]=useState("Bruno, Mia");const[bN,sBN]=useState("");const dt={nights:4};
  return <div className="scroll-area" style={{padding:"0 20px",flex:1,overflowY:"auto"}}><h1 style={{fontSize:22,fontWeight:800,margin:"8px 0 2px",color:C.dark}}>Book a Pet Hostel</h1><p style={{fontSize:12,color:C.muted,margin:"0 0 12px"}}>Find verified boarding near you</p>
    <Box style={{marginBottom:14,display:"flex",alignItems:"center",gap:8,padding:"10px 16px"}}><span style={{fontSize:14}}>📍</span><span style={{fontSize:12,color:C.muted,flex:1}}>Near Kolhapur · 1 dog, 1 cat</span><span style={{fontSize:11,color:C.orange,fontWeight:600,cursor:"pointer"}}>Edit ›</span></Box>
    {HOSTELS.map((h,i)=>{const isE=exp===i;const isB=bk===i;const tot=h.price*dt.nights*2;return <div key={i} style={{borderRadius:16,overflow:"hidden",marginBottom:14,border:isB?`2px solid ${C.green}`:`1px solid ${C.border}`,background:C.white,boxShadow:C.shadow}}>
      {/* Banner — CLICKABLE to expand */}
      <div style={{background:h.color,padding:"24px 16px",display:"flex",justifyContent:"center",cursor:"pointer",position:"relative"}} onClick={()=>sE(isE?null:i)}><span style={{fontSize:36}}>{h.emoji}</span><div style={{position:"absolute",bottom:8,right:12,fontSize:9,color:C.orange,fontWeight:700,background:"rgba(255,255,255,0.8)",padding:"2px 8px",borderRadius:6}}>{isE?"▲ Collapse":"▼ Tap to expand"}</div></div>
      <div style={{padding:"14px 16px"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{fontWeight:800,fontSize:15,color:C.dark}}>{h.name}</div><div style={{display:"flex",alignItems:"center",gap:4,background:C.yl,padding:"3px 8px",borderRadius:8}}><span style={{fontSize:11}}>⭐</span><span style={{fontWeight:700,fontSize:12}}>{h.rating}</span><span style={{fontSize:10,color:C.muted}}>({h.reviews})</span></div></div><div style={{fontSize:12,color:C.muted,marginTop:4}}>₹{h.price}/night per pet · ✓ Verified</div><div style={{display:"flex",gap:6,marginTop:8,flexWrap:"wrap"}}>{h.tags.map((t,j)=><span key={j} style={{padding:"3px 8px",borderRadius:6,background:C.cream,fontSize:10,color:C.dark}}>{t}</span>)}</div>
        {isE&&<div style={{marginTop:12,paddingTop:12,borderTop:`1px solid ${C.border}`}}><div style={{fontSize:11,fontWeight:700,color:C.teal,marginBottom:6}}>AMENITIES</div><div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>{h.features.map((f,j)=><span key={j} style={{padding:"4px 10px",borderRadius:8,background:C.tl,fontSize:10,fontWeight:600,color:C.td}}>✓ {f}</span>)}</div><div style={{fontSize:11,color:C.muted,marginBottom:12}}>Owner: {h.owner} · {h.phone}</div>
          {isB?<Box style={{background:C.gl,border:`1.5px solid ${C.green}`,textAlign:"center"}}><span style={{fontSize:14}}>✅</span><div style={{fontWeight:700,fontSize:13,color:C.dark,marginTop:4}}>Booking Confirmed</div><div style={{fontSize:11,color:C.muted,marginTop:2}}>Sent to all caregivers</div></Box>
          :sb===i?<Box style={{border:`2px solid ${C.orange}`,background:C.op}}><h3 style={{margin:"0 0 12px",fontSize:14,fontWeight:800,color:C.dark}}>Booking Details</h3><Inp label="Check-in" value={bF} onChange={sBF}/><Inp label="Check-out" value={bT} onChange={sBT}/><Inp label="Pets" value={bP} onChange={sBP}/><Inp label="Special Instructions" value={bN} onChange={sBN} placeholder="e.g. Bruno needs glucosamine with dinner"/><Box style={{marginBottom:10,background:C.cream,border:"none"}}><div style={{display:"flex",justifyContent:"space-between",fontSize:12}}><span style={{color:C.muted}}>2 pets × {dt.nights} nights × ₹{h.price}</span><span style={{fontWeight:800,color:C.dark}}>₹{tot.toLocaleString()}</span></div></Box><div style={{display:"flex",gap:8}}><Btn onClick={()=>sSB(null)} secondary style={{flex:1}}>Cancel</Btn><Btn onClick={()=>{sB(i);sSB(null);onToast(`Booked ${h.name}`)}} style={{flex:1}}>Confirm · ₹{tot.toLocaleString()}</Btn></div></Box>
          :<Btn onClick={()=>sSB(i)}>Book Now</Btn>}
        </div>}
        {!isE&&<Btn onClick={()=>sE(i)} secondary style={{marginTop:8,fontSize:12,padding:"10px"}}>View Details & Book ›</Btn>}
      </div></div>})}<div style={{height:16}}/></div>;
}

// ── Profile ──
function ProfileSc({cg,onSwitch,onSub}){
  const[sub,sS]=useState("main");const cgD=CG.find(c=>c.id===cg);
  if(sub==="pets")return <div className="scroll-area" style={{padding:"0 20px",flex:1,overflowY:"auto"}}><button onClick={()=>sS("main")} style={{background:"none",border:"none",color:C.orange,fontSize:13,fontWeight:600,cursor:"pointer",padding:"8px 0"}}>← Back</button><h1 style={{fontSize:22,fontWeight:800,margin:"0 0 14px",color:C.dark}}>My Pets</h1>{PETS.map(p=><Tap key={p.id} onClick={()=>onSub(`pet:${p.id}`)} label="TAP" style={{marginBottom:10}}><div style={{width:50,height:50,borderRadius:"50%",background:`linear-gradient(135deg,${p.gradient[0]},${p.gradient[1]})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0}}>{p.emoji}</div><div style={{flex:1}}><div style={{fontWeight:700,fontSize:15,color:C.dark}}>{p.name}</div><div style={{fontSize:11,color:C.muted}}>{p.type} · {p.age} · {p.weight}</div><div style={{fontSize:10,color:C.teal,marginTop:2}}>{p.nextVax}</div></div></Tap>)}<button style={{width:"100%",padding:"14px",borderRadius:14,border:`2px dashed ${C.border}`,background:"transparent",color:C.muted,fontSize:13,cursor:"pointer",marginTop:8}}>+ Add a Pet</button></div>;
  if(sub==="household")return <div className="scroll-area" style={{padding:"0 20px",flex:1,overflowY:"auto"}}><button onClick={()=>sS("main")} style={{background:"none",border:"none",color:C.orange,fontSize:13,fontWeight:600,cursor:"pointer",padding:"8px 0"}}>← Back</button><h1 style={{fontSize:22,fontWeight:800,margin:"0 0 14px",color:C.dark}}>Household Members</h1>{CG.map(c=><Box key={c.id} style={{marginBottom:10,display:"flex",alignItems:"center",gap:14}}><div style={{width:50,height:50,borderRadius:"50%",background:C.ol,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,border:`2px solid ${c.color}`}}>{c.emoji}</div><div style={{flex:1}}><div style={{fontWeight:700,fontSize:15,color:C.dark}}>{c.full}</div><div style={{fontSize:10,fontWeight:700,color:c.color,marginTop:2}}>{c.role}</div><div style={{fontSize:11,color:C.muted,marginTop:2}}>{c.desc}</div><div style={{fontSize:10,color:C.muted,marginTop:2}}>{c.phone}</div></div></Box>)}<button style={{width:"100%",padding:"14px",borderRadius:14,border:`2px dashed ${C.border}`,background:"transparent",color:C.muted,fontSize:13,cursor:"pointer",marginTop:8}}>+ Invite Member</button></div>;
  if(sub==="expenses")return <div className="scroll-area" style={{padding:"0 20px",flex:1,overflowY:"auto"}}><button onClick={()=>sS("main")} style={{background:"none",border:"none",color:C.orange,fontSize:13,fontWeight:600,cursor:"pointer",padding:"8px 0"}}>← Back</button><h1 style={{fontSize:22,fontWeight:800,margin:"0 0 4px",color:C.dark}}>Expenses</h1><Box style={{marginBottom:14,textAlign:"center"}}><div style={{fontSize:28,fontWeight:900,color:C.dark}}>₹{EXPENSES.reduce((s,e)=>s+e.amount,0).toLocaleString()}</div><div style={{fontSize:11,color:C.muted,marginTop:2}}>Total this month</div></Box><div style={{display:"flex",gap:8,marginBottom:14}}>{CG.map(c=>{const t=EXPENSES.filter(e=>e.by===c.name).reduce((s,e)=>s+e.amount,0);return <Box key={c.id} style={{flex:1,textAlign:"center",padding:"10px 8px"}}><div style={{fontSize:20,marginBottom:4}}>{c.emoji}</div><div style={{fontSize:14,fontWeight:800,color:C.dark}}>₹{t.toLocaleString()}</div><div style={{fontSize:9,color:C.muted}}>{c.name}</div></Box>})}</div>{EXPENSES.map((e,i)=><Box key={i} style={{marginBottom:6,padding:"10px 14px",display:"flex",justifyContent:"space-between"}}><div><div style={{fontSize:12,fontWeight:600,color:C.dark}}>{e.desc}</div><div style={{fontSize:10,color:C.muted,marginTop:1}}>{e.date} · {e.by}</div></div><span style={{fontSize:13,fontWeight:700,color:C.dark}}>₹{e.amount.toLocaleString()}</span></Box>)}<div style={{height:16}}/></div>;

  // Main profile — clickable items have Tap style, static ones don't
  const menu=[{i:"🐾",l:"My Pets",s:`${PETS.length} pets`,k:"pets",tap:true},{i:"👨‍👩‍👧",l:"Household",s:`${CG.length} caregivers`,k:"household",tap:true},{i:"💳",l:"Expenses",s:`₹${EXPENSES.reduce((s,e)=>s+e.amount,0).toLocaleString()}`,k:"expenses",tap:true},{i:"📋",l:"Medical Records",s:`${INIT_VAX.length} records`,k:"",tap:false},{i:"💊",l:"Medications",s:`${MEDS.length} active`,k:"",tap:false},{i:"🔔",l:"Notifications",s:"Role-routed",k:"",tap:false,b:cgD.notifs},{i:"🌐",l:"Language & Voice",s:"English · Hindi",k:"",tap:false},{i:"⭐",l:"PawCircle+",s:"Free plan",k:"",tap:false,b:"NEW"},{i:"🔒",l:"Privacy",s:"Manage access",k:"",tap:false},{i:"❓",l:"Help",s:"FAQs, chat",k:"",tap:false}];
  return <div className="scroll-area" style={{padding:"0 20px",flex:1,overflowY:"auto"}}><div style={{display:"flex",alignItems:"center",gap:16,margin:"8px 0 16px"}}><div style={{width:60,height:60,borderRadius:"50%",background:C.ol,display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,border:`2.5px solid ${C.orange}`}}>{cgD.emoji}</div><div style={{flex:1}}><div style={{fontWeight:800,fontSize:20,color:C.dark}}>{cgD.full}</div><div style={{fontSize:11,color:C.orange,fontWeight:700,marginTop:1}}>{cgD.role}</div><div style={{fontSize:10,color:C.muted,marginTop:2}}>{cgD.phone}</div></div></div>
    <div style={{display:"flex",gap:8,marginBottom:16}}>{[{v:PETS.length,l:"Pets",i:"🐾"},{v:CG.length,l:"Caregivers",i:"👥"},{v:INIT_VAX.filter(v=>v.st==="upcoming").length,l:"Due",i:"💉"},{v:MEDS.length,l:"Meds",i:"💊"}].map((s,i)=><Box key={i} style={{flex:1,textAlign:"center",padding:"10px 6px"}}><div style={{fontSize:14,marginBottom:2}}>{s.i}</div><div style={{fontSize:18,fontWeight:800,color:C.dark}}>{s.v}</div><div style={{fontSize:9,color:C.muted}}>{s.l}</div></Box>)}</div>
    {menu.map((m,i)=>{
      // CLICKABLE menu items get warm bg + orange left + chevron with TAP label
      // STATIC items get white bg + grey border + faded chevron
      const isTap = m.tap;
      return <div key={i} onClick={()=>m.k&&sS(m.k)} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",marginBottom:4,borderRadius:10,cursor:isTap?"pointer":"default",background:isTap?C.tapBg:C.white,borderLeft:isTap?`3.5px solid ${C.orange}`:`3.5px solid transparent`,border:isTap?undefined:`1px solid ${C.border}`,boxShadow:isTap?C.tapShadow:"none"}}>
        <div style={{width:32,height:32,borderRadius:8,background:isTap?C.ol:C.cream,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>{m.i}</div>
        <div style={{flex:1}}><div style={{fontWeight:600,fontSize:13,color:C.dark}}>{m.l}</div><div style={{fontSize:10,color:C.muted,marginTop:1}}>{m.s}</div></div>
        {m.b==="NEW"&&<span style={{fontSize:8,fontWeight:700,padding:"2px 6px",borderRadius:4,background:C.orange,color:C.white}}>NEW</span>}
        {typeof m.b==="number"&&<span style={{fontSize:9,fontWeight:800,padding:"2px 6px",borderRadius:8,background:C.red,color:C.white}}>{m.b}</span>}
        {isTap?<div style={{display:"flex",flexDirection:"column",alignItems:"center"}}><span style={{fontSize:18,color:C.orange,fontWeight:600}}>›</span><span style={{fontSize:7,color:C.orange,fontWeight:700}}>TAP</span></div>:<span style={{fontSize:16,color:C.border}}>›</span>}
      </div>})}
    <Btn onClick={onSwitch} secondary style={{marginTop:16,marginBottom:8}}>Switch Caregiver</Btn>
    <button style={{width:"100%",padding:"14px",borderRadius:14,border:`1.5px solid ${C.border}`,background:"transparent",color:C.muted,fontSize:13,cursor:"pointer",marginBottom:20}}>Sign Out</button>
  </div>;
}

// ── Main ──
export default function App(){
  const[scr,sS]=useState("splash");const[tab,sT]=useState("home");const[cg,sC]=useState(1);const[toast,sTst]=useState({msg:"",show:false});const[ov,sO]=useState(null);const[reels,sR]=useState(false);
  const tt=useCallback(msg=>{sTst({msg,show:true});setTimeout(()=>sTst({msg:"",show:false}),2500)},[]);
  const nav=t=>{sT(t);sO(null)};
  const body=()=>{
    if(scr==="splash")return <Splash onStart={()=>sS("caregiver")}/>;
    if(scr==="caregiver")return <CgSc selId={cg} onSelect={id=>{sC(id);sS("app");sT("home");tt(`Signed in as ${CG.find(c=>c.id===id)?.name}`)}}/>;
    if(reels)return <ReelsSc onBack={()=>sR(false)}/>;
    if(ov?.startsWith("pet:"))return <PetProf petId={parseInt(ov.split(":")[1])} onBack={()=>sO(null)}/>;
    switch(tab){case"home":return <HomeSc cg={cg} onToast={tt} onViewPet={id=>sO(`pet:${id}`)}/>;case"activity":return <ActivitySc cg={cg} onNav={nav}/>;case"play":return <PlaySc onToast={tt}/>;case"health":return <HealthSc onToast={tt}/>;case"hostel":return <HostelSc onToast={tt}/>;case"profile":return <ProfileSc cg={cg} onSwitch={()=>sS("caregiver")} onSub={s=>{if(s.startsWith("pet:"))sO(s)}}/>;default:return <HomeSc cg={cg} onToast={tt} onViewPet={id=>sO(`pet:${id}`)}/>;}
  };
  return <div style={{width:"100%",maxWidth:390,margin:"0 auto",height:"100vh",maxHeight:844,background:scr==="splash"||reels?C.dark:C.cream,display:"flex",flexDirection:"column",borderRadius:24,overflow:"hidden",fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",boxShadow:"0 8px 48px rgba(0,0,0,.18)",position:"relative"}}><Toast msg={toast.msg} show={toast.show}/>{scr!=="splash"&&<SBar dark={reels}/>}{body()}{scr==="app"&&!ov&&!reels&&<BotNav active={tab} onNav={nav} nc={CG.find(c=>c.id===cg)?.notifs} onFab={()=>sR(true)}/>}</div>;
}
