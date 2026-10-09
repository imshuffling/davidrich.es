import Link from "next/link";
import { CONTACT, LINKS, NAV_LINKS, REPO_URL } from "@/utils/site";

const linkClass = "text-on-surface-variant hover:text-primary transition-colors";

export default function Footer() {
  return (
    <footer className="w-full border-t border-primary/10 py-8 md:py-16 md:mt-16">
      <div className="site-container grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="logo-gradient" aria-label="David Riches — home">
            DavidRiches
          </Link>
          <p className="text-on-surface-variant text-sm mb-0">
            Senior front-end engineer · {CONTACT.location}
          </p>
          <p className="text-on-surface-variant text-sm mb-0">{CONTACT.status}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm tracking-wide">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 text-sm tracking-wide">
          <li>
            <a className={linkClass} href={LINKS.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a className={linkClass} href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a className={linkClass} href={LINKS.resume} target="_blank" rel="noopener noreferrer">
              Resume
            </a>
          </li>
          <li>
            <a className={linkClass} href={`mailto:${CONTACT.email}`}>
              Email
            </a>
          </li>
        </ul>
      </div>

      <div className="site-container mt-8 pt-6 border-t border-primary/10 flex flex-col md:flex-row justify-between gap-2 text-xs text-on-surface-variant text-center md:text-left">
        <p className="mb-0">© David Riches</p>
        <p className="mb-0">
          Built with Next.js &amp; Contentful ·{" "}
          <a className={linkClass} href={REPO_URL} target="_blank" rel="noopener noreferrer">
            View source
          </a>
        </p>
      </div>
    </footer>
  );
}
