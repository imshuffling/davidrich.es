"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Color, type Mesh, type ShaderMaterial } from "three";

const NOISE = /* glsl */ `
vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
  i = mod(i, 289.0);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 1.0 / 7.0;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
`;

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uAmp;
varying vec3 vViewPos;
varying float vNoise;
${NOISE}
void main() {
  float n = snoise(position * 0.8 + uTime * 0.2);
  vNoise = n;
  vec3 displaced = position + normal * n * uAmp;
  vec4 mv = modelViewMatrix * vec4(displaced, 1.0);
  vViewPos = mv.xyz;
  gl_Position = projectionMatrix * mv;
}
`;

const fragmentShader = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
varying vec3 vViewPos;
varying float vNoise;
void main() {
  vec3 normal = normalize(cross(dFdx(vViewPos), dFdy(vViewPos)));
  vec3 viewDir = normalize(-vViewPos);
  float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.0);
  float light = max(dot(normal, normalize(vec3(-0.4, 0.8, 0.6))), 0.0);
  vec3 base = mix(uColorA, uColorB, smoothstep(-0.6, 0.8, vNoise + normal.y * 0.4));
  vec3 color = base * (0.55 + 0.45 * light) + fresnel * mix(uColorB, vec3(1.0), 0.35);
  gl_FragColor = vec4(color, 1.0);
}
`;

const COLOR_TOKENS = ["--md-blob-a", "--md-blob-b"];

function readTokens() {
  const styles = getComputedStyle(document.documentElement);
  return COLOR_TOKENS.map((token) => styles.getPropertyValue(token).trim());
}

function Blob() {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);
  const hovered = useRef(false);
  const invalidate = useThree((state) => state.invalidate);

  const [initialUniforms] = useState(() => ({
    uTime: { value: 0 },
    uAmp: { value: 0.18 },
    uColorA: { value: new Color() },
    uColorB: { value: new Color() },
  }));

  // Theme switches only flip data-theme on <html>, so watch it and re-read the tokens
  useEffect(() => {
    const applyTokens = () => {
      const uniforms = materialRef.current?.uniforms;
      if (!uniforms) return;
      const [a, b] = readTokens();
      uniforms.uColorA.value.set(a);
      uniforms.uColorB.value.set(b);
      invalidate();
    };
    applyTokens();
    const observer = new MutationObserver(applyTokens);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, [invalidate]);

  useFrame(({ pointer }, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const { uniforms } = mesh.material as ShaderMaterial;
    uniforms.uTime.value += delta;
    const targetAmp = hovered.current ? 0.3 : 0.18;
    uniforms.uAmp.value += (targetAmp - uniforms.uAmp.value) * Math.min(delta * 3, 1);
    mesh.rotation.y += (pointer.x * 0.5 + uniforms.uTime.value * 0.1 - mesh.rotation.y) * Math.min(delta * 2, 1);
    mesh.rotation.x += (-pointer.y * 0.4 - mesh.rotation.x) * Math.min(delta * 2, 1);
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => (hovered.current = true)}
      onPointerOut={() => (hovered.current = false)}
    >
      <icosahedronGeometry args={[1.3, 48]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={initialUniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

export default function HeroBlobScene({ animate }: { animate: boolean }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) =>
      setInView(entry.isIntersecting)
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="size-full">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4.8], fov: 45 }}
        frameloop={animate && inView ? "always" : "demand"}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        aria-hidden="true"
      >
        <Blob />
      </Canvas>
    </div>
  );
}
