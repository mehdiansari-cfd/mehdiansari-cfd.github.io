// footer.jsx
function Foot() {
  return (
    <footer className="foot" id="contact" data-screen-label="06 Contact">
      <div className="foot-cta">
        <h2>Studio <em>visits</em>,<br/>commissions, prints.</h2>
        <a className="btn" href="mailto:irfan.hussain@studio.art" data-cursor="write">
          irfan@ — write —
        </a>
      </div>
      <div className="foot-grid">
        <div>
          <h5>Light of Ahlulbayt</h5>
          <ul>
            <li>Studio · Srinagar</li>
            <li>Jammu & Kashmir</li>
            <li>By appointment</li>
          </ul>
        </div>
        <div>
          <h5>Series</h5>
          <ul>
            <li><a href="#works">The Day of Ashura</a></li>
            <li><a href="#works">More — coming</a></li>
          </ul>
        </div>
        <div>
          <h5>Index</h5>
          <ul>
            <li><a href="#works">Works</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#concept">Philosophy</a></li>
          </ul>
        </div>
        <div>
          <h5>Elsewhere</h5>
          <ul>
            <li>Instagram</li>
            <li>Mailing list</li>
          </ul>
        </div>
      </div>
      <div className="foot-bottom">
        <span>© 2026 Irfan Hussain · All works</span>
        <span>Painted in Srinagar · Set in Cormorant & Inter</span>
      </div>
    </footer>
  );
}

window.Foot = Foot;
