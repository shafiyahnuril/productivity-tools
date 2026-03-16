export function Card({
  children,
  className = "",
  elevated = false,
}: {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
}) {
  const bgClass = elevated ? "bg-surface-elevated" : "bg-surface";
  return (
    <div
      className={`${bgClass} rounded-3xl p-4 md:p-6 border border-border ${className}`}
    >
      {children}
    </div>
  );
}
