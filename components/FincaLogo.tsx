import React from 'react';
import { View, Text, ViewStyle } from 'react-native';

// ─────────────────────────────────────────
//  FINCAMP — Icona de marca
//  Camp vist des de dalt — implementació
//  segura sense position:absolute
// ─────────────────────────────────────────

interface IconaProps {
  mida?: number;
  style?: ViewStyle;
}

export const FincaIcona = ({ mida = 48, style }: IconaProps) => {
  const s  = mida / 120;
  const rr = Math.round(mida * 0.22);
  const cam = '#2C4A1E';

  return (
    <View style={[{
      width: mida,
      height: mida,
      borderRadius: rr,
      backgroundColor: cam,
      overflow: 'hidden',
    }, style]}>
      {/* Usem rows i columns en lloc de position:absolute */}
      {/* Fila 1: top */}
      <View style={{ flexDirection: 'row', height: Math.round(22 * s) }}>
        {/* Col esquerra top */}
        <View style={{ width: Math.round(40 * s), height: Math.round(22 * s), backgroundColor: '#6B9E50', borderRadius: Math.round(2 * s) }} />
        {/* Separador vertical */}
        <View style={{ width: Math.round(4 * s), backgroundColor: cam }} />
        {/* Col dreta gran */}
        <View style={{ flex: 1, height: Math.round(22 * s), backgroundColor: '#5A8E42', borderRadius: Math.round(2 * s) }} />
      </View>

      {/* Separador horitzontal esq-1 */}
      <View style={{ flexDirection: 'row', height: Math.round(4 * s) }}>
        <View style={{ width: Math.round(44 * s), backgroundColor: cam }} />
        <View style={{ flex: 1, backgroundColor: '#5A8E42' }} />
      </View>

      {/* Fila 2: mid */}
      <View style={{ flexDirection: 'row', height: Math.round(16 * s) }}>
        <View style={{ width: Math.round(40 * s), backgroundColor: '#4A7A35', borderRadius: Math.round(2 * s) }} />
        <View style={{ width: Math.round(4 * s), backgroundColor: cam }} />
        <View style={{ flex: 1, backgroundColor: '#5A8E42', borderRadius: Math.round(2 * s) }} />
      </View>

      {/* Separador horitzontal dret */}
      <View style={{ flexDirection: 'row', height: Math.round(4 * s) }}>
        <View style={{ width: Math.round(44 * s), backgroundColor: '#4A7A35' }} />
        <View style={{ width: Math.round(4 * s), backgroundColor: cam }} />
        <View style={{ flex: 1, backgroundColor: cam }} />
      </View>

      {/* Fila 3: lower-mid */}
      <View style={{ flexDirection: 'row', height: Math.round(14 * s) }}>
        <View style={{ width: Math.round(40 * s), backgroundColor: '#4A7A35', borderRadius: Math.round(2 * s) }} />
        <View style={{ width: Math.round(4 * s), backgroundColor: cam }} />
        {/* Dreta: 2 cel·les */}
        <View style={{ width: Math.round(24 * s), backgroundColor: '#6B9E50', borderRadius: Math.round(2 * s) }} />
        <View style={{ width: Math.round(4 * s), backgroundColor: cam }} />
        <View style={{ flex: 1, backgroundColor: '#3D6B28', borderRadius: Math.round(2 * s) }} />
      </View>

      {/* Separador horitzontal esq-2 */}
      <View style={{ flexDirection: 'row', height: Math.round(4 * s) }}>
        <View style={{ width: Math.round(44 * s), backgroundColor: cam }} />
        <View style={{ flex: 1, backgroundColor: cam }} />
      </View>

      {/* Fila 4: bot */}
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <View style={{ width: Math.round(40 * s), backgroundColor: '#8BC465', borderRadius: Math.round(2 * s) }} />
        <View style={{ width: Math.round(4 * s), backgroundColor: cam }} />
        <View style={{ width: Math.round(24 * s), backgroundColor: '#6B9E50', borderRadius: Math.round(2 * s) }} />
        <View style={{ width: Math.round(4 * s), backgroundColor: cam }} />
        <View style={{ flex: 1, backgroundColor: '#4A7A35', borderRadius: Math.round(2 * s) }} />
      </View>
    </View>
  );
};

// ─────────────────────────────────────────
//  LOGOTIP HORITZONTAL
// ─────────────────────────────────────────

interface LogotipProps {
  mida?: number;
  invers?: boolean;
  mostrarSubtitol?: boolean;
  style?: ViewStyle;
}

export const FincaLogotip = ({
  mida = 40,
  invers = false,
  mostrarSubtitol = true,
  style,
}: LogotipProps) => {
  const colorNom      = invers ? '#F5F0E8' : '#2C4A1E';
  const colorSubtitol = invers ? '#8BC465' : '#8B7355';

  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', gap: 12 }, style]}>
      <FincaIcona mida={mida} />
      <View>
        <Text style={{
          fontSize: Math.round(mida * 0.68),
          fontWeight: '700',
          color: colorNom,
          letterSpacing: -0.8,
          lineHeight: Math.round(mida * 0.8),
        }}>
          Fincamp
        </Text>
        {mostrarSubtitol && (
          <Text style={{
            fontSize: 10,
            fontWeight: '600',
            color: colorSubtitol,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            marginTop: 2,
          }}>
            Quadern Digital
          </Text>
        )}
      </View>
    </View>
  );
};

// ─────────────────────────────────────────
//  SPLASH
// ─────────────────────────────────────────

export const FincaSplash = () => (
  <View style={{
    flex: 1,
    backgroundColor: '#2C4A1E',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  }}>
    <FincaIcona mida={96} />
    <View style={{ alignItems: 'center', gap: 6 }}>
      <Text style={{
        fontSize: 40,
        fontWeight: '800',
        color: '#F5F0E8',
        letterSpacing: -1.5,
      }}>
        Fincamp
      </Text>
      <Text style={{
        fontSize: 12,
        fontWeight: '600',
        color: '#8BC465',
        letterSpacing: 2.5,
        textTransform: 'uppercase',
      }}>
        Quadern Digital
      </Text>
    </View>
  </View>
);
