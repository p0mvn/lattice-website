function CornerMark({ className = "", corner }) {
  const paths = {
    topLeft: ["M8 8H16", "M8 8V16"],
    topRight: ["M0 8H8", "M8 8V16"],
    bottomLeft: ["M8 0V8", "M8 8H16"],
    bottomRight: ["M8 0V8", "M0 8H8"],
  };

  return (
    <span className={`corner-mark ${className}`} aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        {paths[corner].map((path) => (
          <path key={path} d={path} stroke="currentColor" />
        ))}
      </svg>
    </span>
  );
}

export function MarginRules({ showFourthStem = true, showTitleStem = true }) {
  return (
    <div className="margin-rules" aria-hidden="true">
      <div className="guide guide-left-inner" />
      <div className="guide guide-right-inner" />
      <div className="guide guide-sidebar-seam" />
      {showTitleStem ? <div className="guide guide-title-stem" /> : null}
      {showFourthStem ? <div className="guide guide-right-stem" /> : null}
      <div className="guide guide-top" />
      <div className="guide guide-bottom" />
    </div>
  );
}

// Ribbon bookmark — lapis segment fixed to the viewport at the spine
// (left-inner guide) x position, traveling top→bottom in proportion to
// scroll progress. Hidden when the document doesn't scroll (e.g. /home).
// Driven by --bookmark-progress and --bookmark-opacity, set by the
// scroll loop in App.jsx.
export function ScrollBookmark() {
  return <div className="scroll-bookmark" aria-hidden="true" />;
}

export function RegistrationMarks({ showFourthStem = true, showTitleStem = true }) {
  return (
    <div className="registration-marks" aria-hidden="true">
      <div className="mark-anchor mark-left">
        <CornerMark className="corner-top-left" corner="topLeft" />
        <CornerMark className="corner-bottom-left" corner="bottomLeft" />
      </div>
      <div className="mark-anchor mark-right">
        <CornerMark className="corner-top-right" corner="topRight" />
        <CornerMark className="corner-bottom-right" corner="bottomRight" />
      </div>
      <div className="top-tick top-tick-left" />
      <div className="top-tick top-tick-sidebar" />
      {showTitleStem ? <div className="top-tick top-tick-title" /> : null}
      {showFourthStem ? <div className="top-tick top-tick-right" /> : null}
      <div className="top-tick top-tick-outer-right" />
      <div className="bottom-tick bottom-tick-left" />
      <div className="bottom-tick bottom-tick-sidebar" />
      {showTitleStem ? <div className="bottom-tick bottom-tick-title" /> : null}
      {showFourthStem ? <div className="bottom-tick bottom-tick-right" /> : null}
      <div className="bottom-tick bottom-tick-outer-right" />
      <div className="footer-line footer-line-left" />
      <div className="footer-line footer-line-sidebar" />
      {/* Bottom bracket for the content column edges. Gated to the same
          flags as the corresponding vertical lines so the column bracket
          collapses cleanly when those lines are hidden. */}
      {showTitleStem ? <div className="footer-line footer-line-title-stem" /> : null}
      {showFourthStem ? <div className="footer-line footer-line-stem" /> : null}
      <div className="footer-line footer-line-right" />
    </div>
  );
}
