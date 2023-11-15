import Script from "next/script";
import { env } from "~/env.mjs";

export function GTagScripts() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
      />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', '${env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
