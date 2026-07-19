export function ExternalArrow({ className = "article-arrow" }) {
  return (
    <svg
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
    >
      <path
        d="M3.5 10.5 L10.5 3.5 M5 3.5 L10.5 3.5 L10.5 9"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
