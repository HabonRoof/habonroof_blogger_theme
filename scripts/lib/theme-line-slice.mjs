/**
 * Slice raw theme XML by 1-based inclusive line numbers without corrupting newlines.
 */
export function buildLineStarts(raw) {
  const starts = [0];
  for (let i = 0; i < raw.length; i++) {
    if (raw[i] === '\n') starts.push(i + 1);
  }
  return starts;
}

/** Exclusive end character index for 1-based line number `lineNo`. */
export function lineExclusiveEnd(raw, starts, lineNo) {
  if (lineNo < starts.length) return starts[lineNo];
  return raw.length;
}

/** Inclusive line range a..b → exact substring as in source file. */
export function sliceLinesRaw(raw, startLine, endLine) {
  const starts = buildLineStarts(raw);
  const from = starts[startLine - 1];
  const to = lineExclusiveEnd(raw, starts, endLine);
  return raw.slice(from, to);
}
