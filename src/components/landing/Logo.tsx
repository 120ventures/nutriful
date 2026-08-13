const Logo = ({ className = "", light = false }: { className?: string; light?: boolean }) => (
  <span
    className={`inline-flex items-center gap-2.5 font-display text-2xl font-semibold lowercase tracking-tight ${
      light ? "text-white" : "text-foreground"
    } ${className}`}
  >
    <svg viewBox="0 0 32 32" className="h-6 w-6 shrink-0" aria-hidden="true" fill="none">
      {/* sprout - two fresh leaves */}
      <path
        d="M16 27c0-7 3.4-11.4 11-12.6-0.4 7.4-4 11.6-11 12.6Z"
        fill="hsl(var(--secondary))"
      />
      <path
        d="M16 27c0-5.6-2.8-9.2-9-10 0.3 5.9 3.2 9.3 9 10Z"
        fill="hsl(var(--primary))"
      />
      <path
        d="M16 27.5V19"
        stroke={light ? "white" : "hsl(var(--foreground))"}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
    <span className="leading-none">nutriful</span>
  </span>
);

export default Logo;
