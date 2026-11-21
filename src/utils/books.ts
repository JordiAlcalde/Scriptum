import type { CollectionEntry } from 'astro:content';
import { estimateReadingTime } from './readingTime';

export type RelatEntry = CollectionEntry<'relats'>;
export type RelatTipus = RelatEntry['data']['tipus'];
export type BookStatus = 'en-curs' | 'acabat';
export type BookPublicationMode = 'completa' | 'entregues';

export interface BookGroup {
  id: string;
  titol: string;
  sinopsi: string;
  items: RelatEntry[];
  firstSlug: string;
  readingCount: number;
  countLabel: string;
  estat: BookStatus;
  isSerialized: boolean;
  dateSummary: string;
  anyPublicacio: string;
  sortTimestamp: number;
  portada?: string;
}

/**
 * Formata una data en format dd-mm-aaaa usant UTC per evitar desfasaments horaris.
 */
export function formatDateDMY(date: Date): string {
  const d = String(date.getUTCDate()).padStart(2, '0');
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const y = date.getUTCFullYear();
  return `${d}-${m}-${y}`;
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
 * Retorna el temps de lectura d'una peça d'un llibre:
 * - Si és dedicatòria o epígraf: no en mostra.
 * - Si l'autor l'ha indicat manualment (`tempsLectura`): el respecta.
 * - Altrament: el calcula automàticament a partir del text.
 */
export function getItemReadingTime(item: RelatEntry): string | undefined {
  if (isBlankPageType(item.data.tipus)) return undefined;
  if (item.data.tempsLectura?.trim()) return item.data.tempsLectura.trim();
  return estimateReadingTime(item.body);
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
 * Determina si un llibre està acabat (si almenys un dels seus fitxers té `estat: "acabat"`).
 */
export function getBookStatus(items: RelatEntry[]): BookStatus {
  return items.some((i) => i.data.estat === 'acabat') ? 'acabat' : 'en-curs';
}

/**
 * Determina si un llibre es publica/s'ha publicat per entregues (mostra data d'inici/final
 * i data pròpia a cada capítol) o bé és una edició única ja acabada abans d'Scriptum.
 */
export function isBookSerialized(items: RelatEntry[], estat: BookStatus): boolean {
  if (items.some((i) => i.data.publicacio === 'completa')) return false;
  if (items.some((i) => i.data.publicacio === 'entregues')) return true;
  return estat === 'en-curs';
}

/**
 * Genera el text resum de dates del llibre per a la fitxa de biblioteca i l'índex.
 */
export function getBookDateSummary(
  sortedItems: RelatEntry[],
  estat: BookStatus,
  isSerialized: boolean
): string {
  if (sortedItems.length === 0) return '';

  const firstDate = formatDateDMY(sortedItems[0].data.data);

  if (!isSerialized) {
    return `Edició: ${firstDate}`;
  }

  if (estat === 'acabat') {
    const lastDateObj = sortedItems.reduce(
      (latest, item) => (item.data.data.valueOf() > latest.valueOf() ? item.data.data : latest),
      sortedItems[0].data.data
    );
    return `Data d'inici: ${firstDate} · Data final: ${formatDateDMY(lastDateObj)}`;
  }

  return `Data d'inici: ${firstDate}`;
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
    const firstWithBookDesc = items.find((i) => i.data.descripcioLlibre?.trim());
    const firstWithSinopsi = items.find((i) => i.data.sinopsi?.trim());
    const firstWithPortada = items.find((i) => i.data.portada?.trim());
    const titol = items[0]?.data.llibre || 'Obra';
    const sinopsi =
      firstWithBookDesc?.data.descripcioLlibre?.trim() ||
      firstWithSinopsi?.data.sinopsi ||
      'Una història teixida pàgina a pàgina.';
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

    const estat = getBookStatus(items);
    const isSerialized = isBookSerialized(items, estat);
    const dateSummary = getBookDateSummary(items, estat, isSerialized);
    const anyPublicacio = items[0] ? String(items[0].data.data.getUTCFullYear()) : '2026';
    const sortTimestamp = items[0] ? items[0].data.data.valueOf() : 0;

    return {
      id,
      titol,
      sinopsi,
      items,
      firstSlug,
      readingCount,
      countLabel: `${readingCount} ${unit}`,
      estat,
      isSerialized,
      dateSummary,
      anyPublicacio,
      sortTimestamp,
      portada: firstWithPortada?.data.portada?.trim(),
    };
  }).sort((a, b) => b.sortTimestamp - a.sortTimestamp);
}
