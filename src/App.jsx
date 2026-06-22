import React, { useState } from 'react';

const domainData = {
  ai: {
    label: "Artificial Intelligence & Data Science",
    prefixes: ["Neural", "Deep", "Cognitive", "Tensor", "Quantum", "Synapse", "Vector", "Cortex", "Alpha", "Omega", "Logix", "Mind", "Automata", "Cyber", "Sigmoid"],
    suffixes: ["Nodes", "Agents", "Hub", "Net", "Matrix", "Mind", "Sparks", "Lab", "Systems", "Brain", "Compute", "Logic", "Cluster", "Foundry", "Decoders"],
    slogans: ["Training models, breaking boundaries.", "Architecting the next cognitive leap.", "Decoding complexities with intelligence.", "Where data meets destined logic."]
  },
  webdev: {
    label: "Web Development & Software Engineering",
    prefixes: ["Stack", "Null", "Byte", "Syntax", "Error", "Script", "Source", "Logic", "Dev", "Bit", "Macro", "Micro", "Cloud", "Array", "Buffer"],
    suffixes: ["Pointers", "Overflow", "Devs", "Crafters", "Engine", "Builders", "Array", "Forge", "Stack", "Labs", "Studio", "Concepts", "Tokens", "Scripts", "Pixels"],
    slogans: ["Turning coffee into production-ready software.", "Compiling dreams into clean code.", "Slicing high-latency bottlenecks.", "Building highly scalable responsive realities."]
  },
  cyber: {
    label: "Cybersecurity & Infosec Matrix",
    prefixes: ["Crypt", "Shield", "Vault", "Proxy", "Breach", "Sentry", "Cipher", "Sec", "Phish", "Zero", "Root", "Defend", "Token", "Ghost", "Malware"],
    suffixes: ["Ops", "Guards", "Patrol", "Protocols", "Squad", "Wall", "Defenders", "Block", "Armor", "Secures", "Key", "Fortress", "Shadows", "Sentinels", "Bypass"],
    slogans: ["Securing the perimeter, isolating the exploit.", "Hardening layers, enforcing zero trust.", "Decoupling vectors from adversarial breaches.", "Your cryptographic wall in an open world."]
  },
  cloud: {
    label: "Cloud Computing & Systems Architecture",
    prefixes: ["Cloud", "Nexus", "Hyper", "Vessel", "Grid", "Cluster", "Elastic", "Docker", "SaaS", "Kubernetes", "Micro", "Node", "Core", "Transit", "Apex"],
    suffixes: ["Scale", "Compute", "Funnels", "Pipelines", "Orchestra", "Swarms", "Instances", "Volumes", "Gateways", "Routers", "Sync", "Cells", "Pods", "Fabrics", "Balancers"],
    slogans: ["Orchestrating high-availability microservices worldwide.", "Seamless scaling across decentralized instances.", "Deploying high-frequency throughput across the fabric.", "Zero downtime, total global persistence."]
  }
};

const brandPersonalities = [
  { id: "prof-trust", label: "Professional & Trustworthy", letterSpacing: "1", strokeWidth: "3.5" },
  { id: "mod-innov", label: "Modern & Innovative", letterSpacing: "2", strokeWidth: "2" },
  { id: "lux-prem", label: "Luxury & Premium", letterSpacing: "8", strokeWidth: "1.5" },
  { id: "creat-art", label: "Creative & Artistic", letterSpacing: "0", strokeWidth: "4" },
  { id: "pow-bold", label: "Powerful & Bold", letterSpacing: "-1", strokeWidth: "6" },
  { id: "friend-simp", label: "Friendly & Simple", letterSpacing: "3", strokeWidth: "3" }
];

