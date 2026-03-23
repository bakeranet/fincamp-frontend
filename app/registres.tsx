import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useStore } from '../store';
import { colors, COLOR_TIPUS, BG_TIPUS, ICONA_TIPUS, LABEL_TIPUS } from '../constants';
import { g, registres as sr } from '../styles';
import { BadgeEstat, IconBtn, Empty } from '../components/UI';
import { Confirm } from '../components/Retroalimentacio';
import { SelectorTipus, FormTractament, FormFertilitzacio, FormReg } from '../components/Forms';
import { TipusEsdeveniment, TractamentModel } from '../types';
import { formatData, nomProducte } from '../hooks/utils';

const TipusChip = ({ tipus, actiu, onPress }: { tipus: TipusEsdeveniment | 'tots'; actiu: boolean; onPress: () => void }) => {
  const color = tipus === 'tots' ? colors.accent : COLOR_TIPUS[tipus as TipusEsdeveniment];
  return (
    <TouchableOpacity
      style={[sr.tipusChip, actiu && { backgroundColor: color, borderColor: color }]}
      onPress={onPress} activeOpacity={0.8}
    >
      {tipus !== 'tots' && <View style={[sr.tipusDot, { backgroundColor: actiu ? 'rgba(255,255,255,0.8)' : COLOR_TIPUS[tipus as TipusEsdeveniment] }]} />}
      <Text style={[sr.tipusTxt, actiu && sr.tipusTxtActiu]}>
        {tipus === 'tots' ? 'Tots' : LABEL_TIPUS[tipus as TipusEsdeveniment]}
      </Text>
    </TouchableOpacity>
  );
};

