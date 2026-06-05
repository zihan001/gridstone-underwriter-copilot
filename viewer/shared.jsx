/* Shared primitives — formatters, badges, pills, bars, section chrome */
const M = window.MEMO;
const { usd0, sgn, pct } = M;

// thin underline-style section header used inside panels
function PanelHead({ kicker, title, right }) {
  return (
    <div className="panel-head">
      <div className="panel-head-l">
        {kicker && <div className="kicker">{kicker}</div>}
        <h3 className="panel-title">{title}</h3>
      </div>
      {right && <div className="panel-head-r">{right}</div>}
    </div>
  );
}

// big numbered section title at top of a section
function SectionTitle({ index, name, sub, meta }) {
  return (
    <header className="section-title">
      <div className="section-title-row">
        <span className="section-index">{index}</span>
        <div>
          <h1>{name}</h1>
          {sub && <p className="section-sub">{sub}</p>}
        </div>
      </div>
      {meta && <div className="section-title-meta">{meta}</div>}
    </header>
  );
}

function Badge({ tone = "neutral", children, title }) {
  return (
    <span className={"badge badge-" + tone} title={title}>
      {children}
    </span>
  );
}

function SyntheticTag() {
  return (
    <span className="syn-tag" title="Comparable data is synthetic / illustrative">
      <span className="syn-dot" />SYNTHETIC
    </span>
  );
}

function RealTag() {
  return (
    <span className="real-tag" title="Grounded in Open Calgary assessment data">
      <span className="real-dot" />REAL DATA
    </span>
  );
}

// signed money cell with directional color
function AdjCell({ v, big }) {
  const cls = v < 0 ? "adj-neg" : v > 0 ? "adj-pos" : "adj-zero";
  return (
    <span className={"mono adj " + cls + (big ? " adj-big" : "")}>
      {v === 0 ? "\u2014" : sgn(v)}
    </span>
  );
}

// threshold pill: green within / amber review / red breach
function ThreshPill({ label, value, reviewAt, hardAt }) {
  let tone = "ok";
  if (value > hardAt) tone = "breach";
  else if (value > reviewAt) tone = "review";
  const tip =
    tone === "ok"
      ? `${label} ${value.toFixed(1)}% \u00b7 within tolerance (review ${reviewAt}% / cap ${hardAt}%)`
      : tone === "review"
      ? `${label} ${value.toFixed(1)}% \u00b7 above ${reviewAt}% review band, within ${hardAt}% cap \u2014 narrative flag, not a failure`
      : `${label} ${value.toFixed(1)}% \u00b7 exceeds ${hardAt}% cap`;
  return (
    <span className={"thresh-pill tp-" + tone} title={tip}>
      <span className="tp-label">{label}</span>
      <span className="tp-value mono">{value.toFixed(1)}%</span>
    </span>
  );
}

// horizontal contribution bar (signed), centered at zero
function ContribBar({ value, max = 0.16 }) {
  const w = (Math.abs(value) / max) * 50; // % of half-track
  const pos = value >= 0;
  return (
    <div className="contrib-track">
      <div className="contrib-mid" />
      <div
        className={"contrib-fill " + (pos ? "cf-pos" : "cf-neg")}
        style={{
          left: pos ? "50%" : `calc(50% - ${w}%)`,
          width: w + "%",
        }}
      />
    </div>
  );
}

// labeled stat (mono value)
function Stat({ label, value, tone, sub }) {
  return (
    <div className="stat">
      <div className="stat-label">{label}</div>
      <div className={"stat-value mono " + (tone ? "sv-" + tone : "")}>{value}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  );
}

function Provenance({ children }) {
  return (
    <span className="provenance mono" title="Data provenance">
      <span className="prov-mark">{"\u2295"}</span>
      {children}
    </span>
  );
}

function Rule() {
  return <div className="rule" />;
}

Object.assign(window, {
  PanelHead, SectionTitle, Badge, SyntheticTag, RealTag, AdjCell,
  ThreshPill, ContribBar, Stat, Provenance, Rule,
});