const logoStyles = [
  { id: "minimalist", label: "Minimalist (Flat Design, Clean Design, Outline Style)" },
  { id: "modern-style", label: "Modern (Geometric, Abstract, Gradient Design, Glassmorphism)" },
  { id: "premium-style", label: "Premium (Luxury emblem, Golden style, Monogram)" },
  { id: "futuristic-style", label: "Futuristic (Cyberpunk, Sci-fi, AI-inspired, Neon glow)" },
  { id: "traditional", label: "Traditional (Vintage, Retro, Heritage)" },
  { id: "artistic", label: "Artistic (Watercolor, Brush stroke, Hand-drawn, 3D illustration)" }
];

const colorPalettes = [
  { id: "bw-mono", label: "Minimal: Black & White Monochrome", g1: "#000000", g2: "#64748b", g3: "#ffffff", bg: "#ffffff", text: "#000000" },
  { id: "charcoal-w", label: "Minimal: Charcoal Gray + White", g1: "#334155", g2: "#64748b", g3: "#cbd5e1", bg: "#ffffff", text: "#1e293b" },
  { id: "navy-silv", label: "Minimal: Navy Blue + Silver", g1: "#1e3a8a", g2: "#94a3b8", g3: "#e2e8f0", bg: "#ffffff", text: "#1e293b" },
  { id: "midn-cyan", label: "Minimal: Midnight Blue + Cyan", g1: "#0f172a", g2: "#06b6d4", g3: "#22d3ee", bg: "#ffffff", text: "#0f172a" },
  { id: "elec-cyan", label: "Tech: Electric Blue + Neon Cyan", g1: "#00f2fe", g2: "#00d2ff", g3: "#06b6d4", bg: "#030712", text: "#ffffff" },
  { id: "purp-elec", label: "Tech: Purple + Electric Blue", g1: "#7f00ff", g2: "#3b82f6", g3: "#00f2fe", bg: "#030712", text: "#ffffff" },
  { id: "tech-neon", label: "Tech: Blue Gradient + Neon Blue + Dark Background", g1: "#2563eb", g2: "#3b82f6", g3: "#1d4ed8", bg: "#020617", text: "#a78bfa" },
  { id: "holographic", label: "Tech: Holographic Multi-Color Gradient", g1: "#38bdf8", g2: "#f472b6", g3: "#fbbf24", bg: "#05050a", text: "#ffffff" },
  { id: "matte-gold", label: "Luxury: Matte Black + Gold", g1: "#f59e0b", g2: "#d97706", g3: "#78350f", bg: "#09090b", text: "#fef08a" },
  { id: "black-rose", label: "Luxury: Black + Rose Gold", g1: "#fb7185", g2: "#fda4af", g3: "#4c0519", bg: "#050505", text: "#ffe4e6" },
  { id: "royal-purp-g", label: "Luxury: Royal Purple + Gold", g1: "#6d28d9", g2: "#fbbf24", g3: "#4c1d95", bg: "#1e1b4b", text: "#fef08a" },
  { id: "deep-silv", label: "Luxury: Deep Blue + Metallic Silver", g1: "#1e3a8a", g2: "#94a3b8", g3: "#0f172a", bg: "#020617", text: "#cbd5e1" },
  { id: "rainbow-g", label: "Creative: Rainbow Gradient", g1: "#ec4899", g2: "#fb923c", g3: "#22d3ee", bg: "#0c0206", text: "#ffffff" },
  { id: "orange-pink-g", label: "Creative: Orange + Pink Gradient", g1: "#f97316", g2: "#ec4899", g3: "#f43f5e", bg: "#0c0206", text: "#ffe4e6" },
  { id: "pastel-multi", label: "Creative: Pastel Multi-Color Palette", g1: "#a78bfa", g2: "#86efac", g3: "#67e8f9", bg: "#110b1c", text: "#f3e8ff" },
  { id: "red-black", label: "Bold: Red + Black", g1: "#ef4444", g2: "#dc2626", g3: "#000000", bg: "#0f0505", text: "#fee2e2" },
  { id: "crim-w", label: "Bold: Crimson + White", g1: "#dc2626", g2: "#991b1b", g3: "#ffffff", bg: "#0c0206", text: "#fecdd3" },
  { id: "hotpink-b", label: "Bold: Hot Pink + Black", g1: "#ec4899", g2: "#db2777", g3: "#000000", bg: "#14040a", text: "#fdf2f8" }
];

