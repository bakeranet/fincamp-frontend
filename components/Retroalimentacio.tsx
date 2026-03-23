import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { useStore } from '../store';
import { g } from '../styles';
import { Btn } from './UI';

export const Toast = () => {
  const msg = useStore(s => s.missatgeToast);
  if (!msg) return null;
  return (
    <View style={g.toast} pointerEvents="none">
      <Text style={g.toastText}>{msg}</Text>
    </View>
  );
};

interface ConfirmProps { visible: boolean; title: string; desc: string; onOk: () => void; onCancel: () => void; }
export const Confirm = ({ visible, title, desc, onOk, onCancel }: ConfirmProps) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
    <TouchableOpacity style={g.dialogOverlay} activeOpacity={1} onPress={onCancel}>
      <View style={g.dialog}>
        <Text style={g.dialogTitle}>{title}</Text>
        <Text style={g.dialogDesc}>{desc}</Text>
        <View style={g.dialogBtns}>
          <Btn label="Cancel·lar" onPress={onCancel} variant="ghost" />
          <Btn label="Eliminar"   onPress={onOk}     variant="danger" />
        </View>
      </View>
    </TouchableOpacity>
  </Modal>
);
