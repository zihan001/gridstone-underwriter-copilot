"""
schemas/results.py — the frozen result types produced by the deterministic core and
consumed by the LLM seam, the serializer, and the tests.

Reason codes, flag codes, and severities are CLOSED enums so boundary tests can assert
against them and the serializer can validate every emitted code resolves. Codes mirror
the delivered viewer's registry (docs/DECISIONS.md ADR-002).
"""

from __future__ import annotations

from enum import Enum

from pydantic import BaseModel

from kvcomp.schemas.comp import Comp


# ---- closed enums ----------------------------------------------------------
class ReasonCode(str, Enum):
    TOO_STALE = "TOO_STALE"
    WRONG_DISTRICT_AFTER_WIDENING = "WRONG_DISTRICT_AFTER_WIDENING"
    GROSS_ADJ_TOO_HIGH = "GROSS_ADJ_TOO_HIGH"
    OUTLIER_PRICE = "OUTLIER_PRICE"
    DUPLICATE = "DUPLICATE"


class FlagCode(str, Enum):
    DEEP_WIDENING = "DEEP_WIDENING"
    STALE_COMP = "STALE_COMP"
    EXCESSIVE_GROSS_ADJ = "EXCESSIVE_GROSS_ADJ"
    EXCESSIVE_NET_ADJ = "EXCESSIVE_NET_ADJ"
    ADJACENT_DISTRICT_COMP = "ADJACENT_DISTRICT_COMP"
    THIN_COMP_SET = "THIN_COMP_SET"
    NET_ADJ_BREACH = "NET_ADJ_BREACH"
    GROSS_ADJ_BREACH = "GROSS_ADJ_BREACH"
    LINE_ADJ_BREACH = "LINE_ADJ_BREACH"
    OUTLIER_PRICE_INCLUDED = "OUTLIER_PRICE_INCLUDED"
    VALUE_OUTSIDE_RANGE = "VALUE_OUTSIDE_RANGE"
    HIGH_COMP_ANCHORING = "HIGH_COMP_ANCHORING"
    UNSUPPORTED_TIME_ADJ = "UNSUPPORTED_TIME_ADJ"
    WIDE_UNADJUSTED_SPREAD = "WIDE_UNADJUSTED_SPREAD"


class FlagStatus(str, Enum):
    FIRED = "FIRED"
    CLEAR = "CLEAR"


class Severity(str, Enum):
    REVIEW = "review"
    INFO = "info"
    TOLERANCE = "tolerance"


class TriageVerdict(str, Enum):
    """Queue-level disposition for one finished memo (domain/triage.py).

    A closed enum so the queue serializer and tests assert against it. GREEN = file it;
    YELLOW = a human should look; RED = the evidence cannot defend a range as-is."""
    GREEN = "green"
    YELLOW = "yellow"
    RED = "red"


# ---- result types ----------------------------------------------------------
class SimilarityScore(BaseModel, frozen=True):
    comp_id: str
    score: float                             # 0..1, higher = more similar
    components: dict[str, float] = {}         # per-attribute distance contributions


class WideningStep(BaseModel, frozen=True):
    tier: int
    title: str
    criteria: list[tuple[str, str]]          # [(label, value)]
    rationale: str
    found: int
    penalty: float = 0.0                     # <= 0
    note: str | None = None


class RejectionRecord(BaseModel, frozen=True):
    comp_id: str
    reason_code: ReasonCode
    detail: str
    metric_label: str | None = None
    metric_value: str | None = None
    cap: str | None = None


class GridLine(BaseModel, frozen=True):
    key: str                                 # gla|lot|bed|bath|bsmt|gar|age|cond|qual|time
    label: str
    sub: str                                 # human delta string, e.g. "1,485 sf (+35)"
    adjustment: int                          # signed; superior comp -> negative


class AdjustedComp(BaseModel, frozen=True):
    comp: Comp
    lines: list[GridLine]                    # canonical order + trailing time line
    time_adj: int
    benchmark_at_contract: int
    time_factor: float
    net: int
    gross: int
    adjusted_value: int
    net_pct: float
    gross_pct: float
    max_line_pct: float
    weight: float = 0.0                      # filled at reconciliation; selected sum to 1


class ValueRange(BaseModel, frozen=True):
    low: int
    point: int                               # weighted central indication
    high: int
    spread_pct: float


class ConfidenceDriver(BaseModel, frozen=True):
    key: str
    label: str
    detail: str
    contrib: float                           # signed delta from base


class ConfidenceBreakdown(BaseModel, frozen=True):
    base: float
    score: float
    low: float
    high: float
    band: str                                # "MODERATE" etc.
    drivers: list[ConfidenceDriver]


class Flag(BaseModel, frozen=True):
    code: FlagCode
    status: FlagStatus
    severity: Severity
    trigger: str
    detail: str


class Narrative(BaseModel, frozen=True):
    scope: str = ""
    selection: str = ""
    adjustment: str = ""
    reconciliation: str = ""
    confidence: str = ""
    limiting: str = ""


class SearchSummary(BaseModel, frozen=True):
    retrieved: int
    selected: int
    rejected: int
    final_tier: int
    widening_depth: int
    total_penalty: float


class MemoArtifact(BaseModel, frozen=True):
    """The frozen handoff: pipeline produces it, LLM fills narrative, serializer renders.
    All numbers are final here (ARCHITECTURE seam)."""
    subject: object                          # Subject; `object` avoids import-cycle noise
    selected: list[AdjustedComp]
    rejected: list[RejectionRecord]
    widening: list[WideningStep]
    search_summary: SearchSummary
    value_range: ValueRange
    confidence: ConfidenceBreakdown
    flags: list[Flag]
    narrative: Narrative = Narrative()
    # carried for the serializer / market context
    district_benchmark: int = 0
    city_benchmark: int = 747800


class TriageResult(BaseModel, frozen=True):
    """The queue's read-only verdict on a finished memo. Computes NO valuation — it reads the
    already-computed confidence band/score and fired flags and classifies them. `reason` is
    built from a triggering flag's existing detail text (never new prose); `review_flag_count`
    and `score` are the queue sort keys (scariest floats up)."""
    verdict: TriageVerdict
    reason: str
    review_flag_count: int
    score: float
