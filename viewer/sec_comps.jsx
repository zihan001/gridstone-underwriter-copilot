/* Section 2 — COMP SELECTION (tiered widening + selected + rejected) */
function SearchSummaryBar() {
  const ss = M.searchSummary;
  return (
    <div className="panel">
      <div className="panel-pad" style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
        <div className="stat-row" style={{ flex: 1, minWidth: 420 }}>
          <Stat label="Candidates retrieved" value={ss.retrieved} sub="post de-dupe" />
          <Stat label="Selected" value={ss.selected} tone="accent" sub={"\u2265 minimum 4"} />
          <Stat label="Rejected" value={ss.rejected} sub="reason-coded" />
          <Stat label="Final tier" value={"tier " + ss.finalTier} tone="warn" sub="date window relaxed" />
          <Stat label="Confidence penalty" value={ss.totalPenalty.toFixed(2)} tone="warn" sub="from widening" />
        </div>
      </div>
    </div>
  );
}

function TierBlock({ t }) {
  return (
    <div className="tier">
      <div className="tier-head">
        <span className="tier-no">T{t.tier}</span>
        <span className="tier-title">{t.title}</span>
        {t.penalty === 0
          ? <Badge tone="good">no penalty</Badge>
          : <Badge tone="warn">penalty {t.penalty.toFixed(2)}</Badge>}
      </div>
      <div className="tier-body">
        <div className="tier-crit">
          {t.criteria.map(([k, v]) => (
            <div className="tc" key={k}>
              <span className="tck">{k}</span>
              <span className="tcv">{v}</span>
            </div>
          ))}
        </div>
        <div className="tier-rationale">
          <span className="tr-label">rationale</span>
          {t.rationale}
          {t.note && <div style={{ marginTop: 8, color: "var(--warn-2)", fontFamily: "var(--mono)", fontSize: 11.5 }}>{t.note}</div>}
        </div>
      </div>
      <div className="tier-foot">
        <span className="tf-stat">comps added at tier: <b>{t.found}</b></span>
        <span className="tf-pen">{t.penalty === 0 ? "confidence \u00d7 1.00" : "confidence " + t.penalty.toFixed(2)}</span>
      </div>
    </div>
  );
}

function SelectedCompCard({ c }) {
  const tierBadge = c.tier === 0
    ? <Badge tone="good">tier 0</Badge>
    : <Badge tone="warn">tier {c.tier}</Badge>;
  return (
    <div className="comp-card selected">
      <div className="cc-head">
        <span className="cc-id">{c.label}</span>
        {tierBadge}
        <span style={{ flex: 1 }} />
        <SyntheticTag />
      </div>
      <div className="cc-body">
        <div className="cc-attrs">
          <div className="cc-attr"><span className="a-k">Sale price</span><span className="a-v">{M.usd0(c.price)}</span></div>
          <div className="cc-attr"><span className="a-k">PPSF</span><span className="a-v">${c.ppsf}</span></div>
          <div className="cc-attr"><span className="a-k">Community</span><span className="a-v">{c.community}</span></div>
          <div className="cc-attr"><span className="a-k">Distance</span><span className="a-v">{c.distanceKm} km</span></div>
          <div className="cc-attr"><span className="a-k">Contract</span><span className="a-v">{c.contractDate}</span></div>
          <div className="cc-attr"><span className="a-k">Age</span><span className="a-v">{c.ageDays} d</span></div>
          <div className="cc-attr"><span className="a-k">GLA</span><span className="a-v">{c.gla.toLocaleString()} sf</span></div>
          <div className="cc-attr"><span className="a-k">Beds / baths</span><span className="a-v">{c.beds} / {c.baths}</span></div>
          <div className="cc-attr"><span className="a-k">Built</span><span className="a-v">{c.built}</span></div>
          <div className="cc-attr"><span className="a-k">Cond / qual</span><span className="a-v">{c.cond} / {c.qual}</span></div>
        </div>
      </div>
      <div className="cc-foot">
        <span className="cc-meta">MLS {c.mls} · {c.district}</span>
        <div className="flag-meta">
          {(c.watch || []).map((w) => <Badge key={w} tone="warn">{w}</Badge>)}
          {!c.watch && <Badge tone="good">clean</Badge>}
        </div>
      </div>
    </div>
  );
}

function RejectedCompCard({ c }) {
  return (
    <div className="comp-card rejected">
      <div className="cc-head">
        <span className="cc-id" style={{ color: "var(--muted)" }}>{c.label}</span>
        <span className="cc-meta">MLS {c.mls} · {c.community} · {c.district}</span>
        <span style={{ flex: 1 }} />
        <SyntheticTag />
      </div>
      <div className="reject-strip">
        <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--muted)", letterSpacing: "0.1em" }}>REJECT</span>
        <span className="reason-code">{c.code}</span>
      </div>
      <div className="reject-detail">
        {c.detail}
        <div className="reject-metric">
          <span style={{ color: "var(--muted)" }}>{c.metricLabel}:</span>
          <span className="rm-bad">{c.metricValue}</span>
          <span className="rm-cap">/ allowed {c.cap}</span>
        </div>
      </div>
    </div>
  );
}

function CompSelectionSection() {
  return (
    <section className="section" data-screen-label="Comp Selection">
      <SectionTitle
        index="02"
        name="Comparable Selection"
        sub="A tiered search widens only as far as it must, logging every relaxation, its rationale, and its confidence cost. Selected and rejected candidates are shown side by side — rejections are reason-coded so the exclusion is as auditable as the inclusion."
        meta={<React.Fragment><SyntheticTag /><Badge tone="ghost">all comparable data illustrative</Badge></React.Fragment>}
      />

      <SearchSummaryBar />

      <div className="panel">
        <PanelHead kicker="retrieval" title="Tiered search-widening log"
          right={<span className="legend"><span className="lg"><span className="sw" style={{ background: "var(--good)" }} />tight</span><span className="lg"><span className="sw" style={{ background: "var(--warn)" }} />relaxed</span></span>} />
        <div className="panel-pad">
          {M.widening.map((t) => <TierBlock key={t.tier} t={t} />)}
          <div className="note-line" style={{ marginTop: 4 }}>
            Search halts at the first tier that yields a stable set (≥ 4 qualifying comps). Cumulative confidence penalty
            from widening: <span className="mono" style={{ color: "var(--warn-2)" }}>{M.searchSummary.totalPenalty.toFixed(2)}</span>.
          </div>
        </div>
      </div>

      <div className="panel">
        <PanelHead kicker={"selected \u00b7 " + M.selected.length} title="Comparables carried to the grid"
          right={<Badge tone="accent">weighted, not averaged</Badge>} />
        <div className="panel-pad">
          <div className="comp-grid">
            {M.selected.map((c) => <SelectedCompCard key={c.id} c={c} />)}
          </div>
        </div>
      </div>

      <div className="panel">
        <PanelHead kicker={"rejected \u00b7 " + M.rejected.length} title="Excluded candidates with reason codes"
          right={<span className="legend">{Object.keys(M.reasonCodes).map((rc) => <span className="lg" key={rc} style={{ color: "var(--bad)" }}>{rc}</span>)}</span>} />
        <div className="panel-pad">
          <div className="comp-grid">
            {M.rejected.map((c) => <RejectedCompCard key={c.id} c={c} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
window.CompSelectionSection = CompSelectionSection;
