// hero.jsx — horizontal sliding carousel of starred paintings
const { useEffect: heroUseEffect, useState: heroUseState, useRef: heroUseRef } = React;

function Hero({ onEnter }) {
  // Five featured paintings cycle through the hero
  const featured = ["w02", "w01", "w03", "w04", "w09"]
    .map(id => window.WORKS.find(w => w.id === id))
    .filter(Boolean);
  const N = featured.length;

  const [idx, setIdx] = heroUseState(0);
  const [dir, setDir] = heroUseState(1); // +1 forward, -1 back
  const [drag, setDrag] = heroUseState(null); // {x0, dx} during touch/drag
  const [paused, setPaused] = heroUseState(false);

  const goNext = () => { setDir(1); setIdx(i => (i + 1) % N); };
  const goPrev = () => { setDir(-1); setIdx(i => (i - 1 + N) % N); };
  const goTo = (i) => { setDir(i > idx ? 1 : -1); setIdx(i); };

  // Auto-advance unless paused
  heroUseEffect(() => {
    if (paused) return;
    const t = setInterval(goNext, 6000);
    return () => clearInterval(t);
  }, [paused, idx, N]);

  // Keyboard
  heroUseEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft")  goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Touch / pointer drag
  const onPtrDown = (e) => {
    setPaused(true);
    setDrag({ x0: e.clientX || (e.touches && e.touches[0].clientX) || 0, dx: 0 });
  };
  const onPtrMove = (e) => {
    if (!drag) return;
    const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    setDrag({ ...drag, dx: x - drag.x0 });
  };
  const onPtrUp = () => {
    if (!drag) return;
    const threshold = 60;
    if (drag.dx < -threshold) goNext();
    else if (drag.dx > threshold) goPrev();
    setDrag(null);
    setTimeout(() => setPaused(false), 400);
  };

  const cur = featured[idx];

  return (
    <section className="hero" data-screen-label="00 Hero"
             onMouseEnter={() => setPaused(true)}
             onMouseLeave={() => setPaused(false)}>
      <div className="hero-art" aria-hidden="true"
           onMouseDown={onPtrDown} onMouseMove={onPtrMove} onMouseUp={onPtrUp} onMouseLeave={onPtrUp}
           onTouchStart={onPtrDown} onTouchMove={onPtrMove} onTouchEnd={onPtrUp}>
        {featured.map((w, i) => {
          // Position: previous = -100%, current = 0, next = +100%
          let position = "hidden";
          if (i === idx) position = "current";
          else if (i === (idx - 1 + N) % N) position = "prev";
          else if (i === (idx + 1) % N)     position = "next";
          const dragOffset = (drag && i === idx) ? drag.dx : 0;
          return (
            <div key={w.id}
                 className={`slide slide-${position}`}
                 style={{
                   transform: `translateX(calc(var(--slide-x) + ${dragOffset}px))`,
                   transition: drag ? "none" : "transform 1s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.9s ease",
                 }}>
              <div className="slide-img">
                <window.ArtPlaceholder work={w}/>
              </div>
              <div className="slide-overlay"/>
            </div>
          );
        })}
      </div>

      <div className="hero-content">
        <div>
          <div className="eyebrow fade-up in">Visual Archive · 2022 — 2024</div>
          <h1 className="hero-title fade-up in d1">
            Light of<br/>
            <em>Ahlulbayt</em>
          </h1>
          <div className="hero-arabic fade-up in d2">نور أهل البيت</div>
        </div>

        <div className="fade-up in d3">
          <p className="hero-tagline">
            Paintings of memory and sacrifice from Srinagar — a slow, devotional rendering of Karbala.
          </p>
          <dl className="hero-meta">
            <div><dt>Artist</dt><dd>Irfan Hussain</dd></div>
            <div><dt>From</dt><dd>Srinagar · Kashmir</dd></div>
            <div><dt>Works</dt><dd>{window.WORKS.length} on view</dd></div>
          </dl>
        </div>
      </div>

      <div className="hero-bottom">
        <button className="scroll-cue" onClick={onEnter} data-cursor="enter">
          <span className="line"></span>
          <span>Enter the Archive</span>
        </button>

        <div className="hero-pager">
          <button className="pager-arrow" onClick={goPrev} data-cursor="previous" aria-label="Previous">←</button>

          {featured.map((w, i) => (
            <button key={w.id} className={`pager-dot ${i === idx ? "active" : ""}`}
                    onClick={() => goTo(i)} data-cursor={w.title}>
              <span className="dot-num">{String(i+1).padStart(2,"0")}</span>
              <span className="dot-line"><span className="dot-fill" key={`${idx}-${i}-${paused}`}/></span>
              <span className="dot-title">{w.title}</span>
            </button>
          ))}

          <button className="pager-arrow" onClick={goNext} data-cursor="next" aria-label="Next">→</button>
        </div>
      </div>
    </section>
  );
}

window.Hero = Hero;
