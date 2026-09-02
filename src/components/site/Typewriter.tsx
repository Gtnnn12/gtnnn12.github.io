import { useEffect, useState } from "react";

export function Typewriter({
  text,
  speed = 65,
  startDelay = 0,
  onDone,
}: {
  text: string;
  speed?: number;
  startDelay?: number;
  onDone?: () => void;
}) {
  const [n, setN] = useState(0);
  const [started, setStarted] = useState(startDelay === 0);

  useEffect(() => {
    if (started) return;
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [started, startDelay]);

  useEffect(() => {
    if (!started) return;
    if (n >= text.length) {
      onDone?.();
      return;
    }
    const t = setTimeout(() => setN((v) => v + 1), speed);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n, text, speed, started]);

  return (
    <span>
      {text.slice(0, n)}
      <span className="caret ml-1 inline-block h-[0.85em] w-[4px] translate-y-[1px] bg-primary align-middle" />
    </span>
  );
}
