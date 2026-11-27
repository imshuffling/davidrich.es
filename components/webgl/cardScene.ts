import { FULLSCREEN_VERT, coverUv, createProgram, uniformLocations } from "@/utils/webgl";

const FRAG = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;
uniform sampler2D uTex;
uniform vec2 uScale;
uniform vec2 uOffset;
uniform vec2 uPointer;
uniform float uStrength;
uniform float uTime;
uniform float uAspect;

void main() {
  // Zoom replaces the CSS hover scale the canvas covers
  vec2 uv = (vUv - 0.5) / (1.0 + 0.05 * uStrength) + 0.5;

  vec2 d = vUv - uPointer;
  d.x *= uAspect;
  float dist = length(d);
  vec2 dir = dist > 0.0001 ? d / dist : vec2(0.0);
  dir.x /= uAspect;
  float falloff = smoothstep(0.45, 0.0, dist) * uStrength;

  vec2 ripple = dir * sin(dist * 28.0 - uTime * 4.0) * falloff * 0.012;
  vec2 split = dir * falloff * 0.004 * uScale;
  vec2 base = (uv + ripple) * uScale + uOffset;

  vec3 col = vec3(
    texture(uTex, base + split).r,
    texture(uTex, base).g,
    texture(uTex, base - split).b
  );

  // Mirrors MediaGradient so the card text stays legible over the canvas
  float shade = vUv.y < 0.4 ? mix(0.8, 0.4, vUv.y / 0.4) : mix(0.4, 0.0, (vUv.y - 0.4) / 0.6);
  outColor = vec4(col * (1.0 - shade), 1.0);
}`;

const UNIFORMS = ["uTex", "uScale", "uOffset", "uPointer", "uStrength", "uTime", "uAspect"] as const;

interface Scene {
  canvas: HTMLCanvasElement;
  gl: WebGL2RenderingContext;
  u: Record<(typeof UNIFORMS)[number], WebGLUniformLocation | null>;
  textures: Map<string, WebGLTexture>;
}

// One canvas and context shared by every card — it moves to whichever card is hovered
let scene: Scene | null | undefined;

function getScene(): Scene | null {
  if (scene !== undefined) return scene;
  scene = null;

  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.className = "card-shader";
  const gl = canvas.getContext("webgl2", { alpha: false, antialias: false });
  if (!gl) return null;
  const program = createProgram(gl, FULLSCREEN_VERT, FRAG);
  if (!program) return null;

  gl.useProgram(program);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  const u = uniformLocations(gl, program, UNIFORMS);
  gl.uniform1i(u.uTex, 0);

  canvas.addEventListener("webglcontextlost", () => {
    stop();
    canvas.remove();
    scene = null;
  });

  scene = { canvas, gl, u, textures: new Map() };
  return scene;
}

function textureFor({ gl, textures }: Scene, img: HTMLImageElement): WebGLTexture | null {
  const key = img.currentSrc || img.src;
  const cached = textures.get(key);
  if (cached) return cached;

  const texture = gl.createTexture();
  if (!texture) return null;
  gl.bindTexture(gl.TEXTURE_2D, texture);
  try {
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
  } catch {
    // Image served without CORS headers taints the upload
    gl.deleteTexture(texture);
    return null;
  }
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  textures.set(key, texture);
  return texture;
}

let raf = 0;
let strength = 0;
let targetStrength = 0;
const pointer = { x: 0.5, y: 0.5 };
const targetPointer = { x: 0.5, y: 0.5 };

function stop() {
  cancelAnimationFrame(raf);
  raf = 0;
}

function frame(now: number) {
  if (!scene) return stop();
  const { gl, u, canvas } = scene;

  strength += (targetStrength - strength) * 0.08;
  pointer.x += (targetPointer.x - pointer.x) * 0.15;
  pointer.y += (targetPointer.y - pointer.y) * 0.15;

  if (targetStrength === 0 && strength < 0.003) {
    strength = 0;
    canvas.remove();
    return stop();
  }

  gl.uniform1f(u.uStrength, strength);
  gl.uniform1f(u.uTime, now / 1000);
  gl.uniform2f(u.uPointer, pointer.x, pointer.y);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  raf = requestAnimationFrame(frame);
}

export function isSupported(): boolean {
  return getScene() !== null;
}

export function enter(slot: HTMLElement, card: HTMLElement, img: HTMLImageElement): boolean {
  const current = getScene();
  if (!current || !img.complete || !img.naturalWidth) return false;
  const texture = textureFor(current, img);
  if (!texture) return false;

  const { canvas, gl, u } = current;
  const rect = card.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.max(1, Math.round(rect.width * dpr));
  canvas.height = Math.max(1, Math.round(rect.height * dpr));
  gl.viewport(0, 0, canvas.width, canvas.height);

  const boxAspect = rect.width / rect.height;
  const { scale, offset } = coverUv(img.naturalWidth / img.naturalHeight, boxAspect);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.uniform2f(u.uScale, scale[0], scale[1]);
  gl.uniform2f(u.uOffset, offset[0], offset[1]);
  gl.uniform1f(u.uAspect, boxAspect);

  if (canvas.parentElement !== slot) {
    strength = 0;
    slot.appendChild(canvas);
  }
  targetStrength = 1;
  if (!raf) raf = requestAnimationFrame(frame);
  return true;
}

export function move(x: number, y: number, snap = false) {
  targetPointer.x = x;
  targetPointer.y = 1 - y;
  if (!snap) return;
  pointer.x = targetPointer.x;
  pointer.y = targetPointer.y;
}

export function leave(slot: HTMLElement) {
  if (scene?.canvas.parentElement === slot) targetStrength = 0;
}
