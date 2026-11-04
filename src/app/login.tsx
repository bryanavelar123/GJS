import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { signIn, signUp } from '@/lib/backend';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const validar = () => {
    if (!email.includes('@')) throw new Error('Informe um e-mail válido.');
    if (senha.length < 6) throw new Error('A senha precisa ter pelo menos 6 caracteres.');
  };

  const entrar = async () => {
    try {
      validar();
      setLoading(true);
      await signIn(email, senha);
      router.replace('/home');
    } catch (error) {
      Alert.alert('Não foi possível entrar', error instanceof Error ? error.message : 'Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const cadastrar = async () => {
    try {
      validar();
      setLoading(true);
      const result = await signUp(email, senha);
      if (result?.access_token) {
        router.replace('/home');
      } else {
        Alert.alert('Conta criada', 'Confira seu e-mail para confirmar o cadastro e depois entre no aplicativo.');
      }
    } catch (error) {
      Alert.alert('Não foi possível cadastrar', error instanceof Error ? error.message : 'Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.card}>
        <View style={styles.logo}><Text style={styles.logoText}>GJS</Text></View>
        <Text style={styles.title}>Acessar o GJS</Text>
        <Text style={styles.subtitle}>Seus projetos ficam protegidos pela sua conta.</Text>

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          placeholder="voce@email.com"
          placeholderTextColor="#8B7B7B"
          accessibilityLabel="E-mail"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          autoComplete="password"
          placeholder="Sua senha"
          placeholderTextColor="#8B7B7B"
          accessibilityLabel="Senha"
        />

        <TouchableOpacity style={styles.primary} onPress={entrar} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryText}>Entrar</Text>}
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondary} onPress={cadastrar} disabled={loading}>
          <Text style={styles.secondaryText}>Criar conta</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F3EA', justifyContent: 'center', padding: 22 },
  card: { backgroundColor: '#fff', borderRadius: 24, padding: 24, borderWidth: 1, borderColor: '#E7E0D5' },
  logo: { width: 58, height: 58, borderRadius: 16, backgroundColor: '#650606', alignItems: 'center', justifyContent: 'center' },
  logoText: { color: '#fff', fontWeight: '900', fontSize: 20 },
  title: { fontSize: 28, fontWeight: '900', color: '#2B1919', marginTop: 18 },
  subtitle: { color: '#6E6262', marginTop: 6, marginBottom: 22 },
  label: { color: '#342828', fontWeight: '700', marginTop: 12, marginBottom: 7 },
  input: { borderWidth: 1, borderColor: '#D8D0C7', borderRadius: 12, padding: 14, backgroundColor: '#FCFAF6', color: '#241A1A' },
  primary: { marginTop: 22, backgroundColor: '#650606', borderRadius: 14, padding: 15, alignItems: 'center' },
  primaryText: { color: '#fff', fontWeight: '900', fontSize: 16 },
  secondary: { marginTop: 10, backgroundColor: '#D9F36A', borderRadius: 14, padding: 15, alignItems: 'center' },
  secondaryText: { color: '#22301E', fontWeight: '900', fontSize: 16 },
});
