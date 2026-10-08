import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';

type Medida = {
  id: number;
  item: string;
  largura: string;
  comprimento: string;
  profundidade: string;
};

type Modulo = {
  id: number;
  nome: string;
  largura: string;
  profundidade: string;
  altura: string;
};

type Peca = {
  id: number;
  nome: string;
  modulo: string;
  largura: string;
  profundidade: string;
  espessura: string;
  quantidade: string;
};

export default function MedidasScreen() {
  const router = useRouter();

  // =====================================================
  // ABA ATUAL
  // =====================================================

  const [aba, setAba] = useState<'ambiente' | 'modulo' | 'pecas'>(
    'ambiente'
  );

  // =====================================================
  // MEDIDAS DO AMBIENTE
  // =====================================================

  const [medidas, setMedidas] = useState<Medida[]>([
    {
      id: 1,
      item: 'Balcão',
      largura: '2600',
      comprimento: '600',
      profundidade: '900',
    },
    {
      id: 2,
      item: 'Aéreo',
      largura: '2600',
      comprimento: '350',
      profundidade: '700',
    },
  ]);

  // =====================================================
  // MÓDULOS
  // =====================================================

  const [modulos, setModulos] = useState<Modulo[]>([
    {
      id: 1,
      nome: 'Módulo inferior',
      largura: '800',
      profundidade: '600',
      altura: '720',
    },
    {
      id: 2,
      nome: 'Módulo aéreo',
      largura: '800',
      profundidade: '350',
      altura: '700',
    },
  ]);

  // =====================================================
  // PEÇAS
  // =====================================================

  const [pecas, setPecas] = useState<Peca[]>([
    {
      id: 1,
      nome: 'Lateral esquerda',
      modulo: 'Módulo inferior',
      largura: '720',
      profundidade: '600',
      espessura: '18',
      quantidade: '1',
    },
    {
      id: 2,
      nome: 'Lateral direita',
      modulo: 'Módulo inferior',
      largura: '720',
      profundidade: '600',
      espessura: '18',
      quantidade: '1',
    },
  ]);

  // =====================================================
  // MODAL
  // =====================================================

  const [modalVisible, setModalVisible] = useState(false);

  const [editandoId, setEditandoId] = useState<number | null>(null);

  // =====================================================
  // CAMPOS - MEDIDA
  // =====================================================

  const [medidaNome, setMedidaNome] = useState('');
  const [medidaLargura, setMedidaLargura] = useState('');
  const [medidaComprimento, setMedidaComprimento] = useState('');
  const [medidaProfundidade, setMedidaProfundidade] = useState('');

  // =====================================================
  // CAMPOS - MÓDULO
  // =====================================================

  const [moduloNome, setModuloNome] = useState('');
  const [moduloLargura, setModuloLargura] = useState('');
  const [moduloProfundidade, setModuloProfundidade] = useState('');
  const [moduloAltura, setModuloAltura] = useState('');

  // =====================================================
  // CAMPOS - PEÇA
  // =====================================================

  const [pecaNome, setPecaNome] = useState('');
  const [pecaModulo, setPecaModulo] = useState('');
  const [pecaLargura, setPecaLargura] = useState('');
  const [pecaProfundidade, setPecaProfundidade] = useState('');
  const [pecaEspessura, setPecaEspessura] = useState('');
  const [pecaQuantidade, setPecaQuantidade] = useState('1');

  // =====================================================
  // LIMPAR FORMULÁRIO
  // =====================================================

  const limparFormulario = () => {
    // Medida
    setMedidaNome('');
    setMedidaLargura('');
    setMedidaComprimento('');
    setMedidaProfundidade('');

    // Módulo
    setModuloNome('');
    setModuloLargura('');
    setModuloProfundidade('');
    setModuloAltura('');

    // Peça
    setPecaNome('');
    setPecaModulo('');
    setPecaLargura('');
    setPecaProfundidade('');
    setPecaEspessura('');
    setPecaQuantidade('1');
  };

  // =====================================================
  // ABRIR MODAL PARA ADICIONAR
  // =====================================================

  const abrirAdicionar = () => {
    setEditandoId(null);
    limparFormulario();

    if (aba === 'pecas' && modulos.length > 0) {
      setPecaModulo(modulos[0].nome);
    }

    setModalVisible(true);
  };

  // =====================================================
  // EDITAR MEDIDA
  // =====================================================

  const editarMedida = (medida: Medida) => {
    setEditandoId(medida.id);

    setMedidaNome(medida.item);
    setMedidaLargura(medida.largura);
    setMedidaComprimento(medida.comprimento);
    setMedidaProfundidade(medida.profundidade);

    setModalVisible(true);
  };

  // =====================================================
  // EDITAR MÓDULO
  // =====================================================

  const editarModulo = (modulo: Modulo) => {
    setEditandoId(modulo.id);

    setModuloNome(modulo.nome);
    setModuloLargura(modulo.largura);
    setModuloProfundidade(modulo.profundidade);
    setModuloAltura(modulo.altura);

    setModalVisible(true);
  };

  // =====================================================
  // EDITAR PEÇA
  // =====================================================

  const editarPeca = (peca: Peca) => {
    setEditandoId(peca.id);

    setPecaNome(peca.nome);
    setPecaModulo(peca.modulo);
    setPecaLargura(peca.largura);
    setPecaProfundidade(peca.profundidade);
    setPecaEspessura(peca.espessura);
    setPecaQuantidade(peca.quantidade);

    setModalVisible(true);
  };

  // =====================================================
  // SALVAR
  // =====================================================

  const salvar = () => {
    if (aba === 'ambiente') {
      salvarMedida();
      return;
    }

    if (aba === 'modulo') {
      salvarModulo();
      return;
    }

    if (aba === 'pecas') {
      salvarPeca();
    }
  };

  // =====================================================
  // SALVAR MEDIDA
  // =====================================================

  const salvarMedida = () => {
    if (
      !medidaNome.trim() ||
      !medidaLargura.trim() ||
      !medidaComprimento.trim() ||
      !medidaProfundidade.trim()
    ) {
      Alert.alert(
        'Atenção',
        'Preencha nome, largura, comprimento e profundidade.'
      );

      return;
    }

    if (editandoId !== null) {
      setMedidas((lista) =>
        lista.map((medida) =>
          medida.id === editandoId
            ? {
                ...medida,
                item: medidaNome.trim(),
                largura: medidaLargura.trim(),
                comprimento: medidaComprimento.trim(),
                profundidade: medidaProfundidade.trim(),
              }
            : medida
        )
      );
    } else {
      const novaMedida: Medida = {
        id: Date.now(),
        item: medidaNome.trim(),
        largura: medidaLargura.trim(),
        comprimento: medidaComprimento.trim(),
        profundidade: medidaProfundidade.trim(),
      };

      setMedidas((lista) => [...lista, novaMedida]);
    }

    fecharModal();
  };

  // =====================================================
  // SALVAR MÓDULO
  // =====================================================

  const salvarModulo = () => {
    if (
      !moduloNome.trim() ||
      !moduloLargura.trim() ||
      !moduloProfundidade.trim() ||
      !moduloAltura.trim()
    ) {
      Alert.alert(
        'Atenção',
        'Preencha nome, largura, profundidade e altura.'
      );

      return;
    }

    if (editandoId !== null) {
      setModulos((lista) =>
        lista.map((modulo) =>
          modulo.id === editandoId
            ? {
                ...modulo,
                nome: moduloNome.trim(),
                largura: moduloLargura.trim(),
                profundidade: moduloProfundidade.trim(),
                altura: moduloAltura.trim(),
              }
            : modulo
        )
      );
    } else {
      const novoModulo: Modulo = {
        id: Date.now(),
        nome: moduloNome.trim(),
        largura: moduloLargura.trim(),
        profundidade: moduloProfundidade.trim(),
        altura: moduloAltura.trim(),
      };

      setModulos((lista) => [...lista, novoModulo]);
    }

    fecharModal();
  };

  // =====================================================
  // SALVAR PEÇA
  // =====================================================

  const salvarPeca = () => {
    if (
      !pecaNome.trim() ||
      !pecaModulo.trim() ||
      !pecaLargura.trim() ||
      !pecaProfundidade.trim() ||
      !pecaEspessura.trim() ||
      !pecaQuantidade.trim()
    ) {
      Alert.alert(
        'Atenção',
        'Preencha todos os campos da peça.'
      );

      return;
    }

    if (editandoId !== null) {
      setPecas((lista) =>
        lista.map((peca) =>
          peca.id === editandoId
            ? {
                ...peca,
                nome: pecaNome.trim(),
                modulo: pecaModulo.trim(),
                largura: pecaLargura.trim(),
                profundidade: pecaProfundidade.trim(),
                espessura: pecaEspessura.trim(),
                quantidade: pecaQuantidade.trim(),
              }
            : peca
        )
      );
    } else {
      const novaPeca: Peca = {
        id: Date.now(),
        nome: pecaNome.trim(),
        modulo: pecaModulo.trim(),
        largura: pecaLargura.trim(),
        profundidade: pecaProfundidade.trim(),
        espessura: pecaEspessura.trim(),
        quantidade: pecaQuantidade.trim(),
      };

      setPecas((lista) => [...lista, novaPeca]);
    }

    fecharModal();
  };

  // =====================================================
  // FECHAR MODAL
  // =====================================================

  const fecharModal = () => {
    setModalVisible(false);
    setEditandoId(null);
    limparFormulario();
  };

  // =====================================================
  // EXCLUIR MEDIDA
  // =====================================================

  const excluirMedida = (id: number) => {
    Alert.alert(
      'Excluir medida',
      'Deseja realmente excluir esta medida?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            setMedidas((lista) =>
              lista.filter((medida) => medida.id !== id)
            );
          },
        },
      ]
    );
  };

  // =====================================================
  // EXCLUIR MÓDULO
  // =====================================================

  const excluirModulo = (id: number) => {
    Alert.alert(
      'Excluir módulo',
      'Deseja realmente excluir este módulo?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            setModulos((lista) =>
              lista.filter((modulo) => modulo.id !== id)
            );
          },
        },
      ]
    );
  };

  // =====================================================
  // EXCLUIR PEÇA
  // =====================================================

  const excluirPeca = (id: number) => {
    Alert.alert(
      'Excluir peça',
      'Deseja realmente excluir esta peça?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            setPecas((lista) =>
              lista.filter((peca) => peca.id !== id)
            );
          },
        },
      ]
    );
  };

  // =====================================================
  // TEXTO DO BOTÃO
  // =====================================================

  const getTextoBotao = () => {
    if (aba === 'ambiente') {
      return '＋ Adicionar Medida';
    }

    if (aba === 'modulo') {
      return '＋ Adicionar Módulo';
    }

    return '＋ Adicionar Peça';
  };

  // =====================================================
  // TÍTULO DO MODAL
  // =====================================================

  const getTituloModal = () => {
    if (editandoId !== null) {
      if (aba === 'ambiente') {
        return 'Editar Medida';
      }

      if (aba === 'modulo') {
        return 'Editar Módulo';
      }

      return 'Editar Peça';
    }

    if (aba === 'ambiente') {
      return 'Nova Medida';
    }

    if (aba === 'modulo') {
      return 'Novo Módulo';
    }

    return 'Nova Peça';
  };

  // =====================================================
  // TELA
  // =====================================================

  return (
    <View style={styles.container}>

      {/* =================================================
          CABEÇALHO
      ================================================= */}

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Text style={styles.backBtn}>
            ‹
          </Text>
        </TouchableOpacity>

        <Text style={styles.title}>
          Medidas
        </Text>

        <View style={styles.headerSpace} />

      </View>

      {/* =================================================
          ABAS
      ================================================= */}

      <View style={styles.tabs}>

        <TouchableOpacity
          style={[
            styles.tab,
            aba === 'ambiente' && styles.tabActive,
          ]}
          onPress={() => setAba('ambiente')}
        >
          <Text
            style={
              aba === 'ambiente'
                ? styles.tabTextActive
                : styles.tabText
            }
          >
            Ambiente
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            aba === 'modulo' && styles.tabActive,
          ]}
          onPress={() => setAba('modulo')}
        >
          <Text
            style={
              aba === 'modulo'
                ? styles.tabTextActive
                : styles.tabText
            }
          >
            Módulo
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            aba === 'pecas' && styles.tabActive,
          ]}
          onPress={() => setAba('pecas')}
        >
          <Text
            style={
              aba === 'pecas'
                ? styles.tabTextActive
                : styles.tabText
            }
          >
            Peças
          </Text>
        </TouchableOpacity>

      </View>

      {/* =================================================
          AMBIENTE
      ================================================= */}

      {aba === 'ambiente' && (
        <>

          <View style={styles.canvasPlaceholder}>

            <Text style={styles.ruler}>
              📐
            </Text>

            <Text style={styles.canvasText}>
              Esquema de Cotas do Ambiente
            </Text>

          </View>

          <TouchableOpacity
            style={styles.btnAdd}
            onPress={abrirAdicionar}
            activeOpacity={0.8}
          >
            <Text style={styles.btnAddText}>
              {getTextoBotao()}
            </Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>
            Medidas cadastradas
          </Text>

          <ScrollView
            style={styles.list}
            showsVerticalScrollIndicator={false}
          >

            {medidas.map((med) => (

              <View
                key={med.id}
                style={styles.item}
              >

                <View style={styles.itemContent}>

                  <Text style={styles.itemName}>
                    {med.item}
                  </Text>

                  <Text style={styles.itemDim}>
                    Largura: {med.largura} mm
                  </Text>

                  <Text style={styles.itemDim}>
                    Comprimento: {med.comprimento} mm
                  </Text>

                  <Text style={styles.itemDim}>
                    Profundidade: {med.profundidade} mm
                  </Text>

                </View>

                <View style={styles.actions}>

                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => editarMedida(med)}
                  >
                    <Text style={styles.editIcon}>
                      ✏️
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() =>
                      excluirMedida(med.id)
                    }
                  >
                    <Text style={styles.deleteIcon}>
                      🗑️
                    </Text>
                  </TouchableOpacity>

                </View>

              </View>

            ))}

            {medidas.length === 0 && (
              <Text style={styles.emptyText}>
                Nenhuma medida cadastrada.
              </Text>
            )}

          </ScrollView>

        </>
      )}

      {/* =================================================
          MÓDULOS
      ================================================= */}

      {aba === 'modulo' && (
        <>

          <TouchableOpacity
            style={styles.btnAdd}
            onPress={abrirAdicionar}
            activeOpacity={0.8}
          >
            <Text style={styles.btnAddText}>
              {getTextoBotao()}
            </Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>
            Módulos cadastrados
          </Text>

          <ScrollView
            style={styles.list}
            showsVerticalScrollIndicator={false}
          >

            {modulos.map((modulo) => (

              <View
                key={modulo.id}
                style={styles.item}
              >

                <View style={styles.itemContent}>

                  <Text style={styles.itemName}>
                    {modulo.nome}
                  </Text>

                  <Text style={styles.itemDim}>
                    Largura: {modulo.largura} mm
                  </Text>

                  <Text style={styles.itemDim}>
                    Profundidade: {modulo.profundidade} mm
                  </Text>

                  <Text style={styles.itemDim}>
                    Altura: {modulo.altura} mm
                  </Text>

                </View>

                <View style={styles.actions}>

                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() =>
                      editarModulo(modulo)
                    }
                  >
                    <Text style={styles.editIcon}>
                      ✏️
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() =>
                      excluirModulo(modulo.id)
                    }
                  >
                    <Text style={styles.deleteIcon}>
                      🗑️
                    </Text>
                  </TouchableOpacity>

                </View>

              </View>

            ))}

            {modulos.length === 0 && (
              <Text style={styles.emptyText}>
                Nenhum módulo cadastrado.
              </Text>
            )}

          </ScrollView>

        </>
      )}

      {/* =================================================
          PEÇAS
      ================================================= */}

      {aba === 'pecas' && (
        <>

          <TouchableOpacity
            style={styles.btnAdd}
            onPress={abrirAdicionar}
            activeOpacity={0.8}
          >
            <Text style={styles.btnAddText}>
              {getTextoBotao()}
            </Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>
            Peças cadastradas
          </Text>

          <ScrollView
            style={styles.list}
            showsVerticalScrollIndicator={false}
          >

            {pecas.map((peca) => (

              <View
                key={peca.id}
                style={styles.item}
              >

                <View style={styles.itemContent}>

                  <Text style={styles.itemName}>
                    {peca.nome}
                  </Text>

                  <Text style={styles.itemModule}>
                    Módulo: {peca.modulo}
                  </Text>

                  <Text style={styles.itemDim}>
                    Largura: {peca.largura} mm
                  </Text>

                  <Text style={styles.itemDim}>
                    Profundidade: {peca.profundidade} mm
                  </Text>

                  <Text style={styles.itemDim}>
                    Espessura: {peca.espessura} mm
                  </Text>

                  <Text style={styles.itemDim}>
                    Quantidade: {peca.quantidade}
                  </Text>

                </View>

                <View style={styles.actions}>

                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => editarPeca(peca)}
                  >
                    <Text style={styles.editIcon}>
                      ✏️
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() =>
                      excluirPeca(peca.id)
                    }
                  >
                    <Text style={styles.deleteIcon}>
                      🗑️
                    </Text>
                  </TouchableOpacity>

                </View>

              </View>

            ))}

            {pecas.length === 0 && (
              <Text style={styles.emptyText}>
                Nenhuma peça cadastrada.
              </Text>
            )}

          </ScrollView>

        </>
      )}

      {/* =================================================
          MODAL
      ================================================= */}

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={fecharModal}
      >

        <KeyboardAvoidingView
          style={styles.modalBackground}
          behavior={
            Platform.OS === 'ios'
              ? 'padding'
              : undefined
          }
        >

          <View style={styles.modal}>

            {/* CABEÇALHO DO MODAL */}

            <View style={styles.modalHeader}>

              <Text style={styles.modalTitle}>
                {getTituloModal()}
              </Text>

              <TouchableOpacity
                onPress={fecharModal}
                style={styles.modalCloseButton}
              >
                <Text style={styles.modalClose}>
                  ✕
                </Text>
              </TouchableOpacity>

            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >

              {/* =================================================
                  FORMULÁRIO - MEDIDA
              ================================================= */}

              {aba === 'ambiente' && (
                <>

                  <Text style={styles.inputLabel}>
                    Nome da medida
                  </Text>

                  <TextInput
                    style={styles.modalInput}
                    placeholder="Ex: Balcão"
                    placeholderTextColor="#666"
                    value={medidaNome}
                    onChangeText={setMedidaNome}
                  />

                  <Text style={styles.inputLabel}>
                    Largura (mm)
                  </Text>

                  <TextInput
                    style={styles.modalInput}
                    placeholder="Ex: 2600"
                    placeholderTextColor="#666"
                    keyboardType="numeric"
                    value={medidaLargura}
                    onChangeText={setMedidaLargura}
                  />

                  <Text style={styles.inputLabel}>
                    Comprimento (mm)
                  </Text>

                  <TextInput
                    style={styles.modalInput}
                    placeholder="Ex: 600"
                    placeholderTextColor="#666"
                    keyboardType="numeric"
                    value={medidaComprimento}
                    onChangeText={setMedidaComprimento}
                  />

                  <Text style={styles.inputLabel}>
                    Profundidade (mm)
                  </Text>

                  <TextInput
                    style={styles.modalInput}
                    placeholder="Ex: 900"
                    placeholderTextColor="#666"
                    keyboardType="numeric"
                    value={medidaProfundidade}
                    onChangeText={setMedidaProfundidade}
                  />

                </>
              )}

              {/* =================================================
                  FORMULÁRIO - MÓDULO
              ================================================= */}

              {aba === 'modulo' && (
                <>

                  <Text style={styles.inputLabel}>
                    Nome do módulo
                  </Text>

                  <TextInput
                    style={styles.modalInput}
                    placeholder="Ex: Módulo inferior"
                    placeholderTextColor="#666"
                    value={moduloNome}
                    onChangeText={setModuloNome}
                  />

                  <Text style={styles.inputLabel}>
                    Largura (mm)
                  </Text>

                  <TextInput
                    style={styles.modalInput}
                    placeholder="Ex: 800"
                    placeholderTextColor="#666"
                    keyboardType="numeric"
                    value={moduloLargura}
                    onChangeText={setModuloLargura}
                  />

                  <Text style={styles.inputLabel}>
                    Profundidade (mm)
                  </Text>

                  <TextInput
                    style={styles.modalInput}
                    placeholder="Ex: 600"
                    placeholderTextColor="#666"
                    keyboardType="numeric"
                    value={moduloProfundidade}
                    onChangeText={setModuloProfundidade}
                  />

                  <Text style={styles.inputLabel}>
                    Altura (mm)
                  </Text>

                  <TextInput
                    style={styles.modalInput}
                    placeholder="Ex: 720"
                    placeholderTextColor="#666"
                    keyboardType="numeric"
                    value={moduloAltura}
                    onChangeText={setModuloAltura}
                  />

                </>
              )}

              {/* =================================================
                  FORMULÁRIO - PEÇA
              ================================================= */}

              {aba === 'pecas' && (
                <>

                  <Text style={styles.inputLabel}>
                    Nome da peça
                  </Text>

                  <TextInput
                    style={styles.modalInput}
                    placeholder="Ex: Lateral esquerda"
                    placeholderTextColor="#666"
                    value={pecaNome}
                    onChangeText={setPecaNome}
                  />

                  <Text style={styles.inputLabel}>
                    Módulo
                  </Text>

                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.moduleSelector}
                  >

                    {modulos.map((modulo) => (

                      <TouchableOpacity
                        key={modulo.id}
                        style={[
                          styles.moduleOption,
                          pecaModulo === modulo.nome &&
                            styles.moduleOptionActive,
                        ]}
                        onPress={() =>
                          setPecaModulo(modulo.nome)
                        }
                      >

                        <Text
                          style={[
                            styles.moduleOptionText,
                            pecaModulo === modulo.nome &&
                              styles.moduleOptionTextActive,
                          ]}
                        >
                          {modulo.nome}
                        </Text>

                      </TouchableOpacity>

                    ))}

                  </ScrollView>

                  {modulos.length === 0 && (
                    <Text style={styles.warningText}>
                      Cadastre um módulo antes de cadastrar
                      uma peça.
                    </Text>
                  )}

                  <Text style={styles.inputLabel}>
                    Largura (mm)
                  </Text>

                  <TextInput
                    style={styles.modalInput}
                    placeholder="Ex: 720"
                    placeholderTextColor="#666"
                    keyboardType="numeric"
                    value={pecaLargura}
                    onChangeText={setPecaLargura}
                  />

                  <Text style={styles.inputLabel}>
                    Profundidade (mm)
                  </Text>

                  <TextInput
                    style={styles.modalInput}
                    placeholder="Ex: 600"
                    placeholderTextColor="#666"
                    keyboardType="numeric"
                    value={pecaProfundidade}
                    onChangeText={setPecaProfundidade}
                  />

                  <Text style={styles.inputLabel}>
                    Espessura (mm)
                  </Text>

                  <TextInput
                    style={styles.modalInput}
                    placeholder="Ex: 18"
                    placeholderTextColor="#666"
                    keyboardType="numeric"
                    value={pecaEspessura}
                    onChangeText={setPecaEspessura}
                  />

                  <Text style={styles.inputLabel}>
                    Quantidade
                  </Text>

                  <TextInput
                    style={styles.modalInput}
                    placeholder="Ex: 2"
                    placeholderTextColor="#666"
                    keyboardType="numeric"
                    value={pecaQuantidade}
                    onChangeText={setPecaQuantidade}
                  />

                </>
              )}

              {/* =================================================
                  BOTÃO SALVAR
              ================================================= */}

              <TouchableOpacity
                style={styles.saveButton}
                onPress={salvar}
                activeOpacity={0.8}
              >

                <Text style={styles.saveButtonText}>
                  {editandoId !== null
                    ? 'Salvar alterações'
                    : 'Cadastrar'}
                </Text>

              </TouchableOpacity>

              {/* CANCELAR */}

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={fecharModal}
              >

                <Text style={styles.cancelButtonText}>
                  Cancelar
                </Text>

              </TouchableOpacity>

            </ScrollView>

          </View>

        </KeyboardAvoidingView>

      </Modal>

    </View>
  );
}

