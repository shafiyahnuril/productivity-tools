"use client";

export function Card({
  children,
  className = "",
  elevated = false,
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
  style?: React.CSSProperties;
}) {
  const bgClass = elevated ? "bg-surface-elevated" : "bg-surface";
  return (
    <div
      className={`${bgClass} rounded-3xl p-4 md:p-6 border border-border shadow-sm relative overflow-hidden ${className}`}
      style={{
        boxShadow: "var(--shadow-sm)",
        transition:
          "transform 0.22s cubic-bezier(0.34,1.2,0.64,1), box-shadow 0.22s ease, border-color 0.22s ease",
        ...style,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow =
          "0 12px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)";
        el.style.transform = "translateY(-4px) scale(1.005)";
        el.style.borderColor = "rgba(217,119,6,0.2)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = "var(--shadow-sm)";
        el.style.transform = "translateY(0) scale(1)";
        el.style.borderColor = "";
      }}
    >
      {children}
    </div>
  );
}
