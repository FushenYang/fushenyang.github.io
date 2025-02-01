import { defineConfig } from 'astro/config';
import { astroImageTools } from "astro-imagetools";
import remarkEleventyImage from "astro-remark-eleventy-image";
import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import remarkFigureCaption from '@microflash/remark-figure-caption';

// https://astro.build/config
export default defineConfig({
  site: "https://oldyang.site",
  integrations: [remarkEleventyImage({
    sizes: "(max-width: 700px) 100vw, 700px",
    remoteImages: false,
    altRequired: true,
    eleventyImageConfig: {
      formats: ['auto'],
      widths: ['auto', 600, 1000, 1400],
      sharpOptions: {
        animated: true
      }
    },
  }),preact(), astroImageTools, tailwind()],
  vite:{
    ssr:{
      external: ["@11ty/eleventy-img"],
    }
  },
  markdown: {
    remarkPlugins:[remarkFigureCaption],
    shikiConfig: {
      // 选择 Shiki 内置的主题（或添加你自己的主题）
      // https://shiki.style/themes
      theme: 'andromeeda',
      // 另外，也提供了多种主题
      // 查看下面关于使用亮/暗双主题的的说明
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      // 添加自定义语言
      // 注意：Shiki 内置了无数语言，包括 .astro！
      // https://shiki.style/languages
      langs: [],
      // 启用自动换行，以防止水平滚动
      wrap: true,
      // 添加自定义转换器：https://shiki.style/guide/transformers
      // 查找常用转换器：https://shiki.style/packages/transformers
      transformers: [],
    },
  },
});