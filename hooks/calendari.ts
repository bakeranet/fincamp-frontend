import { useMemo } from 'react';
import { EsdevenimentCalendari, TipusEsdeveniment } from '../types';

// ─────────────────────────────────────────
//  TIPUS
// ─────────────────────────────────────────

export interface DiaCalendari {
  dia: number;
  mesActual: boolean;
  isoKey: string;
  data: Date;
}

// ─────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────

export function toISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function avuiISO(): string {
  return toISO(new Date());
}

/** Genera la graella mensual de dies */
export function generarGraellaMes(any: number, mes: number): DiaCalendari[][] {
  const primer = new Date(any, mes, 1);
  const ultim  = new Date(any, mes + 1, 0);
  const offset = (primer.getDay() + 6) % 7; // dilluns = 0

  const dies: DiaCalendari[] = [];

  for (let i = offset - 1; i >= 0; i--) {
    const d = new Date(any, mes, -i);
    dies.push({ dia: d.getDate(), mesActual: false, isoKey: toISO(d), data: d });
  }
  for (let d = 1; d <= ultim.getDate(); d++) {
    const dt = new Date(any, mes, d);
    dies.push({ dia: d, mesActual: true, isoKey: toISO(dt), data: dt });
  }
  const rest = 7 - (dies.length % 7);
  if (rest < 7) {
    for (let d = 1; d <= rest; d++) {
      const dt = new Date(any, mes + 1, d);
      dies.push({ dia: dt.getDate(), mesActual: false, isoKey: toISO(dt), data: dt });
    }
  }

  const files: DiaCalendari[][] = [];
  for (let i = 0; i < dies.length; i += 7) files.push(dies.slice(i, i + 7));
  return files;
}

/** Genera els 7 dies de la setmana actual */
export function diesSetmanaActual(): DiaCalendari[] {
  const ara   = new Date();
  const diaSt = (ara.getDay() + 6) % 7; // dilluns = 0
  const dilluns = new Date(ara);
  dilluns.setDate(ara.getDate() - diaSt);

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(dilluns);
    d.setDate(dilluns.getDate() + i);
    return { dia: d.getDate(), mesActual: true, isoKey: toISO(d), data: d };
  });
}

// ─────────────────────────────────────────
//  HOOK: mapa d'esdeveniments per dia
// ─────────────────────────────────────────

interface FontEsdeveniments {
  tractaments:     { id: number; data: string; parcelaNom: string; producte: string; plaga: string; dosi: string; unitat: string; sincronitzat: boolean }[];
  fertilitzacions: { id: number; data: string; parcelaNom: string; producte: string; npk: string; dosi: string; sincronitzat: boolean }[];
  regs:            { id: number; data: string; parcelaNom: string; tipus: string; hores: string; volum: string; origen: string }[];
  filtreParcelaId?: number; // si vols filtrar per parcel·la
}

export function useEsdevenimentsPerDia(fonts: FontEsdeveniments): Record<string, EsdevenimentCalendari[]> {
  return useMemo(() => {
    const m: Record<string, EsdevenimentCalendari[]> = {};
    const add = (key: string, e: EsdevenimentCalendari) => { if (!m[key]) m[key] = []; m[key].push(e); };

    const tractaments = fonts.filtreParcelaId
      ? fonts.tractaments.filter(t => t.parcelaNom !== undefined && fonts.filtreParcelaId !== undefined)
      : fonts.tractaments;
    // Note: filtering by parcelaId happens at the call site

    fonts.tractaments.forEach(t => add(t.data, {
      id: t.id, tipus: 'tractament',
      titol: t.producte,
      subtitol: `${t.parcelaNom} · ${t.plaga} · ${t.dosi} ${t.unitat}`,
      sincronitzat: t.sincronitzat,
    }));
    fonts.fertilitzacions.forEach(f => add(f.data, {
      id: f.id, tipus: 'fertilitzacio',
      titol: f.producte,
      subtitol: `${f.parcelaNom} · NPK ${f.npk || '—'} · ${f.dosi} kg/ha`,
      sincronitzat: f.sincronitzat,
    }));
    fonts.regs.forEach(r => add(r.data, {
      id: r.id, tipus: 'reg',
      titol: r.parcelaNom,
      subtitol: `${r.tipus} · ${r.hores}h · ${r.volum} m³ · ${r.origen}`,
    }));

    return m;
  }, [fonts.tractaments, fonts.fertilitzacions, fonts.regs]);
}
