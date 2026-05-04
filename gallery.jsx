// gallery.jsx — story-only layout (single series rendered with mosaic rhythm)
const { useState: gUseState } = React;

function Gallery({ onOpen }) {
  return (
    <section className="sec" id="works" data-screen-label="02 Works">
      <div className="sec-head">
        <div className="num">02 — Works</div>
        <div>
          <h2>The <em>Archive</em></h2>
          <p className="lede">Thirteen paintings by Irfan Hussain — individual works in coloured pencil, pastel, watercolour, graphite, and acrylic. Each is a meditation on Karbala. Click any work to read its weight.</p>
        </div>
      </div>

      <ol className="archive-list">
        {window.WORKS.map((w, i) =>
          <li key={w.id} className="archive-row" onClick={() => onOpen(w.id)} data-cursor="view">
            <div className="r-num">{String(i+1).padStart(2,"0")}</div>
            <div className="r-art" style={{aspectRatio: w.aspect || "4/5"}}>
              <window.ArtPlaceholder work={w} />
            </div>
            <div className="r-info">
              <div className="r-arabic">{w.arabic}</div>
              <h3 className="r-title">
                {w.title.split(" ").slice(0,-1).join(" ")}{" "}
                <em>{w.title.split(" ").slice(-1)}</em>
              </h3>
              <div className="r-meta">
                <span>{w.year}</span>
                <span>·</span>
                <span>{w.medium}</span>
                <span>·</span>
                <span>{w.dims}</span>
              </div>
              <p className="r-body">{w.body}</p>
              <div className="r-cta" data-cursor="open">View work →</div>
            </div>
          </li>
        )}
      </ol>
    </section>);

}

window.Gallery = Gallery;