/**
 * Calcula el temps estimat de lectura a partir del cos Markdown/HTML d'un text.
 * Velocitat per defecte: 200 paraules/minut (lectura literària pausada).
 */
export function estimateReadingTime(markdownBody?: string, wordsPerMinute = 200): string {
  if (!markdownBody) return '1 min';

  const cleanText = markdownBody
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[`#*_~>|-]/g, ' ')
    .trim();

  const words = cleanText ? cleanText.split(/\s+/).filter(Boolean).length : 0;
  const minutes = Math.max(1, Math.round(words / wordsPerMinute));
  return `${minutes} min`;
}
