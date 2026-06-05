/* Section 1 — SUBJECT (grounded in open_calgary_assessment) */
function SubjectSection() {
  const s = M.subject;
  const mc = M.marketContext;
  return (
    <section className="section" data-screen-label="Subject">
      <SectionTitle
        index="01"
        name="Subject Property"
        sub="Single-family detached collateral grounded in Open Calgary assessment data. Characteristics below anchor every downstream comparable adjustment."
        meta={
          <React.Fragment>
            <RealTag />
            <Provenance>{s.provenance}</Provenance>
            <Badge tone="ghost">roll {s.roll}</Badge>
          </React.Fragment>
        }
      />

      <div className="grid-2">
        <div className="panel">
          <PanelHead kicker="identification" title="Parcel & location" />
          <div className="panel-pad">
            <div className="stat-row" style={{ marginBottom: 14 }}>
              <Stat label="Assessed value" value={M.usd0(s.assessedValue)} tone="good"
                sub={`${s.assessmentRollYear} roll \u00b7 val. date ${s.assessmentValDate}`} />
              <Stat label="Assessed PPSF" value={"$" + s.ppsfAssessed} sub="on above-grade GLA" />
            </div>
            <table className="tbl">
              <tbody>
                <tr><td className="k">Civic address</td><td className="v">{s.addr}</td></tr>
                <tr><td className="k">Community / district</td><td className="v">{s.community} · {s.district} ({s.quadrant})</td></tr>
                <tr><td className="k">Land use</td><td className="v">{s.landUse}</td></tr>
                <tr><td className="k">Roll number</td><td className="v mono">{s.roll}</td></tr>
              </tbody>
            </table>
            <div className="note-line" style={{ marginTop: 10 }}>{s.addrNote}.</div>
          </div>
        </div>

        <div className="panel">
          <PanelHead kicker="physical attributes" title="Improvement & site" right={<Badge tone="accent">effective {s.effDate}</Badge>} />
          <div className="panel-pad">
            <table className="tbl">
              <tbody>
                {s.attrs.map(([k, v]) => (
                  <tr key={k}><td className="k">{k}</td><td className="v mono">{v}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="panel">
        <PanelHead kicker="market context" title="CREB benchmark anchors"
          right={<Badge tone="ghost">{mc.series}</Badge>} />
        <div className="panel-pad">
          <div className="stat-row">
            <Stat label="South district benchmark" value={M.usd0(mc.southBenchmark)} tone="accent" sub={"detached \u00b7 2026-06"} />
            <Stat label="City benchmark" value={M.usd0(mc.cityBenchmark)} sub={"detached \u00b7 2026-06"} />
            <Stat label="Benchmark PPSF" value={"$" + mc.ppsf} sub="South detached" />
            <Stat label="Subject age" value={s.age + " yr"} sub="built 1984" />
          </div>
          <div className="callout" style={{ marginTop: 16 }}>
            The assessed value reflects a <b>{s.assessmentValDate}</b> valuation date and lags the current market; it is shown
            for provenance, <b>not</b> as a market opinion. The defensible value is developed independently from comparable
            sales in the sections that follow.
          </div>
        </div>
      </div>
    </section>
  );
}
window.SubjectSection = SubjectSection;
