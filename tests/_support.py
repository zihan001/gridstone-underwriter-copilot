"""Shared test helpers: run the selection→grid→reconcile→flags chain over a comp set."""

from __future__ import annotations

from kvcomp.domain import flags as flags_mod
from kvcomp.domain.grid import adjust_comp
from kvcomp.domain.reconcile import reconcile
from kvcomp.domain.retrieval import retrieve
from kvcomp.domain.widening import run_selection


def evaluate_chain(subject, comps, cfg):
    """Return (flag_status_map, adjusted, selection, recon) for a candidate set."""
    comps = retrieve(subject, comps)
    selection = run_selection(subject, comps, cfg)
    adjusted = [adjust_comp(c, subject, cfg) for c in selection.selected]
    recon = reconcile(subject, adjusted, cfg)
    flags = flags_mod.evaluate(subject, recon.adjusted, selection, recon, cfg)
    status = {f.code.value: f.status.value for f in flags}
    severity = {f.code.value: f.severity.value for f in flags}
    return status, severity, adjusted, selection, recon
