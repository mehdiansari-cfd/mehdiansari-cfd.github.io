// about.jsx — About + Concept (Philosophy)

function About() {
  return (
    <section className="sec" id="about" data-screen-label="03 About">
      <div className="sec-head">
        <div className="num">03 — Artist</div>
        <div>
          <h2>The <em>Hand</em><br/>Behind the Work</h2>
          <p className="lede">A studio practice from Srinagar, rooted in patience, devotional looking, and the conviction that some events are still happening.</p>
        </div>
      </div>

      <div className="about-grid">
        <div className="about-portrait">
          <window.PortraitPlaceholder/>
        </div>
        <div>
          <div className="about-text">
            <p>Irfan Hussain paints from Srinagar, in the valley of Kashmir, returning each year to a single subject: the events of Karbala in 61 AH. He works in coloured pencil, pastel, and acrylic — slowly, often over months, building scenes that hold both the chaos of the battlefield and the stillness of the camp.</p>
            <p>The work is devotional but not decorative. Faces are particular. Cloaks billow with weight. A green standard rises above tents that the wind has not yet reached. The viewer is asked to stay with each figure long enough to feel the heat of the afternoon.</p>
            <p>He continues to work in Srinagar, mostly alone, on a small scale, and on commission.</p>
          </div>
          <dl className="about-stats">
            <div><div className="n">13</div><div className="l">Works on view</div></div>
            <div><div className="n">2022—2024</div><div className="l">Range</div></div>
            <div><div className="n">Srinagar</div><div className="l">Studio · Kashmir</div></div>
          </dl>
        </div>
      </div>
    </section>
  );
}

function Concept() {
  return (
    <section className="sec concept" id="concept" data-screen-label="04 Concept">
      <div className="sec-head">
        <div className="num">04 — Philosophy</div>
        <div>
          <h2>What the Work <em>Asks</em></h2>
          <p className="lede">Three questions that hold the practice together — and a fourth that the work refuses to answer.</p>
        </div>
      </div>

      <div className="concept-grid">
        <div className="concept-card">
          <svg className="glyph" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="28" cy="28" r="22"/>
            <line x1="28" y1="6" x2="28" y2="50"/>
            <line x1="6" y1="28" x2="50" y2="28"/>
          </svg>
          <h4>On <em>Memory</em></h4>
          <p>Karbala is not a date that recedes. It is a horizon — the further you walk, the closer it appears. The work attempts to render that paradox in pigment.</p>
        </div>
        <div className="concept-card">
          <svg className="glyph" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M8,40 Q28,8 48,40"/>
            <line x1="8" y1="40" x2="48" y2="40"/>
            <circle cx="28" cy="40" r="2" fill="currentColor"/>
          </svg>
          <h4>On <em>Sacrifice</em></h4>
          <p>Not as transaction, not as spectacle. As a posture the body holds when speech and water and shade have all been refused, and only meaning remains.</p>
        </div>
        <div className="concept-card">
          <svg className="glyph" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1">
            <line x1="10" y1="14" x2="46" y2="14"/>
            <line x1="14" y1="28" x2="42" y2="28"/>
            <line x1="18" y1="42" x2="38" y2="42"/>
          </svg>
          <h4>On <em>Silence</em></h4>
          <p>The centuries before revelation are not empty — they are full of breath held. The painting tries to listen to the room, not just describe it.</p>
        </div>
      </div>

      <blockquote className="pull-quote">
        “Some events are not in the past. They are still happening, and the painting is the room they are happening in.”
        <cite>— Studio notes, 2024</cite>
      </blockquote>
    </section>
  );
}

window.About = About;
window.Concept = Concept;
