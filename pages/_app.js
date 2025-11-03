import "../styles/global.scss";
import { ThemeProvider } from "next-themes";
import Layout from "../components/Layout";
import { Karla, Oswald } from "next/font/google";

const karla = Karla({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-karla",
});

const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-oswald",
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <style jsx global>{`
        :root {
          --font-karla: ${karla.style.fontFamily};
          --font-oswald: ${oswald.style.fontFamily};
        }
      `}</style>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
