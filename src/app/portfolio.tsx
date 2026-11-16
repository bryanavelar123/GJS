import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Page, GjsHeader } from '../components/gjs-premium';
import { escolherFotosDoProjeto } from '../components/gjs-gallery';
import { PALETTE as P, portfolio } from '../components/gjs-content';

export default function PortfolioScreen() {
  const [selecionadas, setSelecionadas] = useState<string[]>([]);

  async function abrirFotos() {
    const fotos = await escolherFotosDoProjeto();
    if (fotos.length) setSelecionadas((anteriores) => [...anteriores, ...fotos]);
  }

  return (
    <Page current="portfolio">
      <GjsHeader />
      <View style={s.body}>
        <Text style={s.eyebrow}>GALERIA GJS</Text>
        <Text style={s.title}>Portfólio de Trabalhos</Text>
        <Text style={s.intro}>Exemplos de ambientes e tipos de móveis que podemos atender.</Text>
        <Text style={s.notice}>Toque em uma foto ou no botão abaixo para abrir a pasta de imagens do seu celular. As imagens de exemplo são ilustrativas.</Text>
        <TouchableOpacity style={s.button} accessibilityRole="button" onPress={() => void abrirFotos()}>
          <Text style={s.buttonText}>Abrir minhas fotos de projetos  ›</Text>
        </TouchableOpacity>
        {selecionadas.length > 0 && (
          <View style={s.gallery}>
            <Text style={s.galleryHeading}>Fotos escolhidas nesta sessão</Text>
            <View style={s.galleryGrid}>
              {selecionadas.map((uri, index) => (
                <Image key={uri + index} source={{ uri }} style={s.galleryPhoto} resizeMode="cover" />
              ))}
            </View>
          </View>
        )}
        {portfolio.map((item) => (
          <TouchableOpacity key={item.id} style={s.card} accessibilityRole="button" onPress={() => void abrirFotos()} accessibilityLabel={'Abrir fotos para ' + item.title}>
            <Image source={{ uri: item.image }} style={s.photo} resizeMode="cover" />
            <View style={s.cardContent}>
              <Text style={s.cardTitle}>{item.title}</Text>
              <Text style={s.cardSubtitle}>{item.detail}</Text>
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
  intro: { color: '#CECECE', lineHeight: 23, fontSize: 15, marginTop: 11 },
  notice: { color: '#AFAFAF', lineHeight: 19, fontSize: 12, marginTop: 10, marginBottom: 24 },
  gallery: { marginBottom: 22 },
  galleryHeading: { color: '#FFFFFF', fontWeight: '900', marginBottom: 12, fontSize: 17 },
  galleryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  galleryPhoto: { width: '31%', height: 110, borderRadius: 12, backgroundColor: '#222222' },
  card: { borderWidth: 1, borderColor: '#3C3C3C', borderRadius: 18, overflow: 'hidden', marginBottom: 17, backgroundColor: '#121212' },
  photo: { width: '100%', height: 220, backgroundColor: '#2E2E2E' },
  cardContent: { padding: 17 },
  cardTitle: { color: '#FFFFFF', fontWeight: '900', fontSize: 20 },
  cardSubtitle: { color: '#B8B8B8', marginTop: 7 },
  button: { backgroundColor: P.red, borderRadius: 14, padding: 16, marginTop: 10, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '900' },
});
