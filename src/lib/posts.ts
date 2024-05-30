import { getCollection } from "astro:content";

export const getAll = async () => {
  const booksCollection = await getCollection("books");
  const devsCollection = await getCollection("devs");

  const allPosts = [...booksCollection, ...devsCollection];
  const sortedPosts = allPosts.sort((a, b) => {
    const dateA = new Date(a.data.pubDate).getTime();
    const dateB = new Date(b.data.pubDate).getTime();
    return dateB - dateA;
  });
  return sortedPosts;
};

export function sortByPubDate<T extends { data: { pubDate: string } }>(items: T[]): T[] {
  return items.sort((a, b) => {
    const dateA = new Date(a.data.pubDate).getTime();
    const dateB = new Date(b.data.pubDate).getTime();
    return dateB - dateA;
  });
}
