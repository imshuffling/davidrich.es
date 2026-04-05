import React from "react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-primary/10 py-16 mt-16">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="text-lg font-bold text-primary font-headline tracking-tight">
            David Riches.
          </span>
          <p className="text-on-surface-variant text-sm tracking-wide mb-0">
            Built with love ❤️
          </p>
        </div>
        <div className="flex gap-8 text-sm tracking-wide">
          <a
            className="!text-on-surface-variant hover:!text-primary !border-none !bg-none transition-colors"
            href="https://www.github.com/imshuffling"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="!text-on-surface-variant hover:!text-primary !border-none !bg-none transition-colors"
            href="https://resume.davidrich.es/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
          <a
            className="!text-on-surface-variant hover:!text-primary !border-none !bg-none transition-colors"
            href="mailto:hi@davidrich.es"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
