/** Formata ISO → dd/mm/aa */
export function formatData(iso: string): string {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y.slice(2)}`;
}

/** True si han passat més de 30 dies */
export function tesMesDe30Dies(iso: string): boolean {
  if (!iso) return false;
  return Date.now() - new Date(iso + 'T12:00:00').getTime() > 30 * 86400000;
}

/** Data d'avui en ISO */
export function avuiISO(): string {
  return new Date().toISOString().split('T')[0];
}

/** "Confidor 200 SL — Reg. 24.537" → "Confidor 200 SL" */
export function nomProducte(s: string): string {
  return s.split('—')[0].trim();
}

/** Proper ID disponible */
export function seguentId(llista: { id: number }[]): number {
  return llista.length ? Math.max(...llista.map(x => x.id)) + 1 : 1;
}

/** Data ISO d'un objecte Date */
export function toISO(d: Date): string {
  return d.toISOString().split('T')[0];
}
