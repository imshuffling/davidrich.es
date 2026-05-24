import "server-only";
import sanitizeHtml from "sanitize-html";

const CONFIG: sanitizeHtml.IOptions = {
  allowedTags: ["em", "strong", "b", "i", "u", "br", "a", "span"],
  allowedAttributes: {
    a: ["href", "target", "rel"],
    span: ["class"],
  },
};

export function sanitize(html: string | undefined): string | undefined {
  if (html === undefined || html === null) return html;
  return sanitizeHtml(html, CONFIG);
}
