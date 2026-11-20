export interface BookProgress {
  lastSlug: string;
  lastLabel: string;
  lastTitle: string;
  updatedAt: number;
  readSlugs: string[];
}

export interface ReadingState {
  books: Record<string, BookProgress>;
  blogRead: string[];
}

const STORAGE_KEY = 'scriptum-reading-state';

function emptyState(): ReadingState {
  return { books: {}, blogRead: [] };
}

export function loadReadingState(): ReadingState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw);
    return {
      books: parsed && typeof parsed.books === 'object' ? parsed.books : {},
      blogRead: Array.isArray(parsed?.blogRead) ? parsed.blogRead : [],
    };
  } catch {
    return emptyState();
  }
}

export function saveReadingState(state: ReadingState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignorem errors de quota o navegació privada estricta
  }
}

export function saveBookBookmark(
  llibreId: string,
  slug: string,
  label: string,
  title: string
): ReadingState {
  const state = loadReadingState();
  const prev = state.books[llibreId];
  state.books[llibreId] = {
    lastSlug: slug,
    lastLabel: label,
    lastTitle: title,
    updatedAt: Date.now(),
    readSlugs: prev?.readSlugs ? [...prev.readSlugs] : [],
  };
  saveReadingState(state);
  return state;
}

export function setBookItemRead(
  llibreId: string,
  slug: string,
  read: boolean,
  fallbackMeta?: { label: string; title: string }
): ReadingState {
  const state = loadReadingState();
  const prev = state.books[llibreId] || {
    lastSlug: slug,
    lastLabel: fallbackMeta?.label || '',
    lastTitle: fallbackMeta?.title || '',
    updatedAt: Date.now(),
    readSlugs: [],
  };

  const set = new Set(prev.readSlugs || []);
  if (read) {
    set.add(slug);
  } else {
    set.delete(slug);
  }

  state.books[llibreId] = {
    ...prev,
    readSlugs: Array.from(set),
  };
  saveReadingState(state);
  return state;
}

export function isBookItemRead(llibreId: string, slug: string): boolean {
  const state = loadReadingState();
  return Boolean(state.books[llibreId]?.readSlugs?.includes(slug));
}

export function getBookProgress(llibreId: string): BookProgress | null {
  const state = loadReadingState();
  return state.books[llibreId] || null;
}

export function setBlogPostRead(slug: string, read: boolean): ReadingState {
  const state = loadReadingState();
  const set = new Set(state.blogRead || []);
  if (read) {
    set.add(slug);
  } else {
    set.delete(slug);
  }
  state.blogRead = Array.from(set);
  saveReadingState(state);
  return state;
}

export function isBlogPostRead(slug: string): boolean {
  const state = loadReadingState();
  return state.blogRead.includes(slug);
}
