import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getItemLabel, getItemSlug, groupBooks, isBlankPageType } from '../utils/books';
import { isVisibleEntry } from '../utils/drafts';

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog', isVisibleEntry)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
  const relats = await getCollection('relats', isVisibleEntry);
  const books = groupBooks(relats);

  const payload = {
    posts: posts.map((post) => ({
      id: `blog:${post.slug}`,
      title: post.data.title,
      url: `/blog/${post.slug}`,
    })),
    books: books.map((book) => ({
      id: `book:${book.id}`,
      title: book.titol,
      url: `/relats/${book.id}`,
    })),
    chapters: books.flatMap((book) =>
      book.items
        .filter((item) => !isBlankPageType(item.data.tipus))
        .map((item) => {
          const slug = getItemSlug(item);
          return {
            id: `chapter:${book.id}/${slug}`,
            bookId: `book:${book.id}`,
            bookTitle: book.titol,
            label: getItemLabel(item),
            title: item.data.title,
            url: `/relats/${book.id}/${slug}`,
          };
        })
    ),
  };

  return new Response(JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-cache',
    },
  });
};
