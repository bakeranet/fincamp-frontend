import { StyleSheet, Platform } from 'react-native';
import { colors } from '../constants';

// ─────────────────────────────────────────
//  TOKENS COMPARTITS
// ─────────────────────────────────────────

const sh = {
  sm: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2 },
  md: { shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.07, shadowRadius: 10, elevation: 4 },
  lg: { shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.11, shadowRadius: 20, elevation: 8 },
};

const card = {
  backgroundColor: colors.surface, borderRadius: 16,
  borderWidth: 1, borderColor: colors.border,
  ...sh.sm,
};

// ─────────────────────────────────────────
//  GLOBALS
// ─────────────────────────────────────────

export const g = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1 },
  pad:    { padding: 16, paddingBottom: 40 },

  header: {
    backgroundColor: colors.surface,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: { fontSize: 24, fontWeight: '700', color: colors.text, letterSpacing: -0.6 },
  headerSub:   { fontSize: 13, color: colors.textLight, marginTop: 2 },

  cta: {
    backgroundColor: colors.accent,
    paddingHorizontal: 16, paddingVertical: 10,
    borderRadius: 12,
  },
  ctaText: { color: '#FFF', fontSize: 15, fontWeight: '600' },

  fab: {
    position: 'absolute', bottom: 24, right: 20,
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: colors.accent,
    alignItems: 'center', justifyContent: 'center',
    ...sh.lg,
    shadowColor: colors.accentDark,
  },
  fabPlus: { color: '#FFF', fontSize: 30, lineHeight: 34, fontWeight: '300' },

  card: { ...card, marginBottom: 12 },

  search: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 14, borderWidth: 1, borderColor: colors.border,
    paddingHorizontal: 14, marginBottom: 14,
  },
  searchInput: { flex: 1, paddingVertical: 13, fontSize: 16, color: colors.text },
  searchIcon:  { fontSize: 16, marginRight: 8 },

  sectionLabel: {
    fontSize: 12, fontWeight: '600', color: colors.textMuted,
    textTransform: 'uppercase', letterSpacing: 0.8,
    marginBottom: 10, marginTop: 4,
  },

  divider: { height: 1, backgroundColor: colors.border },

  badgeOk:       { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20, backgroundColor: colors.accentLight },
  badgeWarn:     { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20, backgroundColor: colors.warnBg },
  badgeOkText:   { fontSize: 11, fontWeight: '600', color: colors.accent },
  badgeWarnText: { fontSize: 11, fontWeight: '600', color: colors.warn },

  handle: { width: 36, height: 4, backgroundColor: colors.borderMid, borderRadius: 2, alignSelf: 'center', marginBottom: 20 },

  empty:      { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 60, paddingHorizontal: 32 },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: colors.text, textAlign: 'center', marginBottom: 8, letterSpacing: -0.4 },
  emptySub:   { fontSize: 15, color: colors.textMuted, textAlign: 'center', lineHeight: 22 },

  toast: {
    position: 'absolute', top: 90, left: 20, right: 20,
    backgroundColor: colors.text, borderRadius: 14, padding: 14,
    alignItems: 'center', zIndex: 999, ...sh.lg,
  },
  toastText: { color: '#FFF', fontSize: 14, fontWeight: '500' },

  dialogOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end', padding: 20, paddingBottom: 44 },
  dialog:        { backgroundColor: colors.surface, borderRadius: 20, padding: 24, ...sh.lg },
  dialogTitle:   { fontSize: 20, fontWeight: '700', color: colors.text, marginBottom: 8, letterSpacing: -0.4 },
  dialogDesc:    { fontSize: 15, color: colors.textMuted, lineHeight: 22, marginBottom: 20 },
  dialogBtns:    { flexDirection: 'row', gap: 10 },

  btn:         { flex: 1, paddingVertical: 15, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  btnPrimary:  { backgroundColor: colors.accent },
  btnGhost:    { backgroundColor: colors.surfaceAlt, borderWidth: 1, borderColor: colors.border },
  btnDanger:   { backgroundColor: colors.errorBg },
  btnText:     { fontSize: 16, fontWeight: '600' },
  btnTextPrimary: { color: '#FFF' },
  btnTextGhost:   { color: colors.textMuted },
  btnTextDanger:  { color: colors.error },

  iconBtn:      { width: 34, height: 34, borderRadius: 10, backgroundColor: colors.surfaceAlt, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  iconBtnDanger:{ backgroundColor: colors.errorBg, borderColor: 'transparent' },
});

