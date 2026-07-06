import React from "react";
import { CONTACT, LINKS } from "@/utils/site";

export default function Footer() {
  return (
    <footer className="w-full border-t border-primary/10 py-16 mt-16">
      <div className="container flex flex-col md:flex-row justify-between items-center gap-6">
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
            className="text-on-surface-variant hover:text-primary !border-none !bg-none transition-colors"
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="text-on-surface-variant hover:text-primary !border-none !bg-none transition-colors"
            href={LINKS.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
          <a
            className="text-on-surface-variant hover:text-primary !border-none !bg-none transition-colors"
            href={`mailto:${CONTACT.email}`}
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
