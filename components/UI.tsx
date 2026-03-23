import React from 'react';
import { View, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../constants';
import { g } from '../styles';

// ── Tipografia ──
interface TxtProps { children: React.ReactNode; style?: TextStyle; numberOfLines?: number; }
export const H1  = ({ children, style }: TxtProps) => <Text style={[{ fontSize: 26, fontWeight: '700', color: colors.text, letterSpacing: -0.7 }, style]}>{children}</Text>;
export const H2  = ({ children, style }: TxtProps) => <Text style={[{ fontSize: 20, fontWeight: '700', color: colors.text, letterSpacing: -0.4 }, style]}>{children}</Text>;
export const H3  = ({ children, style }: TxtProps) => <Text style={[{ fontSize: 17, fontWeight: '600', color: colors.text, letterSpacing: -0.2 }, style]}>{children}</Text>;
export const Body = ({ children, style, numberOfLines }: TxtProps) => <Text numberOfLines={numberOfLines} style={[{ fontSize: 15, color: colors.text, lineHeight: 22 }, style]}>{children}</Text>;
export const Muted = ({ children, style, numberOfLines }: TxtProps) => <Text numberOfLines={numberOfLines} style={[{ fontSize: 13, color: colors.textMuted, lineHeight: 19 }, style]}>{children}</Text>;
export const Label = ({ children, style }: TxtProps) => <Text style={[{ fontSize: 12, fontWeight: '600', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.8 }, style]}>{children}</Text>;

// ── Badge Estat ──
export const BadgeEstat = ({ sincronitzat }: { sincronitzat: boolean }) => (
  <View style={sincronitzat ? g.badgeOk : g.badgeWarn}>
    <Text style={sincronitzat ? g.badgeOkText : g.badgeWarnText}>
      {sincronitzat ? 'Sync' : 'Pendent'}
    </Text>
  </View>
);

// ── Botó principal ──
interface BtnProps { label: string; onPress: () => void; variant?: 'primary'|'ghost'|'danger'; disabled?: boolean; style?: ViewStyle; }
export const Btn = ({ label, onPress, variant = 'primary', disabled, style }: BtnProps) => (
  <TouchableOpacity
    style={[g.btn, variant === 'primary' ? g.btnPrimary : variant === 'danger' ? g.btnDanger : g.btnGhost, { opacity: disabled ? 0.4 : 1 }, style]}
    onPress={onPress} disabled={disabled} activeOpacity={0.85}
  >
    <Text style={[g.btnText, variant === 'primary' ? g.btnTextPrimary : variant === 'danger' ? g.btnTextDanger : g.btnTextGhost]}>{label}</Text>
  </TouchableOpacity>
);

// ── Botó icona petit ──
export const IconBtn = ({ icon, onPress, danger }: { icon: string; onPress: () => void; danger?: boolean }) => (
  <TouchableOpacity style={[g.iconBtn, danger && g.iconBtnDanger]} onPress={onPress} activeOpacity={0.7}>
    <Text style={{ fontSize: 14 }}>{icon}</Text>
  </TouchableOpacity>
);

// ── Card ──
export const Card = ({ children, style }: { children: React.ReactNode; style?: ViewStyle }) => (
  <View style={[g.card, style]}>{children}</View>
);

// ── Handle del sheet ──
export const SheetHandle = () => <View style={g.handle} />;

// ── Estat buit (estil Strava — centrat, missatge clar) ──
export const Empty = ({ title, sub }: { title: string; sub: string }) => (
  <View style={g.empty}>
    <Text style={g.emptyTitle}>{title}</Text>
    <Text style={g.emptySub}>{sub}</Text>
  </View>
);

// ── Etiqueta secció ──
export const SectionLabel = ({ children }: { children: string }) => (
  <Text style={g.sectionLabel}>{children}</Text>
);
