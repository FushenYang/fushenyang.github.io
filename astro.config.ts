import { defineConfig } from 'astro/config';
import { astroImageTools } from "astro-imagetools";
import preact from "@astrojs/preact";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://blog.cathome.eu.org",
  integrations: [preact(), astroImageTools, tailwind()]
});