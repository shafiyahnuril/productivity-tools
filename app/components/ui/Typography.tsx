export function Heading1({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <h1 className={`text-2xl font-black tracking-tighter text-paper-fg ${className}`}>{children}</h1>;
}

export function Heading2({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <h2 className={`text-lg font-extrabold tracking-tighter text-paper-fg ${className}`}>{children}</h2>;
}

export function Text({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={`text-sm font-normal text-paper-fg2 ${className}`}>{children}</p>;
}

export function Caption({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={`text-[10px] font-bold uppercase tracking-widest text-paper-fg3 ${className}`}>{children}</span>;
}
