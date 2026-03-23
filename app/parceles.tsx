import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, TextInput, Modal, StyleSheet } from 'react-native';
import { useStore } from '../store';
import { colors, MESOS, DIES_SETMANA_CURT, COLOR_TIPUS, BG_TIPUS, ICONA_TIPUS, LABEL_TIPUS } from '../constants';
import { g, parceles as sp } from '../styles';
import { BadgeEstat, IconBtn, SheetHandle, SectionLabel, Empty } from '../components/UI';
import { Confirm } from '../components/Retroalimentacio';
import { FormParcela, FormTractament, FormFertilitzacio, FormReg, SelectorTipus } from '../components/Forms';
import { ParcelaModel, EsdevenimentCalendari, TipusEsdeveniment } from '../types';
import { toISO, generarGraellaMes, useEsdevenimentsPerDia } from '../hooks/calendari';
import { formatData, nomProducte } from '../hooks/utils';

// ─── Detall Parcel·la ───
const DetallParcela = ({ p, onClose }: { p: ParcelaModel; onClose: () => void }) => {
  const { tractaments, fertilitzacions, regs, eliminarTractament, eliminarFertilitzacio, eliminarReg, afegirTractament, afegirFertilitzacio, afegirReg, mostrarToast } = useStore();

  const tractP = tractaments.filter(t => t.parcelaId === p.id);
  const fertP  = fertilitzacions.filter(f => f.parcelaId === p.id);
  const regP   = regs.filter(r => r.parcelaId === p.id);

  const ara = new Date();
  const [any, setAny]       = useState(ara.getFullYear());
  const [mes, setMes]       = useState(ara.getMonth());
  const [diaSelec, setDia]  = useState(toISO(ara));
  const [selTipus, setSelTipus] = useState(false);
  const [fTract, setFTract] = useState(false);
  const [fFert, setFFert]   = useState(false);
  const [fReg, setFReg]     = useState(false);
  const [confirm, setConfirm] = useState<{ tipus: string; id: number } | null>(null);

  const perDia  = useEsdevenimentsPerDia({ tractaments: tractP, fertilitzacions: fertP, regs: regP });
  const graella = useMemo(() => generarGraellaMes(any, mes), [any, mes]);
  const avuiK   = toISO(ara);
  const evDia   = perDia[diaSelec] ?? [];
  const titolDia = new Date(diaSelec + 'T12:00:00').toLocaleDateString('ca-ES', { weekday: 'long', day: 'numeric', month: 'long' });

  const totsReg = useMemo(() => [
    ...tractP.map(t => ({ tipus: 'tractament' as TipusEsdeveniment, id: t.id, titol: nomProducte(t.producte), sub: `${t.plaga} · ${t.dosi} ${t.unitat}`, data: t.data, sync: t.sincronitzat as boolean | undefined })),
    ...fertP.map(f  => ({ tipus: 'fertilitzacio' as TipusEsdeveniment, id: f.id, titol: nomProducte(f.producte), sub: `NPK ${f.npk || '—'} · ${f.dosi} kg/ha`, data: f.data, sync: f.sincronitzat as boolean | undefined })),
    ...regP.map(r   => ({ tipus: 'reg' as TipusEsdeveniment, id: r.id, titol: `Reg ${r.tipus}`, sub: `${r.hores}h · ${r.volum} m³ · ${r.origen}`, data: r.data, sync: undefined as boolean | undefined })),
  ].sort((a, b) => b.data.localeCompare(a.data)), [tractP, fertP, regP]);

  const doEliminar = () => {
    if (!confirm) return;
    if (confirm.tipus === 'tractament')    { eliminarTractament(confirm.id);    mostrarToast('Tractament eliminat'); }
    if (confirm.tipus === 'fertilitzacio') { eliminarFertilitzacio(confirm.id); mostrarToast('Fertilització eliminada'); }
    if (confirm.tipus === 'reg')           { eliminarReg(confirm.id);           mostrarToast('Reg eliminat'); }
    setConfirm(null);
  };

  return (
    <Modal visible animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>

        {/* Header del detall */}
        <View style={[g.header, { flexDirection: 'row', alignItems: 'center', gap: 12 }]}>
          <TouchableOpacity onPress={onClose} style={{ width: 36, height: 36, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 26, color: colors.accent, fontWeight: '600' }}>‹</Text>
          </TouchableOpacity>
          <Text style={[g.headerTitle, { flex: 1 }]} numberOfLines={1}>{p.nom}</Text>
          <TouchableOpacity style={g.cta} onPress={() => setSelTipus(true)}>
            <Text style={g.ctaText}>+ Afegir</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

          {/* Info de la parcel·la */}
          <View style={[sp.card, { marginHorizontal: 16, marginTop: 16 }]}>
            <View style={[sp.cardStripe, { backgroundColor: p.color }]} />
            <View style={sp.detBody}>
              <View style={sp.detHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={sp.detName}>{p.nom}</Text>
                  <Text style={sp.detCrop}>{p.cultiu}</Text>
                </View>
                <BadgeEstat sincronitzat={p.sincronitzat} />
              </View>
              <View style={sp.detChips}>
                {[`${p.ha} ha`, `Pol. ${p.poligon || '—'}`, `Parc. ${p.parcela || '—'}`, `${tractP.length + fertP.length + regP.length} registres`].map((xip, i) => (
                  <View key={i} style={sp.chip}><Text style={sp.chipText}>{xip}</Text></View>
                ))}
              </View>
              {p.nota ? <Text style={sp.detNote}>{p.nota}</Text> : null}
            </View>
          </View>

          <View style={{ paddingHorizontal: 16 }}>
            {/* Calendari de la parcel·la */}
            <View style={[sp.calCard, { marginTop: 12 }]}>
              <View style={sp.calHeader}>
                <Text style={sp.calTitle}>{MESOS[mes]} {any}</Text>
                <View style={sp.calNav}>
                  <TouchableOpacity style={sp.calNavBtn} onPress={() => { if (mes === 0) { setMes(11); setAny(a => a-1); } else setMes(m => m-1); }}>
                    <Text style={sp.calNavTxt}>‹</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={sp.calNavBtn} onPress={() => { if (mes === 11) { setMes(0); setAny(a => a+1); } else setMes(m => m+1); }}>
                    <Text style={sp.calNavTxt}>›</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={sp.calWeekdays}>
                {DIES_SETMANA_CURT.map(d => <View key={d} style={sp.calWeekday}><Text style={sp.calWeekdayTxt}>{d}</Text></View>)}
              </View>
              <View style={sp.calGrid}>
                {graella.map((fila, i) => (
                  <View key={i} style={sp.calRow}>
                    {fila.map((dia, j) => {
                      const tipus = (perDia[dia.isoKey] ?? []).map(e => e.tipus);
                      const isToday = dia.isoKey === avuiK;
                      const isSel   = dia.isoKey === diaSelec;
                      return (
                        <TouchableOpacity key={`${i}-${j}`} style={[sp.calCell, isToday && !isSel && sp.calCellToday, isSel && sp.calCellSel, !dia.mesActual && sp.calCellFaded]} onPress={() => setDia(dia.isoKey)} activeOpacity={0.7}>
                          <Text style={[sp.calNum, isToday && !isSel && sp.calNumToday, isSel && !isToday && sp.calNumSel]}>{dia.dia}</Text>
                          <View style={sp.calDots}>
                            {[...new Set(tipus)].slice(0, 3).map(t => <View key={t} style={[sp.calDot, { backgroundColor: COLOR_TIPUS[t] }]} />)}
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                ))}
              </View>
            </View>

            {/* Registres del dia */}
            <SectionLabel>{titolDia}</SectionLabel>
            {evDia.length === 0
              ? <Text style={{ fontSize: 14, color: colors.textMuted, marginBottom: 16 }}>Cap activitat per a aquest dia.</Text>
              : <View style={loc.listaCard}>
                  {evDia.map((e, i) => (
                    <View key={`${e.tipus}-${e.id}-${i}`} style={sp.regItem}>
                      <View style={[sp.regIcon, { backgroundColor: BG_TIPUS[e.tipus] }]}><Text style={sp.regIconTxt}>{ICONA_TIPUS[e.tipus]}</Text></View>
                      <View style={sp.regContent}><Text style={sp.regTitle} numberOfLines={1}>{e.titol}</Text><Text style={sp.regSub} numberOfLines={1}>{e.subtitol}</Text></View>
                      <View style={sp.regRight}>{e.sincronitzat !== undefined && <BadgeEstat sincronitzat={e.sincronitzat} />}<IconBtn icon="🗑️" onPress={() => setConfirm({ tipus: e.tipus, id: e.id })} danger /></View>
                    </View>
                  ))}
                </View>
            }

            {/* Historial */}
            <SectionLabel>Historial complet ({totsReg.length})</SectionLabel>
            {totsReg.length === 0
              ? <Empty title="Sense registres" sub="Afegeix el primer registre amb el botó Afegir." />
              : <View style={loc.listaCard}>
                  {totsReg.map(r => (
                    <View key={`${r.tipus}-${r.id}`} style={sp.regItem}>
                      <View style={[sp.regIcon, { backgroundColor: BG_TIPUS[r.tipus] }]}><Text style={sp.regIconTxt}>{ICONA_TIPUS[r.tipus]}</Text></View>
                      <View style={sp.regContent}><Text style={sp.regTitle} numberOfLines={1}>{r.titol}</Text><Text style={sp.regSub} numberOfLines={1}>{r.sub}</Text></View>
                      <View style={sp.regRight}><Text style={sp.regDate}>{formatData(r.data)}</Text>{r.sync !== undefined && <BadgeEstat sincronitzat={r.sync} />}<IconBtn icon="🗑️" onPress={() => setConfirm({ tipus: r.tipus, id: r.id })} danger /></View>
                    </View>
                  ))}
                </View>
            }
          </View>
        </ScrollView>

        <SelectorTipus visible={selTipus} onClose={() => setSelTipus(false)} onSelect={t => { setSelTipus(false); if (t === 'tractament') setFTract(true); else if (t === 'fertilitzacio') setFFert(true); else setFReg(true); }} />
        <FormTractament    visible={fTract} dataInicial={diaSelec} onClose={() => setFTract(false)} onSave={d => { afegirTractament({ ...d, parcelaId: p.id, parcelaNom: p.nom }); mostrarToast('Tractament afegit'); }} />
        <FormFertilitzacio visible={fFert}  dataInicial={diaSelec} onClose={() => setFFert(false)}  onSave={d => { afegirFertilitzacio({ ...d, parcelaId: p.id, parcelaNom: p.nom }); mostrarToast('Fertilització afegida'); }} />
        <FormReg           visible={fReg}   dataInicial={diaSelec} onClose={() => setFReg(false)}   onSave={d => { afegirReg({ ...d, parcelaId: p.id, parcelaNom: p.nom }); mostrarToast('Reg afegit'); }} />
        <Confirm visible={confirm !== null} title="Eliminar registre" desc="Aquesta acció és permanent." onOk={doEliminar} onCancel={() => setConfirm(null)} />
      </SafeAreaView>
    </Modal>
  );
};

// ─── Pantalla llista ───
export default function Parceles() {
  const { parceles, afegirParcela, editarParcela, eliminarParcela, mostrarToast } = useStore();
  const [form, setForm]         = useState(false);
  const [editant, setEditant]   = useState<ParcelaModel | null>(null);
  const [delId, setDelId]       = useState<number | null>(null);
  const [detall, setDetall]     = useState<ParcelaModel | null>(null);
  const [cerca, setCerca]       = useState('');

  const filtrades = parceles.filter(p => p.nom.toLowerCase().includes(cerca.toLowerCase()) || p.cultiu.toLowerCase().includes(cerca.toLowerCase()));

  return (
    <SafeAreaView style={g.safe}>
      <View style={[g.header, g.headerRow]}>
        <Text style={g.headerTitle}>Parcel·les</Text>
        <TouchableOpacity style={g.cta} onPress={() => { setEditant(null); setForm(true); }}>
          <Text style={g.ctaText}>+ Nova</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
        <View style={g.search}>
          <Text style={g.searchIcon}>🔍</Text>
          <TextInput style={g.searchInput} placeholder="Cerca parcel·la o cultiu..." placeholderTextColor={colors.textLight} value={cerca} onChangeText={setCerca} />
        </View>

        {filtrades.length === 0
          ? <Empty title="Cap parcel·la" sub="Afegeix la primera finca per començar." />
          : filtrades.map(p => (
              <View key={p.id} style={sp.card}>
                <View style={[sp.cardStripe, { backgroundColor: p.color }]} />
                <View style={sp.cardBody}>
                  <View style={sp.cardTop}>
                    <View style={{ flex: 1 }}>
                      <Text style={sp.cardName}>{p.nom}</Text>
                      <Text style={sp.cardCrop}>{p.cultiu}</Text>
                    </View>
                    <BadgeEstat sincronitzat={p.sincronitzat} />
                  </View>
                  <View style={sp.cardChips}>
                    {[`${p.ha} ha`, `Pol. ${p.poligon || '—'}`, `Parc. ${p.parcela || '—'}`].map((c, i) => (
                      <View key={i} style={sp.chip}><Text style={sp.chipText}>{c}</Text></View>
                    ))}
                  </View>
                  {p.nota ? <Text style={sp.cardNote} numberOfLines={2}>{p.nota}</Text> : null}
                  <View style={sp.cardFoot}>
                    <TouchableOpacity style={sp.viewBtn} onPress={() => setDetall(p)}>
                      <Text style={sp.viewBtnTxt}>Veure detall ›</Text>
                    </TouchableOpacity>
                    <View style={sp.cardActions}>
                      <IconBtn icon="✏️" onPress={() => { setEditant(p); setForm(true); }} />
                      <IconBtn icon="🗑️" onPress={() => setDelId(p.id)} danger />
                    </View>
                  </View>
                </View>
              </View>
            ))
        }
      </ScrollView>

      <FormParcela visible={form} inicial={editant} onClose={() => setForm(false)} onSave={d => { editant ? (editarParcela(editant.id, d), mostrarToast('Parcel·la actualitzada')) : (afegirParcela(d), mostrarToast('Parcel·la afegida')); }} />
      <Confirm visible={delId !== null} title="Eliminar parcel·la" desc="Aquesta acció és permanent." onOk={() => { eliminarParcela(delId!); setDelId(null); mostrarToast('Parcel·la eliminada'); }} onCancel={() => setDelId(null)} />
      {detall && <DetallParcela p={detall} onClose={() => setDetall(null)} />}
    </SafeAreaView>
  );
}

const loc = StyleSheet.create({
  listaCard: { backgroundColor: colors.surface, borderRadius: 14, borderWidth: 1, borderColor: colors.border, overflow: 'hidden', marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
});
