import { useEffect, useMemo, useRef, useState } from "react";
import { Footer } from "./components/Footer";
import { MarginRules, RegistrationMarks, ScrollBookmark } from "./components/FrameGuides";
import { Header } from "./components/Navigation";
import { ContentPage } from "./components/PageContent";
import { siteContent } from "./data/siteContent";
import { getRouteForPath, withBase } from "./routes";

/*
 * GUIDE MOTION STORYBOARD
 *
 * The vertical rules carry three independent motion layers:
 *
 *   1. BREATH      — 9s CSS keyframe, opacity sweeps a bright band
 *                    from top to bottom of each rule (lineBreath in
 *                    styles.css). Staggered per-guide via animation-delay.
 *
 *   2. POINTER-FOCUS — radial gradient on each rule tracks mouse Y
 *                      via the --line-focus-y custom property.
 *                      Desktop only; no-op on touch (no pointermove).
 *
 *   3. SCROLL-DRIFT — translateY on each rule offsets in response to
 *                     scroll, easing toward a target via a JS settle
 *                     loop. Target oscillates within SCROLL_CYCLE_PX,
 *                     scaled by SCROLL_DRIFT_FACTOR.
 *
 * The settle loop is rAF-based with velocity easing; it cancels itself
 * once the line position has caught up to the target (DEAD_ZONE_PX).
 */

const GUIDE_MOTION = {
  scrollCyclePx:      180,    // px of scroll for one full target-offset cycle
  scrollDriftFactor:  0.18,   // peak translateY ≈ scrollCyclePx × this
  settleAcceleration: 0.08,   // velocity gain per frame
  settleDamping:      0.78,   // velocity retained per frame (1 = inertial, 0 = stopped)
  deadZonePx:         0.05,   // settle exits when delta + velocity drop below this
};

