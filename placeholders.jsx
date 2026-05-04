// placeholders.jsx — renders real artwork images, with tonal SVG fallback for missing ones.
const { useMemo } = React;

function ArtImage({ work, density = 1 }) {
  if (work && work.image) {
    return (
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url("${work.image}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "var(--parchment-2)",
      }} className="img" role="img" aria-label={work.title}/>
    );
  }
  // Fallback: tonal wash if no image attached
  const c1 = (work && work.palette && work.palette[0]) || "#1a1614";
  const c2 = (work && work.palette && work.palette[1]) || "#a8864b";
  const c3 = (work && work.palette && work.palette[2]) || "#e8dcc4";
  return (
    <svg viewBox="0 0 100 125" preserveAspectRatio="xMidYMid slice"
         className="img" style={{ width: "100%", height: "100%", display: "block" }}>
      <defs>
        <linearGradient id={`sky-${work?.id||'x'}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c2} stopOpacity="0.8"/>
          <stop offset="55%" stopColor={c3} stopOpacity="0.95"/>
          <stop offset="100%" stopColor={c1}/>
        </linearGradient>
      </defs>
      <rect width="100" height="125" fill={`url(#sky-${work?.id||'x'})`}/>
    </svg>
  );
}

function PortraitPlaceholder() {
  return (
    <svg viewBox="0 0 100 125" preserveAspectRatio="xMidYMid slice"
         style={{ width: "100%", height: "100%", display: "block", background: "var(--parchment-2)" }}>
      <defs>
        <radialGradient id="prt" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#a8864b" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="#1a1614" stopOpacity="0.05"/>
        </radialGradient>
      </defs>
      <rect width="100" height="125" fill="url(#prt)"/>
      <ellipse cx="50" cy="50" rx="14" ry="16" fill="#1a1614" fillOpacity="0.18"/>
      <path d="M30,90 Q50,70 70,90 L70,125 L30,125 Z" fill="#1a1614" fillOpacity="0.18"/>
      <text x="50" y="118" fontFamily="JetBrains Mono, monospace" fontSize="3.5"
            fill="#1a1614" fillOpacity="0.5" textAnchor="middle" letterSpacing="0.4">
        [PORTRAIT — IRFAN HUSSAIN]
      </text>
    </svg>
  );
}

window.ArtPlaceholder = ArtImage;
window.PortraitPlaceholder = PortraitPlaceholder;
