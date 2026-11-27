import {
  FULLSCREEN_VERT,
  createProgram,
  cssColorToVec3,
  uniformLocations,
  type Vec3,
} from "@/utils/webgl";

const FRAG = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;
uniform float uTime;
uniform float uScroll;
uniform float uAspect;
uniform vec2 uPointer;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform vec3 uSurface;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = p * 2.02 + vec2(17.3, 9.1);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 st = vec2(vUv.x * uAspect, vUv.y);
  vec2 p = st * 1.4 + vec2(0.0, uScroll);
  float t = uTime * 0.04;
  vec2 warp = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t));
  float n = fbm(p + warp * 1.6);
  float m = fbm(p * 0.7 - warp + 3.7);
  vec3 col = mix(uColorA, uColorB, smoothstep(0.25, 0.75, n));
  col = mix(col, uColorC, smoothstep(0.35, 0.8, m));
  float glow = smoothstep(0.9, 0.0, distance(st, vec2(uPointer.x * uAspect, uPointer.y)));
  float amount = 0.18 * (smoothstep(0.2, 0.9, n) * 0.8 + glow * 0.5);
  col = mix(uSurface, col, amount);
  col += (hash(gl_FragCoord.xy) - 0.5) * 0.012;
  outColor = vec4(col, 1.0);
}`;

const UNIFORMS = [
  "uTime",
  "uScroll",
  "uAspect",
  "uPointer",
  "uColorA",
  "uColorB",
  "uColorC",
  "uSurface",
] as const;

const TOKENS = {
  uColorA: "--md-primary",
  uColorB: "--md-secondary",
  uColorC: "--md-tertiary",
  uSurface: "--md-surface",
} as const;

const RESOLUTION = 0.5;
const FRAME_MS = 1000 / 30;

export function createAmbientScene(canvas: HTMLCanvasElement): (() => void) | null {
  const gl = canvas.getContext("webgl2", {
    alpha: false,
    antialias: false,
    powerPreference: "low-power",
  });
  if (!gl) return null;
  const program = createProgram(gl, FULLSCREEN_VERT, FRAG);
  if (!program) return null;
  const u = uniformLocations(gl, program, UNIFORMS);
  gl.useProgram(program);

  const root = document.documentElement;
  const readColors = () => {
    const styles = getComputedStyle(root);
    for (const [name, token] of Object.entries(TOKENS) as [keyof typeof TOKENS, string][]) {
      const rgb: Vec3 | null = cssColorToVec3(styles.getPropertyValue(token));
      if (rgb) gl.uniform3fv(u[name], rgb);
    }
  };
  readColors();
  const themeObserver = new MutationObserver(readColors);
  themeObserver.observe(root, { attributes: true, attributeFilter: ["data-theme"] });

  const resize = () => {
    const width = Math.max(1, Math.round(canvas.clientWidth * RESOLUTION));
    const height = Math.max(1, Math.round(canvas.clientHeight * RESOLUTION));
    if (canvas.width === width && canvas.height === height) return;
    canvas.width = width;
    canvas.height = height;
    gl.viewport(0, 0, width, height);
    gl.uniform1f(u.uAspect, width / height);
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  resize();

  const target = { x: 0.5, y: 0.5 };
  const pointer = { x: 0.5, y: 0.5 };
  const onPointerMove = (event: PointerEvent) => {
    target.x = event.clientX / window.innerWidth;
    target.y = 1 - event.clientY / window.innerHeight;
  };
  window.addEventListener("pointermove", onPointerMove, { passive: true });

  let raf = 0;
  let last = 0;
  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    if (now - last < FRAME_MS) return;
    last = now;
    pointer.x += (target.x - pointer.x) * 0.05;
    pointer.y += (target.y - pointer.y) * 0.05;
    gl.uniform1f(u.uTime, now / 1000);
    gl.uniform1f(u.uScroll, (window.scrollY / window.innerHeight) * 0.3);
    gl.uniform2f(u.uPointer, pointer.x, pointer.y);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    canvas.classList.add("is-ready");
  };
  const start = () => {
    if (!raf && !document.hidden) raf = requestAnimationFrame(frame);
  };
  const stop = () => {
    cancelAnimationFrame(raf);
    raf = 0;
  };
  const onVisibility = () => (document.hidden ? stop() : start());
  document.addEventListener("visibilitychange", onVisibility);

  const teardown = () => {
    stop();
    canvas.classList.remove("is-ready");
    themeObserver.disconnect();
    resizeObserver.disconnect();
    window.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("visibilitychange", onVisibility);
    canvas.removeEventListener("webglcontextlost", teardown);
  };
  // Context loss leaves the CSS fallback showing rather than a frozen frame
  canvas.addEventListener("webglcontextlost", teardown);

  start();

  return () => {
    teardown();
    gl.deleteProgram(program);
  };
}
