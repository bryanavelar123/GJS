import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function MedidasScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Text style={styles.backBtn}>＜</Text></TouchableOpacity>
        <Text style={styles.title}>Medidas</Text>
        <View style={{ width: 20 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab, styles.tabActive]}><Text style={styles.tabTextActive}>Ambiente</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tab}><Text style={styles.tabText}>Módulo</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tab}><Text style={styles.tabText}>Peças</Text></TouchableOpacity>
      </View>

      {/* Preview Técnico Simulado */}
      <View style={styles.canvasPlaceholder}>
        <Text style={{ color: '#555', fontSize: 40 }}>📐</Text>
        <Text style={styles.canvasText}>Esquema de Cotas do Ambiente</Text>
      </View>

      <TouchableOpacity style={styles.btnAdd}>
        <Text style={styles.btnAddText}>＋ Adicionar Medida</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Medidas cadastradas</Text>

      <ScrollView style={styles.list}>
        {[
          { item: 'Balcão', dim: '2600 x 600 x 900' },
          { item: 'Aéreo', dim: '2600 x 350 x 700' }
        ].map((med, idx) => (
          <View key={idx} style={styles.medItem}>
            <View>
              <Text style={styles.medName}>{med.item}</Text>
              <Text style={styles.medDim}>{med.dim}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.actionBtn}><Text style={{color: '#FFF'}}>✏️</Text></TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}><Text style={{color: '#FF2222'}}>🗑️</Text></TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000', padding: 20, paddingTop: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  backBtn: { color: '#FFF', fontSize: 24 },
  title: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  tabs: { flexDirection: 'row', backgroundColor: '#111', borderRadius: 8, padding: 4, marginBottom: 20 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 6 },
  tabActive: { backgroundColor: '#FF2222' },
  tabTextActive: { color: '#FFF', fontWeight: 'bold' },
  tabText: { color: '#888' },
  canvasPlaceholder: { height: 180, backgroundColor: '#111', borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#222', marginBottom: 20 },
  canvasText: { color: '#666', marginTop: 8, fontSize: 12 },
  btnAdd: { borderWidth: 1, borderColor: '#FF2222', padding: 14, borderRadius: 8, alignItems: 'center', marginBottom: 24 },
  btnAddText: { color: '#FF2222', fontWeight: 'bold' },
  sectionTitle: { color: '#FFF', fontSize: 14, fontWeight: 'bold', marginBottom: 12 },
  list: { flex: 1 },
  medItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#111', padding: 16, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#222' },
  medName: { color: '#FFF', fontWeight: 'bold' },
  medDim: { color: '#888', fontSize: 13, marginTop: 4 },
  actions: { flexDirection: 'row' },
  actionBtn: { marginLeft: 16, padding: 4 }
});
