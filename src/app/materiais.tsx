import React from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function MateriaisScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Text style={styles.backBtn}>＜</Text></TouchableOpacity>
        <Text style={styles.title}>Materiais</Text>
        <View style={{ width: 20 }} />
        
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab, styles.tabActive]}><Text style={styles.tabTextActive}>MDF</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tab}><Text style={styles.tabText}>Ferragens</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tab}><Text style={styles.tabText}>Acessórios</Text></TouchableOpacity>
      </View>

      <TextInput style={styles.search} placeholder="🔍 Buscar material..." placeholderTextColor="#555" />

      <ScrollView style={styles.list}>
        {[
          { nome: 'Branco TX', marca: 'Duratex', cor: '#FFF' },
          { nome: 'Cinza Cristal', marca: 'Arauco', cor: '#A2A2A2' },
          { nome: 'Carvalho Americano', marca: 'Duratex', cor: '#C2A685' }
        ].map((mat, idx) => (
          <View key={idx} style={styles.item}>
            <View style={[styles.colorPreview, { backgroundColor: mat.cor }]} />
            <View style={styles.info}>
              <Text style={styles.nome}>{mat.nome}</Text>
              <Text style={styles.marca}>{mat.marca}</Text>
            </View>
            <Text style={styles.arrow}>＞</Text>
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
  tabs: { flexDirection: 'row', marginBottom: 16 },
  tab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 8, backgroundColor: '#111' },
  tabActive: { backgroundColor: '#FF2222' },
  tabTextActive: { color: '#FFF', fontWeight: 'bold' },
  tabText: { color: '#888' },
  search: { backgroundColor: '#111', color: '#FFF', padding: 12, borderRadius: 8, marginBottom: 20, borderWidth: 1, borderColor: '#222' },
  list: { flex: 1 },
  item: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#111', padding: 12, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#222' },
  colorPreview: { width: 40, height: 40, borderRadius: 6 },
  info: { flex: 1, marginLeft: 12 },
  nome: { color: '#FFF', fontWeight: 'bold' },
  marca: { color: '#666', fontSize: 12, marginTop: 2 },
  arrow: { color: '#444' }
});
