import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, Modal, TouchableOpacity, Platform } from 'react-native';
import { useStore } from '../store';
import { colors, PRODUCTES_FITOSANITARIS, PRODUCTES_FERTILITZANTS, TIPUS_REG, ORIGENS_REG, UNITATS_DOSI, COLORS_PARCELA, CULTIUS } from '../constants';
import { form } from '../styles';
import { SheetHandle, Btn } from './UI';
import { FG, Input, Sel, Row2, Note, FormFooter } from './Formulari';
import { TractamentModel, FertilitzacioModel, RegModel, ParcelaModel } from '../types';
import { nomProducte, tesMesDe30Dies } from '../hooks/utils';

// ── Selector de tipus — FIX: safe area bottom, no clipping ──
export const SelectorTipus = ({ visible, onSelect, onClose }: { visible: boolean; onSelect: (t: 'tractament'|'fertilitzacio'|'reg') => void; onClose: () => void }) => (
  <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
    <TouchableOpacity style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' }} activeOpacity={1} onPress={onClose}>
      <TouchableOpacity activeOpacity={1} style={{
        backgroundColor: colors.surface,
        borderTopLeftRadius: 24, borderTopRightRadius: 24,
        paddingTop: 16, paddingHorizontal: 20,
        paddingBottom: Platform.OS === 'ios' ? 44 : 28,
      }}>
        <View style={{ width: 36, height: 4, backgroundColor: colors.borderMid, borderRadius: 2, alignSelf: 'center', marginBottom: 20 }} />
        <Text style={{ fontSize: 20, fontWeight: '700', color: colors.text, letterSpacing: -0.5, marginBottom: 6 }}>Nou registre a Fincamp</Text>
        <Text style={{ fontSize: 14, color: colors.textMuted, marginBottom: 20 }}>Quin tipus de registre vols afegir?</Text>
        {[
          { tipus: 'tractament' as const,    icona: '🧪', label: 'Tractament fitosanitari', desc: 'Producte ASPAFITOS autoritzat', color: colors.bgTractament },
          { tipus: 'fertilitzacio' as const, icona: '🌱', label: 'Fertilització',           desc: 'Fertilitzant REGFER',          color: colors.bgFertilitzacio },
          { tipus: 'reg' as const,           icona: '💧', label: 'Reg',                     desc: 'Registre de reg aplicat',      color: colors.bgReg },
        ].map((item, i, arr) => (
          <TouchableOpacity
            key={item.tipus}
            style={{
              flexDirection: 'row', alignItems: 'center', gap: 14,
              paddingVertical: 14,
              borderBottomWidth: i < arr.length - 1 ? 1 : 0,
              borderBottomColor: colors.border,
            }}
            onPress={() => onSelect(item.tipus)}
            activeOpacity={0.7}
          >
            <View style={{ width: 50, height: 50, borderRadius: 16, backgroundColor: item.color, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 24 }}>{item.icona}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: '700', color: colors.text }}>{item.label}</Text>
              <Text style={{ fontSize: 13, color: colors.textMuted, marginTop: 2 }}>{item.desc}</Text>
            </View>
            <Text style={{ fontSize: 20, color: colors.textMuted }}>›</Text>
          </TouchableOpacity>
        ))}
      </TouchableOpacity>
    </TouchableOpacity>
  </Modal>
);

