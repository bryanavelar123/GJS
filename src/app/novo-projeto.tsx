import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  ScrollView,
} from 'react-native';

export default function NewProjectScreen() {
  // Estados para gerenciar as entradas do formulário
  const [projectName, setProjectName] = useState('');
  const [client, setClient] = useState('');
  const [environment, setEnvironment] = useState('');
  const [description, setDescription] = useState('');

  // Função disparada ao clicar no botão "Avançar"
  const handleAdvance = () => {
    if (!projectName.trim() || !client.trim() || !environment.trim()) {
      Alert.alert('Erro', 'Por favor, preencha os campos obrigatórios (Nome, Cliente e Ambiente).');
      return;
    }

    // Objeto final com as informações salvas
    const projectData = {
      nomeDoProjeto: projectName,
      cliente: client,
      ambiente: environment,
      descricao: description,
    };

    Alert.alert('Sucesso', `Projeto "${projectData.nomeDoProjeto}" criado com sucesso!`);
    console.log('Dados do Projeto:', projectData);
    
    // Aqui você pode adicionar a navegação: navigation.navigate('ProximaTela', { projectData });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={() => Alert.alert('Fechar', 'Fechar tela')}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Novo Projeto</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Formulário com rolagem garantida */}
      <ScrollView contentContainerStyle={styles.formContainer} keyboardShouldPersistTaps="handled">
        
        {/* Campo: Nome do Projeto */}
        <Text style={styles.label}>Nome do projeto</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Cozinha planejada"
          placeholderTextColor="#444"
          value={projectName}
          onChangeText={setProjectName}
        />

        {/* Campo: Cliente */}
        <Text style={styles.label}>Cliente</Text>
        <View style={styles.dropdownContainer}>
          <TextInput
            style={styles.dropdownInput}
            placeholder="Selecione o cliente"
            placeholderTextColor="#444"
            value={client}
            onChangeText={setClient}
          />
          <Text style={styles.arrowIcon}>▼</Text>
        </View>

        {/* Campo: Ambiente */}
        <Text style={styles.label}>Ambiente</Text>
        <View style={styles.dropdownContainer}>
          <TextInput
            style={styles.dropdownInput}
            placeholder="Selecione o ambiente"
            placeholderTextColor="#444"
            value={environment}
            onChangeText={setEnvironment}
          />
          <Text style={styles.arrowIcon}>▼</Text>
        </View>

        {/* Campo: Descrição */}
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Digite uma descrição do projeto..."
          placeholderTextColor="#444"
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
          value={description}
          onChangeText={setDescription}
        />
      </ScrollView>

      {/* Botão Fixo Inferior */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleAdvance} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Avançar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Fundo preto puro da interface original
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#111',
  },
  closeButton: {
    padding: 4,
  },
  closeText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '300',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 24, // Mantém o alinhamento centralizado do título
  },
  formContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100, // Espaço para não cobrir o conteúdo com o botão inferior
  },
  label: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#111111', // Caixa cinza muito escura
    color: '#FFF',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 14,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#1f1f1f',
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111111',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#1f1f1f',
    paddingRight: 12,
  },
  dropdownInput: {
    flex: 1,
    color: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 14,
    fontSize: 14,
  },
  arrowIcon: {
    color: '#444',
    fontSize: 12,
  },
  textArea: {
    height: 120,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  button: {
    backgroundColor: '#E51C24', // Vermelho vivo do botão "Avançar"
    borderRadius: 6,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
