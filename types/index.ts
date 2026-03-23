export interface ParcelaModel {
  id: number;
  nom: string;
  cultiu: string;
  ha: string;
  poligon: string;
  parcela: string;
  color: string;
  nota: string;
  sincronitzat: boolean;
}

export interface TractamentModel {
  id: number;
  data: string;
  parcelaId: number;
  parcelaNom: string;
  producte: string;
  plaga: string;
  dosi: string;
  unitat: string;
  aplicador: string;
  justificacio: string;
  sincronitzat: boolean;
}

export interface FertilitzacioModel {
  id: number;
  data: string;
  parcelaId: number;
  parcelaNom: string;
  producte: string;
  npk: string;
  dosi: string;
  sincronitzat: boolean;
}

export interface RegModel {
  id: number;
  data: string;
  parcelaId: number;
  parcelaNom: string;
  tipus: string;
  hores: string;
  volum: string;
  origen: string;
}

// Tipus per als esdeveniments del calendari
export type TipusEsdeveniment = 'tractament' | 'fertilitzacio' | 'reg';

export interface EsdevenimentCalendari {
  id: number;
  tipus: TipusEsdeveniment;
  titol: string;
  subtitol: string;
  sincronitzat?: boolean;
}
