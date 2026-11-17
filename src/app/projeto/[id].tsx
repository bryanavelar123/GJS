import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { PALETTE as P, portfolio } from '../../components/gjs-content';

export default function ProjetoGaleriaScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const projeto = portfolio.find((item) => item.id === id);
  const [fotoAtual, setFotoAtual] = useState(0);

  if (!projeto) {
    return <View style={s.screen}><Text style={s.heading}>Projeto não encontrado</Text>
      <TouchableOpacity onPress={() => router.back()} style={s.back}><Text style={s.backText}>Voltar</Text></TouchableOpacity></View>;
  }

  const imagens = [...projeto.imagens];
  const largura = Math.min(width, 900);
  return (
    <View style={s.screen}>
      <View style={s.top}>
        <TouchableOpacity onPress={() => router.back()} style={s.goBack} accessibilityRole="button">
          <Ionicons name="arrow-back" color="#FFFFFF" size={28} />
        </TouchableOpacity>
        <View style={s.topText}>
          <Text style={s.small}>GALERIA DE TRABALHOS</Text>
          <Text style={s.heading}>{projeto.title}</Text>
        </View>
      </View>
      {imagens.length > 0 ? (
        <>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              setFotoAtual(Math.min(imagens.length - 1, Math.round(event.nativeEvent.contentOffset.x / largura)));
            }}
            style={s.viewer}
            contentContainerStyle={{ alignItems: 'center' }}
          >
            {imagens.map((image, index) => (
              <View key={image + index} style={{ width: largura, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={image} resizeMode="contain" style={{ width: largura - 12, height: '100%' }} />
              </View>
            ))}
          </ScrollView>
          <Text style={s.counter}>{fotoAtual + 1} de {imagens.length} — deslize para ver as fotos</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.thumbs} contentContainerStyle={{ gap: 10, paddingHorizontal: 16 }}>
            {imagens.map((image, index) => (
              <Image key={'thumb-' + index} source={{ uri: image }} style={s.thumb} />
            ))}
          </ScrollView>
        </>
      ) : (
        <View style={s.empty}>
          <Ionicons name="images-outline" color={P.red} size={54} />
          <Text style={s.emptyTitle}>Fotos deste projeto</Text>
          <Text style={s.emptyDescription}>As fotos deste trabalho ainda serão adicionadas ao aplicativo.</Text>
        </View>
      )}
      <TouchableOpacity onPress={() => router.replace('/portfolio')} style={s.back} accessibilityRole="button">
        <Text style={s.backText}>Voltar ao Portfólio</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#050505', paddingBottom: 25 },
  top: { paddingTop: 32, paddingHorizontal: 16, paddingBottom: 17, flexDirection: 'row', alignItems: 'center' },
  goBack: { padding: 9, borderWidth: 1, borderColor: '#4A4A4A', borderRadius: 12, marginRight: 13 },
  topText: { flex: 1 },
  small: { color: P.red, fontSize: 10, letterSpacing: 1.3, fontWeight: '800' },
  heading: { color: '#FFFFFF', fontSize: 24, fontWeight: '900', marginTop: 4 },
  viewer: { flex: 1, maxHeight: 620 },
  counter: { color: '#E0E0E0', textAlign: 'center', paddingVertical: 12 },
  thumbs: { flexGrow: 0, maxHeight: 80, marginBottom: 12 },
  thumb: { height: 70, width: 70, borderRadius: 10, backgroundColor: '#262626' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 25 },
  emptyTitle: { color: '#FFFFFF', fontWeight: '900', fontSize: 22, marginTop: 18 },
  emptyDescription: { color: '#BFBFBF', textAlign: 'center', lineHeight: 22, marginTop: 9 },
  back: { borderRadius: 12, backgroundColor: '#D5081A', padding: 15, alignItems: 'center', marginHorizontal: 16, marginTop: 11 },
  backText: { color: '#FFFFFF', fontWeight: '900', fontSize: 15 },
});
