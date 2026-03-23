import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList, SafeAreaView, Platform } from 'react-native';
import { colors } from '../constants';
import { form } from '../styles';

export const FG = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <View style={form.group}>
    <Text style={form.label}>{label}</Text>
    {children}
  </View>
);

interface InputProps { valor: string; onChange: (v: string) => void; placeholder?: string; teclat?: 'default'|'numeric'|'decimal-pad'; multiline?: boolean; }
export const Input = ({ valor, onChange, placeholder, teclat = 'default', multiline }: InputProps) => {
  const [focus, setFocus] = useState(false);
  return (
    <TextInput
      style={[form.input, focus && form.inputFocus, multiline && form.inputMulti]}
      value={valor} onChangeText={onChange} placeholder={placeholder}
      placeholderTextColor={colors.textLight} keyboardType={teclat}
      multiline={multiline} numberOfLines={multiline ? 3 : 1}
      onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
    />
  );
};

interface SelProps { valor: string; opcions: string[]; onChange: (v: string) => void; placeholder?: string; }
export const Sel = ({ valor, opcions, onChange, placeholder }: SelProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TouchableOpacity style={[form.input, form.selBtn]} onPress={() => setOpen(true)} activeOpacity={0.8}>
        <Text style={valor ? form.selText : form.selPlaceholder} numberOfLines={1}>{valor || placeholder || 'Selecciona...'}</Text>
        <Text style={form.selArrow}>›</Text>
      </TouchableOpacity>
      <Modal visible={open} transparent animationType="slide" onRequestClose={() => setOpen(false)}>
        <TouchableOpacity style={form.sheetOverlay} activeOpacity={1} onPress={() => setOpen(false)}>
          <TouchableOpacity activeOpacity={1} style={form.sheet}>
            <View style={form.sheetHandle} />
            <FlatList
              data={opcions}
              keyExtractor={i => i}
              showsVerticalScrollIndicator={true}
              contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 34 : 16 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[form.sheetOption, item === valor && form.sheetOptionActive]}
                  onPress={() => { onChange(item); setOpen(false); }}
                  activeOpacity={0.7}
                >
                  <Text style={[form.sheetOptionText, item === valor && form.sheetOptionTextActive]} numberOfLines={2}>{item}</Text>
                  {item === valor && <Text style={{ color: colors.accent, fontSize: 18, marginLeft: 8 }}>✓</Text>}
                </TouchableOpacity>
              )}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export const Row2 = ({ children }: { children: React.ReactNode }) => <View style={form.row}>{children}</View>;

type NoteVariant = 'info' | 'warn';
export const Note = ({ text, variant = 'info' }: { text: string; variant?: NoteVariant }) => (
  <View style={variant === 'warn' ? form.noteWarn : form.noteInfo}>
    <Text style={[form.noteText, variant === 'warn' ? form.noteTextWarn : form.noteTextInfo]}>{text}</Text>
  </View>
);

export const FormFooter = ({ children }: { children: React.ReactNode }) => <View style={form.footer}>{children}</View>;
