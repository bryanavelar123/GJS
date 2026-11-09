import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import { useRouter } from 'expo-router';

const WHATSAPP_URL = 'https://wa.me/5541999739327';

export default function SobreGJS() {
  const router = useRouter();

  async function abrirWhatsApp() {
    try {
      await Linking.openURL(WHATSAPP_URL);
    } catch {
      Alert.alert('WhatsApp', 'Não foi possível abrir o contato.');
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} accessibilityRole="button">
        <Text style={styles.back}>‹ Voltar</Text>
      </TouchableOpacity>
      <Text style={styles.brand}>GJS</Text>
      <Text style={styles.title}>Móveis Planejados</Text>
      <Text style={styles.text}>Projetos, medidas, materiais e orçamentos em um só lugar.</Text>
      <TouchableOpacity style={styles.button} onPress={abrirWhatsApp} accessibilityRole="button">
        <Text style={styles.buttonText}>Contato: (41) 99973-9327 ↗</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, paddingTop: 55, backgroundColor: '#000000' },
  back: { color: '#FFFFFF', fontSize: 17 },
  brand: { color: '#FF2222', fontSize: 46, fontWeight: '900', marginTop: 58 },
  title: { color: '#FFFFFF', fontSize: 28, fontWeight: '800', marginTop: 10 },
  text: { color: '#BBBBBB', fontSize: 16, lineHeight: 24, marginTop: 18 },
  button: { backgroundColor: '#C1121F', padding: 16, borderRadius: 12, marginTop: 36, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontWeight: '800', fontSize: 15 },
});
