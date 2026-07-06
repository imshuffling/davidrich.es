export function stableIndex(key: string, length: number): number {
  if (length <= 0) return 0;
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) % length;
}

export interface IconColor {
  bg: string;
  color: string;
}

const ICON_PALETTE: IconColor[] = [
  { bg: "rgba(99, 14, 212, 0.15)", color: "#630ed4" },
  { bg: "rgba(156, 44, 155, 0.15)", color: "#9c2c9b" },
  { bg: "rgba(0, 84, 121, 0.15)", color: "#005479" },
  { bg: "rgba(124, 58, 237, 0.15)", color: "#7c3aed" },
  { bg: "rgba(0, 109, 156, 0.15)", color: "#006d9c" },
  { bg: "rgba(186, 26, 26, 0.15)", color: "#ba1a1a" },
];

export function colorFor(key: string, paletteSize = ICON_PALETTE.length): IconColor {
  const palette = ICON_PALETTE.slice(0, paletteSize);
  return palette[stableIndex(key, palette.length)];
}
