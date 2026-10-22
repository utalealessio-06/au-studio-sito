import dynamic from "next/dynamic";
import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import WhatsAppFloat from "../components/WhatsAppFloat";
import theme from "../theme";
import { themeCss } from "../lib/theme-css";
import "../styles/globals.css";

// Calcolato una volta sola: il tema non cambia mentre il sito è aperto.
const THEME_CSS = themeCss(theme);

// Selettore di temi solo in anteprima locale (npm run dev). Nel build di
// produzione la condizione è falsa e il componente non viene nemmeno incluso.
const ThemePreview =
  process.env.NODE_ENV === "development"
    ? dynamic(() => import("../components/ThemePreview"), { ssr: false })
    : () => null;

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <style id="theme" dangerouslySetInnerHTML={{ __html: THEME_CSS }} />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content={theme.colors.light.bg} />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content={theme.colors.dark.bg} />
      </Head>
      <div id="top" className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
      <WhatsAppFloat />
      <ThemePreview />
    </>
  );
}
