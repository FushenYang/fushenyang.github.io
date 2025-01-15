import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';

export async function extractSummary(markdown) {
    const tree = unified().use(remarkParse).parse(markdown);
    let summary = '';

    for (const node of tree.children) {
        if (node.type === 'paragraph') {
            summary = unified().use(remarkStringify).stringify(node);
            break;
        }
    }

    return summary;
}