import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function Index() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/home');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>

      <View style={styles.logoCircle}>
        <Text style={styles.logo}>GJS</Text>
      </View>

      <Text style={styles.brand}>
        GJS
      </Text>

      <Text style={styles.subtitle}>
        MÓVEIS PLANEJADOS
      </Text>

      <View style={styles.slogan}>
        <Text>PLANEJAR</Text>
        <Text>CALCULAR</Text>
        <Text>ORÇAR</Text>
        <Text>REALIZAR</Text>
      </View>

      <Text style={styles.loading}>
        Carregando...
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: '#ff2028',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    color: '#fff',
    fontSize: 42,
    fontWeight: '900',
  },

  brand: {
    color: '#fff',
    fontSize: 38,
    fontWeight: '900',
    marginTop: 28,
  },

  subtitle: {
    color: '#ff2028',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 5,
    marginTop: 5,
  },

  slogan: {
    marginTop: 350,
    alignItems: 'center',
    gap: 10,
  },

  sloganText: {
    color: '#999',
  },

  loading: {
    color: '#ff2028',
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 30,
  },
});