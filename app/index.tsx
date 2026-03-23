import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { useStore } from '../store';
import { colors, MESOS, DIES_SETMANA_CURT, COLOR_TIPUS, BG_TIPUS, ICONA_TIPUS, LABEL_TIPUS } from '../constants';
import { g, dash } from '../styles';
import { BadgeEstat, IconBtn, SectionLabel } from '../components/UI';
import { FincaLogotip } from '../components/FincaLogo';
import { Confirm } from '../components/Retroalimentacio';
import { SelectorTipus, FormTractament, FormFertilitzacio, FormReg } from '../components/Forms';
import { EsdevenimentCalendari, TipusEsdeveniment } from '../types';
import { toISO, generarGraellaMes, diesSetmanaActual, useEsdevenimentsPerDia } from '../hooks/calendari';
import { formatData, nomProducte } from '../hooks/utils';

// ─── Cel·la setmanal ───
const WeekDay = ({ iso, num, nom, isToday, isSel, tipus, onPress }: any) => (
  <TouchableOpacity style={[dash.weekDay, isToday && !isSel && dash.weekDayToday, isSel && dash.weekDaySel]} onPress={onPress} activeOpacity={0.7}>
    <Text style={[dash.weekDayName, isToday && !isSel && dash.weekDayNameToday]}>{nom}</Text>
    <Text style={[dash.weekDayNum, isToday && !isSel && dash.weekDayNumToday]}>{num}</Text>
    <View style={dash.weekDots}>
      {[...new Set(tipus)].slice(0, 3).map((t: any) => (
        <View key={t} style={[dash.weekDot, { backgroundColor: isToday && !isSel ? 'rgba(255,255,255,0.7)' : COLOR_TIPUS[t as TipusEsdeveniment] }]} />
      ))}
    </View>
  </TouchableOpacity>
);

// ─── Cel·la mensual ───
const MonthCell = ({ dia, isToday, isSel, tipus, onPress }: any) => (
  <TouchableOpacity
    style={[dash.monthCell, isToday && !isSel && dash.monthCellToday, isSel && dash.monthCellSel, !dia.mesActual && dash.monthCellFaded]}
    onPress={onPress} activeOpacity={0.7}
  >
    <Text style={[dash.monthNum, isToday && !isSel && dash.monthNumToday, isSel && !isToday && dash.monthNumSel]}>{dia.dia}</Text>
    <View style={dash.monthDots}>
      {[...new Set(tipus)].slice(0, 3).map((t: any) => (
        <View key={t} style={[dash.monthDot, { backgroundColor: COLOR_TIPUS[t as TipusEsdeveniment] }]} />
      ))}
    </View>
  </TouchableOpacity>
);

// ─── Llegenda (dins del calendari) ───
const CalLegend = () => (
  <View style={dash.legend}>
    {(['tractament', 'fertilitzacio', 'reg'] as TipusEsdeveniment[]).map(t => (
      <View key={t} style={dash.legendItem}>
        <View style={[dash.legendDot, { backgroundColor: COLOR_TIPUS[t] }]} />
        <Text style={dash.legendText}>{ICONA_TIPUS[t]} {LABEL_TIPUS[t]}</Text>
      </View>
    ))}
  </View>
);

