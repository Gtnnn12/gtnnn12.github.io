const LINES = [
  "const sandbox = await createSandbox({ permissions: ['fs:read'] });",
  "if (!verifySignature(payload, secret)) throw new Error('untrusted plugin');",
  "export type Plugin = { id: string; scopes: Scope[]; entry: () => void };",
  "0x1F3A 0xBE04 1011010 0x7C2D 0110011 0xA19F 1001110 0x33E8",
  "registry.on('install', (p) => audit.log({ plugin: p.id, sha: p.hash }));",
  "for (const mod of modules) await mod.mount({ isolated: true });",
];

/** Capa de código que se desplaza horizontalmente en bucle infinito. */
export function AsciiStream({ opacity = 0.04 }: { opacity?: number }) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden" style={{ opacity }}>
      {LINES.map((line, i) => (
        <div
          key={line}
          className="absolute font-mono text-[11px] whitespace-nowrap text-foreground"
          style={{
            top: `${8 + i * 16}%`,
            animation: `ascii-slide ${70 + i * 18}s linear infinite`,
            animationDirection: i % 2 === 0 ? "normal" : "reverse",
            animationDelay: `${i * -9}s`,
          }}
        >
          <span className="inline-block pr-24">{`${line}   //   ${line}   //   ${line}`}</span>
          <span className="inline-block pr-24">{`${line}   //   ${line}   //   ${line}`}</span>
        </div>
      ))}
    </div>
  );
}