function App() {
  const frameRef = useRef(null);
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);
  const route = useMemo(() => getRouteForPath(currentPath), [currentPath]);
  const { page } = route;
  const showFourthStem = page.layout?.showFourthStem ?? true;
  const showTitleStem = page.layout?.showTitleStem ?? true;
  const hideFooter = page.layout?.hideFooter === true;

  const navigate = (href) => {
    const url = new URL(href, window.location.origin);
    if (url.origin !== window.location.origin) {
      window.location.href = url.href;
      return;
    }

    const newTarget = withBase(url.pathname) + url.search;
    if (newTarget !== window.location.pathname + window.location.search) {
      window.history.pushState({}, "", newTarget);
    }
    setCurrentPath(url.pathname);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  useEffect(() => {
    document.title = page.documentTitle ?? `${page.title} | ${siteContent.brandName}`;
  }, [page.documentTitle, page.title]);

  useEffect(() => {
    if (!window.location.hash) return;

    window.history.replaceState({}, "", withBase(route.canonicalPath));
    setCurrentPath(route.canonicalPath);
  }, [route]);

  useEffect(() => {
    const shouldNoIndex =
      page.noIndex === true || route.isAliasPath || !route.isKnownPath;
    const robotsContent = shouldNoIndex ? "noindex, nofollow" : "index, follow";

    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement("meta");
      robotsMeta.setAttribute("name", "robots");
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute("content", robotsContent);

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute(
      "href",
      new URL(withBase(route.canonicalPath), window.location.origin).href,
    );
  }, [page.noIndex, route]);

  useEffect(() => {
    const updatePath = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", updatePath);
    return () => window.removeEventListener("popstate", updatePath);
  }, []);

  // Footer-in-view tracking — when the footer enters the viewport, set a
  // body-level class. CSS uses this to clear the active-section indicators
  // (the lapis section-eyebrow hairline, the lapis name highlight on
  // /team). User has scrolled past the content into the footer area —
  // no longer "reading a section."
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;
    const footer = document.querySelector(".footer");
    if (!footer) {
      document.body.classList.remove("footer-in-view");
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          document.body.classList.toggle("footer-in-view", entry.isIntersecting);
        });
      },
      { threshold: 0 },
    );
    observer.observe(footer);
    return () => {
      observer.disconnect();
      document.body.classList.remove("footer-in-view");
    };
  }, [currentPath]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return undefined;

    let settlingFrame = 0;
    let currentOffset = 0;
    let targetOffset = 0;
    let velocity = 0;

    const settleLines = () => {
      const delta = targetOffset - currentOffset;
      velocity += delta * GUIDE_MOTION.settleAcceleration;
      velocity *= GUIDE_MOTION.settleDamping;
      currentOffset += velocity;

      frame.style.setProperty("--line-scroll-offset", `${currentOffset.toFixed(2)}px`);

      if (Math.abs(delta) > GUIDE_MOTION.deadZonePx || Math.abs(velocity) > GUIDE_MOTION.deadZonePx) {
        settlingFrame = requestAnimationFrame(settleLines);
      } else {
        currentOffset = targetOffset;
        velocity = 0;
        frame.style.setProperty("--line-scroll-offset", `${currentOffset.toFixed(2)}px`);
        settlingFrame = 0;
      }
    };

    const scheduleSettling = () => {
      if (!settlingFrame) {
        settlingFrame = requestAnimationFrame(settleLines);
      }
    };

    const updateLineFocus = (event) => {
      const rect = frame.getBoundingClientRect();
      frame.style.setProperty("--line-focus-y", `${event.clientY - rect.top}px`);
    };

    const updateBookmark = () => {
      const scrollMax = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      const isScrollable = scrollMax > 80;
      const progress = isScrollable
        ? Math.min(1, Math.max(0, window.scrollY / scrollMax))
        : 0;
      frame.style.setProperty("--bookmark-progress", progress.toFixed(4));
      frame.style.setProperty("--bookmark-opacity", isScrollable ? "1" : "0");
    };

    const updateLineScroll = () => {
      targetOffset = (window.scrollY % GUIDE_MOTION.scrollCyclePx) * GUIDE_MOTION.scrollDriftFactor;
      updateBookmark();
      scheduleSettling();
    };

    frame.addEventListener("pointermove", updateLineFocus);
    window.addEventListener("scroll", updateLineScroll, { passive: true });
    window.addEventListener("resize", updateLineScroll);
    updateLineScroll();

    return () => {
      frame.removeEventListener("pointermove", updateLineFocus);
      window.removeEventListener("scroll", updateLineScroll);
      window.removeEventListener("resize", updateLineScroll);
      cancelAnimationFrame(settlingFrame);
    };
  }, []);

  return (
    <div className="app-shell">
      {/* Full-bleed extensions of the top + footer horizontal rules. They
          sit behind the centered (opaque) frame, so the frame's own
          .guide-top / footer border still draw the centered 1440 segment
          with their scroll/focus behavior; this layer continues each line
          across the side margins to the viewport edge so the horizontal
          rules don't stop abruptly at the 1440 cap on wide screens. */}
      {hideFooter ? null : <div className="frame-bleed-rules" aria-hidden="true" />}
      <div className={`page-frame page-frame-${page.id}`} ref={frameRef}>
        {/* Skip link — first Tab stop on every page. Off-screen until
            keyboard focus; jumps past the persistent sidebar nav to the
            page-content wrapper (#main-content, tabindex -1). Lives
            inside .page-frame because the color tokens (--ink,
            --accent-gold) are defined on the frame, not :root. */}
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <svg className="print-filter-defs" aria-hidden="true" focusable="false">
          <defs>
            <filter id="title-print-distort">
              <feTurbulence baseFrequency="0.9 1.1" numOctaves="1" seed="7" />
              <feDisplacementMap in="SourceGraphic" scale="0.65" />
            </filter>
          </defs>
        </svg>
        <MarginRules showFourthStem={showFourthStem} showTitleStem={showTitleStem} />
        <RegistrationMarks
          showFourthStem={showFourthStem}
          showTitleStem={showTitleStem}
        />
        <ScrollBookmark />
        <Header
          logo={siteContent.logo}
          navItems={siteContent.navItems}
          activePageId={page.id}
          socialLinks={siteContent.socialLinks}
          onNavigate={navigate}
          wordmark={siteContent.footer.wordmark}
        />
        <ContentPage page={page} />
        {hideFooter ? null : (
          <Footer footer={siteContent.footer} socialLinks={siteContent.socialLinks} />
        )}
      </div>
    </div>
  );
}

export default App;
