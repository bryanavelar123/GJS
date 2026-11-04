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
import { useFocusEffect, useRouter } from 'expo-router';
import {
  createMaterial,
  formatCents,
  getSession,
  listMaterials,
  Material,
  parseCurrencyToCents,
} from '@/lib/backend';

const categories: Material['category'][] = ['MDF', 'Ferragens', 'Acessórios', 'Outro'];

export default function MateriaisScreen() {
  const router = useRouter();
  const [items, setItems] = useState<Material[]>([]);
  const [category, setCategory] = useState<Material['category']>('MDF');
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const carregar = useCallback(async () => {
    if (!getSession()) {
      router.replace('/login');
      return;
    }

    try {
      setLoading(true);
      setItems(await listMaterials());
    } catch (error) {
      Alert.alert(
        'Erro ao carregar',
        error instanceof Error ? error.message : 'Falha de conexão.',
      );
    } finally {
      setLoading(false);
    }
  }, [router]);

  useFocusEffect(
    useCallback(() => {
      void carregar();
    }, [carregar]),
  );

  const adicionar = async () => {
    try {
      if (name.trim().length < 2) {
        throw new Error('Informe o nome do material.');
      }

      setSaving(true);
      await createMaterial({
        category,
        name,
        brand,
        unitPriceCents: parseCurrencyToCents(price),
      });

      setName('');
      setBrand('');
      setPrice('');
      await carregar();
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

      <Text style={styles.title}>Materiais</Text>
      <Text style={styles.subtitle}>Catálogo privado da sua conta.</Text>

      <View style={styles.categories}>
        {categories.map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => setCategory(item)}
            style={[styles.pill, category === item && styles.pillActive]}
          >
            <Text
              style={[
                styles.pillText,
                category === item && styles.pillTextActive,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Ex.: Branco TX"
        placeholderTextColor="#8B7B7B"
        maxLength={160}
      />

      <Text style={styles.label}>Marca</Text>
      <TextInput
        style={styles.input}
        value={brand}
        onChangeText={setBrand}
        placeholder="Ex.: Duratex"
        placeholderTextColor="#8B7B7B"
        maxLength={160}
      />

      <Text style={styles.label}>Preço unitário</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder="R$ 0,00"
        placeholderTextColor="#8B7B7B"
        keyboardType="decimal-pad"
        maxLength={20}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={adicionar}
        disabled={saving}
      >
        {saving ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Adicionar material</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.section}>Seu catálogo</Text>

      {loading ? (
        <ActivityIndicator color="#650606" />
      ) : items.length === 0 ? (
        <Text style={styles.empty}>Nenhum material cadastrado.</Text>
      ) : (
        items.map((item) => (
          <View key={item.id} style={styles.item}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemMeta}>
                {item.category}
                {item.brand ? ` · ${item.brand}` : ''}
              </Text>
            </View>
            <Text style={styles.price}>
              {formatCents(Number(item.unit_price_cents))}
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
  categories: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 },
  pill: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#DED4C9',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  pillActive: { backgroundColor: '#D9F36A', borderColor: '#D9F36A' },
  pillText: { color: '#5C5050', fontWeight: '700' },
  pillTextActive: { color: '#27331F' },
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E6DED3',
    marginBottom: 9,
  },
  itemName: { color: '#302424', fontWeight: '900' },
  itemMeta: { color: '#786D6D', fontSize: 12, marginTop: 3 },
  price: { color: '#650606', fontWeight: '900', marginLeft: 10 },
});
