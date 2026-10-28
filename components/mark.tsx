/** The ministry mark: a flame inside an arch, drawn from the coming-soon page's arch portrait and ember glow. No recovered logo exists. */
export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 48" className={className} aria-hidden="true">
      <path d="M4 46V20a16 16 0 0 1 32 0v26" fill="none" stroke="#f3c784" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 14c4 6 9 9 9 17a9 9 0 0 1-18 0c0-4 2-6 4-8 0 3 1 5 3 6-1-6 0-10 2-15z" fill="#e3a04f" />
      <path d="M20 28c2 2 4 4 4 7a4 4 0 0 1-8 0c0-2 1-3 2-4 0 1 1 2 2 2-1-2 0-3 0-5z" fill="#141a2e" opacity=".55" />
    </svg>
  );
}
