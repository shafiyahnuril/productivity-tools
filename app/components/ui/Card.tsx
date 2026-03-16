"use client";

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
      className={`${bgClass} rounded-3xl p-4 md:p-6 border border-border transition-all duration-200 shadow-sm ${className}`}
      style={{ boxShadow: 'var(--shadow-sm)' }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-md)';
        (e.currentTarget as HTMLElement).style.transform = 'scale(1.01) translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-sm)';
        (e.currentTarget as HTMLElement).style.transform = 'scale(1) translateY(0)';
      }}
    >
      {children}
    </div>
  );
}
