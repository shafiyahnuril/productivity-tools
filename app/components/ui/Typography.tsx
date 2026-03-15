export function Heading1({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <h1 className={`text-2xl font-semibold ${className}`}>{children}</h1>;
}

export function Heading2({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <h2 className={`text-lg font-medium ${className}`}>{children}</h2>;
}

export function Text({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={`text-sm ${className}`}>{children}</p>;
}

export function Caption({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={`text-xs ${className}`}>{children}</span>;
}
