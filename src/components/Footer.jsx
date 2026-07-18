export function Footer({ footer, socialLinks }) {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <div className="wordmark" data-text={footer.wordmark}>{footer.wordmark}</div>
        <div className="copy-mark">{footer.copyright}</div>
      </div>
      {footer.resourceLinks?.length ? (
        <div className="footer-resources">
          {footer.resourceLinks.map((link) => (
            <a
              key={link.label}
              className="footer-link footer-resource-link"
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
      <div className="footer-links">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            className="footer-link"
            href={link.href}
            target="_blank"
            rel="noreferrer"
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
