import { toString } from "mdast-util-to-string";
import type { Root } from "mdast";

// 声明 Astro 注入到虚拟文件 (VFile) 中的特有属性类型
interface AstroVFile {
  data: {
    astro: {
      frontmatter: Record<string, any>;
    };
  };
}

export function remarkExcerpt() {
  // 这里的 tree 被推断为 Markdown 的根节点，file 是当前处理的虚拟文件
  return function (tree: Root, file: unknown) {
    if (!tree || !tree.children) {
      return;
    }

    const vfile = file as AstroVFile;
    const paragraph = findFirstParagraph(tree);
    const excerpt = paragraph ? toString(paragraph) : "";

    const summary =
      excerpt.length > 150
        ? excerpt.slice(0, 150).trim() + "..."
        : excerpt.trim();

    // 保证 astro 和 frontmatter 对象存在
    if (!vfile.data) {
      vfile.data = { astro: { frontmatter: {} } } as AstroVFile["data"];
    }
    if (!vfile.data.astro) {
      vfile.data.astro = { frontmatter: {} };
    }
    if (!vfile.data.astro.frontmatter) {
      vfile.data.astro.frontmatter = {};
    }

    vfile.data.astro.frontmatter.summary = summary;
  };
}

function findFirstParagraph(
  node: Root | { type: string; children?: any[] },
): { type: string; children?: any[] } | null {
  if (!node || typeof node !== "object") {
    return null;
  }
  if (node.type === "paragraph") {
    return node;
  }
  const children = (node as { children?: any[] }).children;
  if (Array.isArray(children)) {
    for (const child of children) {
      const result = findFirstParagraph(child);
      if (result) {
        return result;
      }
    }
  }
  return null;
}
