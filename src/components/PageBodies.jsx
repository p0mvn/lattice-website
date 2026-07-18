import { useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────
// HomeContent — landing page frontispiece
//
// Single-viewport composition: display-serif positioning sentence with
// a colophon line below. Unlike the Valar landing this derives from,
// there is no backdrop plate and no margin cards — just the statement.
//
// The Footer is gated off in App.jsx via page.layout.hideFooter — the
// landing is a single moment, not a scrollable page.
// ─────────────────────────────────────────────────────────────────────

function HomeHero({ hero }) {
  const { positioning, colophonLead, colophon } = hero;

  return (
    <section className="home-hero" aria-label="Lattice">
      <h1 className="home-hero-positioning">{positioning}</h1>

      {colophon ? (
        <p className="home-hero-colophon">
          {colophonLead ? (
            <span className="home-hero-colophon-lead">{colophonLead}</span>
          ) : null}
          <span className="home-hero-colophon-body">{colophon}</span>
        </p>
      ) : null}
    </section>
  );
}

export function HomeContent({ page }) {
  const { hero } = page;

  return (
    <main className="page-body page-body-standard home-section">
      <div className="content-lane page-body-lane home-lane">
        {hero ? <HomeHero hero={hero} /> : null}
      </div>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────
// AboutContent — practice + roster
//
// Editorial roster row — two-column directory listing.
// Column 1 (narrow, left): name + role title as a sidebar label.
// Column 2 (wide, right): bio + X / GitHub links beneath.
// Name's text gets a highlighter wash when its row is the scroll-focused
// entry, applied via [data-active] toggled by the scroll tracker below.
// ─────────────────────────────────────────────────────────────────────

function AboutRosterRow({ member }) {
  return (
    <article className="team-roster-row">
      <div className="team-roster-meta">
        <h2 className="team-roster-name">
          <span className="team-roster-name-mark">{member.name}</span>
        </h2>
        {member.title ? (
          <p className="team-roster-title">{member.title}</p>
        ) : null}
      </div>
      <div className="team-roster-content">
        <p className="team-roster-bio">{member.bio}</p>
        {(member.x || member.github) ? (
          <p className="team-roster-links">
            {member.x ? (
              <a
                className="team-roster-link"
                href={member.x}
                target="_blank"
                rel="noreferrer"
                aria-label={`${member.name} on X`}
              >
                X
              </a>
            ) : null}
            {member.x && member.github ? (
              <span className="team-roster-sep" aria-hidden="true">·</span>
            ) : null}
            {member.github ? (
              <a
                className="team-roster-link"
                href={member.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`${member.name} on GitHub`}
              >
                GitHub
              </a>
            ) : null}
          </p>
        ) : null}
      </div>
    </article>
  );
}

export function AboutContent({ page }) {
  const rosterRef = useRef(null);

  // Scroll-tracked active state. Pick the roster row whose center is closest
  // to the reading focus line; this is more reliable than IntersectionObserver
  // for short rows, especially on mobile.
  useEffect(() => {
    const roster = rosterRef.current;
    if (!roster) return undefined;

    const rows = roster.querySelectorAll(".team-roster-row");
    if (rows.length === 0) return undefined;

    let frame = 0;
    const updateActiveRow = () => {
      const focusY = window.innerHeight * 0.42;
      let activeRow = rows[0];
      let smallestDistance = Infinity;

      rows.forEach((row) => {
        const rect = row.getBoundingClientRect();
        const rowCenter = rect.top + rect.height / 2;
        const distance = Math.abs(rowCenter - focusY);
        if (distance < smallestDistance) {
          smallestDistance = distance;
          activeRow = row;
        }
      });

      rows.forEach((row) => {
        if (row === activeRow) row.setAttribute("data-active", "true");
        else row.removeAttribute("data-active");
      });
      frame = 0;
    };

    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updateActiveRow);
    };

    updateActiveRow();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <main className="page-body page-body-standard team-section">
      <div className="content-lane page-body-lane team-lane">
        <section className="team-roster" aria-label="Team" ref={rosterRef}>
          {page.members.map((member) => (
            <AboutRosterRow member={member} key={member.handle} />
          ))}
        </section>
        {page.contact ? (
          <p className="about-contact">
            <span className="about-contact-label">{page.contact.label}</span>
            <a className="about-contact-email" href={`mailto:${page.contact.email}`}>
              {page.contact.email}
            </a>
          </p>
        ) : null}
      </div>
    </main>
  );
}

export const pageBodyComponents = {
  home: HomeContent,
  about: AboutContent,
};
