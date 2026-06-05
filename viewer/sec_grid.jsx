/* Section 3 — ADJUSTMENT GRID (transparent sales-comparison grid) */
function AdjustmentGridSection() {
  const comps = M.selected;
  const t = M.thresholds;
  const rowOrder = comps[0].lines.map((l) => ({ key: l.key, label: l.label }));
  const subjectVals = {
    gla: ["1,450 sf", "above grade"],
    lot: ["5,242 sf", "site"],
    bed: ["3", "bedrooms"],
    bath: ["2F / 1H", "baths"],
    bsmt: ["600 sf fin", "no walkout"],
    gar: ["2 · att.", "garage"],
    age: ["1984", "42 yr"],
    cond: ["C3", "condition"],
    qual: ["Q3", "quality"],
    time: ["2026-06-01", "effective"],
  };

  return (
    <section className="section" data-screen-label="Adjustment Grid">
      <SectionTitle
        index="03"
        name="Adjustment Grid"
        sub="Every comparable is reconciled to the subject on a transparent grid using a fixed rate card. A superior comparable carries a negative adjustment; an inferior one, positive. Time adjustments are derived per comp from the CREB South-district benchmark between its contract month and the effective date."
        meta={
          <React.Fragment>
            <SyntheticTag />
            <span className="legend">
              <span className="lg"><span className="sw" style={{ background: "var(--neg)" }} />superior → {"\u2212"} adj</span>
              <span className="lg"><span className="sw" style={{ background: "var(--pos)" }} />inferior → + adj</span>
            </span>
          </React.Fragment>
        }
      />

      <div className="panel flush">
        <PanelHead kicker="rate card" title="Documented adjustment rates"
          right={<Badge tone="ghost">applied uniformly across all comps</Badge>} />
        <div className="panel-pad" style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {[
            ["GLA", "$85 / sf"], ["Lot", "$12 / sf"], ["Bed", "$4,000"],
            ["Full bath", "$6,000"], ["Half bath", "$3,500"], ["Basement", "$35 / sf"],
            ["Garage", "$7,500 / stall"], ["Age", "$700 / yr"], ["Condition", "$12,000 / step"],
            ["Quality", "$15,000 / step"], ["Time", "CREB benchmark"],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", gap: 7, alignItems: "baseline", border: "1px solid var(--line)", borderRadius: 5, padding: "5px 10px" }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{k}</span>
              <span className="mono" style={{ fontSize: 12, color: "var(--ink)" }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="panel flush">
        <div className="gridwrap">
          <table className="adjgrid">
            <thead>
              <tr>
                <th className="row-attr">Attribute</th>
                <th className="col-subject">
                  <div className="colhead">
                    <span className="ch-id"><span className="subject-anchor">◆</span> SUBJECT</span>
                    <span className="ch-sub">eff. 2026-06-01</span>
                    <span className="ch-price subject-anchor">anchor</span>
                  </div>
                </th>
                {comps.map((c) => (
                  <th key={c.id}>
                    <div className="colhead">
                      <span className="ch-id">{c.label}</span>
                      <span className="ch-sub">{c.contractDate} · {c.distanceKm}km</span>
                      <span className="ch-price">{M.usd0(c.price)}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rowOrder.map((row) => (
                <tr key={row.key}>
                  <td className="row-attr">{row.label}</td>
                  <td className="col-subject cell-subject">
                    <div className="cellpair">
                      <span className="cp-val">{subjectVals[row.key][0]}</span>
                      <span className="cp-sub">{subjectVals[row.key][1]}</span>
                    </div>
                  </td>
                  {comps.map((c) => {
                    const ln = c.lines.find((l) => l.key === row.key);
                    return (
                      <td key={c.id} className={ln.adj === 0 ? "cell-match" : undefined}>
                        <div className="cellpair">
                          <span className="cp-val">{ln.sub}</span>
                          <AdjCell v={ln.adj} />
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="gridfoot">
                <td className="row-attr">Net adjustment</td>
                <td className="col-subject mono" style={{ color: "var(--faint)" }}>—</td>
                {comps.map((c) => (
                  <td key={c.id}><AdjCell v={c.net} big /></td>
                ))}
              </tr>
              <tr className="gridfoot">
                <td className="row-attr">Gross adjustment</td>
                <td className="col-subject mono" style={{ color: "var(--faint)" }}>—</td>
                {comps.map((c) => (
                  <td key={c.id}><span className="mono" style={{ color: "var(--ink-2)" }}>{M.usd0(c.gross)}</span></td>
                ))}
              </tr>
              <tr className="gridfoot">
                <td className="row-attr">Tolerance check</td>
                <td className="col-subject mono" style={{ color: "var(--faint)" }}>—</td>
                {comps.map((c) => (
                  <td key={c.id}>
                    <div className="gf-pills">
                      <ThreshPill label="net" value={Math.abs(c.netPct)} reviewAt={t.netReview} hardAt={t.net} />
                      <ThreshPill label="gross" value={c.grossPct} reviewAt={t.grossReview} hardAt={t.gross} />
                      <ThreshPill label="line" value={c.linePct} reviewAt={t.lineReview} hardAt={t.line} />
                    </div>
                  </td>
                ))}
              </tr>
              <tr className="gridfoot gridfoot-total">
                <td className="row-attr">Adjusted value</td>
                <td className="col-subject mono" style={{ color: "var(--faint)" }}>—</td>
                {comps.map((c) => (
                  <td key={c.id}><span className="adjusted-val mono">{M.usd0(c.adjusted)}</span></td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="panel-pad" style={{ borderTop: "1px solid var(--line)" }}>
          <div className="callout warn">
            <b>Thresholds are flags, not failures.</b> {M.aicNote} Net &gt; {t.net}% / gross &gt; {t.gross}% / single-line &gt; {t.line}% render amber;
            a softer review band (gross &gt; {t.grossReview}%) is also surfaced. Hover any pill for the specific guidance.
          </div>
          <div className="note-line" style={{ marginTop: 12 }}>
            <b style={{ color: "var(--ink-2)" }}>Note on COMP-D.</b> Its adjacent-district location is absorbed through distance-weighting in
            Reconciliation rather than an explicit grid line, keeping the grid to the documented subject attributes. The choice is
            recorded as flag <span className="mono" style={{ color: "var(--accent-2)" }}>ADJACENT_DISTRICT_COMP</span>.
          </div>
        </div>
      </div>
    </section>
  );
}
window.AdjustmentGridSection = AdjustmentGridSection;
