// app.jsx — root + Tweaks + nav + lightbox controller
const { useState: aUseState, useEffect: aUseEffect, useRef: aUseRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "parchment",
  "typeMode": "cormorant_inter",
  "cursorOn": true,
  "grain": 0.05,
  "accent": "#A8864B",
  "animationIntensity": "calm"
}/*EDITMODE-END*/;

const TYPE_PAIRS = {
  cormorant_inter: { serif: '"Cormorant Garamond", Georgia, serif', sans: '"Inter", sans-serif' },
  playfair_work:   { serif: '"Playfair Display", Georgia, serif', sans: '"Work Sans", sans-serif' },
  ebgaramond_mono: { serif: '"EB Garamond", Georgia, serif', sans: '"JetBrains Mono", monospace' },
  cormorant_mono:  { serif: '"Cormorant Garamond", Georgia, serif', sans: '"JetBrains Mono", monospace' },
};

function Nav({ onJump }) {
  return (
    <nav className="nav">
      <a className="brand" href="#top" data-cursor="home">
        <svg className="mark" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="11" cy="11" r="10"/>
          <line x1="11" y1="1" x2="11" y2="21"/>
          <line x1="11" y1="11" x2="20" y2="6"/>
        </svg>
        <span>Echoes of Karbala</span>
      </a>
      <div className="links">
        <a href="Works.html" data-cursor="works"
           onClick={(e)=>{e.preventDefault(); window.location.href="Works.html";}}>Works</a>
        <a href="#about" onClick={(e)=>{e.preventDefault();onJump("about");}} data-cursor="about">About</a>
        <a href="#concept" onClick={(e)=>{e.preventDefault();onJump("concept");}} data-cursor="philosophy">Philosophy</a>
        <a href="#contact" onClick={(e)=>{e.preventDefault();onJump("contact");}} className="nav-cta" data-cursor="write">Contact</a>
      </div>
    </nav>
  );
}

function ScrollReveal() {
  aUseEffect(() => {
    const els = document.querySelectorAll(".fade-up:not(.in)");
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [openId, setOpenId] = aUseState(null);

  // apply theme to document
  aUseEffect(() => {
    document.documentElement.dataset.theme = t.theme === "dark" ? "dark" : "light";
    document.documentElement.style.setProperty("--grain-opacity", t.grain);
    document.documentElement.style.setProperty("--gold", t.accent);
    const pair = TYPE_PAIRS[t.typeMode] || TYPE_PAIRS.cormorant_inter;
    document.documentElement.style.setProperty("--serif", pair.serif);
    document.documentElement.style.setProperty("--sans", pair.sans);
  }, [t.theme, t.grain, t.accent, t.typeMode]);

  const jump = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onPrev = () => {
    if (!openId) return;
    const i = window.WORKS.findIndex(w => w.id === openId);
    setOpenId(window.WORKS[(i - 1 + window.WORKS.length) % window.WORKS.length].id);
  };
  const onNext = () => {
    if (!openId) return;
    const i = window.WORKS.findIndex(w => w.id === openId);
    setOpenId(window.WORKS[(i + 1) % window.WORKS.length].id);
  };

  return (
    <>
      <Nav onJump={jump}/>
      <ScrollReveal/>
      <window.Cursor enabled={t.cursorOn}/>

      <main id="top">
        <window.Hero onEnter={() => { window.location.href = "Works.html"; }}/>
        <window.About/>
        <window.Concept/>
        <window.Foot/>
      </main>

      <window.Lightbox workId={openId} onClose={()=>setOpenId(null)} onPrev={onPrev} onNext={onNext}/>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Atmosphere"/>
        <TweakRadio label="Theme" value={t.theme}
                    options={[{value:"parchment",label:"Parchment"},{value:"dark",label:"Charcoal"}]}
                    onChange={(v)=>setTweak("theme", v)}/>
        <TweakSlider label="Grain" value={t.grain} min={0} max={0.18} step={0.01}
                     onChange={(v)=>setTweak("grain", v)}/>
        <TweakColor label="Gold accent" value={t.accent}
                    onChange={(v)=>setTweak("accent", v)}/>

        <TweakSection label="Typography"/>
        <TweakSelect label="Pairing" value={t.typeMode}
                     options={[
                       {value:"cormorant_inter", label:"Cormorant + Inter"},
                       {value:"playfair_work",   label:"Playfair + Work Sans"},
                       {value:"ebgaramond_mono", label:"EB Garamond + Mono"},
                       {value:"cormorant_mono",  label:"Cormorant + Mono"},
                     ]}
                     onChange={(v)=>setTweak("typeMode", v)}/>

        <TweakSection label="Interaction"/>
        <TweakToggle label="Custom cursor" value={t.cursorOn}
                     onChange={(v)=>setTweak("cursorOn", v)}/>
        <TweakRadio label="Animation" value={t.animationIntensity}
                    options={["calm","present","cinematic"]}
                    onChange={(v)=>setTweak("animationIntensity", v)}/>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