const colorMoods = [
  { id: "corp-mood", label: "Professional (Serious, Corporate)", opacity: "1.0", mixBlend: "normal" },
  { id: "tech-mood", label: "Technology (Advanced, Cybernetic, Smart)", opacity: "0.95", mixBlend: "screen" },
  { id: "lux-mood", label: "Luxury (Elegant, Exclusive, Wealthy)", opacity: "0.9", mixBlend: "luminosity" },
  { id: "energy-mood", label: "Energy & Power (Dynamic, Competitive)", opacity: "1.0", mixBlend: "color-dodge" },
  { id: "creat-mood", label: "Creative & Playful (Youthful, Experimental)", opacity: "0.85", mixBlend: "multiply" },
  { id: "calm-mood", label: "Calm & Natural (Peaceful, Balanced)", opacity: "0.8", mixBlend: "normal" },
  { id: "human-mood", label: "Emotional & Human (Warm, Welcoming)", opacity: "0.95", mixBlend: "overlay" },
  { id: "mystery-mood", label: "Mysterious & Dark (Dramatic, Elite)", opacity: "0.7", mixBlend: "difference" }
];

const logoLayouts = [
  { id: "wordmark", label: "Wordmark (Full Brand Name)" },
  { id: "lettermark", label: "Lettermark (Initials Template)" },
  { id: "monogram", label: "Monogram (Combined Intricate Letters)" },
  { id: "symbol-mark", label: "Symbol-Based: Icon Only / Abstract mark" },
  { id: "combination", label: "Combination: Icon + Text (Above/Beside/Inside)" },
  { id: "emblem", label: "Emblem: Circular badge / Shield / Seal / Crest" }
];

const iconIdeas = [
  { id: "code", label: "Tech: Code Brackets </>, Terminal Window", path: "M9.4,16.6L4.8,12l4.6-4.6L8,6l-6,6l6,6L9.4,16.6z M14.6,16.6l4.6-4.6l-4.6-4.6L16,6l6,6l-6,6L14.6,16.6z" },
  { id: "circuit", label: "Tech: Circuit Lines, AI Brain, Neural Network", path: "M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10,10-4.48,10-10S17.52,2,12,2zm1,17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45,12.9,13,13.5,13,15h-2v-.5c0-1.1,.45-2.1,1.17-2.83l1.24-1.26c.37-.36,.59-.86,.59-1.41,0-1.1-.9-2-2-2s-2,.9-2,2H7c0-2.76,2.24-5,5-5s5,2.24,5,5c0,1.04-.42,1.99-1.07,2.75z" },
  { id: "globe", label: "Corporate: Globe, Building, Briefcase", path: "M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M11,4.08C7.03,4.56 4,7.93 4,12C4,13.34 4.34,14.6 4.94,15.7L11,4.08" },
  { id: "crown", label: "Corporate Prestige: Crown, Shield, Crest", path: "M5 16L12 3 19 16H5z M12 11.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z M17 19h2v2h-2v-2z M5 19h2v2H5v-2z" },
  { id: "lightning", label: "Strength: Lightning Bolt, Lion, Eagle", path: "M11.5,2H5L3,13H9L7,22L18,10H12L11.5,2Z" },
  { id: "creative-spark", label: "Creative: Spark, Flame, Brush, Camera", path: "M12,2L14.8,8.5L22,9.2L16.5,14L18.2,21L12,17.3L5.8,21L7.5,14L2,9.2L9.2,8.5L12,2Z" }
];

