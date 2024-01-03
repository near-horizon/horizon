import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

// import sentry from "@sentry/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind(),
    // sentry({
    //   dsn: "https://b177ae38c66bfa09555c55247cb49d02@o4506456115511296.ingest.sentry.io/4506456117149696",
    //   sourceMapsUploadOptions: {
    //     project: "landing-website",
    //     authToken: process.env.SENTRY_AUTH_TOKEN,
    //   },
    // }),
  ],
  output: "server",
  adapter: vercel({
    imageService: true,
  }),
});
