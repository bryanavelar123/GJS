import React, { useState } from 'react';
import { Alert, Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { escolherFotosDoProjeto } from '../components/gjs-gallery';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Page, GjsHeader, Photo, SectionHeading, ServicePhotoCard, openWhatsApp } from '../components/gjs-premium';
import { PALETTE as P, PHONE_LABEL, photos, services, portfolio } from '../components/gjs-content';

const fields = [
  'Montagem de móveis',
  'Desmontagem',
  'Instalações',
  'Outro serviço',
];

function FormOrcamento({ onClose }: { onClose: () => void }) {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [servico, setServico] = useState(fields[0]);
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [observacoes, setObservacoes] = useState('');

  function enviar() {
    if (!nome.trim()) {
      if (Platform.OS === 'web' && typeof window !== 'undefined') window.alert('Informe seu nome.');
      else Alert.alert('Orçamento', 'Informe seu nome.');
      return;
    }
    if (cep.replace(/\D/g, '').length !== 8) {
      if (Platform.OS === 'web' && typeof window !== 'undefined') window.alert('Informe um CEP válido com 8 números.');
      else Alert.alert('Orçamento', 'Informe um CEP válido com 8 números.');
      return;
    }
    if (!rua.trim() || !numero.trim() || !bairro.trim() || !cidade.trim()) {
      if (Platform.OS === 'web' && typeof window !== 'undefined') window.alert('Preencha rua, número, bairro e cidade.');
      else Alert.alert('Orçamento', 'Preencha rua, número, bairro e cidade.');
      return;
    }
    const message = [
      'Olá! Gostaria de solicitar um orçamento com a GJS Montagem de Móveis.',
      '',
      'Nome: ' + nome.trim(),
      'Telefone: ' + (telefone.trim() || 'Não informado'),
      'Serviço: ' + servico,
      'CEP: ' + cep,
      'Rua / endereço: ' + rua.trim(),
      'Número: ' + numero.trim(),
      'Complemento: ' + (complemento.trim() || 'Não informado'),
      'Bairro: ' + bairro.trim(),
      'Cidade: ' + cidade.trim(),
      'Detalhes: ' + (observacoes.trim() || 'Não informado'),
    ].join('\n');
    void openWhatsApp(message);
  }

  return (
    <View style={s.form}>
      <View style={s.formHead}>
        <Text style={s.formTitle}>Peça seu orçamento</Text>
        <TouchableOpacity accessibilityRole="button" onPress={onClose}>
          <Ionicons name="close" color="#FFFFFF" size={25} />
        </TouchableOpacity>
      </View>
      <Text style={s.formIntro}>Preencha os dados e confirme o envio pelo WhatsApp.</Text>
      <Text style={s.formLabel}>Nome *</Text>
      <TextInput style={s.input} placeholder="Seu nome" placeholderTextColor="#8E8E8E" value={nome} onChangeText={setNome} autoCapitalize="words" autoComplete="name" returnKeyType="next" />
      <Text style={s.formLabel}>Telefone</Text>
      <TextInput style={s.input} placeholder="(41) 99999-9999" placeholderTextColor="#8E8E8E" keyboardType="phone-pad" inputMode="tel" autoComplete="tel" maxLength={16} value={telefone} onChangeText={setTelefone} />
      <Text style={s.formLabel}>Serviço</Text>
      <View style={s.serviceChoices}>
        {fields.map((item) => (
          <TouchableOpacity key={item} style={[s.chip, item === servico && s.chipSelected]} onPress={() => setServico(item)}>
            <Text style={[s.chipText, item === servico && s.chipSelectedText]}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={s.formLabel}>CEP *</Text>
      <TextInput
        style={s.input}
        placeholder="00000-000"
        placeholderTextColor="#8E8E8E"
        value={cep}
        onChangeText={(valor) => {
          const digitos = valor.replace(/\D/g, '').slice(0, 8);
          setCep(digitos.length > 5 ? digitos.slice(0, 5) + '-' + digitos.slice(5) : digitos);
        }}
        keyboardType="number-pad"
        inputMode="numeric"
        autoComplete="postal-code"
        maxLength={9}
      />
      <Text style={s.formLabel}>Rua / endereço *</Text>
      <TextInput style={s.input} placeholder="Ex.: Rua das Flores" placeholderTextColor="#8E8E8E" value={rua} onChangeText={setRua} autoCapitalize="words" returnKeyType="next" />
      <View style={s.addressRow}>
        <View style={s.numberColumn}>
          <Text style={s.formLabel}>Número *</Text>
          <TextInput style={s.input} placeholder="123" placeholderTextColor="#8E8E8E" keyboardType="number-pad" inputMode="numeric" maxLength={7} value={numero} onChangeText={(valor) => setNumero(valor.replace(/\D/g, ''))} />
        </View>
        <View style={s.complementColumn}>
          <Text style={s.formLabel}>Complemento</Text>
          <TextInput style={s.input} placeholder="Casa, ap., bloco" placeholderTextColor="#8E8E8E" value={complemento} onChangeText={setComplemento} returnKeyType="next" />
        </View>
      </View>
      <Text style={s.formLabel}>Bairro *</Text>
      <TextInput style={s.input} placeholder="Ex.: Centro" placeholderTextColor="#8E8E8E" value={bairro} onChangeText={setBairro} autoCapitalize="words" returnKeyType="next" />
      <Text style={s.formLabel}>Cidade *</Text>
      <TextInput style={s.input} placeholder="Ex.: Curitiba" placeholderTextColor="#8E8E8E" value={cidade} onChangeText={setCidade} autoCapitalize="words" returnKeyType="next" />
      <Text style={s.formLabel}>Informações sobre os móveis</Text>
      <TextInput multiline style={[s.input, s.textArea]} placeholder="Quantidade, modelo, tamanho..." placeholderTextColor="#8E8E8E" value={observacoes} onChangeText={setObservacoes} textAlignVertical="top" autoCapitalize="sentences" />
      <TouchableOpacity accessibilityRole="button" style={s.formSubmit} onPress={enviar}>
        <Text style={s.formSubmitText}>Enviar pelo WhatsApp ↗</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const [showQuote, setShowQuote] = useState(false);
  const [fotosProjetos, setFotosProjetos] = useState<string[]>([]);

  async function abrirPastaDeFotos() {
    const escolhidas = await escolherFotosDoProjeto();
    if (escolhidas.length) setFotosProjetos((anteriores) => [...anteriores, ...escolhidas]);
  }

  return (
    <Page current="home">
      <GjsHeader />

      <View style={s.topActions}>
        <TouchableOpacity style={s.quoteButton} accessibilityRole="button" onPress={() => setShowQuote(!showQuote)}>
          <Feather name="clipboard" color="#FFFFFF" size={24} />
          <Text style={s.quoteText}>Solicitar Orçamento</Text>
          <Ionicons name={showQuote ? 'chevron-up' : 'chevron-forward'} color="#FFFFFF" size={22} />
        </TouchableOpacity>
        <TouchableOpacity style={s.contactButton} accessibilityRole="button" onPress={() => void openWhatsApp('Olá! Gostaria de falar com a GJS Montagem de Móveis.')}>
          <Ionicons name="logo-whatsapp" color="#27D563" size={26} />
          <Text style={s.contactText}>Contato {PHONE_LABEL}</Text>
          <Ionicons name="chevron-forward" color="#FFFFFF" size={22} />
        </TouchableOpacity>
        {showQuote && <FormOrcamento onClose={() => setShowQuote(false)} />}
      </View>

      <Photo uri={photos.hero} style={s.hero}>
        <View style={s.heroOverlay} />
        <View style={s.heroContent}>
          <Text style={s.heroWhite}>Montagem de</Text>
          <Text style={s.heroWhite}>Móveis</Text>
          <Text style={s.heroRed}>com Qualidade!</Text>
          <View style={s.heroLine} />
          <Text style={s.heroDescription}>Profissionalismo, segurança e acabamento caprichado para o seu ambiente.</Text>
        </View>
      </Photo>

      <View style={s.section}>
        <SectionHeading title="Nossos Serviços" right="Ver todos" onRight={() => router.push('/servicos')} />
        <View style={s.serviceGrid}>
          {services.map((service) => (
            <ServicePhotoCard
              key={service.id}
              title={service.title}
              detail={service.short}
              image={service.image}
              icon={service.icon}
              onPress={() => void openWhatsApp('Olá! Gostaria de um orçamento para ' + service.title.toLowerCase() + '.')}
            />
          ))}
        </View>
      </View>

      <View style={s.section}>
        <SectionHeading title="Portfólio de Trabalhos" right="Ver mais" onRight={() => router.push('/portfolio')} />
        <View style={s.portfolioRow}>
          {portfolio.map((project) => (
            <TouchableOpacity key={project.id} style={s.portfolioCard} onPress={() => void abrirPastaDeFotos()} accessibilityRole="button" accessibilityLabel="Abrir a pasta de fotos de projetos">
              <Image source={{ uri: project.image }} style={s.portfolioPhoto} resizeMode="cover" />
            </TouchableOpacity>
          ))}
        </View>
        <Text style={s.photoDisclaimer}>Toque em um projeto para abrir as fotos do celular. Fotos acima são ilustrativas.</Text>
        {fotosProjetos.length > 0 && (
          <View style={s.selectedGallery}>
            <Text style={s.selectedTitle}>Fotos selecionadas nesta sessão</Text>
            <View style={s.portfolioRow}>
              {fotosProjetos.slice(-3).map((uri, index) => <Image key={uri + index} source={{ uri }} style={s.selectedPhoto} />)}
            </View>
          </View>
        )}
        <TouchableOpacity accessibilityRole="button" style={s.photosButton} onPress={() => void abrirPastaDeFotos()}>
          <Text style={s.photosButtonText}>Abrir pasta de fotos dos projetos  ›</Text>
        </TouchableOpacity>
      </View>
    </Page>
  );
}

const s = StyleSheet.create({
  topActions: { paddingHorizontal: 16, gap: 10, paddingBottom: 17 },
  quoteButton: { backgroundColor: '#CD0416', flexDirection: 'row', alignItems: 'center', minHeight: 63, paddingHorizontal: 14, borderRadius: 16, borderWidth: 1, borderColor: '#FB5160' },
  quoteText: { flex: 1, color: '#FFFFFF', fontSize: 18, fontWeight: '900', marginLeft: 10 },
  contactButton: { backgroundColor: '#0E0E0E', borderRadius: 16, borderWidth: 1.5, borderColor: '#E8E8E8', minHeight: 62, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center' },
  contactText: { flex: 1, color: '#FFFFFF', fontSize: 16, fontWeight: '800', marginLeft: 9 },
  hero: { height: 320, justifyContent: 'flex-start', backgroundColor: '#292321' },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.52)' },
  heroContent: { paddingTop: 33, paddingHorizontal: 20, maxWidth: 315 },
  heroWhite: { color: '#FFFFFF', fontWeight: '900', fontSize: 33, lineHeight: 36 },
  heroRed: { color: '#FF273C', fontWeight: '900', fontSize: 31, marginTop: 2 },
  heroLine: { width: 65, height: 4, backgroundColor: P.red, marginTop: 15, marginBottom: 14 },
  heroDescription: { color: '#FFFFFF', fontSize: 15, lineHeight: 22, maxWidth: 270 },
  section: { paddingHorizontal: 15, paddingTop: 25 },
  serviceGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  portfolioRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  portfolioCard: { flex: 1, borderColor: '#6E6E6E', borderWidth: 1, borderRadius: 13, overflow: 'hidden', backgroundColor: '#292929' },
  portfolioPhoto: { height: 150, width: '100%', backgroundColor: '#292929' },
  photoDisclaimer: { color: '#939393', fontSize: 11, marginTop: 11 },
  form: { backgroundColor: '#161616', borderRadius: 16, padding: 17, borderWidth: 1, borderColor: '#5D292D' },
  formHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  formTitle: { color: '#FFFFFF', fontSize: 21, fontWeight: '900' },
  formIntro: { color: '#C5C5C5', marginTop: 8, fontSize: 13 },
  formLabel: { color: '#FFFFFF', fontWeight: '800', marginTop: 17, marginBottom: 7, fontSize: 13 },
  input: { borderColor: '#4C4C4C', borderWidth: 1, backgroundColor: '#222222', color: '#FFFFFF', borderRadius: 10, padding: 12 },
  textArea: { height: 99 },
  addressRow: { flexDirection: 'row', gap: 10 },
  numberColumn: { width: '36%' },
  complementColumn: { flex: 1 },
  serviceChoices: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  chip: { borderWidth: 1, borderColor: '#5A5A5A', padding: 10, borderRadius: 15 },
  chipSelected: { backgroundColor: P.red, borderColor: P.red },
  chipText: { color: '#FFFFFF', fontSize: 12 },
  chipSelectedText: { fontWeight: '900' },
  selectedGallery: { paddingTop: 16 },
  selectedTitle: { color: '#FFFFFF', fontWeight: '800', marginBottom: 10 },
  selectedPhoto: { flex: 1, height: 100, borderRadius: 10, backgroundColor: '#222222' },
  photosButton: { borderWidth: 1, borderColor: '#E10619', borderRadius: 12, padding: 14, marginTop: 13, alignItems: 'center' },
  photosButtonText: { color: '#FFFFFF', fontWeight: '800' },
  formSubmit: { marginTop: 22, padding: 15, backgroundColor: P.red, borderRadius: 12, alignItems: 'center' },
  formSubmitText: { color: '#FFFFFF', fontWeight: '900' },
});
