// cursor.jsx — custom cursor with hover labels
const { useState, useEffect, useRef } = React;

function Cursor({ enabled }) {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [label, setLabel] = useState("");
  const [expand, setExpand] = useState(false);
  const ref = useRef();

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove("cursor-on");
      return;
    }
    document.body.classList.add("cursor-on");
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    const onOver = (e) => {
      const t = e.target.closest("[data-cursor]");
      if (t) {
        setExpand(true);
        setLabel(t.getAttribute("data-cursor") || "");
      } else {
        setExpand(false);
        setLabel("");
      }
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.body.classList.remove("cursor-on");
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div ref={ref}
         className={`cursor ${expand ? "expand" : ""}`}
         style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}>
      <div className="ring">{expand && label}</div>
      <div className="dot"/>
    </div>
  );
}

window.Cursor = Cursor;
