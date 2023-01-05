import { Html, Head, Main, NextScript } from "next/document";
import useTheme from "../core/hooks/useTheme";

export default function Document() {
  const [theme] = useTheme();
  return (
    <Html lang="en">
      <Head />
      <body
        className={[
          "bg-neutral text-onNeutral h-screen w-screen transition-colors",
          theme,
        ].join(" ")}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
