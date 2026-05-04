// lightbox.jsx
const { useEffect: lbUseEffect } = React;

function Lightbox({ workId, onClose, onPrev, onNext }) {
  const work = workId ? window.WORKS.find(w => w.id === workId) : null;
  const open = !!work;

  lbUseEffect(() => {
    const onKey = (e) => {
      if (!open) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, onPrev, onNext]);

  if (!work) return <div className="lb-overlay" aria-hidden="true"/>;

  const series = window.SERIES.find(s => s.id === work.series);
  const idx = window.WORKS.findIndex(w => w.id === work.id);

  return (
    <div className={`lb-overlay ${open ? "open" : ""}`} role="dialog" aria-modal="true">
      <button className="lb-close" onMouseDown={(e)=>{e.preventDefault(); onClose();}} data-cursor="close" aria-label="Close">CLOSE</button>
      <button className="lb-prev"  onMouseDown={(e)=>{e.preventDefault(); onPrev();}}  data-cursor="prev"  aria-label="Previous">←</button>
      <button className="lb-next"  onMouseDown={(e)=>{e.preventDefault(); onNext();}}  data-cursor="next"  aria-label="Next">→</button>

      <div className="lb-stage">
        <div className="art">
          {work.image
            ? <img src={work.image} alt={work.title}/>
            : <div style={{ width: 480, aspectRatio: work.aspect, position: "relative" }}>
                <window.ArtPlaceholder work={work} density={1.2}/>
              </div>
          }
        </div>
      </div>

      <aside className="lb-info">
        <div className="num">{series?.num} · {series?.name}  ·  {String(idx+1).padStart(2,"0")}/{String(window.WORKS.length).padStart(2,"0")}</div>
        <h3>{work.title.split(" ").slice(0,-1).join(" ")} <em>{work.title.split(" ").slice(-1)}</em></h3>
        <div className="arabic-line">{work.arabic}</div>
        <p className="body">{work.body}</p>

        <div>
          <div style={{fontFamily:"var(--mono)", fontSize:10, letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--ink-soft)", marginBottom:8}}>Moment referenced</div>
          <div style={{fontFamily:"var(--serif)", fontSize:17, fontStyle:"italic"}}>{work.moment}</div>
        </div>

        <div>
          <div style={{fontFamily:"var(--mono)", fontSize:10, letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--ink-soft)", marginBottom:8}}>Symbolism</div>
          <div className="symbols">{work.symbols.map(s => <span key={s}>{s}</span>)}</div>
        </div>

        <dl>
          <div><dt>Year</dt><dd>{work.year}</dd></div>
          <div><dt>Medium</dt><dd>{work.medium}</dd></div>
          <div><dt>Dimensions</dt><dd>{work.dims}</dd></div>
          <div><dt>Edition</dt><dd>{work.edition || "Unique"}</dd></div>
        </dl>
      </aside>
    </div>
  );
}

window.Lightbox = Lightbox;
