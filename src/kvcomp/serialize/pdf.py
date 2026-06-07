"""
serialize/pdf.py — per-deal PDF export from the finished MemoArtifact.

A green deal means a fileable artifact exists; this produces it. The PDF is generated in
PYTHON from the same window dict the viewer renders (memo_to_window.build_window), so every
number in the PDF — subject, selected/rejected comps, the adjustment grid, the value range,
confidence, and flags — is the core's, byte-for-byte the same as the on-screen memo. Nothing
is recomputed here; this is a renderer.

CLI: `python -m kvcomp.serialize --pdf <deal_id> --out <path>`
"""

from __future__ import annotations

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

from kvcomp.serialize.memo_to_window import build_window

# Palette echoing the viewer (audit-green ink + status tones).
_INK = colors.HexColor("#16201C")
_LINE = colors.HexColor("#C2CEC2")
_HEAD_BG = colors.HexColor("#ECF1E8")
_MUTED = colors.HexColor("#5A645E")
_TONE = {"green": colors.HexColor("#6F8F1A"), "yellow": colors.HexColor("#9A6411"),
         "red": colors.HexColor("#B4232A")}


def _usd(n: int) -> str:
    return "${:,.0f}".format(n)


def _styles():
    ss = getSampleStyleSheet()
    ss.add(ParagraphStyle("KVTitle", parent=ss["Title"], fontSize=17, textColor=_INK, spaceAfter=2))
    ss.add(ParagraphStyle("KVSub", parent=ss["Normal"], fontSize=9, textColor=_MUTED, spaceAfter=10))
    ss.add(ParagraphStyle("KVH", parent=ss["Heading2"], fontSize=11, textColor=_INK,
                          spaceBefore=12, spaceAfter=4))
    ss.add(ParagraphStyle("KVBody", parent=ss["Normal"], fontSize=8.5, textColor=_INK, leading=12))
    return ss