// =====================================================
// ESTILOS
// =====================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
    paddingTop: 50,
  },

  // ===================================================
  // HEADER
  // ===================================================

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  backButton: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  backBtn: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '300',
    lineHeight: 35,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  headerSpace: {
    width: 35,
  },

  // ===================================================
  // TABS
  // ===================================================

  tabs: {
    flexDirection: 'row',
    backgroundColor: '#111111',
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
  },

  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },

  tabActive: {
    backgroundColor: '#FF2222',
  },

  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  tabText: {
    color: '#888888',
  },

  // ===================================================
  // PREVIEW AMBIENTE
  // ===================================================

  canvasPlaceholder: {
    height: 180,
    backgroundColor: '#111111',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#222222',
    marginBottom: 20,
  },

  ruler: {
    fontSize: 40,
  },

  canvasText: {
    color: '#666666',
    marginTop: 8,
    fontSize: 12,
  },

  // ===================================================
  // BOTÃO ADICIONAR
  // ===================================================

  btnAdd: {
    borderWidth: 1,
    borderColor: '#FF2222',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },

  btnAddText: {
    color: '#FF2222',
    fontWeight: 'bold',
    fontSize: 14,
  },

  // ===================================================
  // LISTA
  // ===================================================

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  list: {
    flex: 1,
  },

  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#111111',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#222222',
  },

  itemContent: {
    flex: 1,
    paddingRight: 10,
  },

  itemName: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 2,
  },

  itemDim: {
    color: '#888888',
    fontSize: 13,
    marginTop: 4,
  },

  itemModule: {
    color: '#FF5555',
    fontSize: 12,
    marginTop: 5,
    marginBottom: 2,
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  actionBtn: {
    marginLeft: 14,
    padding: 4,
  },

  editIcon: {
    fontSize: 17,
  },

  deleteIcon: {
    fontSize: 17,
  },

  emptyText: {
    color: '#666666',
    textAlign: 'center',
    marginTop: 30,
    fontSize: 14,
  },

  // ===================================================
  // MODAL
  // ===================================================

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.88)',
    justifyContent: 'flex-end',
  },

  modal: {
    backgroundColor: '#111111',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '90%',
    borderWidth: 1,
    borderColor: '#222222',
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  modalTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
  },

  modalCloseButton: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalClose: {
    color: '#FFFFFF',
    fontSize: 20,
  },

  // ===================================================
  // CAMPOS
  // ===================================================

  inputLabel: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 7,
    marginTop: 12,
  },

  modalInput: {
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    borderRadius: 7,
    color: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 13,
    fontSize: 14,
  },

  // ===================================================
  // SELETOR DE MÓDULOS
  // ===================================================

  moduleSelector: {
    marginBottom: 5,
  },

  moduleOption: {
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 7,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 8,
  },

  moduleOptionActive: {
    backgroundColor: '#FF2222',
    borderColor: '#FF2222',
  },

  moduleOptionText: {
    color: '#AAAAAA',
    fontSize: 13,
  },

  moduleOptionTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  warningText: {
    color: '#FF5555',
    fontSize: 12,
    marginTop: 8,
  },

  // ===================================================
  // BOTÃO SALVAR
  // ===================================================

  saveButton: {
    backgroundColor: '#E51C24',
    borderRadius: 7,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 25,
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  // ===================================================
  // CANCELAR
  // ===================================================

  cancelButton: {
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 10,
  },

  cancelButtonText: {
    color: '#999999',
    fontSize: 14,
  },
});
