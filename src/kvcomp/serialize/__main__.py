"""Entry point for `python -m kvcomp.serialize`.

Dispatches on the leading mode flag and otherwise preserves the original per-case path:

    (no flag)   -> per-case window.MEMO        (--case south/east/west --out ...)  [unchanged]
    --queue     -> triage queue snapshot       (--queue --out viewer/queue.js)
    --pdf <id>  -> per-deal PDF export         (--pdf <deal_id> --out <path>)
    --intake    -> live intake beat            (blurb -> Subject with per-field provenance)
"""

import sys


def main(argv: list[str] | None = None) -> None:
    argv = list(sys.argv[1:] if argv is None else argv)
    if "--queue" in argv:
        from kvcomp.serialize.queue import main as queue_main
        return queue_main(argv)
    if "--pdf" in argv:
        from kvcomp.serialize.pdf import main as pdf_main
        return pdf_main(argv)
    if "--intake" in argv:
        from kvcomp.serialize.intake_demo import main as intake_main
        return intake_main(argv)
    from kvcomp.serialize.memo_to_window import main as case_main
    return case_main(argv)


if __name__ == "__main__":
    main()