export default function Registres() {
  const { tractaments, fertilitzacions, regs, afegirTractament, editarTractament, eliminarTractament, afegirFertilitzacio, eliminarFertilitzacio, afegirReg, eliminarReg, mostrarToast } = useStore();

  const [filtre, setFiltre]     = useState<TipusEsdeveniment | 'tots'>('tots');
  const [cerca, setCerca]       = useState('');
  const [selTipus, setSelTipus] = useState(false);
  const [fTract, setFTract]     = useState(false);
  const [fFert, setFFert]       = useState(false);
  const [fReg, setFReg]         = useState(false);
  const [editTract, setEditTract] = useState<TractamentModel | null>(null);
  const [confirm, setConfirm]   = useState<{ tipus: string; id: number } | null>(null);

  const tots = useMemo(() => [
    ...tractaments.map(t => ({ tipus: 'tractament' as TipusEsdeveniment, id: t.id, titol: nomProducte(t.producte), sub: `${t.parcelaNom} · ${t.plaga} · ${t.dosi} ${t.unitat}`, data: t.data, sync: t.sincronitzat as boolean | undefined })),
    ...fertilitzacions.map(f => ({ tipus: 'fertilitzacio' as TipusEsdeveniment, id: f.id, titol: nomProducte(f.producte), sub: `${f.parcelaNom} · NPK ${f.npk || '—'} · ${f.dosi} kg/ha`, data: f.data, sync: f.sincronitzat as boolean | undefined })),
    ...regs.map(r => ({ tipus: 'reg' as TipusEsdeveniment, id: r.id, titol: r.parcelaNom, sub: `${r.tipus} · ${r.hores}h · ${r.volum} m³`, data: r.data, sync: undefined as boolean | undefined })),
  ].sort((a, b) => b.data.localeCompare(a.data)), [tractaments, fertilitzacions, regs]);

  const filtrats = tots.filter(r => {
    const mT = filtre === 'tots' || r.tipus === filtre;
    const mC = !cerca || r.titol.toLowerCase().includes(cerca.toLowerCase()) || r.sub.toLowerCase().includes(cerca.toLowerCase());
    return mT && mC;
  });

  const doEliminar = () => {
    if (!confirm) return;
    if (confirm.tipus === 'tractament')    { eliminarTractament(confirm.id);    mostrarToast('Tractament eliminat'); }
    if (confirm.tipus === 'fertilitzacio') { eliminarFertilitzacio(confirm.id); mostrarToast('Fertilització eliminada'); }
    if (confirm.tipus === 'reg')           { eliminarReg(confirm.id);           mostrarToast('Reg eliminat'); }
    setConfirm(null);
  };

  return (
    <SafeAreaView style={g.safe}>
      <View style={g.header}>
        <Text style={g.headerTitle}>Registres</Text>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        <View style={g.search}>
          <Text style={g.searchIcon}>🔍</Text>
          <TextInput style={g.searchInput} placeholder="Cerca producte, parcel·la, plaga..." placeholderTextColor={colors.textLight} value={cerca} onChangeText={setCerca} />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
          {(['tots', 'tractament', 'fertilitzacio', 'reg'] as (TipusEsdeveniment | 'tots')[]).map(t => (
            <TipusChip key={t} tipus={t} actiu={filtre === t} onPress={() => setFiltre(t)} />
          ))}
        </ScrollView>

        {filtrats.length === 0
          ? <Empty title="Cap registre" sub="Afegeix el primer registre amb el botó verd." />
          : <View style={loc.listaCard}>
              {filtrats.map(r => (
                <View key={`${r.tipus}-${r.id}`} style={sr.item}>
                  <View style={[sr.icon, { backgroundColor: BG_TIPUS[r.tipus] }]}>
                    <Text style={sr.iconTxt}>{ICONA_TIPUS[r.tipus]}</Text>
                  </View>
                  <View style={sr.content}>
                    <Text style={sr.title} numberOfLines={1}>{r.titol}</Text>
                    <Text style={sr.sub} numberOfLines={1}>{r.sub}</Text>
                  </View>
                  <View style={sr.right}>
                    <Text style={sr.date}>{formatData(r.data)}</Text>
                    {r.sync !== undefined && <BadgeEstat sincronitzat={r.sync} />}
                    <View style={sr.actions}>
                      {r.tipus === 'tractament' && (
                        <IconBtn icon="✏️" onPress={() => { const t = tractaments.find(x => x.id === r.id); if (t) { setEditTract(t); setFTract(true); } }} />
                      )}
                      <IconBtn icon="🗑️" onPress={() => setConfirm({ tipus: r.tipus, id: r.id })} danger />
                    </View>
                  </View>
                </View>
              ))}
            </View>
        }
      </ScrollView>

      {/* FAB rodó — estil Strava */}
      <TouchableOpacity style={g.fab} onPress={() => { setEditTract(null); setSelTipus(true); }}>
        <Text style={g.fabPlus}>+</Text>
      </TouchableOpacity>

      <SelectorTipus visible={selTipus} onClose={() => setSelTipus(false)} onSelect={t => { setSelTipus(false); if (t === 'tractament') setFTract(true); else if (t === 'fertilitzacio') setFFert(true); else setFReg(true); }} />
      <FormTractament    visible={fTract} inicial={editTract} onClose={() => { setFTract(false); setEditTract(null); }} onSave={d => { editTract ? (editarTractament(editTract.id, d), mostrarToast('Tractament actualitzat')) : (afegirTractament(d), mostrarToast('Tractament afegit')); }} />
      <FormFertilitzacio visible={fFert}  onClose={() => setFFert(false)} onSave={d => { afegirFertilitzacio(d); mostrarToast('Fertilització afegida'); }} />
      <FormReg           visible={fReg}   onClose={() => setFReg(false)}  onSave={d => { afegirReg(d);           mostrarToast('Reg afegit'); }} />
      <Confirm visible={confirm !== null} title="Eliminar registre" desc="Aquesta acció és permanent." onOk={doEliminar} onCancel={() => setConfirm(null)} />
    </SafeAreaView>
  );
}

const loc = StyleSheet.create({
  listaCard: { backgroundColor: colors.surface, borderRadius: 16, borderWidth: 1, borderColor: colors.border, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3 },
});
