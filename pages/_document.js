import { Html, Head, Main, NextScript } from "next/document";
import { colorModeScript } from "../lib/color-mode";

export default function Document() {
  return (
    <Html lang="it">
      <Head>
        {/* Sceglie chiaro/scuro prima che la pagina compaia (niente lampo bianco). */}
        <script dangerouslySetInnerHTML={{ __html: colorModeScript }} />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
