// 1. 从 `astro:content` 导入
import { z, defineCollection } from "astro:content";
// 2.定义文章

const schema = z.object({
  title: z.string(),
  pubDate: z.string(),
  author:z.string(),
  tags: z.array(z.string()),
  path: z.string()
})
// 3. 定义集合
const bookCollection = defineCollection({
  type: "content", // v2.5.0 及之后
  schema: schema,
});
// 3. 导出一个 `collections` 对象来注册集合
//    这个键应该与 `src/content` 中的集合目录名匹配
export const collections = {
  books: bookCollection,
};
