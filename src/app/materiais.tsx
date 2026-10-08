import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';

type Categoria = 'MDF' | 'Ferragens' | 'Acessórios';

const materiais = {
  MDF: [
    { nome: 'Branco TX', marca: 'Duratex', cor: '#FFF' },
    { nome: 'Cinza Cristal', marca: 'Arauco', cor: '#A2A2A2' },
    { nome: 'Carvalho Americano', marca: 'Duratex', cor: '#C2A685' },
    { nome: 'Preto TX', marca: 'Duratex', cor: '#222' },
    { nome: 'Nogueira', marca: 'Arauco', cor: '#6B4934' },
  ],

  Ferragens: [
    { nome: 'Dobradiça 35mm', marca: 'FGV', cor: '#777' },
    { nome: 'Corrediça Telescópica 45cm', marca: 'FGV', cor: '#555' },
    { nome: 'Corrediça Oculta 45cm', marca: 'Hettich', cor: '#333' },
    { nome: 'Suporte para Prateleira', marca: 'FGV', cor: '#999' },
    { nome: 'Parafuso 4x40mm', marca: 'Jomarca', cor: '#AAA' },
  ],

  Acessórios: [
    { nome: 'Puxador Preto 128mm', marca: 'Zen Design', cor: '#181818' },
    { nome: 'Puxador Cromado 128mm', marca: 'Zen Design', cor: '#C0C0C0' },
    { nome: 'Pé Regulável 10cm', marca: 'FGV', cor: '#333' },
    { nome: 'Passa-Fio Preto', marca: 'FGV', cor: '#111' },
    { nome: 'Amortecedor de Porta', marca: 'Hettich', cor: '#777' },
  ],
};

export default function MateriaisScreen() {
  const router = useRouter();

  const [categoria, setCategoria] = useState<Categoria>('MDF');
  const [busca, setBusca] = useState('');

  const listaFiltrada = useMemo(() => {
    const lista = materiais[categoria];

    if (!busca.trim()) {
      return lista;
    }

    const texto = busca.toLowerCase();

    return lista.filter(
      (item) =>
        item.nome.toLowerCase().includes(texto) ||
        item.marca.toLowerCase().includes(texto)
    );
  }, [categoria, busca]);

  const trocarCategoria = (novaCategoria: Categoria) => {
    setCategoria(novaCategoria);
    setBusca('');
  };

  return (
    <View style={styles.container}>

      {/* CABEÇALHO */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backBtn}>＜</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Materiais</Text>

        <View style={{ width: 20 }} />
      </View>

      {/* ABAS */}
      <View style={styles.tabs}>

        <TouchableOpacity
          style={[
            styles.tab,
            categoria === 'MDF' && styles.tabActive,
          ]}
          onPress={() => trocarCategoria('MDF')}
        >
          <Text
            style={
              categoria === 'MDF'
                ? styles.tabTextActive
                : styles.tabText
            }
          >
            MDF
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            categoria === 'Ferragens' && styles.tabActive,
          ]}
          onPress={() => trocarCategoria('Ferragens')}
        >
          <Text
            style={
              categoria === 'Ferragens'
                ? styles.tabTextActive
                : styles.tabText
            }
          >
            Ferragens
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            categoria === 'Acessórios' && styles.tabActive,
          ]}
          onPress={() => trocarCategoria('Acessórios')}
        >
          <Text
            style={
              categoria === 'Acessórios'
                ? styles.tabTextActive
                : styles.tabText
            }
          >
            Acessórios
          </Text>
        </TouchableOpacity>

      </View>

      {/* BUSCA */}
      <TextInput
        style={styles.search}
        placeholder="🔍 Buscar material..."
        placeholderTextColor="#555"
        value={busca}
        onChangeText={setBusca}
      />

      {/* CATEGORIA ATUAL */}
      <Text style={styles.categoryTitle}>
        {categoria}
      </Text>

      {/* LISTA */}
      <ScrollView
        style={styles.list}
        showsVerticalScrollIndicator={false}
      >

        {listaFiltrada.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              Nenhum item encontrado.
            </Text>
          </View>
        ) : (
          listaFiltrada.map((mat, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.item}
              activeOpacity={0.7}
              onPress={() => {
                console.log('Selecionado:', mat.nome);
              }}
            >
              <View
                style={[
                  styles.colorPreview,
                  { backgroundColor: mat.cor },
                ]}
              />

              <View style={styles.info}>
                <Text style={styles.nome}>
                  {mat.nome}
                </Text>

                <Text style={styles.marca}>
                  {mat.marca}
                </Text>
              </View>

              <Text style={styles.arrow}>＞</Text>
            </TouchableOpacity>
          ))
        )}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
    paddingTop: 50,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  backBtn: {
    color: '#FFF',
    fontSize: 24,
  },

  title: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  tabs: {
    flexDirection: 'row',
    marginBottom: 16,
  },

  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#111',
  },

  tabActive: {
    backgroundColor: '#FF2222',
  },

  tabTextActive: {
    color: '#FFF',
    fontWeight: 'bold',
  },

  tabText: {
    color: '#888',
  },

  search: {
    backgroundColor: '#111',
    color: '#FFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#222',
  },

  categoryTitle: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  list: {
    flex: 1,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#222',
  },

  colorPreview: {
    width: 40,
    height: 40,
    borderRadius: 6,
  },

  info: {
    flex: 1,
    marginLeft: 12,
  },

  nome: {
    color: '#FFF',
    fontWeight: 'bold',
  },

  marca: {
    color: '#666',
    fontSize: 12,
    marginTop: 2,
  },

  arrow: {
    color: '#444',
    fontSize: 16,
  },

  empty: {
    alignItems: 'center',
    paddingTop: 40,
  },

  emptyText: {
    color: '#666',
    fontSize: 14,
  },
});
