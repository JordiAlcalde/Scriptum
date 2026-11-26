export type ContentLang = 'ca' | 'es' | 'en';

export interface LangBadgeInfo {
  code: 'ES' | 'EN';
  lang: 'es' | 'en';
  title: string;
}

/**
 * Retorna la informació de la píndola d'idioma per a textos originals en castellà o anglès.
 * Per al català (`ca` o absent) retorna null (no es mostra cap píndola).
 */
export function getLangBadge(idioma?: string): LangBadgeInfo | null {
  const normalized = idioma?.trim().toLowerCase();
  if (normalized === 'es') {
    return {
      code: 'ES',
      lang: 'es',
      title: 'Texto original escrito en español',
    };
  }
  if (normalized === 'en') {
    return {
      code: 'EN',
      lang: 'en',
      title: 'Original text is written in English',
    };
  }
  return null;
}
