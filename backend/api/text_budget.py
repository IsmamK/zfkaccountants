"""How long each text field may get before it stops fitting the design.

The site's layout was built around the copy it ships with, so the current
length of every field is the best measure of what fits. AI prompts list a
character budget per field (list items share one budget: the longest current
item), and ai/normalize flags rewritten text that blows past it.
"""

import math
import re

# Keys whose strings are references or settings, not copy.
_NOT_COPY = re.compile(r"(href|url|src|image|img|icon|logo|video|file|id|slug|email|phone|tel|type|variant|"
                       r"color|colour|theme|style|layout|align|position|target|rel|key|_hidden)$", re.I)
_REFERENCE = re.compile(r"^(https?://|mailto:|tel:|/|#)\S*$")

# Budgets for fields that are empty now (a new list item, an unfilled field).
ROLE_DEFAULTS = (
    (re.compile(r"(eyebrow|badge|tag|kicker|label|chip|pill)", re.I), 30),
    (re.compile(r"(button|cta|action|linktext)", re.I), 25),
    (re.compile(r"(subtitle|subheading|tagline|lead)", re.I), 160),
    (re.compile(r"(title|heading|headline|name|question)", re.I), 70),
    (re.compile(r"(description|desc|excerpt|summary|intro|text|answer|body|content|paragraph|copy|bio|quote)", re.I), 320),
)

LENGTH_GUIDE = """TEXT LENGTH — the page's design is built around the copy it has now. Rewritten text must fit the same space:
- Eyebrows, badges, labels: 1–4 words. Buttons and link text: 1–4 words (about 25 characters).
- Headings: one line, about the same length as now (normally under 70 characters).
- Subheadings and card descriptions: one or two sentences.
- Paragraphs and answers: about the same length as now — improve the wording, don't pad it.
- New list items match the length of the existing items in that list.
Character limits per field (a "[]" field is every item of that list):"""


def _round_up(n, step=5):
    return int(math.ceil(n / step) * step)


def _limit(current_len, key):
    if current_len <= 0:
        for pattern, default in ROLE_DEFAULTS:
            if pattern.search(key or ""):
                return default
        return None
    factor = 1.5 if current_len > 400 else 1.25
    return _round_up(max(current_len * factor, current_len + 12))


def _walk(value, path, key, out):
    if isinstance(value, str):
        if _NOT_COPY.search(key or "") or _REFERENCE.match(value.strip()):
            return
        out.setdefault(path, {"key": key, "len": 0})
        out[path]["len"] = max(out[path]["len"], len(value.strip()))
    elif isinstance(value, dict):
        for k, v in value.items():
            _walk(v, f"{path}.{k}" if path else k, k, out)
    elif isinstance(value, list):
        for v in value:
            _walk(v, f"{path}[]", key, out)


def length_budget(content):
    """{field path: max characters} for every copy field in `content`."""
    found = {}
    _walk(content, "", "", found)
    budget = {}
    for path, info in found.items():
        limit = _limit(info["len"], info["key"])
        if limit:
            budget[path] = limit
    return budget


def budget_lines(blocks):
    """blocks: {id: content} -> one prompt line per block listing its limits."""
    lines = []
    for block_id, content in blocks.items():
        budget = length_budget(content)
        if budget:
            lines.append(f"- {block_id}: " + " · ".join(f"{path} ≤ {limit}" for path, limit in budget.items()))
    return "\n".join(lines)


def too_long(before, after):
    """Fields in `after` longer than `before`'s budget allows ->
    [{"path", "length", "max"}] (one entry per field path, the longest)."""
    budget = length_budget(before or {})
    found = {}
    _walk(after, "", "", found)
    return [{"path": path, "length": info["len"], "max": budget[path]}
            for path, info in found.items() if path in budget and info["len"] > budget[path]]
