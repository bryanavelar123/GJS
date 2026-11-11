import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Page, GjsHeader, openWhatsApp } from '../components/gjs-premium';
import { PALETTE as P, portfolio } from '../components/gjs-content';

export default function PortfolioScreen() {
  return (
    <Page current="portfolio">
      <GjsHeader />
      <View style={s.body}>
        <Text style={s.eyebrow}>GALERIA GJS</Text>
        <Text style={s.title}>Portfólio de Trabalhos</Text>
        <Text style={s.intro}>Exemplos de ambientes e tipos de móveis que podemos atender.</Text>
        <Text style={s.notice}>Imagens ilustrativas, não são fotografias de obras realizadas pela GJS. Fotos reais poderão ser adicionadas aqui.</Text>
        {portfolio.map((item) => (
          <View key={item.id} style={s.card}>
            <Image source={{ uri: item.image }} style={s.photo} resizeMode="cover" />
            <View style={s.cardContent}>
              <Text style={s.cardTitle}>{item.title}</Text>
              <Text style={s.cardSubtitle}>{item.detail}</Text>
            </View>
          </View>
        ))}
        <TouchableOpacity accessibilityRole="button" style={s.button} onPress={() => void openWhatsApp('Olá! Gostaria de solicitar um orçamento para montagem de móveis.')}>
          <Text style={s.buttonText}>Solicitar orçamento ↗</Text>
        </TouchableOpacity>
      </View>
    </Page>
  );
}
const s = StyleSheet.create({
  body: { paddingHorizontal: 16, paddingTop: 16 },
  eyebrow: { color: P.red, fontWeight: '900', fontSize: 11, letterSpacing: 1.7 },
  title: { color: '#FFFFFF', fontSize: 30, fontWeight: '900', marginTop: 7 },
  intro: { color: '#CECECE', lineHeight: 23, fontSize: 15, marginTop: 11 },
  notice: { color: '#AFAFAF', lineHeight: 19, fontSize: 12, marginTop: 10, marginBottom: 24 },
  card: { borderWidth: 1, borderColor: '#3C3C3C', borderRadius: 18, overflow: 'hidden', marginBottom: 17, backgroundColor: '#121212' },
  photo: { width: '100%', height: 220, backgroundColor: '#2E2E2E' },
  cardContent: { padding: 17 },
  cardTitle: { color: '#FFFFFF', fontWeight: '900', fontSize: 20 },
  cardSubtitle: { color: '#B8B8B8', marginTop: 7 },
  button: { backgroundColor: P.red, borderRadius: 14, padding: 16, marginTop: 10, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '900' },
});