const typographyStyles = [
  { id: "modern-sans", label: "Modern: Sans-serif / Geometric / Tech / Futuristic Font", font: 'system-ui, -apple-system, sans-serif', weight: '900', transform: 'uppercase' },
  { id: "prof-bold", label: "Professional: Bold / Clean Structural Font", font: '"Arial Black", Gadget, sans-serif', weight: '800', transform: 'none' },
  { id: "luxury-serif", label: "Luxury: Serif / Elegant Thin Premium Lettering", font: 'Cinzel, Garamond, "Times New Roman", serif', weight: '300', transform: 'uppercase' },
  { id: "creative-brush", label: "Creative: Handwritten / Custom Typography", font: '"Brush Script MT", "Comic Sans MS", cursive', weight: '700', transform: 'none' }
];

const geometricShapes = [
  { id: "circle", label: "Basic Geometry: Circle / Oval Frame" },
  { id: "square", label: "Basic Geometry: Square / Rectangle Template" },
  { id: "triangle", label: "Basic Geometry: Triangle / Diamond Frame" },
  { id: "hexagon", label: "Basic Geometry: Hexagon / Pentagon" },
  { id: "polygon-mesh", label: "Modern Tech: Polygon Mesh / Cube Frame" },
  { id: "digital-grid", label: "Modern Tech: Digital Grid Boundaries" },
  { id: "water-drop", label: "Organic Fluid: Water Drop Outline" },
  { id: "organic-curve", label: "Organic Fluid: Liquid Wave Matrix" },
  { id: "strong-shield", label: "Strong & Premium: Shield / Badge" },
  { id: "crown-shape", label: "Strong & Premium: Armor Plate" },
  { id: "neural-net", label: "Tech & AI: Neural Network Frame" },
  { id: "ai-eye", label: "Tech & AI: Data Nodes Connections" }
];

const visualEffects = [
  { id: "modern-fx", label: "Modern Effects: Gradient, Depth, Glassmorphism" },
  { id: "premium-fx", label: "Premium Effects: Gold Foil, Silver Embossed Look" },
  { id: "futuristic-fx", label: "Futuristic Effects: Neon Glow, Holographic Rays" }
];

const logoCompositions = [
  { id: "symmetrical", label: "Symmetrical / Centered Alignment" },
  { id: "asymmetrical", label: "Asymmetrical / Dynamic Shifts" },
  { id: "horizontal", label: "Horizontal / Responsive Matrix Layout" }
];

const backgroundPreferences = [
  { id: "dark-theme", label: "Dark Theme / Pitch Dark Canvas" },
  { id: "light-theme", label: "Light Theme / Pure Crisp Clean Canvas" },
  { id: "gradient-bg", label: "Dynamic Chromatic Mesh Gradient Field" }
];

