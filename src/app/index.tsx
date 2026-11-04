import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

export default function Index() {
  useEffect(() => {
    const timer = setTimeout(() => router.replace('/login'), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container} accessibilityLabel="GJS Montagem de Móveis">
      <View style={styles.logo}>
        <Text style={styles.logoText}>GJS</Text>
      </View>
      <Text style={styles.title}>GJS Montagem de Móveis</Text>
      <Text style={styles.subtitle}>Organização, medidas e orçamentos em um só lugar.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#120708',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    width: 112,
    height: 112,
    borderRadius: 28,
    backgroundColor: '#650606',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  logoText: { color: '#fff', fontSize: 38, fontWeight: '900' },
  title: { color: '#fff', fontSize: 24, fontWeight: '900', textAlign: 'center' },
  subtitle: { color: '#D9F36A', marginTop: 10, textAlign: 'center', lineHeight: 21 },
});
