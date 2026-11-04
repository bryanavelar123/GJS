import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { createProject, getSession } from '@/lib/backend';

export default function NewProjectScreen() {
  const router = useRouter();
  const [projectName, setProjectName] = useState('');
  const [client, setClient] = useState('');
  const [environment, setEnvironment] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  const salvar = async () => {
    try {
      if (!getSession()) {
        router.replace('/login');
        return;
      }
      if (projectName.trim().length < 2) throw new Error('Informe o nome do projeto.');
      if (client.trim().length < 2) throw new Error('Informe o nome do cliente.');
      if (!environment.trim()) throw new Error('Informe o ambiente.');

      setSaving(true);
      const project = await createProject({
        name: projectName,
        clientName: client,
        environment,
        description,
      });

      Alert.alert('Projeto salvo', 'O projeto foi gravado com segurança.', [
        {
          text: 'Adicionar medidas',
          onPress: () => router.replace({ pathname: '/medidas-projeto', params: { projectId: project.id, name: project.name } } as any),
        },
      ]);
    } catch (error) {
      Alert.alert('Não foi possível salvar', error instanceof Error ? error.message : 'Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.page} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <TouchableOpacity onPress={() => router.back()}><Text style={styles.back}>‹ Voltar</Text></TouchableOpacity>
        <Text style={styles.title}>Novo projeto</Text>
        <Text style={styles.subtitle}>Dados essenciais para iniciar o atendimento.</Text>

        <Field label="Nome do projeto" value={projectName} setValue={setProjectName} placeholder="Ex.: Cozinha planejada" />
        <Field label="Cliente" value={client} setValue={setClient} placeholder="Nome do cliente" />
        <Field label="Ambiente" value={environment} setValue={setEnvironment} placeholder="Ex.: Cozinha" />
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, styles.area]}
          value={description}
          onChangeText={setDescription}
          placeholder="Observações do projeto"
          placeholderTextColor="#8B7B7B"
          multiline
          maxLength={10000}
          textAlignVertical="top"
        />

        <TouchableOpacity style={styles.button} onPress={salvar} disabled={saving}>
          {saving ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Salvar projeto</Text>}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Field({ label, value, setValue, placeholder }: { label: string; value: string; setValue: (v: string) => void; placeholder: string }) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        placeholderTextColor="#8B7B7B"
        maxLength={160}
      />
    </>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#F6F3EA' },
  content: { padding: 20, paddingTop: 50, paddingBottom: 40 },
  back: { color: '#650606', fontWeight: '800', marginBottom: 18 },
  title: { color: '#302424', fontSize: 30, fontWeight: '900' },
  subtitle: { color: '#786D6D', marginTop: 4, marginBottom: 20 },
  label: { color: '#302424', fontWeight: '800', marginTop: 14, marginBottom: 7 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#DED4C9', borderRadius: 12, padding: 14, color: '#241A1A' },
  area: { minHeight: 120 },
  button: { backgroundColor: '#650606', borderRadius: 14, padding: 16, alignItems: 'center', marginTop: 24 },
  buttonText: { color: '#fff', fontWeight: '900', fontSize: 16 },
});
