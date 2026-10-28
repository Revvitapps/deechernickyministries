const PREFIX = "[PLACEHOLDER: ";

export const isPlaceholder = (value: string | null | undefined) => !value || value.startsWith(PREFIX);

/** Renders a fact, or a visibly marked placeholder for one we could not recover. */
export function Fact({ value, fallback = "to confirm" }: { value: string | null | undefined; fallback?: string }) {
  if (!value) return <span className="placeholder">{fallback}</span>;
  if (value.startsWith(PREFIX)) return <span className="placeholder" title="Placeholder: to confirm with the ministry">{value.slice(PREFIX.length, -1)}</span>;
  return <>{value}</>;
}
