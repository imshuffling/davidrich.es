// Static stand-in for the WebGL particle sphere below xl: same Fibonacci lattice,
// projected once at build time so mobile ships no three.js
const POINT_COUNT = 700;
const RADIUS = 90;
const TILT = 0.35;

function projectedPoints() {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const cosT = Math.cos(TILT);
  const sinT = Math.sin(TILT);
  const points: { x: number; y: number; r: number; o: number }[] = [];

  for (let i = 0; i < POINT_COUNT; i++) {
    const y = 1 - (i / (POINT_COUNT - 1)) * 2;
    const ring = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const x = Math.cos(theta) * ring;
    const z = Math.sin(theta) * ring;
    // Tilt towards the viewer so the pole isn't dead centre
    const ty = y * cosT - z * sinT;
    const tz = y * sinT + z * cosT;
    if (tz < -0.3) continue;
    const facing = (tz + 1) / 2;
    points.push({
      x: +(100 + x * RADIUS).toFixed(1),
      y: +(100 - ty * RADIUS).toFixed(1),
      r: +(0.6 + facing * 1.1).toFixed(2),
      o: +(0.15 + facing * 0.85).toFixed(2),
    });
  }
  return points;
}

const POINTS = projectedPoints();

export default function HeroBlobStatic({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="hero-blob-static" gradientUnits="userSpaceOnUse" x1="20" y1="20" x2="180" y2="180">
          <stop offset="0" style={{ stopColor: "var(--md-blob-a)" }} />
          <stop offset="1" style={{ stopColor: "var(--md-blob-b)" }} />
        </linearGradient>
      </defs>
      <g fill="url(#hero-blob-static)">
        {POINTS.map(({ x, y, r, o }, i) => (
          <circle key={i} cx={x} cy={y} r={r} opacity={o} />
        ))}
      </g>
    </svg>
  );
}
