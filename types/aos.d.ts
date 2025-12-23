declare module 'aos' {
  interface AosOptions {
    duration?: number;
    once?: boolean;
    mirror?: boolean;
    anchorPlacement?: string;
  }

  interface AOS {
    init(options?: AosOptions): void;
    refresh(): void;
    refreshHard(): void;
  }

  const AOS: AOS;
  export default AOS;
}

declare module 'aos/dist/aos.css';
