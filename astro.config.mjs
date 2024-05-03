import { defineConfig } from 'astro/config';
import { astroImageTools } from "astro-imagetools";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
    site: "https://example.com",
    integrations: [preact(),astroImageTools]
});