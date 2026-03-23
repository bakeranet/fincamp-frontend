import { create } from 'zustand';
import { ParcelaModel, TractamentModel, FertilitzacioModel, RegModel } from '../types';
import { DEMO_PARCELES, DEMO_TRACTAMENTS, DEMO_FERTILITZACIONS, DEMO_REGS } from '../constants';
import { seguentId } from '../hooks/utils';

interface AppStore {
  parceles:        ParcelaModel[];
  tractaments:     TractamentModel[];
  fertilitzacions: FertilitzacioModel[];
  regs:            RegModel[];

  missatgeToast: string | null;
  mostrarToast:  (msg: string) => void;

  afegirParcela:      (p: Omit<ParcelaModel, 'id'>) => void;
  editarParcela:      (id: number, c: Partial<ParcelaModel>) => void;
  eliminarParcela:    (id: number) => void;

  afegirTractament:   (t: Omit<TractamentModel, 'id' | 'sincronitzat'>) => void;
  editarTractament:   (id: number, c: Partial<TractamentModel>) => void;
  eliminarTractament: (id: number) => void;

  afegirFertilitzacio:   (f: Omit<FertilitzacioModel, 'id' | 'sincronitzat'>) => void;
  eliminarFertilitzacio: (id: number) => void;

  afegirReg:   (r: Omit<RegModel, 'id'>) => void;
  eliminarReg: (id: number) => void;
}

export const useStore = create<AppStore>((set) => ({
  parceles:        DEMO_PARCELES,
  tractaments:     DEMO_TRACTAMENTS,
  fertilitzacions: DEMO_FERTILITZACIONS,
  regs:            DEMO_REGS,
  missatgeToast:   null,

  mostrarToast: (msg) => {
    set({ missatgeToast: msg });
    setTimeout(() => set({ missatgeToast: null }), 2200);
  },

  afegirParcela:   (p) => set(s => ({ parceles: [...s.parceles, { ...p, id: seguentId(s.parceles) }] })),
  editarParcela:   (id, c) => set(s => ({ parceles: s.parceles.map(p => p.id === id ? { ...p, ...c } : p) })),
  eliminarParcela: (id) => set(s => ({ parceles: s.parceles.filter(p => p.id !== id) })),

  afegirTractament:   (t) => set(s => ({ tractaments: [{ ...t, id: seguentId(s.tractaments), sincronitzat: false }, ...s.tractaments] })),
  editarTractament:   (id, c) => set(s => ({ tractaments: s.tractaments.map(t => t.id === id ? { ...t, ...c, sincronitzat: false } : t) })),
  eliminarTractament: (id) => set(s => ({ tractaments: s.tractaments.filter(t => t.id !== id) })),

  afegirFertilitzacio:   (f) => set(s => ({ fertilitzacions: [{ ...f, id: seguentId(s.fertilitzacions), sincronitzat: false }, ...s.fertilitzacions] })),
  eliminarFertilitzacio: (id) => set(s => ({ fertilitzacions: s.fertilitzacions.filter(f => f.id !== id) })),

  afegirReg:   (r) => set(s => ({ regs: [{ ...r, id: seguentId(s.regs) }, ...s.regs] })),
  eliminarReg: (id) => set(s => ({ regs: s.regs.filter(r => r.id !== id) })),
}));
