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
import { useRouter } from 'expo-router';

export default function NewProjectScreen() {
  const router = useRouter();

  // Estados do formulário
  const [projectName, setProjectName] = useState('');
  const [client, setClient] = useState('');
  const [environment, setEnvironment] = useState('');
  const [description, setDescription] = useState('');

  // Botão voltar
  const handleBack = () => {
    router.back();
  };

  // Botão avançar
  const handleAdvance = () => {
    if (
      !projectName.trim() ||
      !client.trim() ||
      !environment.trim()
    ) {
      Alert.alert(
        'Erro',
        'Por favor, preencha os campos obrigatórios (Nome, Cliente e Ambiente).'
      );
      return;
    }

    const projectData = {
      nomeDoProjeto: projectName.trim(),
      cliente: client.trim(),
      ambiente: environment.trim(),
      descricao: description.trim(),
    };

    console.log('Dados do Projeto:', projectData);

    Alert.alert(
      'Sucesso',
      `Projeto "${projectData.nomeDoProjeto}" criado com sucesso!`,
      [
        {
          text: 'OK',
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#000000"
      />

      {/* CABEÇALHO */}
      <View style={styles.header}>

        {/* BOTÃO VOLTAR */}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Novo Projeto
        </Text>

        <View style={styles.placeholder} />
      </View>

      {/* FORMULÁRIO */}
      <ScrollView
        contentContainerStyle={styles.formContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >

        {/* NOME DO PROJETO */}
        <Text style={styles.label}>
          Nome do projeto
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ex: Cozinha planejada"
          placeholderTextColor="#444"
          value={projectName}
          onChangeText={setProjectName}
          autoCapitalize="sentences"
        />

        {/* CLIENTE */}
        <Text style={styles.label}>
          Cliente
        </Text>

        <View style={styles.dropdownContainer}>
          <TextInput
            style={styles.dropdownInput}
            placeholder="Selecione o cliente"
            placeholderTextColor="#444"
            value={client}
            onChangeText={setClient}
            autoCapitalize="words"
          />

          <Text style={styles.arrowIcon}>
            ▼
          </Text>
        </View>

        {/* AMBIENTE */}
        <Text style={styles.label}>
          Ambiente
        </Text>

        <View style={styles.dropdownContainer}>
          <TextInput
            style={styles.dropdownInput}
            placeholder="Selecione o ambiente"
            placeholderTextColor="#444"
            value={environment}
            onChangeText={setEnvironment}
            autoCapitalize="sentences"
          />

          <Text style={styles.arrowIcon}>
            ▼
          </Text>
        </View>

        {/* DESCRIÇÃO */}
        <Text style={styles.label}>
          Descrição
        </Text>

        <TextInput
          style={[
            styles.input,
            styles.textArea,
          ]}
          placeholder="Digite uma descrição do projeto..."
          placeholderTextColor="#444"
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
          value={description}
          onChangeText={setDescription}
        />

      </ScrollView>

      {/* BOTÃO INFERIOR */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleAdvance}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            Avançar
          </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },

  // HEADER
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#111111',
  },

  closeButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },

  closeText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '300',
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  placeholder: {
    width: 32,
    height: 32,
  },

  // FORMULÁRIO
  formContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 120,
  },

  label: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 16,
  },

  input: {
    backgroundColor: '#111111',
    color: '#FFFFFF',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 14,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#1F1F1F',
  },

  // CAMPOS COM SETA
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111111',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#1F1F1F',
    paddingRight: 12,
  },

  dropdownInput: {
    flex: 1,
    color: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 14,
    fontSize: 14,
  },

  arrowIcon: {
    color: '#444444',
    fontSize: 12,
  },

  textArea: {
    height: 120,
    paddingTop: 14,
  },

  // RODAPÉ
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000000',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },

  // BOTÃO AVANÇAR
  button: {
    backgroundColor: '#E51C24',
    borderRadius: 6,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
