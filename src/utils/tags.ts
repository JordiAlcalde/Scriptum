import { getCollection, type CollectionEntry } from 'astro:content';

export interface TagInfo {
  slug: string;
  label: string;
  description: string;
  count: number;
}

/**
 * Normalitza el nom d'una etiqueta per fer-la servir en URLs i comparacions
 * (minúscules, sense accents, espais convertits en guions).
 */
export function slugifyTag(tag: string): string {
  return tag
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Llegeix les definicions d'etiquetes des de src/content/etiquetes/etiquetes.md.
 * Cada secció `## nom` seguida del seu text es converteix en una definició.
 */
export async function getTagDefinitions(): Promise<Map<string, { label: string; description: string }>> {
  const definitions = new Map<string, { label: string; description: string }>();

  try {
    const entries = await getCollection('etiquetes');
    for (const entry of entries) {
      const body = entry.body || '';
      const lines = body.split(/\r?\n/);

      let currentTag: string | null = null;
      let currentLines: string[] = [];

      const flush = () => {
        if (currentTag) {
          const slug = slugifyTag(currentTag);
          const description = currentLines.join('\n').trim();
          if (slug) {
            definitions.set(slug, {
              label: currentTag.trim(),
              description,
            });
          }
        }
      };

      for (const line of lines) {
        const headingMatch = line.match(/^##\s+(.+?)\s*$/);
        if (headingMatch) {
          flush();
          currentTag = headingMatch[1].replace(/^#/, '').trim();
          currentLines = [];
        } else if (currentTag) {
          currentLines.push(line);
        }
      }
      flush();
    }
  } catch {
    // Si encara no existeix la col·lecció o està buida, retornem un mapa buit
  }

  return definitions;
}

/**
 * Retorna totes les etiquetes usades als articles del blog, enriquides amb
 * la seva definició (si existeix) i ordenades per nombre d'articles.
 */
export async function getBlogTags(posts: CollectionEntry<'blog'>[]): Promise<TagInfo[]> {
  const definitions = await getTagDefinitions();
  const tagMap = new Map<string, TagInfo>();

  for (const post of posts) {
    const tags = post.data.tags || [];
    for (const rawTag of tags) {
      const slug = slugifyTag(rawTag);
      if (!slug) continue;

      const existing = tagMap.get(slug);
      if (existing) {
        existing.count += 1;
      } else {
        const def = definitions.get(slug);
        tagMap.set(slug, {
          slug,
          label: def?.label || rawTag.trim(),
          description: def?.description || '',
          count: 1,
        });
      }
    }
  }

  return Array.from(tagMap.values()).sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    return a.label.localeCompare(b.label, 'ca');
  });
}
