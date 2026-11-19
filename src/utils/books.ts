import type { CollectionEntry } from 'astro:content';

export type RelatEntry = CollectionEntry<'relats'>;
export type RelatTipus = RelatEntry['data']['tipus'];

export interface BookGroup {
  id: string;
  titol: string;
  sinopsi: string;
  items: RelatEntry[];
  firstSlug: string;
  readingCount: number;
  countLabel: string;
}

export interface BookSectionBlock {
  seccio: string | null;
  items: RelatEntry[];
}

/**
 * Retorna el valor numèric d'ordenació d'una peça d'un llibre.
 * Prioritza `ordre`, després `capitol`, i finalment 0.
 */
export function getItemOrder(item: RelatEntry): number {
  if (typeof item.data.ordre === 'number') return item.data.ordre;
  if (typeof item.data.capitol === 'number') return item.data.capitol;
  return 0;
}

/**
 * Ordena les peces d'un llibre segons el seu ordre de lectura.
 */
export function sortBookItems(items: RelatEntry[]): RelatEntry[] {
  return [...items].sort((a, b) => {
    const diff = getItemOrder(a) - getItemOrder(b);
    if (diff !== 0) return diff;
    return a.slug.localeCompare(b.slug);
  });
}

/**
 * Indica si és una pàgina especial de pausa / pàgina en blanc (dedicatòria o epígraf).
 */
export function isBlankPageType(tipus?: RelatTipus): boolean {
  return tipus === 'dedicatoria' || tipus === 'epigraf';
}

/**
 * Retorna l'etiqueta visible d'una peça (ex: "Episodi 1", "Dedicatòria", "Capítol 2").
 */
export function getItemLabel(item: RelatEntry): string {
  if (item.data.etiqueta) return item.data.etiqueta;

  switch (item.data.tipus) {
    case 'dedicatoria':
      return 'Dedicatòria';
    case 'epigraf':
      return 'Epígraf';
    case 'proleg':
      return 'Pròleg';
    case 'epileg':
      return 'Epíleg';
    case 'nota':
      return 'Nota';
    default:
      return typeof item.data.capitol === 'number'
        ? `Capítol ${item.data.capitol}`
        : 'Capítol';
  }
}

/**
 * Retorna el slug curt del fitxer (l'últim segment del slug de la col·lecció).
 */
export function getItemSlug(item: RelatEntry): string {
  return item.slug.split('/').pop() || item.slug;
}

/**
 * Agrupa les peces ordenades d'un llibre en blocs consecutius segons `seccio`.
 * Això permet tenir pàgines soltes (sense `seccio`) abans, entre o després de les seccions.
 */
export function groupItemsBySection(sortedItems: RelatEntry[]): BookSectionBlock[] {
  const blocks: BookSectionBlock[] = [];

  for (const item of sortedItems) {
    const seccio = item.data.seccio?.trim() || null;
    const lastBlock = blocks[blocks.length - 1];

    if (lastBlock && lastBlock.seccio === seccio) {
      lastBlock.items.push(item);
    } else {
      blocks.push({ seccio, items: [item] });
    }
  }

  return blocks;
}

/**
 * Agrupa tota la col·lecció `relats` per llibre, amb ordre, primer slug i comptador intel·ligent.
 */
export function groupBooks(allRelats: RelatEntry[]): BookGroup[] {
  const map = new Map<string, RelatEntry[]>();

  for (const item of allRelats) {
    const bId = item.data.llibreId;
    if (!map.has(bId)) map.set(bId, []);
    map.get(bId)!.push(item);
  }

  return Array.from(map.entries()).map(([id, rawItems]) => {
    const items = sortBookItems(rawItems);
    const firstWithSinopsi = items.find((i) => i.data.sinopsi?.trim());
    const titol = items[0]?.data.llibre || 'Obra';
    const sinopsi = firstWithSinopsi?.data.sinopsi || 'Una història teixida pàgina a pàgina.';
    const firstSlug = items[0] ? getItemSlug(items[0]) : 'capitol-01';

    const readingItems = items.filter((i) => !isBlankPageType(i.data.tipus));
    const readingCount = readingItems.length || items.length;
    const hasSections = items.some((i) => Boolean(i.data.seccio?.trim()));
    const unit = hasSections
      ? readingCount === 1
        ? 'episodi'
        : 'episodis'
      : readingCount === 1
        ? 'capítol'
        : 'capítols';

    return {
      id,
      titol,
      sinopsi,
      items,
      firstSlug,
      readingCount,
      countLabel: `${readingCount} ${unit}`,
    };
  });
}
