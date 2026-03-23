import React from 'react';
import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { colors } from '../constants';
import { layout } from '../styles';
import { Toast } from '../components/Retroalimentacio';

const ICONES: Record<string, string> = {
  index:     '⌂',
  parceles:  '◫',
  registres: '≡',
  mes:       '◉',
};

const TabIcon = ({ name, focused }: { name: string; focused: boolean }) => (
  <Text style={{ fontSize: 22, color: focused ? colors.accent : colors.textLight, fontWeight: focused ? '700' : '400' }}>
    {ICONES[name] ?? '·'}
  </Text>
);

export default function Layout() {
  return (
    <>
      <Tabs screenOptions={{
        headerShown: false,
        tabBarStyle: layout.tabBar,
        tabBarLabelStyle: layout.tabLabel,
        tabBarActiveTintColor:   colors.accent,
        tabBarInactiveTintColor: colors.textLight,
      }}>
        <Tabs.Screen name="index"     options={{ title: 'Inici',      tabBarIcon: ({ focused }) => <TabIcon name="index"     focused={focused} /> }} />
        <Tabs.Screen name="parceles"  options={{ title: "Parcel·les", tabBarIcon: ({ focused }) => <TabIcon name="parceles"  focused={focused} /> }} />
        <Tabs.Screen name="registres" options={{ title: 'Registres',  tabBarIcon: ({ focused }) => <TabIcon name="registres" focused={focused} /> }} />
        <Tabs.Screen name="mes"       options={{ title: 'Resum',      tabBarIcon: ({ focused }) => <TabIcon name="mes"       focused={focused} /> }} />
      </Tabs>
      <Toast />
    </>
  );
}
