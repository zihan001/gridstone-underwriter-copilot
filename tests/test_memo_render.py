"""
Memo render smoke test (TESTING §2/§3 + test order step 7): the pipeline produces a complete
MemoArtifact and the serializer fills data.js without error, with template prose (no LLM).
We assert the seam passes computed numbers in and gets strings out — never the wording.
"""

from __future__ import annotations

from kvcomp.narrative.prompts import SECTIONS
from kvcomp.pipeline import run


def test_pipeline_produces_complete_artifact():
    result = run(use_llm=False)
    memo = result.memo
    assert len(memo.selected) == 4
    assert len(memo.rejected) == 5
    assert {r.reason_code.value for r in memo.rejected} == {
        "TOO_STALE", "GROSS_ADJ_TOO_HIGH", "WRONG_DISTRICT_AFTER_WIDENING", "OUTLIER_PRICE", "DUPLICATE"}
    assert memo.value_range.low < memo.value_range.point < memo.value_range.high
    assert memo.confidence.band in {"LOW", "LIMITED", "MODERATE", "HIGH"}
    assert result.narrative_source == "template"


def test_template_narrative_fills_all_sections():
    memo = run(use_llm=False).memo
    for section in SECTIONS:
        text = getattr(memo.narrative, section)
        assert isinstance(text, str) and len(text) > 20


def test_seam_numbers_match_core_exactly():
    """The narrative must not alter any number: the range point text contains the core point."""
    memo = run(use_llm=False).memo
    point_str = f"${memo.value_range.point:,.0f}"
    assert point_str in memo.narrative.reconciliation


def test_render_writes_valid_data_js(tmp_path):
    from kvcomp.serialize.memo_to_window import write_data_js
    out = write_data_js(run(use_llm=False), path=tmp_path / "data.js")
    text = out.read_text()
    assert text.startswith("/*") and "window.MEMO" in text
    assert "__MEMO_DATA__" not in text
