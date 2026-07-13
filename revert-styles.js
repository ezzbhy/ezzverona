const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const replacements = {
  // 1. Root variables
  [`:root{
  --bg-gradient: linear-gradient(125deg, #050b14 0%, #0a1128 40%, #060d1f 100%);
  --bg:#050b14;--s1:rgba(10, 17, 40, 0.4);--s2:rgba(16, 25, 53, 0.5);--s3:#1a2754;--s4:#2a3f7a;
  --bdr:rgba(0, 242, 254, 0.15);--bdr2:rgba(0, 242, 254, 0.4);
  --blue:#00f2fe;--gold:#f9d423;--gold2:#ff4e50;
  --green:#00f2fe;--red:#ff0844;--amber:#f9d423;--violet:#b224ef;
  --txt:#ffffff;--txt2:#a0aec0;--txt3:#718096;
  --r:24px;--rs:14px;
}`]: 
  `:root{\n  --bg:#06090f;--s1:#0b1018;--s2:#101820;--s3:#162030;--s4:#1c2a3e;\n  --bdr:rgba(80,160,255,.1);--bdr2:rgba(80,160,255,.22);\n  --blue:#3b9eff;--gold:#d4a843;--gold2:#e8c56a;\n  --green:#10b981;--red:#ef4444;--amber:#f59e0b;--violet:#8b5cf6;\n  --txt:#ddeeff;--txt2:#7a9ab8;--txt3:#3d5a73;\n  --r:12px;--rs:8px;\n}`,

  // 2. Body background
  "body{background:var(--bg-gradient);color:var(--txt);font-family:'Tajawal',sans-serif;direction:rtl;min-height:100vh;overflow-x:hidden;position:relative;z-index:0}\nbody::before{content:'';position:fixed;top:-50%;left:-50%;width:200%;height:200%;background:radial-gradient(circle at 50% 50%, rgba(0,242,254,0.1), transparent 60%), radial-gradient(circle at 80% 20%, rgba(178,36,239,0.15), transparent 50%);z-index:-1;animation:pulseGlow 10s ease-in-out infinite alternate;pointer-events:none}\n@keyframes pulseGlow{0%{transform:scale(1) rotate(0deg)}100%{transform:scale(1.1) rotate(5deg)}}":
  "body{background:var(--bg);color:var(--txt);font-family:'Tajawal',sans-serif;direction:rtl;min-height:100vh;transition:background .4s,color .4s;overflow-x:hidden}",

  // 3. Sidebar
  ".sb{width:252px;background:var(--s1);backdrop-filter:blur(30px);-webkit-backdrop-filter:blur(30px);border-left:1px solid rgba(255,255,255,0.05);display:flex;flex-direction:column;position:fixed;right:0;top:0;bottom:0;z-index:300;transition:transform .3s cubic-bezier(.4,0,.2,1);box-shadow:-10px 0 40px rgba(0,242,254,0.05)}":
  ".sb{width:252px;background:var(--s1);border-left:1px solid var(--bdr);display:flex;flex-direction:column;position:fixed;right:0;top:0;bottom:0;z-index:300;transition:transform .3s cubic-bezier(.4,0,.2,1)}",

  // 4. Topbar
  ".topbar{height:70px;padding:0 20px;background:linear-gradient(to bottom, rgba(5,11,20,0.8), transparent);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-bottom:1px solid rgba(255,255,255,0.03);display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100;overflow:hidden}":
  ".topbar{height:58px;padding:0 10px;background:var(--s1);border-bottom:1px solid var(--bdr);display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100;overflow:hidden}",

  // 5. Cards (Main big cards)
  ".card{background:var(--s1);backdrop-filter:blur(25px);-webkit-backdrop-filter:blur(25px);border:1px solid rgba(255,255,255,0.05);border-top:1px solid rgba(255,255,255,0.15);border-radius:var(--r);padding:24px;margin-bottom:24px;box-shadow:0 15px 35px rgba(0,0,0,0.4), 0 0 20px rgba(0,242,254,0.05);transition:all .4s ease}\n.card:hover{transform:translateY(-2px);box-shadow:0 15px 35px rgba(0,0,0,0.4), 0 0 30px rgba(0,242,254,0.15);border-top:1px solid rgba(0,242,254,0.4)}":
  ".card{background:var(--s1);border:1px solid var(--bdr);border-radius:var(--r);padding:20px;margin-bottom:16px}",

  // 6. Small cards (Stats)
  ".sc{background:linear-gradient(145deg, rgba(16,25,53,0.6), rgba(10,17,40,0.4));backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.04);border-top:1px solid rgba(255,255,255,0.1);border-radius:var(--r);padding:20px;transition:all .4s cubic-bezier(.175,.885,.32,1.275);box-shadow:0 8px 25px rgba(0,0,0,0.3)}\n.sc:hover{transform:translateY(-8px) scale(1.03);border-color:var(--blue);border-top:1px solid var(--blue);box-shadow:0 15px 35px rgba(0,0,0,0.4), 0 0 25px rgba(0,242,254,0.3);background:rgba(16,25,53,0.8)}":
  ".sc{background:var(--s1);border:1px solid var(--bdr);border-radius:var(--r);padding:16px;transition:transform .2s,border-color .2s}\n.sc:hover{transform:translateY(-2px);border-color:var(--bdr2)}",

  // 7. Buttons (Primary)
  ".bb{background:linear-gradient(135deg,#00f2fe,#4facfe);color:#050b14;font-weight:900;box-shadow:0 0 15px rgba(0,242,254,0.4);border-radius:var(--r);border:none}\n.bb:hover{transform:translateY(-3px) scale(1.02);box-shadow:0 0 30px rgba(0,242,254,0.7);}":
  ".bb{background:linear-gradient(135deg,#1a6fcc,#2a8ae0);color:#fff;box-shadow:0 3px 12px rgba(59,158,255,.22)}\n.bb:hover{transform:translateY(-1px)}",

  // 8. Staff Cards
  ".staff-card{display:flex;align-items:center;gap:12px;padding:14px 16px;background:linear-gradient(90deg, rgba(16,25,53,0.4), rgba(10,17,40,0.3));border-radius:var(--r);border:1px solid rgba(255,255,255,0.05);position:relative;transition:all 0.4s ease;overflow:hidden;backdrop-filter:blur(10px)}\n.staff-card:hover{border-color:rgba(0,242,254,0.4);transform:translateX(-8px);background:rgba(16,25,53,0.7);box-shadow:0 0 20px rgba(0,242,254,0.15)}":
  ".staff-card{display:flex;align-items:center;gap:12px;padding:12px 14px;background:var(--s2);border-radius:var(--rs);border:1px solid var(--bdr);position:relative}",
  
  // 9. Input fields
  ".fi{width:100%;padding:14px 18px;background:rgba(5,11,20,0.6);border:1px solid rgba(255,255,255,0.1);border-radius:var(--r);color:var(--txt);font-family:'Tajawal',sans-serif;font-size:14px;outline:none;transition:all .4s ease;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}\n.fi:focus{border-color:var(--blue);box-shadow:0 0 0 4px rgba(0,242,254,0.2), inset 0 0 10px rgba(0,242,254,0.1);background:rgba(10,17,40,0.8)}":
  ".fi{width:100%;padding:10px 13px;background:var(--s2);border:1px solid var(--bdr);border-radius:var(--rs);color:var(--txt);font-family:'Tajawal',sans-serif;font-size:14px;outline:none;transition:border-color .2s}"
};

let matchCount = 0;
for (const [key, value] of Object.entries(replacements)) {
  if (content.includes(key)) {
    content = content.replace(key, value);
    matchCount++;
  } else {
    console.log("NOT FOUND:", key.substring(0, 50) + "...");
  }
}

console.log("Replaced", matchCount, "items");
fs.writeFileSync('index.html', content);