def _table(data, col_widths=None, header=True):
    t = Table(data, colWidths=col_widths, repeatRows=1 if header else 0)
    style = [
        ("FONTSIZE", (0, 0), (-1, -1), 7.5),
        ("TEXTCOLOR", (0, 0), (-1, -1), _INK),
        ("LINEBELOW", (0, 0), (-1, -1), 0.4, _LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 4),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4),
        ("TOPPADDING", (0, 0), (-1, -1), 3),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
    ]
    if header:
        style += [("BACKGROUND", (0, 0), (-1, 0), _HEAD_BG),
                  ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold")]
    t.setStyle(TableStyle(style))
    return t


def build_pdf(result, out_path: Path, *, deal_id: str | None = None,
              verdict: str | None = None) -> Path:
    """Render a finished PipelineResult to a PDF at `out_path`. Numbers come from build_window
    (the same source the viewer reads), so the PDF and the on-screen memo never disagree."""
    w = build_window(result)
    ss = _styles()
    subj = w["subject"]
    rng = w["range"]
    conf = w["confidence"]

    story = []
    title = f"Collateral Comp Memo — {subj['addr']}"
    story.append(Paragraph(title, ss["KVTitle"]))
    verdict_str = f"   ·   triage: {verdict.upper()}" if verdict else ""
    story.append(Paragraph(
        f"{w['meta']['caseId']}{(' · ' + deal_id) if deal_id else ''} · "
        f"{subj['district']} district · effective {w['meta']['effectiveDate']}{verdict_str}",
        ss["KVSub"]))

    # --- value range + confidence (the headline) ----------------------------
    story.append(Paragraph("Value range &amp; confidence", ss["KVH"]))
    story.append(_table([
        ["Low", "Weighted point", "High", "Spread", "Confidence"],
        [_usd(rng["low"]), _usd(rng["point"]), _usd(rng["high"]),
         f"{rng['spreadPct']:.1f}%", f"{conf['band']} · {conf['score']:.2f}"],
    ], col_widths=[1.1 * inch] * 5))

    # --- subject ------------------------------------------------------------
    story.append(Paragraph("Subject", ss["KVH"]))
    story.append(_table([["Attribute", "Value"]] + [list(a) for a in subj["attrs"]],
                        col_widths=[1.9 * inch, 4.6 * inch]))

    # --- selected comps -----------------------------------------------------
    story.append(Paragraph("Selected comparables", ss["KVH"]))
    sel_rows = [["Comp", "District", "Contract", "Sale price", "Adjusted", "Net %", "Gross %"]]
    for c in w["selected"]:
        sel_rows.append([
            c["label"], c["district"], c["contractDate"], _usd(c["price"]),
            _usd(c["adjusted"]), f"{c['netPct']:+.1f}%", f"{c['grossPct']:.1f}%"])
    story.append(_table(sel_rows, col_widths=[0.8 * inch, 1.0 * inch, 0.95 * inch,
                                              1.05 * inch, 1.05 * inch, 0.8 * inch, 0.85 * inch]))

    # --- adjustment grid (per-line, per selected comp) ----------------------
    if w["selected"]:
        story.append(Paragraph("Adjustment grid (per-line $)", ss["KVH"]))
        line_keys = [ln["key"] for ln in w["selected"][0]["lines"]]
        grid_rows = [["Comp"] + line_keys + ["Net"]]
        for c in w["selected"]:
            by_key = {ln["key"]: ln["adj"] for ln in c["lines"]}
            grid_rows.append([c["label"]] + [f"{by_key.get(k, 0):+,}" for k in line_keys]
                             + [f"{c['net']:+,}"])
        story.append(_table(grid_rows))

    # --- rejected comps -----------------------------------------------------
    if w["rejected"]:
        story.append(Paragraph("Rejected comparables", ss["KVH"]))
        rej_rows = [["Comp", "Reason code", "Detail"]]
        for r in w["rejected"]:
            rej_rows.append([r["label"], r["code"], Paragraph(r["detail"], ss["KVBody"])])
        story.append(_table(rej_rows, col_widths=[0.8 * inch, 1.7 * inch, 4.0 * inch]))

    # --- flags --------------------------------------------------------------
    story.append(Paragraph("Flags (full registry — fired and clear)", ss["KVH"]))
    flag_rows = [["Flag", "Status", "Severity", "Detail"]]
    for f in w["flags"]:
        flag_rows.append([f["code"], f["status"], f["severity"],
                          Paragraph(f["detail"], ss["KVBody"])])
    ft = _table(flag_rows, col_widths=[1.5 * inch, 0.7 * inch, 0.8 * inch, 3.5 * inch])
    # Tint fired rows so review attention is obvious on paper too.
    tint = []
    for i, f in enumerate(w["flags"], start=1):
        if f["status"] == "FIRED":
            tone = {"review": "red", "tolerance": "yellow", "info": "green"}.get(f["severity"], "yellow")
            tint.append(("TEXTCOLOR", (1, i), (1, i), _TONE[tone]))
    ft.setStyle(TableStyle(tint))
    story.append(ft)

    story.append(Spacer(1, 12))
    story.append(Paragraph(w["aicNote"], ss["KVSub"]))

    out_path.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(str(out_path), pagesize=letter,
                            leftMargin=0.6 * inch, rightMargin=0.6 * inch,
                            topMargin=0.6 * inch, bottomMargin=0.6 * inch,
                            title=title)
    doc.build(story)
    return out_path


def result_for_deal(deal_id: str):
    """Resolve a deal id to (PipelineResult, verdict). Looks in the inbox first, then the three
    hero demo cases (south/east/west)."""
    from kvcomp.data.inbox import inbox
    from kvcomp.data.subject_loader import demo_subjects
    from kvcomp.domain.triage import triage
    from kvcomp.pipeline import run

    deal = next((d for d in inbox() if d.id == deal_id), None)
    if deal is not None:
        res = run(deal.subject, candidates=deal.candidates, use_llm=False)
        return res, triage(res.memo).verdict.value

    cases = demo_subjects()
    if deal_id in cases:
        res = run(cases[deal_id], use_llm=False)
        return res, triage(res.memo).verdict.value

    ids = ", ".join(d.id for d in inbox()) + ", " + ", ".join(cases)
    raise SystemExit(f"unknown deal '{deal_id}'. Known: {ids}")


def main(argv: list[str] | None = None) -> None:
    import argparse

    parser = argparse.ArgumentParser(
        prog="python -m kvcomp.serialize --pdf",
        description="Export a deal's finished memo to PDF (numbers from the core).")
    parser.add_argument("--pdf", metavar="DEAL_ID", required=True, help="inbox deal id or case key.")
    parser.add_argument("--out", default=None, help="output PDF path (default: out/<deal_id>.pdf).")
    args = parser.parse_args(argv)

    res, verdict = result_for_deal(args.pdf)
    out = Path(args.out) if args.out else (
        Path(__file__).resolve().parents[3] / "out" / f"{args.pdf}.pdf")
    path = build_pdf(res, out, deal_id=args.pdf, verdict=verdict)
    print(f"wrote {path} ({args.pdf} · {verdict})")
