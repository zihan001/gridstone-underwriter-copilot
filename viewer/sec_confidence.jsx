/* Section 5 — CONFIDENCE + FLAGS */
function ConfidenceBand() {
  const cf = M.confidence;
  const pos = (v) => v * 100;
  return (
    <div className="band-wrap">
      <div style={{ position: "relative", height: 64 }}>
        <div className="band-track" style={{ background: "linear-gradient(90deg, var(--bad-bg), var(--warn-bg), var(--good-bg))" }}>
          <div className="band-fill" style={{ left: pos(cf.low) + "%", width: (pos(cf.high) - pos(cf.low)) + "%" }} />
          <div className="band-point" style={{ left: pos(cf.score) + "%" }} />
          <div className="band-tick" style={{ left: pos(cf.low) + "%" }}>
            <div className="bt-v">{cf.low.toFixed(2)}</div><div className="bt-l">floor</div>
          </div>
          <div className="band-tick" style={{ left: pos(cf.score) + "%" }}>
            <div className="bt-v" style={{ color: "var(--accent-2)" }}>{cf.score.toFixed(2)}</div><div className="bt-l" style={{ color: "var(--accent-2)" }}>{cf.band}</div>
          </div>
          <div className="band-tick" style={{ left: pos(cf.high) + "%" }}>
            <div className="bt-v">{cf.high.toFixed(2)}</div><div className="bt-l">ceiling</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FlagRow({ f }) {
  const ledCls = f.status === "CLEAR" ? "led-clear" : f.severity === "info" ? "led-info" : "led-fired";
  const stCls = f.status === "CLEAR" ? "fs-clear" : f.severity === "info" ? "fs-info" : "fs-fired";
  return (
    <div className="flag-row">
      <span className={"flag-led " + ledCls} />
      <div>
        <div className="flag-code">{f.code}</div>
        <div className="flag-trigger">trigger: {f.trigger}</div>
        <div style={{ marginTop: 7 }}><span className={"flag-status " + stCls}>{f.status}</span></div>
      </div>
      <div className="flag-detail">{f.detail}</div>
    </div>
  );
}

function ConfidenceSection() {
  const cf = M.confidence;
  const fired = M.flags.filter((f) => f.status === "FIRED");
  const clear = M.flags.filter((f) => f.status === "CLEAR");
  const maxC = Math.max(...cf.drivers.map((d) => Math.abs(d.contrib)));
  return (
    <section className="section" data-screen-label="Confidence + Flags">
      <SectionTitle
        index="05"
        name="Confidence + Flags"
        sub="Confidence is reported as a band and decomposed into the evidence-quality drivers that earned or eroded it. Every human-review flag is listed with its trigger condition — fired or clear — so a reviewer sees the full registry, not just the exceptions."
      />

      <div className="panel flush">
        <PanelHead kicker="evidence quality" title="Confidence band"
          right={<Badge tone="warn">{cf.band} · {cf.score.toFixed(2)}</Badge>} />
        <ConfidenceBand />
        <div className="panel-pad" style={{ borderTop: "1px solid var(--line)" }}>
          <div style={{ marginBottom: 4 }}>
            {cf.drivers.map((d) => (
              <div className="driver" key={d.key}>
                <div className="driver-l">
                  <div className="dl-name">{d.label}</div>
                  <div className="dl-detail">{d.detail}</div>
                </div>
                <ContribBar value={d.contrib} max={maxC} />
                <div className={"driver-v " + (d.contrib >= 0 ? "dv-pos" : "dv-neg")}>
                  {(d.contrib >= 0 ? "+" : "\u2212") + Math.abs(d.contrib).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className="note-line" style={{ marginTop: 12 }}>
            Base prior <span className="mono">{cf.base.toFixed(2)}</span> + net driver contribution = score
            <span className="mono" style={{ color: "var(--accent-2)" }}> {cf.score.toFixed(2)}</span>. The positive bars (violet) extend
            confidence; the negative bars (ochre) withdraw it. Confidence is itself a band, not a point.
          </div>
        </div>
      </div>

      <div className="panel flush">
        <PanelHead kicker={"fired \u00b7 " + fired.length} title="Human-review flags raised"
          right={<Badge tone="warn">narrative required, not failures</Badge>} />
        {fired.map((f) => <FlagRow key={f.code} f={f} />)}
      </div>

      <div className="panel flush">
        <PanelHead kicker={"clear \u00b7 " + clear.length} title="Armed flags — not triggered"
          right={<Badge tone="good">within tolerance</Badge>} />
        {clear.map((f) => <FlagRow key={f.code} f={f} />)}
      </div>
    </section>
  );
}
window.ConfidenceSection = ConfidenceSection;
