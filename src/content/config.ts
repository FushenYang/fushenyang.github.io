// 1. 从 `astro:content` 导入
import { z, defineCollection } from "astro:content";
// 2.定义文章

const schema = z.object({
  title: z.string(),
  pubDate: z.date(),
  author:z.string(),
  tags: z.array(z.string()),
  path: z.string()
})

export type Post = z.infer<typeof schema>;
// 3. 定义集合
const books = defineCollection({
  type: "content", // v2.5.0 及之后
  schema: schema,
});


const devs = defineCollection({
  type: "content", // v2.5.0 及之后
  schema: schema,
});

const notes = defineCollection({
  type: "content", // v2.5.0 及之后
  schema: schema,
});
// 3. 导出一个 `collections` 对象来注册集合
//    这个键应该与 `src/content` 中的集合目录名匹配
export const collections = {
  books,
  devs,
  notes,
};
