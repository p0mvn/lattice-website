import React, { useEffect, useRef } from "react";

/*
 * MOBILE MENU STORYBOARD
 *
 * Open: container fades + slides in (220ms ease-out).
 *       Header, nav, and social cascade in 30-50ms apart.
 *
 *    0ms   container starts (opacity 0 to 1, translateY -12 to 0)
 *   40ms   menu header begins (Wordmark + Close button)
 *   90ms   nav item I.   Our Work
 *  130ms   nav item II.  Research    (stagger 40ms)
 *  170ms   nav item III. Team        (stagger 40ms)
 *  230ms   social link X (Twitter)   (pause 60ms after nav)
 *  270ms   social link GitHub        (stagger 40ms)
 *  ~400ms  all elements at rest
 *
 * Close: items + container collapse together (no stagger).
 * Reduced-motion: all transitions collapse to 120ms linear, no stagger.
 */

const MENU_TIMING = {
  containerOpenMs: 220,
  containerCloseMs: 180,
  itemOpenMs: 200,
  itemCloseMs: 160,
  headerDelayMs: 40,
  navStartMs: 90,
  navStaggerMs: 40,
  socialGapMs: 60,
  socialStaggerMs: 40,
};

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

function navDelayMs(i) {
  return MENU_TIMING.navStartMs + i * MENU_TIMING.navStaggerMs;
}

function socialDelayMs(i, navItems) {
  const lastNavMs = navDelayMs(navItems.length - 1);
  return lastNavMs + MENU_TIMING.socialGapMs + i * MENU_TIMING.socialStaggerMs;
}

function LogoMark({ logo, onNavigate }) {
  return (
    <a
      href={logo.href}
      className="logo-mark"
      aria-label={logo.ariaLabel}
      onClick={(event) => onNavigate(event, logo.href)}
    >
      <span className="logo-mark-text" aria-hidden="true">
        {logo.mark}
      </span>
    </a>
  );
}

// Wordmark — renders as a link when href + onClick are supplied (the
// mobile-menu uses this to make the wordmark navigate home and close
// the menu). Falls back to a plain <div> when used decoratively.
function Wordmark({ className = "", href, onClick, ariaLabel, text }) {
  const classes = `menu-wordmark ${className}`;
  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={classes}
        data-text={text}
        aria-label={ariaLabel}
      >
        {text}
      </a>
    );
  }
  return <div className={classes} data-text={text}>{text}</div>;
}

// Sidebar watermark — identical treatment to the footer wordmark on
// other pages (.wordmark class carries the print-distort + multi-layer
// deboss text-shadow). Sits at the foot of the home-page sidebar.
function SidebarWatermark({ wordmark }) {
  return (
    <div className="wordmark sidebar-wordmark" data-text={wordmark}>
      {wordmark}
    </div>
  );
}

export function Header({ logo, navItems, activePageId, socialLinks, onNavigate, wordmark }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const openButtonRef = useRef(null);
  const closeButtonRef = useRef(null);
  const menuRef = useRef(null);
  const wasMenuOpenRef = useRef(false);
  const closeMenu = () => setMenuOpen(false);
  const handleInternalNavigation = (event, href) => {
    if (!onNavigate || href.startsWith("http")) return;
    event.preventDefault();
    onNavigate(href);
    closeMenu();
  };

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  useEffect(() => {
    if (menuRef.current) menuRef.current.inert = !menuOpen;

    if (menuOpen) {
      requestAnimationFrame(() => closeButtonRef.current?.focus());
    } else if (wasMenuOpenRef.current) {
      openButtonRef.current?.focus();
    }

    wasMenuOpenRef.current = menuOpen;
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const handleMenuKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== "Tab" || !menuRef.current) return;

      const focusableElements = Array.from(
        menuRef.current.querySelectorAll(FOCUSABLE_SELECTOR),
      ).filter((element) => !element.inert && element.offsetParent !== null);

      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleMenuKeyDown);
    return () => document.removeEventListener("keydown", handleMenuKeyDown);
  }, [menuOpen]);

  return (
    <>
      <header className="sidebar-rail">
        <LogoMark logo={logo} onNavigate={handleInternalNavigation} />
        <button
          ref={openButtonRef}
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(true)}
        >
          Menu
        </button>
        <nav className="primary-nav" aria-label="Primary">
          {navItems.map((item) => {
            const isActive = item.id === activePageId;
            return (
              <a
                key={item.id}
                className={`nav-link ${isActive ? "nav-link-active" : ""}`}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                onClick={(event) => handleInternalNavigation(event, item.href)}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
        {activePageId === "home" ? (
          <SidebarWatermark wordmark={wordmark} />
        ) : null}
      </header>
      <div
        ref={menuRef}
        className={`mobile-menu ${menuOpen ? "mobile-menu-open" : ""}`}
        id="mobile-menu"
        aria-hidden={!menuOpen}
        aria-label="Mobile navigation"
        aria-modal="true"
        role="dialog"
      >
        <div
          className="mobile-menu-header"
          style={{ "--item-delay": `${MENU_TIMING.headerDelayMs}ms` }}
        >
          <Wordmark
            href="/"
            text={(wordmark ?? "").toUpperCase()}
            ariaLabel={logo.ariaLabel}
            onClick={(event) => handleInternalNavigation(event, "/")}
          />
          <button
            ref={closeButtonRef}
            className="menu-toggle"
            type="button"
            onClick={closeMenu}
          >
            Close
          </button>
        </div>
        <div className="mobile-menu-body">
          <nav className="mobile-nav" aria-label="Mobile primary">
            {navItems.map((item, i) => {
              const isActive = item.id === activePageId;
              return (
                <div
                  key={item.id}
                  className={`mobile-nav-item ${isActive ? "mobile-nav-item-active" : ""}`}
                  style={{ "--item-delay": `${navDelayMs(i)}ms` }}
                >
                  <a
                    className="mobile-nav-link"
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={(event) => handleInternalNavigation(event, item.href)}
                  >
                    {item.label}
                  </a>
                </div>
              );
            })}
          </nav>
          <div className="mobile-menu-social">
            {socialLinks.map((link, i) => (
              <a
                key={link.label}
                className="mobile-menu-social-link"
                href={link.href}
                target="_blank"
                rel="noreferrer"
                onClick={closeMenu}
                style={{ "--item-delay": `${socialDelayMs(i, navItems)}ms` }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
