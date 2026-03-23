// ─────────────────────────────────────────
//  FINCA — Paleta de marca oficial
//  Bosc · Fullatge · Brot · Terra · Sorra · Crema
// ─────────────────────────────────────────

export const colors = {
  // Base UI
  background:   '#FAFAF8',
  surface:      '#FFFFFF',
  surfaceAlt:   '#F4F4F0',
  text:         '#0D0D0D',
  textSecondary:'#3D3D3D',
  textMuted:    '#6B6B5E',
  textLight:    '#A8A89A',
  border:       '#E4E4DC',
  borderMid:    '#CCCCC0',

  // Accent principal — Bosc (verd fosc de marca)
  accent:       '#2C4A1E',
  accentDark:   '#1E3314',
  accentLight:  '#EBF2E6',
  accentMid:    '#8BC465',

  // Marca completa
  bosc:         '#2C4A1E',
  fullatge:     '#4A7A35',
  brot:         '#6B9E50',
  brotClar:     '#8BC465',
  terra:        '#8B7355',
  sorra:        '#C8A87A',
  crema:        '#F5F0E8',

  // Tipus de registre
  colorTractament:    '#1A5276',
  bgTractament:       '#EBF5FB',
  colorFertilitzacio: '#7D6608',
  bgFertilitzacio:    '#FEF9E7',
  colorReg:           '#1A7A6E',
  bgReg:              '#E8F8F5',

  // Estats
  warn:     '#B7410E',
  warnBg:   '#FEF0E8',
  warnMid:  '#F5B7A0',
  error:    '#922B21',
  errorBg:  '#FDEDEC',
} as const;

export const COLOR_TIPUS = {
  tractament:    colors.colorTractament,
  fertilitzacio: colors.colorFertilitzacio,
  reg:           colors.colorReg,
} as const;

export const BG_TIPUS = {
  tractament:    colors.bgTractament,
  fertilitzacio: colors.bgFertilitzacio,
  reg:           colors.bgReg,
} as const;

export const ICONA_TIPUS = {
  tractament:    '🧪',
  fertilitzacio: '🌱',
  reg:           '💧',
} as const;

export const LABEL_TIPUS = {
  tractament:    'Tractament',
  fertilitzacio: 'Fertilització',
  reg:           'Reg',
} as const;

export const COLORS_PARCELA = [
  '#2C4A1E', '#1A5276', '#7D6608',
  '#6C3483', '#A04000', '#1A7A6E',
];

export const CULTIUS = ['Tarongers','Llimoners','Presseguers','Mandariners','Oliveres','Ametllers','Vinyes','Cereals'];
export const PRODUCTES_FITOSANITARIS = [
  'Confidor 200 SL — Reg. 24.537','Calypso 480 SC — Reg. 25.123',
  'Delegate 250 WG — Reg. 23.891','Ridomil Gold MZ — Reg. 22.445',
  'Karate Zeon — Reg. 26.012','Movento 150 OD — Reg. 27.334',
];
export const PRODUCTES_FERTILITZANTS = [
  'Nitrat amònic 33.5% — REGFER 1201','Urea 46% — REGFER 1202',
  'Sulfat de potassi — REGFER 2301','Nitrofoska Special — REGFER 3401',
  'MAP 12-61-0 — REGFER 4501',
];
export const TIPUS_REG    = ['Degoteig','Aspersió','Inundació','Microaspersió'];
export const ORIGENS_REG  = ['Canal','Pou','Bassa','Xarxa'];
export const UNITATS_DOSI = ['L/ha','kg/ha','mL/hL','g/ha'];
export const MESOS = ['Gener','Febrer','Març','Abril','Maig','Juny','Juliol','Agost','Setembre','Octubre','Novembre','Desembre'];
export const DIES_SETMANA_CURT = ['Dl','Dm','Dc','Dj','Dv','Ds','Dg'];

export const DEMO_PARCELES = [
  { id:1, nom:'Mas Roig', cultiu:'Tarongers', ha:'3.2', poligon:'12', parcela:'45', color:'#2C4A1E', nota:'Finca principal. Reg per degoteig instal·lat el 2021.', sincronitzat:true },
  { id:2, nom:'El Pla de Baix', cultiu:'Llimoners', ha:'1.8', poligon:'12', parcela:'46', color:'#1A5276', nota:"Pendent d'actualitzar el pla d'abonat.", sincronitzat:false },
  { id:3, nom:'Can Valls Nord', cultiu:'Presseguers', ha:'2.5', poligon:'13', parcela:'08', color:'#7D6608', nota:'Varietat Paraguayo. Primera collita juny 2026.', sincronitzat:true },
];
export const DEMO_TRACTAMENTS = [
  { id:1, data:'2026-03-12', parcelaId:1, parcelaNom:'Mas Roig', producte:'Confidor 200 SL', plaga:'Pulgó negre', dosi:'0.5', unitat:'L/ha', aplicador:'Pere Soler ROPO-2341', justificacio:'Infestació moderada.', sincronitzat:true },
  { id:2, data:'2026-03-08', parcelaId:2, parcelaNom:'El Pla de Baix', producte:'Calypso 480 SC', plaga:'Mosca blanca', dosi:'0.2', unitat:'L/ha', aplicador:'Joan Vidal ROPO-1892', justificacio:'Presència elevada.', sincronitzat:false },
  { id:3, data:'2026-03-12', parcelaId:3, parcelaNom:'Can Valls Nord', producte:'Delegate 250 WG', plaga:'Àcars', dosi:'0.3', unitat:'kg/ha', aplicador:'Joan Vidal ROPO-1892', justificacio:'Preventiu.', sincronitzat:true },
];
export const DEMO_FERTILITZACIONS = [
  { id:1, data:'2026-03-10', parcelaId:1, parcelaNom:'Mas Roig', producte:'Nitrat amònic 33.5%', npk:'33-0-0', dosi:'150', sincronitzat:true },
  { id:2, data:'2026-03-05', parcelaId:3, parcelaNom:'Can Valls Nord', producte:'Sulfat de potassi', npk:'0-0-50', dosi:'80', sincronitzat:true },
  { id:3, data:'2026-03-08', parcelaId:2, parcelaNom:'El Pla de Baix', producte:'Nitrofoska Special', npk:'12-12-17', dosi:'200', sincronitzat:false },
];
export const DEMO_REGS = [
  { id:1, data:'2026-03-13', parcelaId:1, parcelaNom:'Mas Roig', tipus:'Degoteig', hores:'3', volum:'45', origen:'Canal' },
  { id:2, data:'2026-03-11', parcelaId:2, parcelaNom:'El Pla de Baix', tipus:'Degoteig', hores:'2', volum:'28', origen:'Canal' },
  { id:3, data:'2026-03-12', parcelaId:3, parcelaNom:'Can Valls Nord', tipus:'Aspersió', hores:'4', volum:'62', origen:'Pou' },
];
