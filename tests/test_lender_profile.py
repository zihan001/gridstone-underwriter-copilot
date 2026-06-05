"""
lender_profile behaviour (TESTING §2): FNMA_OFF treats net/gross tolerances as
informational; GSE_ON surfaces breaches more loudly. Same numbers, different treatment —
the flag STATUS and thresholds are identical, only the surfaced detail differs.
"""

from __future__ import annotations

from kvcomp.data.scenario import generate_universe
from kvcomp.schemas.subject import LenderProfile

from tests._support import evaluate_chain


def _force_net_breach_universe(sample_subject, cfg):
    # Lower the net hard tolerance so a real selected comp breaches it, exercising the
    # profile-dependent surfacing without changing any computed number.
    universe = generate_universe(sample_subject, cfg)
    return universe


def test_same_status_different_profile(sample_subject, config):
    universe = _force_net_breach_universe(sample_subject, config)
    tight = config.model_copy(update={"net_threshold": 0.05})  # force a breach
    off = tight.model_copy(update={"lender_profile": LenderProfile.FNMA_OFF})
    on = tight.model_copy(update={"lender_profile": LenderProfile.GSE_ON})

    s_off, _, _, _, _ = evaluate_chain(sample_subject, universe, off)
    s_on, _, _, _, _ = evaluate_chain(sample_subject, universe, on)
    # Identical flag STATUS (the math is profile-independent)...
    assert s_off["NET_ADJ_BREACH"] == s_on["NET_ADJ_BREACH"] == "FIRED"


def test_gse_profile_marks_detail(sample_subject, config):
    from kvcomp.domain import flags as flags_mod
    from kvcomp.domain.grid import adjust_comp
    from kvcomp.domain.reconcile import reconcile
    from kvcomp.domain.retrieval import retrieve
    from kvcomp.domain.widening import run_selection

    universe = retrieve(sample_subject, generate_universe(sample_subject, config))
    on = config.model_copy(update={"net_threshold": 0.05, "lender_profile": LenderProfile.GSE_ON})
    sel = run_selection(sample_subject, universe, on)
    adj = [adjust_comp(c, sample_subject, on) for c in sel.selected]
    rec = reconcile(sample_subject, adj, on)
    flags = flags_mod.evaluate(sample_subject, rec.adjusted, sel, rec, on)
    net = next(f for f in flags if f.code.value == "NET_ADJ_BREACH")
    assert net.status.value == "FIRED"
    assert "GSE" in net.detail  # GSE profile surfaces the breach more loudly
