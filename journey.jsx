// journey.jsx — scroll-driven timeline ("Journey Mode")
const { useEffect: jUseEffect, useState: jUseState, useRef: jUseRef } = React;

function Journey() {
  const trackRef = jUseRef();
  const [progress, setProgress] = jUseState(0); // 0..1 across the track
  const steps = window.JOURNEY;
  const totalSteps = steps.length;

  jUseEffect(() => {
    const onScroll = () => {
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const passed = Math.min(Math.max(-rect.top, 0), total);
      setProgress(total > 0 ? passed / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Choose active step based on progress
  const activeIdx = Math.min(steps.length - 1, Math.floor(progress * steps.length));

  const goTo = (i) => {
    const el = trackRef.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const target = el.offsetTop + (i + 0.4) * (total / steps.length);
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section className="journey" id="journey" data-screen-label="05 Journey">
      <div className="journey-track" ref={trackRef}>
        <div className="journey-stage">
          <div className="j-bg" style={{ opacity: 0.4 + (activeIdx/steps.length)*0.6 }}/>

          <div className="j-frames">
            {steps.map((s, i) => {
              const work = window.WORKS.find(w => w.id === s.workId);
              return (
                <div key={s.step} className={`j-frame ${i===activeIdx?"active":""}`}>
                  <div className="j-art">
                    <window.ArtPlaceholder work={work} density={1.4}/>
                  </div>
                  <div className="j-caption">
                    <div className="step">Chapter {s.step} · {i+1} of {totalSteps}</div>
                    <h3>{s.title.split(" ").slice(0,-1).join(" ")} <em>{s.title.split(" ").slice(-1)}</em></h3>
                    <div className="arabic">{s.arabic}</div>
                    <p>{s.body}</p>
                    <div className="year">{work?.year} · {work?.medium}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="j-progress">
            {steps.map((s, i) => (
              <button key={s.step} className={i===activeIdx?"active":""} onClick={()=>goTo(i)} data-cursor={s.title}>
                <span className="dot"/>
                <span>{s.step}</span>
              </button>
            ))}
          </div>

          <div className="j-bar">
            <div className="fill" style={{ width: `${progress*100}%` }}/>
          </div>
        </div>
      </div>
    </section>
  );
}

window.Journey = Journey;
