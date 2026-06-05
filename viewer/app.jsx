/* App shell — nav rail, topbar status strip, section router */
const { useState, useEffect } = React;

const SECTIONS = [
  { id: "subject",   num: "01", name: "Subject",            Comp: () => window.SubjectSection(),       tag: { t: "REAL", c: "good" } },
  { id: "comps",     num: "02", name: "Comp Selection",     Comp: () => window.CompSelectionSection(), tag: { t: "4 / 9", c: "" } },
  { id: "grid",      num: "03", name: "Adjustment Grid",    Comp: () => window.AdjustmentGridSection(),tag: { t: "10×4", c: "accent" } },
  { id: "recon",     num: "04", name: "Reconciliation",     Comp: () => window.ReconciliationSection(),tag: { t: "range", c: "" } },
  { id: "confidence",num: "05", name: "Confidence + Flags", Comp: () => window.ConfidenceSection(),    tag: { t: "4", c: "warn" } },
  { id: "memo",      num: "06", name: "Memo",               Comp: () => window.MemoSection(),          tag: null },
];

function App() {
  const [active, setActive] = useState(() => {
    const h = (location.hash || "").replace("#", "");
    if (SECTIONS.some((s) => s.id === h)) return h;
    return localStorage.getItem("memo.active") || "subject";
  });

  useEffect(() => {
    localStorage.setItem("memo.active", active);
    if (location.hash.replace("#", "") !== active) history.replaceState(null, "", "#" + active);
    const sc = document.querySelector(".scroll");
    if (sc) sc.scrollTop = 0;
  }, [active]);

  const cur = SECTIONS.find((s) => s.id === active) || SECTIONS[0];
  const r = M.range, cf = M.confidence;
  const firedCount = M.flags.filter((f) => f.status === "FIRED").length;
  const idx = SECTIONS.findIndex((s) => s.id === active);

  return (
    <div id="app">
      <aside className="rail">
        <div className="rail-brand">
          <div className="brand-mark"><span className="brand-dot" />defensibility copilot</div>
          <div className="brand-title">Comp Memo · Audit View</div>
          <div className="brand-sub">{M.meta.caseId}</div>
        </div>

        <div className="rail-subject">
          <div className="rs-row">
            <span className="rs-addr">{M.subject.addr}</span>
          </div>
          <div className="rs-meta">
            <span>{M.subject.community} · {M.subject.district} · detached · {M.subject.gla.toLocaleString()} sf</span>
          </div>
        </div>

        <nav className="rail-nav">
          <div className="nav-group-label">pipeline stages</div>
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              className={"nav-item" + (s.id === active ? " active" : "")}
              onClick={() => setActive(s.id)}
            >
              <span className="ni-num">{s.num}</span>
              <span className="ni-name">{s.name}</span>
              {s.tag
                ? <span className={"ni-tag " + (s.tag.c || "")}>{s.tag.t}</span>
                : <span />}
            </button>
          ))}
        </nav>

        <div className="rail-foot">
          <div><span className="rf-k">snapshot</span> 2026-06-01</div>
          <div><span className="rf-k">source</span> open_calgary_assessment</div>
          <div><span className="rf-k">comps</span> synthetic · illustrative</div>
          <div style={{ marginTop: 6, color: "var(--accent-2)" }}>● rendered from snapshot · render-only</div>
        </div>
      </aside>

      <main className="main">
        <div className="topbar">
          <div className="crumb">
            <b>Defensibility Copilot</b> / Comp Memo / <b>{cur.num} · {cur.name}</b>
          </div>
          <div className="status-strip">
            <div className="chip"><span className="chip-k">Value range</span><span className="chip-v accent">{M.usd0(r.low)} – {M.usd0(r.high)}</span></div>
            <div className="chip"><span className="chip-k">Weighted point</span><span className="chip-v">{M.usd0(r.point)}</span></div>
            <div className="chip"><span className="chip-k">Confidence</span><span className="chip-v warn">{cf.band} · {cf.score.toFixed(2)}</span></div>
            <div className="chip"><span className="chip-k">Review flags</span><span className="chip-v warn">{firedCount} fired</span></div>
          </div>
        </div>

        <div className="scroll">
          {cur.Comp()}
          <div className="section" style={{ paddingTop: 0, paddingBottom: 40 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, borderTop: "1px solid var(--line)", paddingTop: 18 }}>
              <button className="nav-item" style={{ width: "auto", maxWidth: 260, opacity: idx === 0 ? 0.4 : 1, pointerEvents: idx === 0 ? "none" : "auto" }}
                onClick={() => idx > 0 && setActive(SECTIONS[idx - 1].id)}>
                <span className="ni-num">←</span><span className="ni-name">{idx > 0 ? SECTIONS[idx - 1].name : "—"}</span><span />
              </button>
              <button className="nav-item" style={{ width: "auto", maxWidth: 260, opacity: idx === SECTIONS.length - 1 ? 0.4 : 1, pointerEvents: idx === SECTIONS.length - 1 ? "none" : "auto" }}
                onClick={() => idx < SECTIONS.length - 1 && setActive(SECTIONS[idx + 1].id)}>
                <span className="ni-num">→</span><span className="ni-name">{idx < SECTIONS.length - 1 ? SECTIONS[idx + 1].name : "—"}</span><span />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
