import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { createQuote, formatCents, getSession, parseCurrencyToCents } from '@/lib/backend';

type MoneyFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function safeCents(value: string) {
  try {
    return parseCurrencyToCents(value);
  } catch {
    return 0;
  }
}

export default function OrcamentoScreen() {
  const router = useRouter();
  const [projectName, setProjectName] = useState('');
  const [clientName, setClientName] = useState('');
  const [mdf, setMdf] = useState('');
  const [ferragens, setFerragens] = useState('');
  const [acessorios, setAcessorios] = useState('');
  const [maoDeObra, setMaoDeObra] = useState('');
  const [outros, setOutros] = useState('');
  const [saving, setSaving] = useState(false);

  const total = useMemo(
    () => [mdf, ferragens, acessorios, maoDeObra, outros].reduce((sum, value) => sum + safeCents(value), 0),
    [mdf, ferragens, acessorios, maoDeObra, outros],
  );

  const salvar = async () => {
    try {
      if (!getSession()) {
        router.replace('/login');
        return;
      }
      if (projectName.trim().length < 2) throw new Error('Informe o nome do projeto.');
      if (clientName.trim().length < 2) throw new Error('Informe o nome do cliente.');

      const costs = [
        { description: 'MDF e chapas', cents: parseCurrencyToCents(mdf) },
        { description: 'Ferragens', cents: parseCurrencyToCents(ferragens) },
        { description: 'Acessórios', cents: parseCurrencyToCents(acessorios) },
        { description: 'Mão de obra', cents: parseCurrencyToCents(maoDeObra) },
        { description: 'Outros', cents: parseCurrencyToCents(outros) },
      ];

      if (costs.every((item) => item.cents === 0)) {
        throw new Error('Informe ao menos um valor para o orçamento.');
      }

      setSaving(true);
      await createQuote({ projectName, clientName, costs });

      Alert.alert('Orçamento salvo', `Total: ${formatCents(costs.reduce((s, item) => s + item.cents, 0))}`, [
        { text: 'OK', onPress: () => router.replace('/home') },
      ]);
    } catch (error) {
      Alert.alert('Não foi possível salvar', error instanceof Error ? error.message : 'Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <TouchableOpacity onPress={() => router.back()}><Text style={styles.back}>‹ Voltar</Text></TouchableOpacity>
      <Text style={styles.title}>Novo orçamento</Text>
      <Text style={styles.subtitle}>Valores são armazenados em centavos para evitar erros de arredondamento.</Text>

      <Text style={styles.label}>Projeto</Text>
      <TextInput style={styles.input} value={projectName} onChangeText={setProjectName} placeholder="Nome do projeto" placeholderTextColor="#8B7B7B" maxLength={160} />

      <Text style={styles.label}>Cliente</Text>
      <TextInput style={styles.input} value={clientName} onChangeText={setClientName} placeholder="Nome do cliente" placeholderTextColor="#8B7B7B" maxLength={160} />

      <MoneyField label="MDF e chapas" value={mdf} onChange={setMdf} />
      <MoneyField label="Ferragens" value={ferragens} onChange={setFerragens} />
      <MoneyField label="Acessórios" value={acessorios} onChange={setAcessorios} />
      <MoneyField label="Mão de obra" value={maoDeObra} onChange={setMaoDeObra} />
      <MoneyField label="Outros" value={outros} onChange={setOutros} />

      <Text style={styles.totalLabel}>Total</Text>
      <Text style={styles.total}>{formatCents(total)}</Text>

      <TouchableOpacity style={styles.button} onPress={salvar} disabled={saving}>
        {saving ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Salvar orçamento</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
}

function MoneyField({ label, value, onChange }: MoneyFieldProps) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder="R$ 0,00"
        placeholderTextColor="#8B7B7B"
        keyboardType="decimal-pad"
        maxLength={20}
      />
    </>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#F6F3EA' },
  content: { padding: 20, paddingTop: 50, paddingBottom: 50 },
  back: { color: '#650606', fontWeight: '800', marginBottom: 18 },
  title: { color: '#302424', fontSize: 30, fontWeight: '900' },
  subtitle: { color: '#786D6D', marginTop: 5, marginBottom: 18, lineHeight: 20 },
  label: { color: '#302424', fontWeight: '800', marginTop: 13, marginBottom: 7 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#DED4C9', borderRadius: 12, padding: 14, color: '#241A1A' },
  totalLabel: { color: '#786D6D', marginTop: 24, fontWeight: '700' },
  total: { color: '#650606', fontSize: 30, fontWeight: '900', marginTop: 3 },
  button: { backgroundColor: '#650606', borderRadius: 14, padding: 16, alignItems: 'center', marginTop: 22 },
  buttonText: { color: '#fff', fontWeight: '900', fontSize: 16 },
});
