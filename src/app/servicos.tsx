import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Page, GjsHeader, ServicePhotoCard, openWhatsApp } from '../components/gjs-premium';
import { PALETTE as P, services } from '../components/gjs-content';

export default function ServicosScreen() {
  return (
    <Page current="servicos">
      <GjsHeader />
      <View style={s.body}>
        <Text style={s.eyebrow}>O QUE FAZEMOS</Text>
        <Text style={s.title}>Nossos Serviços</Text>
        <Text style={s.description}>Montagem, desmontagem e instalações. Atendimento direto pelo WhatsApp.</Text>
        <View style={s.grid}>
          {services.map((item) => (
            <ServicePhotoCard
              key={item.id} image={item.image} title={item.title} detail={item.short}
              icon={item.icon} tall
              onPress={() => void openWhatsApp('Olá! Gostaria de solicitar um orçamento para ' + item.title.toLowerCase() + '.')}
            />
          ))}
        </View>
        {services.map((item) => (
          <View key={'description-' + item.id} style={s.detailRow}>
            <Text style={s.detailTitle}>{item.title}</Text>
            <Text style={s.detailText}>{item.description}</Text>
          </View>
        ))}
        <TouchableOpacity
          style={s.cta}
          accessibilityRole="button"
          onPress={() => void openWhatsApp('Olá! Gostaria de solicitar um orçamento com a GJS Montagem de Móveis.')}
        >
          <Text style={s.ctaText}>Pedir orçamento pelo WhatsApp ↗</Text>
        </TouchableOpacity>
      </View>
    </Page>
  );
}

const s = StyleSheet.create({
  body: { paddingHorizontal: 16, paddingTop: 18 },
  eyebrow: { color: P.red, fontWeight: '900', letterSpacing: 1.6, fontSize: 11 },
  title: { fontWeight: '900', color: P.white, fontSize: 32, marginTop: 7 },
  description: { color: '#C7C7C7', marginTop: 10, lineHeight: 23, fontSize: 15, marginBottom: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  detailRow: { borderBottomWidth: 1, borderBottomColor: '#333333', paddingVertical: 14 },
  detailTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  detailText: { color: '#AFAFAF', fontSize: 14, marginTop: 7, lineHeight: 22 },
  cta: { backgroundColor: P.red, borderRadius: 14, marginTop: 25, padding: 17, alignItems: 'center' },
  ctaText: { color: P.white, fontWeight: '900', fontSize: 15 },
});
