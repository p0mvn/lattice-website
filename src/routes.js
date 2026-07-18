import { pages } from "./data/siteContent";

export const defaultPageId = "home";

// The site is deployed under a repo prefix on GitHub Pages
// (base: "/lattice-website/" in vite.config.js). Routes are matched on
// the logical path ("/", "/about"), so the prefix is stripped on read
// and re-applied on navigation. Locally the base is "/" and both
// helpers are no-ops.
export const basePath = import.meta.env.BASE_URL.replace(/\/+$/, "");

export function stripBase(pathname) {
  if (basePath && pathname.startsWith(basePath)) {
    return pathname.slice(basePath.length) || "/";
  }
  return pathname;
}

export function withBase(path) {
  return `${basePath}${path}`;
}

const pageByPath = Object.values(pages).reduce((routes, page) => {
  routes[page.path] = page;
  for (const alias of page.aliases ?? []) {
    routes[alias] = page;
  }
  return routes;
}, {});

export function getRouteForPath(pathname) {
  const normalizedPath = stripBase(pathname).replace(/\/+$/, "") || "/";
  const page = pageByPath[normalizedPath] ?? pages[defaultPageId];

  return {
    page,
    isKnownPath: Boolean(pageByPath[normalizedPath]),
    isAliasPath: page.aliases?.includes(normalizedPath) ?? false,
    canonicalPath: page.path,
  };
}

export function getPageForPath(pathname) {
  return getRouteForPath(pathname).page;
}