// ─── PANTALLA ───
export default function Index() {
  const { tractaments, fertilitzacions, regs, parceles, eliminarTractament, eliminarFertilitzacio, eliminarReg, afegirTractament, afegirFertilitzacio, afegirReg, mostrarToast } = useStore();

  const ara    = new Date();
  const avuiK  = toISO(ara);

  const [expandit, setExpandit] = useState(false);
  const [any, setAny]           = useState(ara.getFullYear());
  const [mes, setMes]           = useState(ara.getMonth());
  const [diaSelec, setDiaSelec] = useState(avuiK);
  const [selTipus, setSelTipus] = useState(false);
  const [fTract, setFTract]     = useState(false);
  const [fFert, setFFert]       = useState(false);
  const [fReg, setFReg]         = useState(false);
  const [confirm, setConfirm]   = useState<{ tipus: string; id: number } | null>(null);

  const perDia     = useEsdevenimentsPerDia({ tractaments, fertilitzacions, regs });
  const diesSetm   = useMemo(() => diesSetmanaActual(), []);
  const graella    = useMemo(() => generarGraellaMes(any, mes), [any, mes]);
  const avuiKey    = avuiK;
  const evDia      = perDia[diaSelec] ?? [];
  const pendents   = tractaments.filter(t => !t.sincronitzat).length + fertilitzacions.filter(f => !f.sincronitzat).length;
  const totalHa    = parceles.reduce((a, p) => a + parseFloat(p.ha || '0'), 0).toFixed(1);
  const titolDia   = new Date(diaSelec + 'T12:00:00').toLocaleDateString('ca-ES', { weekday: 'long', day: 'numeric', month: 'long' });

  const prevMes = () => { if (mes === 0) { setMes(11); setAny(a => a - 1); } else setMes(m => m - 1); };
  const nextMes = () => { if (mes === 11) { setMes(0); setAny(a => a + 1); } else setMes(m => m + 1); };

  const ultimsRegs = useMemo(() => {
    const tots = [
      ...tractaments.map(t => ({ tipus: 'tractament' as TipusEsdeveniment, id: t.id, titol: nomProducte(t.producte), sub: `${t.parcelaNom} · ${t.plaga}`, data: t.data, sync: t.sincronitzat as boolean | undefined })),
      ...fertilitzacions.map(f => ({ tipus: 'fertilitzacio' as TipusEsdeveniment, id: f.id, titol: nomProducte(f.producte), sub: `${f.parcelaNom} · NPK ${f.npk || '—'}`, data: f.data, sync: f.sincronitzat as boolean | undefined })),
      ...regs.map(r => ({ tipus: 'reg' as TipusEsdeveniment, id: r.id, titol: r.parcelaNom, sub: `${r.tipus} · ${r.hores}h · ${r.volum} m³`, data: r.data, sync: undefined as boolean | undefined })),
    ];
    return tots.sort((a, b) => b.data.localeCompare(a.data)).slice(0, 5);
  }, [tractaments, fertilitzacions, regs]);

  const doEliminar = () => {
    if (!confirm) return;
    if (confirm.tipus === 'tractament')    { eliminarTractament(confirm.id);    mostrarToast('Tractament eliminat'); }
    if (confirm.tipus === 'fertilitzacio') { eliminarFertilitzacio(confirm.id); mostrarToast('Fertilització eliminada'); }
    if (confirm.tipus === 'reg')           { eliminarReg(confirm.id);           mostrarToast('Reg eliminat'); }
    setConfirm(null);
  };

  return (
    <SafeAreaView style={g.safe}>

      {/* ── Hero compacte amb stats integrats ── */}
      <View style={dash.heroSection}>
        <View style={dash.heroTopRow}>
          <FincaLogotip mida={36} mostrarSubtitol={false} />
          <View style={dash.heroActions}>
            <View style={dash.syncPill}>
              <View style={dash.syncDot} />
              <Text style={dash.syncPillText}>SIEX sync</Text>
            </View>
            <TouchableOpacity style={dash.heroBtnAfegir} onPress={() => setSelTipus(true)}>
              <Text style={dash.heroBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats ribbon dins del hero */}
        <View style={dash.statsRibbon}>
          <View style={dash.statPill}>
            <View style={dash.statPillValueRow}>
              <Text style={dash.statPillValue}>{totalHa}</Text>
              <Text style={dash.statPillUnit}>ha</Text>
            </View>
            <Text style={dash.statPillLabel}>{parceles.length} parcel·les</Text>
          </View>
          <View style={[dash.statPill, pendents > 0 && { borderColor: colors.warnMid }]}>
            <View style={dash.statPillValueRow}>
              <Text style={[dash.statPillValue, pendents > 0 && { color: colors.warn }]}>{pendents}</Text>
              <Text style={dash.statPillUnit}>pendent{pendents !== 1 ? 's' : ''}</Text>
            </View>
            <Text style={dash.statPillLabel}>sync DARP</Text>
          </View>
          <View style={dash.statPill}>
            <View style={dash.statPillValueRow}>
              <Text style={dash.statPillValue}>{tractaments.length + fertilitzacions.length + regs.length}</Text>
            </View>
            <Text style={dash.statPillLabel}>registres</Text>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>

        {/* ── Alerta inline ── */}
        {pendents > 0 && (
          <View style={[dash.alert, dash.alertWarn]}>
            <Text style={dash.alertText}><Text style={dash.alertBold}>{pendents} registre{pendents > 1 ? 's' : ''}</Text> pendent{pendents > 1 ? 's' : ''} de sync. Cal enviar al DARP en 30 dies.</Text>
          </View>
        )}

        {/* ── Calendari setmanal / mensual ── */}
        {!expandit ? (
          <View style={dash.weekCal}>
            <View style={dash.weekCalHeader}>
              <Text style={dash.weekCalTitle}>Aquesta setmana</Text>
              <TouchableOpacity style={dash.weekCalToggle} onPress={() => setExpandit(true)}>
                <Text style={dash.weekCalToggleText}>Mensual ›</Text>
              </TouchableOpacity>
            </View>
            <View style={dash.weekRow}>
              {diesSetm.map(d => (
                <WeekDay key={d.isoKey} iso={d.isoKey} num={d.dia}
                  nom={DIES_SETMANA_CURT[(d.data.getDay() + 6) % 7]}
                  isToday={d.isoKey === avuiKey} isSel={d.isoKey === diaSelec}
                  tipus={(perDia[d.isoKey] ?? []).map(e => e.tipus)}
                  onPress={() => setDiaSelec(d.isoKey)}
                />
              ))}
            </View>
            <CalLegend />
          </View>
        ) : (
          <View style={dash.monthCal}>
            <View style={dash.monthNavRow}>
              <View style={dash.monthTitleRow}>
                <TouchableOpacity style={dash.monthNavBtn} onPress={prevMes}><Text style={dash.monthNavBtnText}>‹</Text></TouchableOpacity>
                <Text style={dash.monthTitle}>{MESOS[mes]} {any}</Text>
                <TouchableOpacity style={dash.monthNavBtn} onPress={nextMes}><Text style={dash.monthNavBtnText}>›</Text></TouchableOpacity>
              </View>
              <TouchableOpacity style={dash.monthToggle} onPress={() => setExpandit(false)}>
                <Text style={dash.monthToggleText}>‹ Setmana</Text>
              </TouchableOpacity>
            </View>
            <View style={dash.monthWeekdays}>
              {DIES_SETMANA_CURT.map(d => <View key={d} style={dash.monthWeekday}><Text style={dash.monthWeekdayText}>{d}</Text></View>)}
            </View>
            <View style={dash.monthGrid}>
              {graella.map((fila, i) => (
                <View key={i} style={dash.monthRow}>
                  {fila.map((dia, j) => (
                    <MonthCell key={`${i}-${j}`} dia={dia} isToday={dia.isoKey === avuiKey} isSel={dia.isoKey === diaSelec}
                      tipus={(perDia[dia.isoKey] ?? []).map(e => e.tipus)} onPress={() => setDiaSelec(dia.isoKey)} />
                  ))}
                </View>
              ))}
            </View>
            <CalLegend />
          </View>
        )}

        {/* ── Panell del dia seleccionat ── */}
        <View style={dash.dayPanel}>
          <View style={dash.dayHeader}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={dash.dayTitle} numberOfLines={1}>{titolDia}</Text>
              <Text style={dash.daySubtitle}>{evDia.length === 0 ? 'Sense activitat' : `${evDia.length} registre${evDia.length > 1 ? 's' : ''}`}</Text>
            </View>
            <TouchableOpacity style={dash.dayAddBtn} onPress={() => setSelTipus(true)}>
              <Text style={dash.dayAddBtnText}>+ Afegir</Text>
            </TouchableOpacity>
          </View>
          {evDia.length === 0
            ? <View style={dash.dayEmpty}><Text style={dash.dayEmptyText}>Cap registre per a aquest dia.</Text></View>
            : evDia.map((e, i) => (
                <View key={`${e.tipus}-${e.id}-${i}`} style={dash.dayItem}>
                  <View style={[dash.dayItemIcon, { backgroundColor: BG_TIPUS[e.tipus] }]}>
                    <Text style={dash.dayItemIconText}>{ICONA_TIPUS[e.tipus]}</Text>
                  </View>
                  <View style={dash.dayItemContent}>
                    <Text style={dash.dayItemTitle} numberOfLines={1}>{e.titol}</Text>
                    <Text style={dash.dayItemSub} numberOfLines={1}>{e.subtitol}</Text>
                  </View>
                  <View style={dash.dayItemRight}>
                    {e.sincronitzat !== undefined && <BadgeEstat sincronitzat={e.sincronitzat} />}
                    <IconBtn icon="🗑️" onPress={() => setConfirm({ tipus: e.tipus, id: e.id })} danger />
                  </View>
                </View>
              ))
          }
        </View>

        {/* ── Activitat recent ── */}
        {ultimsRegs.length > 0 && (
          <>
            <SectionLabel>Activitat recent</SectionLabel>
            <View style={dash.recentCard}>
              {ultimsRegs.map((r, i) => (
                <View key={`${r.tipus}-${r.id}`} style={[dash.recentItem, i === ultimsRegs.length - 1 && { borderBottomWidth: 0 }]}>
                  <View style={[dash.recentIcon, { backgroundColor: BG_TIPUS[r.tipus] }]}>
                    <Text style={dash.recentIconTxt}>{ICONA_TIPUS[r.tipus]}</Text>
                  </View>
                  <View style={dash.recentContent}>
                    <Text style={dash.recentTitle} numberOfLines={1}>{r.titol}</Text>
                    <Text style={dash.recentSub} numberOfLines={1}>{r.sub}</Text>
                  </View>
                  <View style={dash.recentRight}>
                    <Text style={{ fontSize: 11, color: colors.textMuted }}>{formatData(r.data)}</Text>
                    {r.sync !== undefined && <BadgeEstat sincronitzat={r.sync} />}
                  </View>
                </View>
              ))}
            </View>
          </>
        )}

        {/* ── SIEX ── */}
        <View style={dash.siexCard}>
          <View style={dash.siexTop}>
            <Text style={dash.siexTitle}>SIEX · DARP Catalunya</Text>
            <View style={dash.siexStatus}><View style={dash.siexDot} /><Text style={dash.siexStatusTxt}>Connectat</Text></View>
          </View>
          <View style={dash.siexBar}><View style={dash.siexFill} /></View>
          <View style={dash.siexFoot}><Text style={dash.siexFootTxt}>Campanya 2025–26</Text><Text style={dash.siexFootTxt}>65% completat</Text></View>
        </View>

      </ScrollView>

      <SelectorTipus visible={selTipus} onClose={() => setSelTipus(false)} onSelect={t => { setSelTipus(false); if (t === 'tractament') setFTract(true); else if (t === 'fertilitzacio') setFFert(true); else setFReg(true); }} />
      <FormTractament    visible={fTract} dataInicial={diaSelec} onClose={() => setFTract(false)} onSave={d => { afegirTractament(d);    mostrarToast('Tractament afegit'); }} />
      <FormFertilitzacio visible={fFert}  dataInicial={diaSelec} onClose={() => setFFert(false)}  onSave={d => { afegirFertilitzacio(d); mostrarToast('Fertilització afegida'); }} />
      <FormReg           visible={fReg}   dataInicial={diaSelec} onClose={() => setFReg(false)}   onSave={d => { afegirReg(d);           mostrarToast('Reg afegit'); }} />
      <Confirm visible={confirm !== null} title="Eliminar registre" desc="Aquesta acció és permanent i no es pot desfer." onOk={doEliminar} onCancel={() => setConfirm(null)} />
    </SafeAreaView>
  );
}
