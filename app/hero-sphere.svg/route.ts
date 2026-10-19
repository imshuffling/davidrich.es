import { fibonacciSphere } from "@/utils/fibonacciSphere";

// Static stand-in for the WebGL particle sphere below xl: same Fibonacci lattice,
// projected once at build time and served as a cacheable mask image so pages
// don't inline hundreds of circles
const POINT_COUNT = 700;
const RADIUS = 90;
const TILT = 0.35;

function sphereSvg() {
  const cosT = Math.cos(TILT);
  const sinT = Math.sin(TILT);
  let circles = "";

  for (const [x, y, z] of fibonacciSphere(POINT_COUNT)) {
    // Tilt towards the viewer so the pole isn't dead centre
    const ty = y * cosT - z * sinT;
    const tz = y * sinT + z * cosT;
    if (tz < -0.3) continue;
    const facing = (tz + 1) / 2;
    circles += `<circle cx="${(100 + x * RADIUS).toFixed(1)}" cy="${(100 - ty * RADIUS).toFixed(1)}" r="${(0.6 + facing * 1.1).toFixed(1)}" fill-opacity="${(0.15 + facing * 0.85).toFixed(2)}"/>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="#fff">${circles}</svg>`;
}

export function GET() {
  return new Response(sphereSvg(), {
    headers: { "Content-Type": "image/svg+xml" },
  });
}
