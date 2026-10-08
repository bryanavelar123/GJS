import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Olá,Bryan!</Text>
        <Text style={styles.subWelcome}>Bem-vindo ao GJS Móveis Planejados</Text>
      </View>

      {/* Grid de Ações Rápidas */}
     
      <View style={styles.grid}>
        <TouchableOpacity style={[styles.card, styles.cardRed]} onPress={() => router.push('/novo-projeto')}>
          <Text style={styles.cardIcon}>＋</Text>
          <Text style={styles.cardText}>Novo Projeto</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.card} onPress={() => router.push('/materiais')}>
          <Text style={styles.cardIcon}>📦</Text>
          <Text style={styles.cardText}>Materiais</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push('/medidas')}>
          <Text style={styles.cardIcon}>📐</Text>
          <Text style={styles.cardText}>Medidas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push('/orcamento')}>
          <Text style={styles.cardIcon}>💵</Text>
          <Text style={styles.cardText}>Orçamentos</Text>
        </TouchableOpacity>
      </View>

      {/* Seção de Recentes */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Projetos recentes</Text>
        <TouchableOpacity><Text style={styles.seeAll}>Ver todos ＞</Text></TouchableOpacity>
      </View>

      <View style={styles.projectList}>
        {[
          { id: '1', nome: 'Cozinha Moderna', cliente: 'Mariana', data: '12/09/2025' },
          { id: '2', nome: 'Quarto Casal', cliente: 'João', data: '08/09/2025' }
        ].map((proj) => (
          <View key={proj.id} style={styles.projectItem}>
            <View style={styles.projectImagePlaceholder}><Text style={{color: '#666'}}>📸</Text></View>
            <View style={styles.projectInfo}>
              <Text style={styles.projectName}>{proj.nome}</Text>
              <Text style={styles.projectClient}>Cliente: {proj.cliente}</Text>
              <Text style={styles.projectDate}>{proj.data}</Text>
            </View>
            <Text style={styles.arrow}>＞</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000', padding: 20, paddingTop: 50 },
  header: { marginBottom: 24 },
  welcome: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  subWelcome: { color: '#888', fontSize: 14, marginTop: 4 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 30 },
  card: { width: '48%', backgroundColor: '#111', padding: 20, borderRadius: 12, marginBottom: 16, alignItems: 'center', borderWidth: 1, borderColor: '#222' },
  cardRed: { backgroundColor: '#FF2222', borderColor: '#FF2222' },
  cardIcon: { fontSize: 24, color: '#FFF', marginBottom: 8 },
  cardText: { color: '#FFF', fontWeight: '600', fontSize: 14 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  seeAll: { color: '#FF2222', fontSize: 12 },
  projectList: { marginBottom: 40 },
  projectItem: { flexDirection: 'row', backgroundColor: '#111', padding: 12, borderRadius: 12, alignItems: 'center', marginBottom: 12, borderWidth: 1, borderColor: '#222' },
  projectImagePlaceholder: { width: 50, height: 50, borderRadius: 8, backgroundColor: '#222', justifyContent: 'center', alignItems: 'center' },
  projectInfo: { flex: 1, marginLeft: 12 },
  projectName: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },
  projectClient: { color: '#888', fontSize: 13, marginTop: 2 },
  projectDate: { color: '#555', fontSize: 11, marginTop: 2 },
  arrow: { color: '#555', fontSize: 18 }
});
