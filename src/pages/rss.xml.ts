import rss, { pagesGlobToRssItems } from '@astrojs/rss';
export async function GET(context:{site:string}) {
    const items = await pagesGlobToRssItems(import.meta.glob('./**/*.md'))
    return rss({
        title: 'fushenyang的博客|base on astro',
        description: 'My journey learning Astro',
        site: context.site,
        // @ts-ignore
        items: items,
        customData: `<language>en-us</language>`,
    });
}