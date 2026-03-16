export function Heading1({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1 className={`text-2xl font-black tracking-tighter ${className}`}>
      {children}
    </h1>
  );
}

export function Heading2({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={`text-base font-semibold tracking-tight ${className}`}>
      {children}
    </h2>
  );
}

export function Text({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={`text-sm font-normal ${className}`}>{children}</p>;
}

export function Caption({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`text-[10px] font-bold uppercase tracking-widest ${className}`}
    >
      {children}
    </span>
  );
}
