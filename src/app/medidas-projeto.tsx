import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import {
  createMeasurement,
  getSession,
  listMeasurements,
  Measurement,
  parsePositiveNumber,
} from '@/lib/backend';

export default function ProjectMeasurementsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ projectId?: string; name?: string }>();
  const projectId = typeof params.projectId === 'string' ? params.projectId : '';
  const projectName = typeof params.name === 'string' ? params.name : 'Projeto';

  const [items, setItems] = useState<Measurement[]>([]);
  const [label, setLabel] = useState('');
  const [width, setWidth] = useState('');
  const [depth, setDepth] = useState('');
  const [height, setHeight] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    if (!getSession()) {
      router.replace('/login');
      return;
    }
    if (!projectId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setItems(await listMeasurements(projectId));
    } catch (error) {
      Alert.alert(
        'Erro ao carregar',
        error instanceof Error ? error.message : 'Falha de conexão.',
      );
    } finally {
      setLoading(false);
    }
  }, [projectId, router]);

  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load]),
  );

  const optional = (value: string, field: string) =>
    value.trim() ? parsePositiveNumber(value, field) : null;

  const save = async () => {
    try {
      if (!projectId) throw new Error('Abra esta tela a partir de um projeto.');
      if (!label.trim()) throw new Error('Informe o nome da medida.');

      setSaving(true);
      await createMeasurement({
        projectId,
        label,
        widthMm: parsePositiveNumber(width, 'Largura'),
        depthMm: optional(depth, 'Profundidade'),
        heightMm: optional(height, 'Altura'),
      });

      setLabel('');
      setWidth('');
      setDepth('');
      setHeight('');
      await load();
    } catch (error) {
      Alert.alert(
        'Não foi possível salvar',
        error instanceof Error ? error.message : 'Tente novamente.',
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.back}>‹ Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Medidas</Text>
      <Text style={styles.subtitle}>{projectName}</Text>

      {!projectId ? (
        <View style={styles.warning}>
          <Text style={styles.warningText}>
            Selecione um projeto na tela inicial para cadastrar medidas.
          </Text>
        </View>
      ) : (
        <>
          <Text style={styles.label}>Item</Text>
          <TextInput
            style={styles.input}
            value={label}
            onChangeText={setLabel}
            placeholder="Ex.: Balcão"
            placeholderTextColor="#8B7B7B"
            maxLength={160}
          />

          <Text style={styles.label}>Largura (mm)</Text>
          <TextInput
            style={styles.input}
            value={width}
            onChangeText={setWidth}
            keyboardType="decimal-pad"
            placeholder="Ex.: 2600"
            placeholderTextColor="#8B7B7B"
          />

          <Text style={styles.label}>Profundidade (mm, opcional)</Text>
          <TextInput
            style={styles.input}
            value={depth}
            onChangeText={setDepth}
            keyboardType="decimal-pad"
            placeholder="Ex.: 600"
            placeholderTextColor="#8B7B7B"
          />

          <Text style={styles.label}>Altura (mm, opcional)</Text>
          <TextInput
            style={styles.input}
            value={height}
            onChangeText={setHeight}
            keyboardType="decimal-pad"
            placeholder="Ex.: 720"
            placeholderTextColor="#8B7B7B"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={save}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Adicionar medida</Text>
            )}
          </TouchableOpacity>
        </>
      )}

      <Text style={styles.section}>Medidas cadastradas</Text>

      {loading ? (
        <ActivityIndicator color="#650606" />
      ) : items.length === 0 ? (
        <Text style={styles.empty}>Nenhuma medida cadastrada.</Text>
      ) : (
        items.map((item) => (
          <View key={item.id} style={styles.item}>
            <Text style={styles.itemName}>{item.label}</Text>
            <Text style={styles.itemMeta}>
              L {item.width_mm} mm
              {item.depth_mm ? ` · P ${item.depth_mm} mm` : ''}
              {item.height_mm ? ` · A ${item.height_mm} mm` : ''}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#F6F3EA' },
  content: { padding: 20, paddingTop: 50, paddingBottom: 50 },
  back: { color: '#650606', fontWeight: '800', marginBottom: 18 },
  title: { color: '#302424', fontSize: 30, fontWeight: '900' },
  subtitle: { color: '#786D6D', marginTop: 5, marginBottom: 18 },
  warning: { backgroundColor: '#FFF1CF', padding: 15, borderRadius: 12 },
  warningText: { color: '#594414', lineHeight: 20 },
  label: { color: '#302424', fontWeight: '800', marginTop: 13, marginBottom: 7 },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#DED4C9',
    borderRadius: 12,
    padding: 14,
    color: '#241A1A',
  },
  button: {
    backgroundColor: '#650606',
    borderRadius: 14,
    padding: 15,
    alignItems: 'center',
    marginTop: 18,
  },
  buttonText: { color: '#fff', fontWeight: '900' },
  section: {
    color: '#302424',
    fontSize: 20,
    fontWeight: '900',
    marginTop: 28,
    marginBottom: 12,
  },
  empty: { color: '#786D6D' },
  item: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E6DED3',
    marginBottom: 9,
  },
  itemName: { color: '#302424', fontWeight: '900' },
  itemMeta: { color: '#786D6D', fontSize: 12, marginTop: 3 },
});
