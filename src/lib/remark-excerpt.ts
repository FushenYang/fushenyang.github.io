import { toString } from "mdast-util-to-string";
import { visit, EXIT } from "unist-util-visit";
import type { Root, Paragraph } from "mdast";

// 声明 Astro 注入到虚拟文件 (VFile) 中的特有属性类型
interface AstroVFile {
  data: {
    astro?: {
      frontmatter?: Record<string, any>;
    };
  };
}


export function remarkExcerpt() {
  return function (tree: Root, file: unknown) {
    const vfile = file as AstroVFile;
    let excerpt = "";

    // 2. 优雅的遍历与早退
    visit(tree, "paragraph", (node: Paragraph) => {
      excerpt = toString(node);
      return EXIT; // 找到第一个段落，提取文字后，立即熔断！停止遍历。
    });


    // 2. 生成 summary
    const summary =
      excerpt.length > 200
        ? excerpt.slice(0, 200).trim() + "..."
        : excerpt.trim();

    vfile.data ??= {};
    vfile.data.astro ??= {};
    vfile.data.astro.frontmatter ??= {};
    vfile.data.astro.frontmatter.summary = summary;
  };
}