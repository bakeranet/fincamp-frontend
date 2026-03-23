import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { useStore } from '../store';
import { colors } from '../constants';
import { g, resum as sr } from '../styles';
import { FincaLogotip } from '../components/FincaLogo';

export default function Mes() {
  const { parceles, tractaments, fertilitzacions, regs } = useStore();

  const totalHa    = parceles.reduce((a, p) => a + parseFloat(p.ha || '0'), 0).toFixed(1);
  const pendents   = tractaments.filter(t => !t.sincronitzat).length + fertilitzacions.filter(f => !f.sincronitzat).length;
  const totalVolum = regs.reduce((a, r) => a + parseFloat(r.volum || '0'), 0);
  const totalHores = regs.reduce((a, r) => a + parseFloat(r.hores || '0'), 0);
  const syncades   = parceles.filter(p => p.sincronitzat).length;

  return (
    <SafeAreaView style={g.safe}>\n      <View style={[g.header, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>\n        <FincaLogotip mida={34} mostrarSubtitol={true} />\n      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>

        {/* Stats — números grans estil Strava */}
        <View style={sr.statGrid}>
          <View style={sr.statCard}>
            <Text style={sr.statLabel}>Hectàrees</Text>
            <Text style={sr.statValue}>{totalHa}</Text>
            <Text style={sr.statSub}>{parceles.length} parcel·les</Text>
          </View>
          <View style={[sr.statCard, pendents > 0 && { borderColor: colors.warnMid }]}>
            <Text style={sr.statLabel}>Pendents sync</Text>
            <Text style={[sr.statValue, pendents > 0 && { color: colors.warn }]}>{pendents}</Text>
            <Text style={sr.statSub}>registres</Text>
          </View>
        </View>

        <View style={sr.statGrid}>
          <View style={sr.statCard}>
            <Text style={sr.statLabel}>Tractaments</Text>
            <Text style={sr.statValue}>{tractaments.length}</Text>
            <Text style={sr.statSub}>campanya 25–26</Text>
          </View>
          <View style={sr.statCard}>
            <Text style={sr.statLabel}>Reg acumulat</Text>
            <Text style={sr.statValue}>{totalVolum}<Text style={{ fontSize: 16, fontWeight: '500', color: colors.textMuted }}> m³</Text></Text>
            <Text style={sr.statSub}>{totalHores}h totals</Text>
          </View>
        </View>

        <View style={sr.statGrid}>
          <View style={sr.statCard}>
            <Text style={sr.statLabel}>Fertilitzacions</Text>
            <Text style={sr.statValue}>{fertilitzacions.length}</Text>
            <Text style={sr.statSub}>campanya 25–26</Text>
          </View>
          <View style={sr.statCard}>
            <Text style={sr.statLabel}>Parcel·les al dia</Text>
            <Text style={sr.statValue}>{syncades}/{parceles.length}</Text>
            <Text style={sr.statSub}>sincronitzades</Text>
          </View>
        </View>

        {/* SIEX */}
        <View style={sr.siex}>
          <Text style={sr.siexLabel}>Connexió activa</Text>
          <Text style={sr.siexTitle}>SIEX · DARP Catalunya</Text>
          <View style={sr.siexStat}><View style={sr.siexDot} /><Text style={sr.siexTxt}>Connectat · Certificat vàlid fins 31/12/2026</Text></View>
          <View style={sr.siexBar}><View style={sr.siexFill} /></View>
          <View style={sr.siexFoot}><Text style={sr.siexFtTxt}>Campanya 2025–26</Text><Text style={sr.siexFtTxt}>65% completat</Text></View>
        </View>

        {/* Explotació */}
        <View style={sr.section}>
          <Text style={sr.secTitle}>Explotació</Text>
          {[
            { label: 'App',       valor: 'Fincamp — Quadern Digital' },
            { label: 'Titular',   valor: 'Joan Vidal' },
            { label: 'NIF',       valor: '12345678A'  },
            { label: 'ROPO',      valor: 'ROPO-1892'  },
            { label: 'Campanya',  valor: '2025–26'    },
            { label: 'Comunitat', valor: 'Catalunya'  },
          ].map((f, i) => (
            <View key={i} style={sr.row}>
              <Text style={sr.rowLabel}>{f.label}</Text>
              <Text style={sr.rowValue}>{f.valor}</Text>
            </View>
          ))}
        </View>

        {/* Normativa */}
        <View style={sr.section}>
          <Text style={sr.secTitle}>Dates clau normativa</Text>
          {[
            { label: 'Reg. fitosanitaris digital', valor: '1 gen. 2027' },
            { label: 'CUE complet obligatori',     valor: '1 gen. 2028' },
            { label: 'Límit registre tractaments', valor: '30 dies'     },
          ].map((f, i) => (
            <View key={i} style={sr.row}>
              <Text style={sr.rowLabel}>{f.label}</Text>
              <Text style={sr.rowValue}>{f.valor}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