// ─────────────────────────────────────────
//  FORMULARIS — FIX CLIPPING en sheets
// ─────────────────────────────────────────

export const form = StyleSheet.create({
  scroll:    { padding: 24, paddingBottom: 40 },
  title:     { fontSize: 24, fontWeight: '700', color: colors.text, letterSpacing: -0.6, marginBottom: 24 },

  group:     { marginBottom: 16 },
  label:     { fontSize: 12, fontWeight: '600', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 },

  input:     { paddingHorizontal: 14, paddingVertical: 14, borderWidth: 1.5, borderColor: colors.border, borderRadius: 12, fontSize: 16, backgroundColor: colors.surfaceAlt, color: colors.text },
  inputFocus:{ borderColor: colors.accent, backgroundColor: colors.surface },
  inputMulti:{ height: 84, textAlignVertical: 'top', paddingTop: 14 },

  selBtn:    { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  selText:   { fontSize: 16, color: colors.text, flex: 1 },
  selPlaceholder:{ fontSize: 16, color: colors.textLight, flex: 1 },
  selArrow:  { fontSize: 22, color: colors.textLight },

  // ── Sheet selector — FIX: bordes rodons dalt, safe area bottom, padding correcte ──
  sheetOverlay:{ flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
  sheet:       {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    paddingTop: 12,
    maxHeight: '70%',
  },
  sheetHandle: { width: 36, height: 4, backgroundColor: colors.borderMid, borderRadius: 2, alignSelf: 'center', marginBottom: 8 },
  sheetOption: {
    paddingVertical: 15, paddingHorizontal: 20,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderBottomWidth: 1, borderBottomColor: colors.border,
    marginHorizontal: 8,
  },
  sheetOptionActive:{ backgroundColor: colors.accentLight, borderRadius: 12, borderBottomColor: 'transparent' },
  sheetOptionText:  { fontSize: 16, color: colors.text },
  sheetOptionTextActive:{ color: colors.accent, fontWeight: '600' },

  row:       { flexDirection: 'row', gap: 10 },
  noteInfo:  { backgroundColor: colors.accentLight, borderRadius: 12, padding: 12, marginVertical: 8, borderWidth: 1, borderColor: colors.accentMid },
  noteWarn:  { backgroundColor: colors.warnBg, borderRadius: 12, padding: 12, marginVertical: 8, borderWidth: 1, borderColor: colors.warnMid },
  noteText:  { fontSize: 13, lineHeight: 19 },
  noteTextInfo:{ color: colors.accent },
  noteTextWarn:{ color: colors.warn },

  footer:    { flexDirection: 'row', gap: 10, marginTop: 20, paddingTop: 18, borderTopWidth: 1, borderTopColor: colors.border },

  colorRow:  { flexDirection: 'row', gap: 10, marginTop: 4 },
  colorDot:  { width: 32, height: 32, borderRadius: 10 },
  colorDotActive: { borderWidth: 3, borderColor: colors.text },
});

// ─────────────────────────────────────────
//  LAYOUT (pestanyes)
// ─────────────────────────────────────────

export const layout = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.surface,
    borderTopColor: colors.border, borderTopWidth: 1,
    height: Platform.OS === 'ios' ? 84 : 68,
    paddingBottom: Platform.OS === 'ios' ? 22 : 8,
    paddingTop: 8,
  },
  tabLabel: { fontSize: 11, fontWeight: '500' },
});

// ─────────────────────────────────────────
//  DASHBOARD (Inici) — NOVA DISTRIBUCIÓ
// ─────────────────────────────────────────

