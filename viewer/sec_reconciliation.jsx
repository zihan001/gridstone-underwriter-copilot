/* Section 4 — RECONCILIATION (weighted → value RANGE) */
function ValueBand() {
  const r = M.range;
  const comps = M.selected;
  const axisMin = 702000, axisMax = 728000;
  const span = axisMax - axisMin;
  const pos = (v) => ((v - axisMin) / span) * 100;
  return (
    <div className="band-wrap">
      <div style={{ position: "relative", height: 90 }}>
        <div className="band-track">
          <div className="band-fill" style={{ left: pos(r.low) + "%", width: (pos(r.high) - pos(r.low)) + "%" }} />
          <div className="band-point" style={{ left: pos(r.point) + "%" }} />
          {comps.map((c) => (
            <div className="band-comp" key={c.id} style={{ left: pos(c.adjusted) + "%" }} title={c.label + " · " + M.usd0(c.adjusted)}>
              <div className="bc-dot" />
              <div className="bc-l">{c.label.replace("COMP-", "")}</div>
            </div>
          ))}
          <div className="band-tick" style={{ left: pos(r.low) + "%" }}>
            <div className="bt-v">{M.usd0(r.low)}</div><div className="bt-l">low</div>
          </div>
          <div className="band-tick" style={{ left: pos(r.point) + "%" }}>
            <div className="bt-v" style={{ color: "var(--accent-2)" }}>{M.usd0(r.point)}</div><div className="bt-l" style={{ color: "var(--accent-2)" }}>weighted point</div>
          </div>
          <div className="band-tick" style={{ left: pos(r.high) + "%" }}>
            <div className="bt-v">{M.usd0(r.high)}</div><div className="bt-l">high</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReconciliationSection() {
  const comps = M.selected;
  const r = M.range;
  const wd = M.weightDrivers;
  const maxW = Math.max(...comps.map((c) => M.weights[c.id]));
  return (
    <section className="section" data-screen-label="Reconciliation">
      <SectionTitle
        index="04"
        name="Reconciliation"
        sub="Adjusted values are reconciled by weight, never by simple average — emphasising the most similar, most recent, and least-adjusted evidence. The output is a defensible RANGE with a weighted central indication, never a bare single number."
      />

      <div className="panel flush">
        <PanelHead kicker="indication" title="Supported value range"
          right={<Badge tone="accent">spread ±{(r.spreadPct / 2).toFixed(1)}%</Badge>} />
        <ValueBand />
        <div className="panel-pad" style={{ borderTop: "1px solid var(--line)", display: "flex", gap: 14, flexWrap: "wrap" }}>
          <div className="stat-row" style={{ flex: 1, minWidth: 380 }}>
            <Stat label="Range low" value={M.usd0(r.low)} sub="supported floor" />
            <Stat label="Weighted point" value={M.usd0(r.point)} tone="accent" sub="central indication" />
            <Stat label="Range high" value={M.usd0(r.high)} sub="supported ceiling" />
            <Stat label="Bracketing" value={"4 / 4"} tone="good" sub="comps inside range" />
          </div>
        </div>
        <div className="panel-pad" style={{ borderTop: "1px solid var(--line)" }}>
          <div className="callout">
            The weighted central point <b className="mono">{M.usd0(r.point)}</b> is reported as the midpoint of a defensible range, not as
            "the value." Every adjusted comparable falls inside <b className="mono">{M.usd0(r.low)}–{M.usd0(r.high)}</b>; the range is the deliverable.
          </div>
        </div>
      </div>

      <div className="panel">
        <PanelHead kicker="weighting" title="Per-comp weight derivation"
          right={<Badge tone="ghost">similarity × recency × distance × adj-burden</Badge>} />
        <div className="panel-pad">
          <table className="tbl" style={{ marginBottom: 4 }}>
            <thead>
              <tr>
                <th>Comp</th><th>Adjusted value</th><th>Similarity</th><th>Recency</th>
                <th>Distance</th><th>Adj burden</th><th style={{ width: 230 }}>Weight</th>
              </tr>
            </thead>
            <tbody>
              {comps.map((c) => {
                const w = M.weights[c.id];
                return (
                  <tr key={c.id}>
                    <td className="v mono" style={{ fontWeight: 600 }}>{c.label}</td>
                    <td className="mono v">{M.usd0(c.adjusted)}</td>
                    <td className="mono">{wd[c.id].similarity}</td>
                    <td className="mono">{wd[c.id].recency}</td>
                    <td className="mono">{wd[c.id].distance}</td>
                    <td className="mono" style={{ color: c.id === "C-C" ? "var(--warn-2)" : "var(--ink-2)" }}>{wd[c.id].burden}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ flex: 1, height: 9, background: "var(--panel-3)", borderRadius: 3, overflow: "hidden" }}>
                          <div style={{ width: (w / maxW * 100) + "%", height: "100%", background: "var(--accent)", borderRadius: 3 }} />
                        </div>
                        <span className="mono" style={{ width: 38, textAlign: "right", color: "var(--accent-2)" }}>{(w * 100).toFixed(0)}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="note-line" style={{ marginTop: 10 }}>
            COMP-A leads on similarity, recency, and proximity with the lightest adjustment burden, so it anchors the
            indication. COMP-C is down-weighted for its 13.6% gross adjustment; COMP-D for adjacent-district location and a
            144-day contract age. Weights sum to 100%.
          </div>
        </div>
      </div>

      <div className="panel">
        <PanelHead kicker="distribution" title="Adjusted-value distribution" />
        <div className="panel-pad">
          <div className="stat-row">
            {comps.map((c) => (
              <Stat key={c.id} label={c.label} value={M.usd0(c.adjusted)} sub={"weight " + (M.weights[c.id] * 100).toFixed(0) + "%"} />
            ))}
          </div>
          <div className="note-line" style={{ marginTop: 12 }}>
            Adjusted values range <span className="mono" style={{ color: "var(--ink-2)" }}>{M.usd0(Math.min(...M.adjustedVals))}–{M.usd0(Math.max(...M.adjustedVals))}</span>
            {" "}— an $11,600 spread, ~1.6% of the central point. The tightness of this distribution is the principal driver of confidence.
          </div>
        </div>
      </div>
    </section>
  );
}
window.ReconciliationSection = ReconciliationSection;
