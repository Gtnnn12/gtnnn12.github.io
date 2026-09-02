export function GlitchTitle({ text }: { text: string }) {
  return (
    <span className="relative inline-block">
      <span
        aria-hidden
        className="glitch-layer absolute inset-0 text-primary/70 mix-blend-screen"
        style={{ transform: "translate(-2px,0)" }}
      >
        {text}
      </span>
      <span
        aria-hidden
        className="glitch-layer absolute inset-0 text-[oklch(0.7_0.14_220)]/60 mix-blend-screen"
        style={{ animationDelay: "0.12s" }}
      >
        {text}
      </span>
      <span className="relative">{text}</span>
    </span>
  );
}