export default function App() {
  const [domain, setDomain] = useState("webdev");
  const [teamName, setTeamName] = useState("Error Array");
  const [slogan, setSlogan] = useState("Compiling dreams into clean code.");
  const [initials, setInitials] = useState("EA");
  const [personality, setPersonality] = useState("mod-innov");
  const [style, setStyle] = useState("futuristic-style");
  const [palette, setPalette] = useState(colorPalettes[4]);
  const [mood, setMood] = useState("tech-mood");
  const [layout, setLayout] = useState("combination");
  const [icon, setIcon] = useState(iconIdeas[0]);
  const [typography, setTypography] = useState("modern-sans");
  const [shape, setShape] = useState("neural-net");
  const [effect, setEffect] = useState("futuristic-fx");
  const [composition, setComposition] = useState("symmetrical");
  const [bgPref, setBgPref] = useState("dark-theme");

  const runVectorGeneration = () => {
    const data = domainData[domain];
    const p = data.prefixes[Math.floor(Math.random() * data.prefixes.length)];
    const s = data.suffixes[Math.floor(Math.random() * data.suffixes.length)];
    const sl = data.slogans[Math.floor(Math.random() * data.slogans.length)];
    setTeamName(`${p} ${s}`);
    setSlogan(sl);
    setInitials((p[0] + s[0]).toUpperCase());
  };

  const downloadMasterSVG = () => {
    const svg = document.getElementById("master-branding-canvas");
    const xml = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([xml], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${teamName.toLowerCase().replace(/\s+/g, '-')}-identity-asset.svg`;
    link.click();
  };

  const activeFontConfig = typographyStyles.find(t => t.id === typography) || typographyStyles[0];
  const activePersonality = brandPersonalities.find(p => p.id === personality) || brandPersonalities[0];
  const activeMood = colorMoods.find(m => m.id === mood) || colorMoods[0];
  const canvasBgColor = bgPref === "dark-theme" ? "#07070a" : bgPref === "light-theme" ? "#ffffff" : "url(#bg-gradient-mesh)";

  const getFillGradient = () => {
    if (style === "premium-style" || effect === "premium-fx") return "url(#premium-gold-grad)";
    if (style === "minimalist") return "none";
    return "url(#master-checklist-grad)";
  };

  const getStrokeGradient = () => {
    if (style === "premium-style") return "url(#premium-gold-grad)";
    return "url(#master-checklist-grad)";
  };

  const getStrokeDashArray = () => {
    if (style === "futuristic-style") return "8,4";
    if (style === "traditional") return "4,4";
    return "none";
  };

  const getMoodSkewTransform = () => {
    if (mood === "energy-mood") return "skewX(-6)";
    if (mood === "creat-mood") return "rotate(3 160 150)";
    return "";
  };

  return (
    <div className="min-h-screen bg-[#030306] text-slate-300 p-4 lg:p-8 font-sans antialiased selection:bg-purple-500 selection:text-white">
  
      <header className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-900 pb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-500 bg-clip-text text-transparent">HACKTAG STUDIO PRESTIGE V3</h1>
          <p className="text-[10px] font-mono tracking-widest text-slate-500 uppercase mt-1">11-Axis Enterprise Vector Architecture Suite</p>
        </div>
        <div className="text-left md:text-right border-l-2 border-cyan-500 pl-4">
          <p className="text-sm font-bold text-slate-200">Logo Design Control Panel</p>
          <p className="text-xs text-slate-500 font-mono">Instant Export Suite</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* COMPONENT INTERACTION CONTROL INDEX */}
        <div className="lg:col-span-5 bg-slate-950/80 border border-slate-900 p-6 rounded-2xl space-y-5 max-h-[820px] overflow-y-auto pr-2 scrollbar-thin">
          <h2 className="text-xs font-black tracking-widest text-cyan-400 uppercase border-b border-slate-900 pb-2">Checklist Option Parameter Matrices</h2>
          {/* AXIS 1 */}
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-slate-400 mb-1 uppercase font-mono tracking-wider">1. Brand Purpose</label>
            <select value={domain} onChange={(e) => setDomain(e.target.value)} className="w-full bg-[#0a0a0f] border border-slate-800 rounded-lg p-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors">
              {Object.keys(domainData).map(key => <option key={key} value={key}>{domainData[key].label}</option>)}
            </select>
          </div>
          {/* AXIS 2 */}
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-slate-400 mb-1 uppercase font-mono tracking-wider">2. Brand Personality Matrix (Adjusts Spacing)</label>
            <select value={personality} onChange={(e) => setPersonality(e.target.value)} className="w-full bg-[#0a0a0f] border border-slate-800 rounded-lg p-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors">
              {brandPersonalities.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
            </select>
          </div>
          {/* AXIS 3 */}
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-slate-400 mb-1 uppercase font-mono tracking-wider">3. Design Style Profile (Transforms Shaders)</label>
            <select value={style} onChange={(e) => setStyle(e.target.value)} className="w-full bg-[#0a0a0f] border border-slate-800 rounded-lg p-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors">
              {logoStyles.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          </div>
          {/* AXIS 4 & 5 GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-slate-400 mb-1 uppercase font-mono tracking-wider">4. Color Palette</label>
              <select 
                value={palette.id} 
                onChange={(e) => setPalette(colorPalettes.find(x => x.id === e.target.value))} 
                className="w-full bg-[#0a0a0f] border border-slate-800 rounded-lg p-2 pr-8 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors truncate appearance-none cursor-pointer"
                style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1em' }}
              >
                {colorPalettes.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-slate-400 mb-1 uppercase font-mono tracking-wider">5. Color Mood (Skews Layout)</label>
              <select 
                value={mood} 
                onChange={(e) => setMood(e.target.value)} 
                className="w-full bg-[#0a0a0f] border border-slate-800 rounded-lg p-2 pr-8 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors truncate appearance-none cursor-pointer"
                style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1em' }}
              >
                {colorMoods.map(m => <option key={m.id} value={m.id}>{m.label}</option>)}
              </select>
            </div>
          </div>
          {/* AXIS 6 & 7 GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-slate-400 mb-1 uppercase font-mono tracking-wider">6. Logo Layout Type</label>
              <select 
                value={layout} 
                onChange={(e) => setLayout(e.target.value)} 
                className="w-full bg-[#0a0a0f] border border-slate-800 rounded-lg p-2 pr-8 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors truncate appearance-none cursor-pointer"
                style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1em' }}
              >
                {logoLayouts.map(l => <option key={l.id} value={l.id}>{l.label}</option>)}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-slate-400 mb-1 uppercase font-mono tracking-wider">7. Icon Idea Vector</label>
              <select 
                value={icon.id} 
                onChange={(e) => setIcon(iconIdeas.find(x => x.id === e.target.value))} 
                className="w-full bg-[#0a0a0f] border border-slate-800 rounded-lg p-2 pr-8 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors truncate appearance-none cursor-pointer"
                style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1em' }}
              >
                {iconIdeas.map(i => <option key={i.id} value={i.id}>{i.label}</option>)}
              </select>
            </div>
          </div>
          {/* AXIS 8 */}
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-slate-400 mb-1 uppercase font-mono tracking-wider">8. Typography Matrix</label>
            <select value={typography} onChange={(e) => setTypography(e.target.value)} className="w-full bg-[#0a0a0f] border border-slate-800 rounded-lg p-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors">
              {typographyStyles.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
            </select>
          </div>
          {/* AXIS 9 & 10 GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-slate-400 mb-1 uppercase font-mono tracking-wider">9. Geometric Silhouette Frame</label>
              <select value={shape} onChange={(e) => setShape(e.target.value)} className="w-full bg-[#0a0a0f] border border-slate-800 rounded-lg p-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors">
                {geometricShapes.map(g => <option key={g.id} value={g.id}>{g.label}</option>)}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-slate-400 mb-1 uppercase font-mono tracking-wider">10. Visual Rendering FX</label>
              <select value={effect} onChange={(e) => setEffect(e.target.value)} className="w-full bg-[#0a0a0f] border border-slate-800 rounded-lg p-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors">
                {visualEffects.map(fx => <option key={fx.id} value={fx.id}>{fx.label}</option>)}
              </select>
            </div>
          </div>
          {/* AXIS 11 & 12 GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-slate-400 mb-1 uppercase font-mono tracking-wider">11. Alignment Composition</label>
              <select value={composition} onChange={(e) => setComposition(e.target.value)} className="w-full bg-[#0a0a0f] border border-slate-800 rounded-lg p-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors">
                {logoCompositions.map(cp => <option key={cp.id} value={cp.id}>{cp.label}</option>)}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-slate-400 mb-1 uppercase font-mono tracking-wider">12. Background Setup</label>
              <select value={bgPref} onChange={(e) => setBgPref(e.target.value)} className="w-full bg-[#0a0a0f] border border-slate-800 rounded-lg p-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors">
                {backgroundPreferences.map(bg => <option key={bg.id} value={bg.id}>{bg.label}</option>)}
              </select>
            </div>
          </div>
          <button onClick={runVectorGeneration} className="w-full py-4 mt-2 bg-gradient-to-r from-cyan-500 via-indigo-600 to-pink-500 hover:opacity-95 text-slate-950 font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-xl">
            ✦ Compile Advanced Vector Profile
          </button>
        </div>

        {/* DISPLAY MODULE */}
        <div className="lg:col-span-7 bg-[#050508] border border-slate-900 rounded-3xl p-4 sm:p-8 flex flex-col items-center justify-center min-h-[620px] relative overflow-hidden">
          <div className="p-8 rounded-2xl transition-all duration-300 border border-slate-900" style={{ backgroundColor: canvasBgColor }}>
            <svg 
              id="master-branding-canvas" 
              width={composition === "horizontal" ? "480" : "320"} 
              height="320" 
              viewBox={composition === "horizontal" ? "0 0 480 320" : "0 0 320 320"}
              xmlns="http://www.w3.org/2000/svg"
              className="transition-all duration-300"
              style={{ opacity: activeMood.opacity }}
            >
              <defs>
                <linearGradient id="master-checklist-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={palette.g1} />
                  <stop offset="50%" stopColor={palette.g2} />
                  <stop offset="100%" stopColor={palette.g3} />
                </linearGradient>
                <linearGradient id="premium-gold-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#bf953f" />
                  <stop offset="25%" stopColor="#fcf6ba" />
                  <stop offset="50%" stopColor="#b38728" />
                  <stop offset="75%" stopColor="#fbf5b7" />
                  <stop offset="100%" stopColor="#aa771c" />
                </linearGradient>
                <linearGradient id="bg-gradient-mesh" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e1b4b" />
                  <stop offset="50%" stopColor="#0f172a" />
                  <stop offset="100%" stopColor="#311042" />
                </linearGradient>
                <filter id="neon-glow-engine">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <g transform={getMoodSkewTransform()} style={{ mixBlendMode: activeMood.mixBlend }}>
                {layout !== "wordmark" && (
                  <g 
                    stroke={getStrokeGradient()} 
                    strokeWidth={activePersonality.strokeWidth}
                    strokeDasharray={getStrokeDashArray()}
                    strokeLinecap={personality === "friend-simp" ? "round" : "miter"}
                    fill="none"
                    filter={effect === "futuristic-fx" || style === "futuristic-style" ? "url(#neon-glow-engine)" : ""}
                  >
                    {shape === "strong-shield" && <path d="M160,35 L265,65 L250,215 L160,275 L70,215 L55,65 Z" />}
                    {shape === "hexagon" && <polygon points="160,30 265,90 265,210 160,270 55,210 55,90" />}
                    {shape === "circle" && <circle cx="160" cy="150" r="110" />}
                    {shape === "square" && <rect x="55" y="45" width="210" height="210" rx={personality === "friend-simp" ? "30" : "12"} />}
                    {shape === "triangle" && <polygon points="160,30 270,235 50,235" />}
                    {shape === "polygon-mesh" && (
                      <g strokeWidth="1">
                        <polygon points="160,35 250,90 250,200 160,255 70,200 70,90" />
                        <line x1="160" y1="35" x2="160" y2="255" />
                        <line x1="70" y1="200" x2="250" y2="90" />
                      </g>
                    )}
                    {shape === "digital-grid" && (
                      <g strokeWidth="1" strokeDasharray="2,2">
                        <rect x="60" y="50" width="200" height="200" strokeDasharray="none" />
                        <line x1="110" y1="50" x2="110" y2="250" /><line x1="160" y1="50" x2="160" y2="250" />
                        <line x1="60" y1="100" x2="260" y2="100" /><line x1="60" y1="150" x2="260" y2="150" />
                      </g>
                    )}
                    {shape === "water-drop" && <path d="M160,40 C160,40 250,130 250,180 C250,225 210,260 160,260 C110,260 70,225 70,180 C70,130 160,40 160,40 Z" />}
                    {shape === "organic-curve" && <path d="M160,45 C230,25 275,100 255,160 C235,220 200,265 140,255 C80,245 55,180 75,120 C95,60 90,65 160,45 Z" />}
                    {shape === "crown-shape" && <path d="M70,240 L50,90 L105,130 L160,60 L215,130 L270,90 L250,240 Z" />}
                    {shape === "neural-net" && (
                      <g strokeWidth="1">
                        <polygon points="160,50 250,110 230,210 90,210 70,110" />
                        <line x1="160" y1="50" x2="230" y2="210" opacity="0.4" />
                        <line x1="70" y1="110" x2="250" y2="110" opacity="0.4" />
                      </g>
                    )}
                    {shape === "ai-eye" && (
                      <g>
                        <path d="M60,150 Q160,60 260,150 Q160,240 60,150 Z" />
                        <circle cx="160" cy="150" r="35" strokeDasharray="4,2" />
                      </g>
                    )}
                  </g>
                )}
                {layout !== "wordmark" && (
                  <g transform={composition === "horizontal" ? "translate(110, 115) scale(3.5) translate(-12, -12)" : "translate(160, 115) scale(3.5) translate(-12, -12)"}>
                    <path d={icon.path} fill={getFillGradient()} />
                  </g>
                )}
                {layout !== "symbol-mark" && (
                  <text 
                    x={composition === "horizontal" ? "240" : "160"} 
                    y={layout === "combination" ? "235" : composition === "horizontal" ? "160" : "165"} 
                    textAnchor={composition === "horizontal" ? "start" : "middle"}
                    fill={getFillGradient() === "none" ? "url(#master-checklist-grad)" : getFillGradient()}
                    fontSize={layout === "wordmark" ? "36" : "28"} 
                    fontWeight={activeFontConfig.weight}
                    fontFamily={activeFontConfig.font}
                    textTransform={activeFontConfig.transform}
                    letterSpacing={parseInt(activePersonality.letterSpacing) + (typography === "luxury-serif" ? 4 : 0)}
                    style={{ 
                      filter: effect === "futuristic-fx" || style === "futuristic-style" ? 'url(#neon-glow-engine)' : 'none',
                    }}
                  >
                    {layout === "wordmark" ? teamName : initials}
                  </text>
                )}
              </g>
            </svg>
          </div>
          <div className="mt-6 text-center space-y-1">
            <h3 className="text-3xl font-black text-white tracking-tight">{teamName}</h3>
            <p className="text-cyan-400 font-mono text-xs italic tracking-widest uppercase">“{slogan}”</p>
          </div>
          <button onClick={downloadMasterSVG} className="mt-6 px-8 py-2.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-slate-400 hover:text-white transition-all rounded-full">
             Download Logo SVG
          </button>
          
          {/* MANDATORY: Name and Email - Static display */}
          <div className="mt-8 flex flex-col items-center gap-1 w-full max-w-[240px]">
            <p className="text-sm font-bold text-slate-200">Mukti Kumari</p>
            <p className="text-xs text-slate-400 font-mono">kumarimukti789@gmail.com</p>
          </div>

          {/* MANDATORY: Built for Digital Heroes Link */}
          <a 
            href="https://digitalheroesco.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-6 inline-block px-6 py-3 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-all shadow-lg hover:shadow-cyan-500/25"
          >
            Built for Digital Heroes
          </a>
        </div>
      </main>

      {/* Footer with additional info */}
      <footer className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-900 text-center">
        <p className="text-[10px] text-slate-600 font-mono">
          Created by Mukti Kumari · kumarimukti789@gmail.com · 
          <a href="https://digitalheroesco.com" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:text-cyan-400 ml-1">
            Built for Digital Heroes
          </a>
        </p>
      </footer>
    </div>
  );
}