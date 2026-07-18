import { pageBodyComponents } from "./PageBodies";

function IntroTitle({ title, titleAccent }) {
  if (!titleAccent || !title.includes(titleAccent)) {
    return <h1>{title}</h1>;
  }

  const [before, after] = title.split(titleAccent);

  return (
    <h1>
      {before}
      <span className="title-accent">{titleAccent}</span>
      {after}
    </h1>
  );
}

export function PageIntro({ page }) {
  const bodyWidth = page.layout?.bodyWidth ?? "standard";

  return (
    <section className={`intro-section intro-section-${page.id}`}>
      <div className={`content-lane intro-lane intro-lane-${bodyWidth}`}>
        <IntroTitle title={page.title} titleAccent={page.titleAccent} />
        {page.intro ? <p className="intro-copy">{page.intro}</p> : null}
      </div>
    </section>
  );
}

export function ContentPage({ page }) {
  const BodyComponent = pageBodyComponents[page.id] ?? pageBodyComponents.home;
  const bodyWidth = page.layout?.bodyWidth ?? "standard";
  const skipIntro = page.layout?.skipIntro === true;

  return (
    <div
      className={`page-content page-content-${page.id} page-content-${bodyWidth}`}
      // Skip-link target — focusable so activating "Skip to content"
      // moves focus past the sidebar nav into the page body.
      id="main-content"
      tabIndex={-1}
    >
      {skipIntro ? null : <PageIntro page={page} />}
      <BodyComponent page={page} />
      <div className="page-end-space" aria-hidden="true" />
    </div>
  );
}
