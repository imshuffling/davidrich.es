import { CONTACT, LINKS, REPO_URL } from "@/utils/site";

const linkClass = "text-on-surface-variant hover:text-primary transition-colors";

export default function Footer() {
  return (
    <footer className="w-full border-t border-primary/10 py-6">
      <div className="site-container flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-on-surface-variant text-center md:text-left">
        <p className="mb-0">
          © David Riches · {CONTACT.location}
        </p>

        <ul className="flex flex-wrap justify-center gap-x-5 gap-y-1 tracking-wide">
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
          <li>
            <a className={linkClass} href={REPO_URL} target="_blank" rel="noopener noreferrer">
              Source
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
