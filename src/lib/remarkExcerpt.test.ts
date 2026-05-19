// src/lib/remarkExcerpt.test.ts
import { describe, it, expect } from "vitest";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { remarkExcerpt } from "./remark-excerpt";

describe("remarkExcerpt plugin", () => {
  // 1. 提取公共的 Processor 实例
  // unified 的 processor 是可以在多次 process() 调用中安全复用的
  const processor = unified()
    .use(remarkParse)
    .use(remarkExcerpt)
    .use(remarkStringify);

  // 2. 封装一个辅助函数，直接返回提取到的 summary
  // 这样每个测试用例只需要关心 "输入" 和 "输出"
  const getSummary = async (markdown: string) => {
    const vfile = await processor.process(markdown);
    return vfile.data.astro?.frontmatter?.summary;
  };

  it("应该提取第一段纯文本并剥离 Markdown 格式", async () => {
    const markdown = `
# 标题

这是包含 **加粗** 和 [链接](https://example.com) 的第一段。

这是第二段，不应该被提取。
    `;
    const summary = await getSummary(markdown);
    expect(summary).toBe("这是包含 加粗 和 链接 的第一段。");
  });

  it("如果第一段超过 200 字符，应该被截断", async () => {
    const longText = "啊".repeat(300);
    const markdown = `${longText}\n\n这是第二段`;

    const summary = await getSummary(markdown) as string;
    expect(summary.length).toBe(203); // 200个字 + "..."
    expect(summary.endsWith("...")).toBe(true);
  });

  it("如果没有普通文字段落,会提取图片alt文本", async () => {
    const markdown = `# 只有标题\n\n![只有图片](img.png)`;

    const summary = await getSummary(markdown);
    expect(summary).toBe("只有图片");
  });
});