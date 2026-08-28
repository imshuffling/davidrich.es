import Header from "./Header";
import Footer from "./Footer";
import ScrollReset from "./ScrollReset";
import ScrollToTop from "@/components/ScrollToTop";
import type { LayoutProps } from "@/types/components";

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="container-wrap">
      <ScrollReset />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="pt-16 md:pt-28">
        <div id="page-wrap">{children}</div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