export const dash = StyleSheet.create({
  // ── Hero compacte amb stats integrats ──
  heroSection: {
    backgroundColor: colors.surface,
    paddingHorizontal: 20,
    paddingTop: 12, paddingBottom: 16,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  heroTopRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14,
  },
  heroGreeting: { fontSize: 13, color: colors.textMuted, fontWeight: '500', marginBottom: 2 },
  heroName:     { fontSize: 22, fontWeight: '800', color: colors.text, letterSpacing: -0.7 },
  heroActions:  { flexDirection: 'row', alignItems: 'center', gap: 10 },
  syncPill:     {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: colors.accentLight, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20,
  },
  syncDot:      { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.accent },
  syncPillText: { fontSize: 11, color: colors.accent, fontWeight: '600' },
  heroBtnAfegir:{
    backgroundColor: colors.accent, width: 40, height: 40,
    borderRadius: 12, alignItems: 'center', justifyContent: 'center',
    ...sh.md, shadowColor: colors.accentDark,
  },
  heroBtnText: { color: '#FFF', fontSize: 24, lineHeight: 28, fontWeight: '300' },

  // ── Stats ribbon (dins hero) ──
  statsRibbon: { flexDirection: 'row', gap: 8 },
  statPill: {
    flex: 1,
    backgroundColor: colors.surfaceAlt, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10,
    borderWidth: 1, borderColor: colors.border,
  },
  statPillValueRow: { flexDirection: 'row', alignItems: 'baseline', gap: 3 },
  statPillValue: { fontSize: 22, fontWeight: '800', color: colors.text, letterSpacing: -1 },
  statPillUnit:  { fontSize: 12, fontWeight: '500', color: colors.textMuted },
  statPillLabel: { fontSize: 10, fontWeight: '600', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.4, marginTop: 2 },

  // ── Alerta inline ──
  alert: { borderRadius: 12, padding: 12, marginBottom: 12, borderWidth: 1, flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  alertWarn: { backgroundColor: colors.warnBg, borderColor: colors.warnMid },
  alertOk:   { backgroundColor: colors.accentLight, borderColor: colors.accentMid },
  alertText: { fontSize: 13, color: colors.textSecondary, flex: 1, lineHeight: 19 },
  alertBold: { fontWeight: '700', color: colors.text },

  // ── Calendari setmanal ──
  weekCal:      { backgroundColor: colors.surface, borderRadius: 16, borderWidth: 1, borderColor: colors.border, ...sh.sm, marginBottom: 12 },
  weekCalHeader:{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 11, borderBottomWidth: 1, borderBottomColor: colors.border },
  weekCalTitle: { fontSize: 14, fontWeight: '700', color: colors.text },
  weekCalToggle:{ flexDirection: 'row', alignItems: 'center', gap: 3 },
  weekCalToggleText:{ fontSize: 13, color: colors.accent, fontWeight: '600' },
  weekRow:      { flexDirection: 'row', padding: 8, gap: 3 },
  weekDay:      { flex: 1, alignItems: 'center', paddingVertical: 8, borderRadius: 12 },
  weekDayToday: { backgroundColor: colors.accent },
  weekDaySel:   { backgroundColor: colors.accentLight, borderWidth: 1.5, borderColor: colors.accent },
  weekDayName:  { fontSize: 10, fontWeight: '600', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.3, marginBottom: 3 },
  weekDayNameToday:{ color: 'rgba(255,255,255,0.75)' },
  weekDayNum:   { fontSize: 16, fontWeight: '700', color: colors.text },
  weekDayNumToday:{ color: '#FFF' },
  weekDots:     { flexDirection: 'row', gap: 2, marginTop: 3, justifyContent: 'center', minHeight: 6 },
  weekDot:      { width: 5, height: 5, borderRadius: 3 },

  // ── Calendari mensual ──
  monthCal:       { backgroundColor: colors.surface, borderRadius: 16, borderWidth: 1, borderColor: colors.border, ...sh.sm, marginBottom: 12 },
  monthNavRow:    { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border },
  monthNavBtn:    { width: 32, height: 32, borderRadius: 10, backgroundColor: colors.surfaceAlt, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  monthNavBtnText:{ fontSize: 18, color: colors.textMuted },
  monthTitleRow:  { flexDirection: 'row', alignItems: 'center', gap: 12 },
  monthTitle:     { fontSize: 15, fontWeight: '700', color: colors.text },
  monthToggle:    { flexDirection: 'row', alignItems: 'center', gap: 3, paddingHorizontal: 10, paddingVertical: 5, backgroundColor: colors.accentLight, borderRadius: 8 },
  monthToggleText:{ fontSize: 12, color: colors.accent, fontWeight: '600' },
  monthWeekdays:  { flexDirection: 'row', paddingHorizontal: 8, paddingVertical: 6 },
  monthWeekday:   { flex: 1, alignItems: 'center' },
  monthWeekdayText:{ fontSize: 10, fontWeight: '600', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.4 },
  monthGrid:      { paddingHorizontal: 6, paddingBottom: 8 },
  monthRow:       { flexDirection: 'row', marginBottom: 2 },
  monthCell:      { flex: 1, alignItems: 'center', paddingVertical: 5, borderRadius: 10, minHeight: 42 },
  monthCellToday: { backgroundColor: colors.accent },
  monthCellSel:   { backgroundColor: colors.accentLight, borderWidth: 1.5, borderColor: colors.accent },
  monthCellFaded: { opacity: 0.22 },
  monthNum:       { fontSize: 13, fontWeight: '500', color: colors.text, marginBottom: 2 },
  monthNumToday:  { color: '#FFF', fontWeight: '700' },
  monthNumSel:    { color: colors.accent, fontWeight: '700' },
  monthDots:      { flexDirection: 'row', gap: 2, justifyContent: 'center', minHeight: 5 },
  monthDot:       { width: 4, height: 4, borderRadius: 2 },

  // ── Llegenda integrada al calendari ──
  legend:     { flexDirection: 'row', justifyContent: 'center', gap: 14, paddingVertical: 7, borderTopWidth: 1, borderTopColor: colors.border },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  legendDot:  { width: 6, height: 6, borderRadius: 3 },
  legendText: { fontSize: 10, color: colors.textMuted, fontWeight: '500' },

  // ── Panell dia ──
  dayPanel:     { backgroundColor: colors.surface, borderRadius: 16, borderWidth: 1, borderColor: colors.border, ...sh.sm, marginBottom: 12 },
  dayHeader:    { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
  dayTitle:     { fontSize: 14, fontWeight: '700', color: colors.text, textTransform: 'capitalize', letterSpacing: -0.2, flex: 1, marginRight: 8 },
  daySubtitle:  { fontSize: 12, color: colors.textMuted, marginTop: 1 },
  dayAddBtn:    { backgroundColor: colors.accentLight, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, flexShrink: 0 },
  dayAddBtnText:{ color: colors.accent, fontSize: 13, fontWeight: '700' },
  dayItem:      { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border, gap: 12 },
  dayItemIcon:  { width: 36, height: 36, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  dayItemIconText:{ fontSize: 16 },
  dayItemContent:{ flex: 1, minWidth: 0 },
  dayItemTitle: { fontSize: 14, fontWeight: '600', color: colors.text },
  dayItemSub:   { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  dayItemRight: { alignItems: 'flex-end', gap: 5 },
  dayEmpty:     { paddingVertical: 20, alignItems: 'center' },
  dayEmptyText: { fontSize: 13, color: colors.textMuted },

  // ── Activitat recent ──
  recentCard:   { backgroundColor: colors.surface, borderRadius: 16, borderWidth: 1, borderColor: colors.border, ...sh.sm, marginBottom: 12 },
  recentItem:   { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border, gap: 10 },
  recentIcon:   { width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  recentIconTxt:{ fontSize: 15 },
  recentContent:{ flex: 1, minWidth: 0 },
  recentTitle:  { fontSize: 13, fontWeight: '600', color: colors.text },
  recentSub:    { fontSize: 11, color: colors.textMuted, marginTop: 2 },
  recentRight:  { alignItems: 'flex-end', gap: 3 },

  // ── SIEX compact ──
  siexCard:     { backgroundColor: colors.text, borderRadius: 14, paddingHorizontal: 16, paddingVertical: 14, marginBottom: 4 },
  siexTop:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  siexTitle:    { fontSize: 14, fontWeight: '700', color: '#FFF', letterSpacing: -0.2 },
  siexStatus:   { flexDirection: 'row', alignItems: 'center', gap: 5 },
  siexDot:      { width: 7, height: 7, borderRadius: 4, backgroundColor: '#4ADE80' },
  siexStatusTxt:{ fontSize: 12, color: '#4ADE80', fontWeight: '600' },
  siexBar:      { height: 3, backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 2, marginBottom: 6 },
  siexFill:     { height: 3, backgroundColor: 'rgba(255,255,255,0.45)', borderRadius: 2, width: '65%' },
  siexFoot:     { flexDirection: 'row', justifyContent: 'space-between' },
  siexFootTxt:  { fontSize: 11, color: 'rgba(255,255,255,0.4)' },
});

// ─────────────────────────────────────────
//  PARCEL·LES
// ─────────────────────────────────────────

export const parceles = StyleSheet.create({
  card:       { ...card, marginBottom: 12 },
  cardStripe: { height: 5, borderTopLeftRadius: 16, borderTopRightRadius: 16 },
  cardBody:   { padding: 18 },
  cardTop:    { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 4 },
  cardName:   { fontSize: 19, fontWeight: '700', color: colors.text, letterSpacing: -0.4, flex: 1 },
  cardCrop:   { fontSize: 14, color: colors.textMuted, marginBottom: 12 },
  cardChips:  { flexDirection: 'row', gap: 6, flexWrap: 'wrap', marginBottom: 14 },
  chip:       { backgroundColor: colors.surfaceAlt, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, borderWidth: 1, borderColor: colors.border },
  chipText:   { fontSize: 12, color: colors.textMuted, fontWeight: '500' },
  cardNote:   { fontSize: 13, color: colors.textMuted, lineHeight: 19, marginBottom: 14, paddingTop: 12, borderTopWidth: 1, borderTopColor: colors.border },
  cardFoot:   { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, borderTopWidth: 1, borderTopColor: colors.border },
  viewBtn:    { flexDirection: 'row', alignItems: 'center', gap: 4 },
  viewBtnTxt: { fontSize: 14, fontWeight: '600', color: colors.accent },
  cardActions:{ flexDirection: 'row', gap: 8 },

  detStripe:  { height: 6 },
  detBody:    { padding: 20 },
  detHeader:  { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 6 },
  detName:    { fontSize: 24, fontWeight: '800', color: colors.text, letterSpacing: -0.7, flex: 1 },
  detCrop:    { fontSize: 15, color: colors.textMuted, marginBottom: 16 },
  detChips:   { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginBottom: 14 },
  detNote:    { fontSize: 14, color: colors.textMuted, lineHeight: 21, paddingTop: 14, borderTopWidth: 1, borderTopColor: colors.border, marginBottom: 4 },

  calCard:    { ...card, marginBottom: 14 },
  calHeader:  { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: colors.border },
  calTitle:   { fontSize: 15, fontWeight: '700', color: colors.text },
  calNav:     { flexDirection: 'row', gap: 6 },
  calNavBtn:  { width: 30, height: 30, borderRadius: 9, backgroundColor: colors.surfaceAlt, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  calNavTxt:  { fontSize: 16, color: colors.textMuted },
  calWeekdays:{ flexDirection: 'row', paddingHorizontal: 8, paddingVertical: 7 },
  calWeekday: { flex: 1, alignItems: 'center' },
  calWeekdayTxt:{ fontSize: 10, fontWeight: '600', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.4 },
  calGrid:    { paddingHorizontal: 6, paddingBottom: 10 },
  calRow:     { flexDirection: 'row', marginBottom: 2 },
  calCell:    { flex: 1, alignItems: 'center', paddingVertical: 5, borderRadius: 10, minHeight: 44 },
  calCellToday:{ backgroundColor: colors.accent },
  calCellSel:  { backgroundColor: colors.accentLight, borderWidth: 1.5, borderColor: colors.accent },
  calCellFaded:{ opacity: 0.2 },
  calNum:     { fontSize: 13, fontWeight: '500', color: colors.text, marginBottom: 2 },
  calNumToday:{ color: '#FFF', fontWeight: '700' },
  calNumSel:  { color: colors.accent, fontWeight: '700' },
  calDots:    { flexDirection: 'row', gap: 2, justifyContent: 'center' },
  calDot:     { width: 5, height: 5, borderRadius: 3 },

  regItem:    { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.border, gap: 12 },
  regIcon:    { width: 40, height: 40, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  regIconTxt: { fontSize: 18 },
  regContent: { flex: 1, minWidth: 0 },
  regTitle:   { fontSize: 14, fontWeight: '600', color: colors.text },
  regSub:     { fontSize: 12, color: colors.textMuted, marginTop: 3, lineHeight: 17 },
  regRight:   { alignItems: 'flex-end', gap: 5 },
  regDate:    { fontSize: 12, color: colors.textMuted },
});

// ─────────────────────────────────────────
//  REGISTRES
// ─────────────────────────────────────────

export const registres = StyleSheet.create({
  tipusChip:    { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, marginRight: 8 },
  tipusDot:     { width: 7, height: 7, borderRadius: 4 },
  tipusTxt:     { fontSize: 14, fontWeight: '500', color: colors.textMuted },
  tipusTxtActiu:{ color: '#FFF', fontWeight: '600' },

  item:       { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.border, gap: 12 },
  icon:       { width: 42, height: 42, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  iconTxt:    { fontSize: 19 },
  content:    { flex: 1, minWidth: 0 },
  title:      { fontSize: 15, fontWeight: '600', color: colors.text },
  sub:        { fontSize: 13, color: colors.textMuted, marginTop: 3, lineHeight: 18 },
  right:      { alignItems: 'flex-end', gap: 5 },
  date:       { fontSize: 12, color: colors.textMuted },
  actions:    { flexDirection: 'row', gap: 5 },
});

// ─────────────────────────────────────────
//  RESUM
// ─────────────────────────────────────────

export const resum = StyleSheet.create({
  statGrid:  { flexDirection: 'row', gap: 10, marginBottom: 14 },
  statCard:  { flex: 1, backgroundColor: colors.surface, borderRadius: 16, padding: 18, borderWidth: 1, borderColor: colors.border, ...sh.sm },
  statValue: { fontSize: 34, fontWeight: '800', color: colors.text, letterSpacing: -1.5, marginTop: 6 },
  statLabel: { fontSize: 12, fontWeight: '600', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.7 },
  statSub:   { fontSize: 13, color: colors.textMuted, marginTop: 5 },

  siex:      { backgroundColor: colors.text, borderRadius: 16, padding: 20, marginBottom: 14 },
  siexLabel: { fontSize: 11, color: 'rgba(255,255,255,0.45)', fontWeight: '600', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 },
  siexTitle: { fontSize: 22, fontWeight: '800', color: '#FFF', letterSpacing: -0.6, marginBottom: 14 },
  siexStat:  { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  siexDot:   { width: 10, height: 10, borderRadius: 5, backgroundColor: '#4ADE80' },
  siexTxt:   { fontSize: 15, color: '#4ADE80', fontWeight: '600' },
  siexBar:   { height: 5, backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 3, marginBottom: 7 },
  siexFill:  { height: 5, backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: 3, width: '65%' },
  siexFoot:  { flexDirection: 'row', justifyContent: 'space-between' },
  siexFtTxt: { fontSize: 12, color: 'rgba(255,255,255,0.4)' },

  section:   { backgroundColor: colors.surface, borderRadius: 14, borderWidth: 1, borderColor: colors.border, marginBottom: 14 },
  secTitle:  { fontSize: 12, fontWeight: '600', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.8, paddingHorizontal: 16, paddingTop: 14, paddingBottom: 8 },
  row:       { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 15, borderTopWidth: 1, borderTopColor: colors.border },
  rowLabel:  { fontSize: 16, color: colors.text },
  rowValue:  { fontSize: 15, fontWeight: '600', color: colors.textMuted },
});