// ── Form Tractament ──
interface FTProps { visible: boolean; inicial?: TractamentModel | null; dataInicial?: string; onClose: () => void; onSave: (d: Omit<TractamentModel, 'id'|'sincronitzat'>) => void; }
export const FormTractament = ({ visible, inicial, dataInicial, onClose, onSave }: FTProps) => {
  const parceles = useStore(s => s.parceles);
  const [data, setData] = useState('');
  const [parcelaNom, setParcelaNom] = useState('');
  const [producte, setProducte] = useState('');
  const [plaga, setPlaga] = useState('');
  const [dosi, setDosi] = useState('');
  const [unitat, setUnitat] = useState('L/ha');
  const [aplicador, setAplicador] = useState('');
  const [justificacio, setJustificacio] = useState('');
  React.useEffect(() => { if (!visible) return; setData(inicial?.data ?? dataInicial ?? ''); setParcelaNom(inicial?.parcelaNom ?? ''); setProducte(inicial?.producte ?? ''); setPlaga(inicial?.plaga ?? ''); setDosi(inicial?.dosi ?? ''); setUnitat(inicial?.unitat ?? 'L/ha'); setAplicador(inicial?.aplicador ?? ''); setJustificacio(inicial?.justificacio ?? ''); }, [visible]);
  const tooOld = data !== '' && tesMesDe30Dies(data);
  const valid = data && parcelaNom && producte && plaga && dosi && !tooOld;
  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
        <ScrollView contentContainerStyle={form.scroll} keyboardShouldPersistTaps="handled">
          <SheetHandle />
          <Text style={form.title}>{inicial ? 'Editar tractament' : 'Nou tractament'}</Text>
          <Row2><View style={{ flex: 1 }}><FG label="Data *"><Input valor={data} onChange={setData} placeholder="2026-03-15" /></FG></View><View style={{ flex: 1 }}><FG label="Parcel·la *"><Sel valor={parcelaNom} opcions={parceles.map(p => p.nom)} onChange={setParcelaNom} /></FG></View></Row2>
          {tooOld && <Note text="Han passat més de 30 dies. Per llei no es pot registrar." variant="warn" />}
          <FG label="Producte (ASPAFITOS) *"><Sel valor={producte} opcions={PRODUCTES_FITOSANITARIS} onChange={setProducte} placeholder="Selecciona producte autoritzat..." /></FG>
          <FG label="Plaga / malaltia *"><Input valor={plaga} onChange={setPlaga} placeholder="ex. Pulgó negre, Mosca de la fruita..." /></FG>
          <Row2><View style={{ flex: 1 }}><FG label="Dosi *"><Input valor={dosi} onChange={setDosi} placeholder="0.5" teclat="decimal-pad" /></FG></View><View style={{ flex: 1 }}><FG label="Unitat"><Sel valor={unitat} opcions={UNITATS_DOSI} onChange={setUnitat} /></FG></View></Row2>
          <FG label="Aplicador (ROPO)"><Input valor={aplicador} onChange={setAplicador} placeholder="Nom i núm. ROPO" /></FG>
          <FG label="Justificació"><Input valor={justificacio} onChange={setJustificacio} placeholder="Nivell d'infestació, observacions..." multiline /></FG>
          <Note text="S'enviarà al CUE del DARP Catalunya en la propera sincronització." />
          <FormFooter>
            <Btn label="Cancel·lar" onPress={onClose} variant="ghost" />
            <Btn label={inicial ? 'Guardar' : 'Afegir tractament'} onPress={() => { if (!valid) return; const pId = parceles.find(p => p.nom === parcelaNom)?.id ?? 0; onSave({ data, parcelaId: pId, parcelaNom, producte: nomProducte(producte), plaga, dosi, unitat, aplicador, justificacio }); onClose(); }} disabled={!valid} />
          </FormFooter>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

// ── Form Fertilització ──
interface FFProps { visible: boolean; dataInicial?: string; onClose: () => void; onSave: (d: Omit<FertilitzacioModel, 'id'|'sincronitzat'>) => void; }
export const FormFertilitzacio = ({ visible, dataInicial, onClose, onSave }: FFProps) => {
  const parceles = useStore(s => s.parceles);
  const [data, setData] = useState('');
  const [parcelaNom, setParcelaNom] = useState('');
  const [producte, setProducte] = useState('');
  const [npk, setNpk] = useState('');
  const [dosi, setDosi] = useState('');
  React.useEffect(() => { if (!visible) return; setData(dataInicial ?? ''); setParcelaNom(''); setProducte(''); setNpk(''); setDosi(''); }, [visible]);
  const valid = data && parcelaNom && producte && dosi;
  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
        <ScrollView contentContainerStyle={form.scroll} keyboardShouldPersistTaps="handled">
          <SheetHandle />
          <Text style={form.title}>Nova fertilització</Text>
          <Row2><View style={{ flex: 1 }}><FG label="Data *"><Input valor={data} onChange={setData} placeholder="2026-03-15" /></FG></View><View style={{ flex: 1 }}><FG label="Parcel·la *"><Sel valor={parcelaNom} opcions={parceles.map(p => p.nom)} onChange={setParcelaNom} /></FG></View></Row2>
          <FG label="Fertilitzant (REGFER) *"><Sel valor={producte} opcions={PRODUCTES_FERTILITZANTS} onChange={setProducte} placeholder="Selecciona fertilitzant..." /></FG>
          <Row2><View style={{ flex: 1 }}><FG label="NPK"><Input valor={npk} onChange={setNpk} placeholder="33-0-0" /></FG></View><View style={{ flex: 1 }}><FG label="Dosi kg/ha *"><Input valor={dosi} onChange={setDosi} placeholder="150" teclat="decimal-pad" /></FG></View></Row2>
          <FormFooter>
            <Btn label="Cancel·lar" onPress={onClose} variant="ghost" />
            <Btn label="Afegir" onPress={() => { if (!valid) return; const pId = parceles.find(p => p.nom === parcelaNom)?.id ?? 0; onSave({ data, parcelaId: pId, parcelaNom, producte: nomProducte(producte), npk, dosi }); onClose(); }} disabled={!valid} />
          </FormFooter>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

// ── Form Reg ──
interface FRProps { visible: boolean; dataInicial?: string; onClose: () => void; onSave: (d: Omit<RegModel, 'id'>) => void; }
export const FormReg = ({ visible, dataInicial, onClose, onSave }: FRProps) => {
  const parceles = useStore(s => s.parceles);
  const [data, setData] = useState('');
  const [parcelaNom, setParcelaNom] = useState('');
  const [tipus, setTipus] = useState('Degoteig');
  const [hores, setHores] = useState('');
  const [volum, setVolum] = useState('');
  const [origen, setOrigen] = useState('Canal');
  React.useEffect(() => { if (!visible) return; setData(dataInicial ?? ''); setParcelaNom(''); setTipus('Degoteig'); setHores(''); setVolum(''); setOrigen('Canal'); }, [visible]);
  const valid = data && parcelaNom && hores && volum;
  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
        <ScrollView contentContainerStyle={form.scroll} keyboardShouldPersistTaps="handled">
          <SheetHandle />
          <Text style={form.title}>Nou reg</Text>
          <Row2><View style={{ flex: 1 }}><FG label="Data *"><Input valor={data} onChange={setData} placeholder="2026-03-15" /></FG></View><View style={{ flex: 1 }}><FG label="Parcel·la *"><Sel valor={parcelaNom} opcions={parceles.map(p => p.nom)} onChange={setParcelaNom} /></FG></View></Row2>
          <Row2><View style={{ flex: 1 }}><FG label="Tipus"><Sel valor={tipus} opcions={TIPUS_REG} onChange={setTipus} /></FG></View><View style={{ flex: 1 }}><FG label="Origen"><Sel valor={origen} opcions={ORIGENS_REG} onChange={setOrigen} /></FG></View></Row2>
          <Row2><View style={{ flex: 1 }}><FG label="Hores *"><Input valor={hores} onChange={setHores} placeholder="3" teclat="decimal-pad" /></FG></View><View style={{ flex: 1 }}><FG label="Volum m³ *"><Input valor={volum} onChange={setVolum} placeholder="45" teclat="decimal-pad" /></FG></View></Row2>
          <FormFooter>
            <Btn label="Cancel·lar" onPress={onClose} variant="ghost" />
            <Btn label="Afegir reg" onPress={() => { if (!valid) return; const pId = parceles.find(p => p.nom === parcelaNom)?.id ?? 0; onSave({ data, parcelaId: pId, parcelaNom, tipus, hores, volum, origen }); onClose(); }} disabled={!valid} />
          </FormFooter>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

// ── Form Parcel·la ──
interface FPProps { visible: boolean; inicial?: ParcelaModel | null; onClose: () => void; onSave: (d: Omit<ParcelaModel, 'id'>) => void; }
export const FormParcela = ({ visible, inicial, onClose, onSave }: FPProps) => {
  const [nom, setNom] = useState('');
  const [cultiu, setCultiu] = useState('Tarongers');
  const [ha, setHa] = useState('');
  const [poligon, setPoligon] = useState('');
  const [parcela, setParcela] = useState('');
  const [color, setColor] = useState(COLORS_PARCELA[0]);
  const [nota, setNota] = useState('');
  React.useEffect(() => { if (!visible) return; setNom(inicial?.nom ?? ''); setCultiu(inicial?.cultiu ?? 'Tarongers'); setHa(inicial?.ha ?? ''); setPoligon(inicial?.poligon ?? ''); setParcela(inicial?.parcela ?? ''); setColor(inicial?.color ?? COLORS_PARCELA[0]); setNota(inicial?.nota ?? ''); }, [visible]);
  const valid = nom.trim() && ha.trim();
  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
        <ScrollView contentContainerStyle={form.scroll} keyboardShouldPersistTaps="handled">
          <SheetHandle />
          <Text style={form.title}>{inicial ? 'Editar parcel·la' : 'Nova parcel·la'}</Text>
          <FG label="Nom de la finca *"><Input valor={nom} onChange={setNom} placeholder="ex. Mas Roig" /></FG>
          <Row2><View style={{ flex: 1 }}><FG label="Cultiu *"><Sel valor={cultiu} opcions={CULTIUS} onChange={setCultiu} /></FG></View><View style={{ flex: 1 }}><FG label="Hectàrees *"><Input valor={ha} onChange={setHa} placeholder="2.5" teclat="decimal-pad" /></FG></View></Row2>
          <Row2><View style={{ flex: 1 }}><FG label="Polígon SIGPAC"><Input valor={poligon} onChange={setPoligon} placeholder="12" teclat="numeric" /></FG></View><View style={{ flex: 1 }}><FG label="Parcel·la SIGPAC"><Input valor={parcela} onChange={setParcela} placeholder="45" teclat="numeric" /></FG></View></Row2>
          <FG label="Color identificador">
            <View style={form.colorRow}>
              {COLORS_PARCELA.map(c => <TouchableOpacity key={c} style={[form.colorDot, { backgroundColor: c }, c === color && form.colorDotActive]} onPress={() => setColor(c)} />)}
            </View>
          </FG>
          <FG label="Notes"><Input valor={nota} onChange={setNota} placeholder="Observacions, varietat, equipament..." multiline /></FG>
          <FormFooter>
            <Btn label="Cancel·lar" onPress={onClose} variant="ghost" />
            <Btn label={inicial ? 'Guardar' : 'Afegir parcel·la'} onPress={() => { if (!valid) return; onSave({ nom, cultiu, ha, poligon, parcela, color, nota, sincronitzat: inicial?.sincronitzat ?? true }); onClose(); }} disabled={!valid} />
          </FormFooter>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};
