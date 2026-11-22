/**
 * En producció (`npm run build` / GitHub Pages), amaga qualsevol entrada marcada amb `esborrany: true`.
 * En local (`npm run dev`), la manté visible per poder-la editar i revisar.
 */
export function isVisibleEntry(entry: { data: { esborrany?: boolean } }): boolean {
  return import.meta.env.PROD ? !entry.data.esborrany : true;
}
