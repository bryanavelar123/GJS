import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function NovoOrcamentoScreen() {
  const router = useRouter();

  const [projeto, setProjeto] = useState('');
  const [cliente, setCliente] = useState('');

  const [mdf, setMdf] = useState('');
  const [ferragens, setFerragens] = useState('');
  const [acessorios, setAcessorios] = useState('');
  const [maoDeObra, setMaoDeObra] = useState('');
  const [outros, setOutros] = useState('');

  /*
   * =====================================================
   * VOLTAR
   * =====================================================
   *
   * Se existir uma página anterior, volta para ela.
   *
   * Se não existir histórico, vai para a página inicial.
   */
  const voltar = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  /*
   * =====================================================
   * CONVERTER VALOR
   * =====================================================
   */
  const numero = (valor) => {
    if (!valor) {
      return 0;
    }

    let valorLimpo = String(valor)
      .replace(/R\$/gi, '')
      .replace(/\s/g, '');

    /*
     * Se tiver ponto e vírgula:
     * 1.500,50 -> 1500.50
     */
    if (
      valorLimpo.includes('.') &&
      valorLimpo.includes(',')
    ) {
      valorLimpo = valorLimpo
        .replace(/\./g, '')
        .replace(',', '.');
    } else if (valorLimpo.includes(',')) {
      /*
       * 1500,50 -> 1500.50
       */
      valorLimpo = valorLimpo.replace(',', '.');
    }

    valorLimpo = valorLimpo.replace(/[^\d.-]/g, '');

    return Number(valorLimpo) || 0;
  };

  /*
   * =====================================================
   * TOTAL
   * =====================================================
   */
  const total = useMemo(() => {
    return (
      numero(mdf) +
      numero(ferragens) +
      numero(acessorios) +
      numero(maoDeObra) +
      numero(outros)
    );
  }, [
    mdf,
    ferragens,
    acessorios,
    maoDeObra,
    outros,
  ]);

  /*
   * =====================================================
   * MOEDA
   * =====================================================
   */
  const formatarMoeda = (valor) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  /*
   * =====================================================
   * CRIAR ORÇAMENTO
   * =====================================================
   */
  const criarOrcamento = () => {
    if (!projeto.trim()) {
      Alert.alert(
        'Campo obrigatório',
        'Digite o nome do projeto.'
      );
      return;
    }

    if (!cliente.trim()) {
      Alert.alert(
        'Campo obrigatório',
        'Digite o nome do cliente.'
      );
      return;
    }

    Alert.alert(
      'Orçamento criado!',
      `O orçamento "${projeto}" foi criado com sucesso.\n\nValor total: ${formatarMoeda(total)}`,
      [
        {
          text: 'OK',
          onPress: () => {
            voltar();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        {/* =================================================
            CABEÇALHO
        ================================================= */}

        <View style={styles.header}>

          <TouchableOpacity
            onPress={voltar}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Text style={styles.backBtn}>
              ‹
            </Text>
          </TouchableOpacity>

          <Text style={styles.title}>
            Novo Orçamento
          </Text>

          <View style={styles.headerSpace} />

        </View>

        {/* =================================================
            INFORMAÇÕES DO PROJETO
        ================================================= */}

        <View style={styles.card}>

          <Text style={styles.sectionTitle}>
            Informações do projeto
          </Text>

          <Text style={styles.label}>
            Nome do projeto
          </Text>

          <TextInput
            value={projeto}
            onChangeText={setProjeto}
            placeholder="Ex: Cozinha Moderna"
            placeholderTextColor="#666666"
            style={styles.input}
            autoCapitalize="sentences"
            selectionColor="#FF2222"
          />

          <Text style={styles.label}>
            Cliente
          </Text>

          <TextInput
            value={cliente}
            onChangeText={setCliente}
            placeholder="Ex: Mariana"
            placeholderTextColor="#666666"
            style={styles.input}
            autoCapitalize="words"
            selectionColor="#FF2222"
          />

        </View>

        {/* =================================================
            CUSTOS
        ================================================= */}

        <View style={styles.card}>

          <Text style={styles.sectionTitle}>
            Custos do orçamento
          </Text>

          <CampoValor
            label="MDF e chapas"
            value={mdf}
            onChangeText={setMdf}
          />

          <CampoValor
            label="Ferragens"
            value={ferragens}
            onChangeText={setFerragens}
          />

          <CampoValor
            label="Acessórios"
            value={acessorios}
            onChangeText={setAcessorios}
          />

          <CampoValor
            label="Mão de obra"
            value={maoDeObra}
            onChangeText={setMaoDeObra}
          />

          <CampoValor
            label="Outros"
            value={outros}
            onChangeText={setOutros}
          />

        </View>

        {/* =================================================
            TOTAL
        ================================================= */}

        <View style={styles.totalCard}>

          <View style={styles.totalInfo}>

            <Text style={styles.totalLabel}>
              Valor total
            </Text>

            <Text style={styles.totalDescription}>
              Soma de todos os custos
            </Text>

          </View>

          <Text style={styles.totalValue}>
            {formatarMoeda(total)}
          </Text>

        </View>

        {/* =================================================
            BOTÃO
        ================================================= */}

        <TouchableOpacity
          style={styles.createButton}
          onPress={criarOrcamento}
          activeOpacity={0.8}
        >
          <Text style={styles.createButtonText}>
            Criar Orçamento
          </Text>
        </TouchableOpacity>

      </ScrollView>

    </View>
  );
}

/*
 * =========================================================
 * CAMPO DE VALOR
 * =========================================================
 */

function CampoValor({
  label,
  value,
  onChangeText,
}) {
  return (
    <View style={styles.field}>

      <Text style={styles.label}>
        {label}
      </Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="R$ 0,00"
        placeholderTextColor="#666666"
        keyboardType="decimal-pad"
        style={styles.input}
        selectionColor="#FF2222"
      />

    </View>
  );
}

/*
 * =========================================================
 * ESTILOS
 * =========================================================
 */

const styles = StyleSheet.create({

  /*
   * TELA
   */
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 50,
  },

  /*
   * =======================================================
   * HEADER
   * =======================================================
   */

  header: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },

  backButton: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  backBtn: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: '300',
    lineHeight: 42,
  },

  headerSpace: {
    width: 45,
  },

  title: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  /*
   * =======================================================
   * CARDS
   * =======================================================
   */

  card: {
    backgroundColor: '#111111',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#222222',
    marginBottom: 14,
  },

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 18,
  },

  /*
   * =======================================================
   * CAMPOS
   * =======================================================
   */

  field: {
    marginBottom: 14,
  },

  label: {
    color: '#AAAAAA',
    fontSize: 13,
    marginBottom: 7,
  },

  input: {
    width: '100%',
    minHeight: 46,
    backgroundColor: '#080808',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    color: '#FFFFFF',
    fontSize: 15,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  /*
   * =======================================================
   * TOTAL
   * =======================================================
   */

  totalCard: {
    backgroundColor: '#111111',
    borderRadius: 12,
    padding: 18,
    borderWidth: 1,
    borderColor: '#222222',
    marginBottom: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  totalInfo: {
    flex: 1,
  },

  totalLabel: {
    color: '#FF2222',
    fontSize: 17,
    fontWeight: 'bold',
  },

  totalDescription: {
    color: '#777777',
    fontSize: 12,
    marginTop: 4,
  },

  totalValue: {
    color: '#FF2222',
    fontSize: 21,
    fontWeight: 'bold',
    marginLeft: 15,
  },

  /*
   * =======================================================
   * BOTÃO
   * =======================================================
   */

  createButton: {
    width: '100%',
    backgroundColor: '#FF2222',
    minHeight: 54,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

});
