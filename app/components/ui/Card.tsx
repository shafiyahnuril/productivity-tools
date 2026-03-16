export function Card({
  children,
  className = "",
  elevated = false,
}: {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
}) {
  const bgClass = elevated ? "bg-paper-bg3" : "bg-paper-card";
  return (
    <div
      className={`${bgClass} rounded-3xl p-4 md:p-6 border border-paper-bd ${className}`}
    >
      {children}
    </div>
  );
}
