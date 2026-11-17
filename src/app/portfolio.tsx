import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Page, GjsHeader } from '../components/gjs-premium';
import { PALETTE as P, portfolio } from '../components/gjs-content';

export default function PortfolioScreen() {
  const router = useRouter();
  return (
    <Page current="portfolio">
      <GjsHeader />
      <View style={s.body}>
        <Text style={s.eyebrow}>GALERIA GJS</Text>
        <Text style={s.title}>Portfólio de Trabalhos</Text>
        <Text style={s.intro}>Selecione um projeto para abrir as fotos e deslizar entre as imagens, sem sair do aplicativo.</Text>
        {portfolio.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={s.card}
            accessibilityRole="button"
            accessibilityLabel={'Visualizar fotos do projeto ' + item.title}
            onPress={() => router.push({ pathname: '/projeto/[id]', params: { id: item.id } })}
          >
            <Image source={item.image} style={s.photo} resizeMode="cover" />
            <View style={s.cardContent}>
              <View style={s.cardLabels}>
                <Text style={s.cardTitle}>{item.title}</Text>
                <Text style={s.cardSubtitle}>{item.detail}</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </Page>
  );
}
const s = StyleSheet.create({
  body: { paddingHorizontal: 16, paddingTop: 16 },
  eyebrow: { color: P.red, fontWeight: '900', fontSize: 11, letterSpacing: 1.7 },
  title: { color: '#FFFFFF', fontSize: 30, fontWeight: '900', marginTop: 7 },
  intro: { color: '#CECECE', lineHeight: 23, fontSize: 15, marginTop: 11, marginBottom: 24 },
  card: { borderWidth: 1, borderColor: '#3C3C3C', borderRadius: 18, overflow: 'hidden', marginBottom: 17, backgroundColor: '#121212' },
  photo: { width: '100%', height: 210, backgroundColor: '#2E2E2E' },
  cardContent: { padding: 17, flexDirection: 'row', alignItems: 'center' },
  cardLabels: { flex: 1 },
  cardTitle: { color: '#FFFFFF', fontWeight: '900', fontSize: 20 },
  cardSubtitle: { color: '#B8B8B8', marginTop: 7 },
  disclaimer: { color: '#969696', fontSize: 11, marginTop: 4 },
});
