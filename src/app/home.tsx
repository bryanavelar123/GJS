import React, { useState } from 'react';
import { Alert, Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
  const [bairro, setBairro] = useState('');
  const [observacoes, setObservacoes] = useState('');

  function enviar() {
    if (!nome.trim()) {
      if (Platform.OS === 'web' && typeof window !== 'undefined') window.alert('Informe seu nome.');
      else Alert.alert('Orçamento', 'Informe seu nome.');
      return;
    }
    const message = [
      'Olá! Gostaria de solicitar um orçamento com a GJS Montagem de Móveis.',
      '',
      'Nome: ' + nome.trim(),
      'Telefone: ' + (telefone.trim() || 'Não informado'),
      'Serviço: ' + servico,
      'Cidade e bairro: ' + (bairro.trim() || 'Não informado'),
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
      <TextInput style={s.input} placeholder="Seu nome" placeholderTextColor="#8E8E8E" value={nome} onChangeText={setNome} />
      <Text style={s.formLabel}>Telefone</Text>
      <TextInput style={s.input} placeholder="Seu telefone" placeholderTextColor="#8E8E8E" keyboardType="phone-pad" value={telefone} onChangeText={setTelefone} />
      <Text style={s.formLabel}>Serviço</Text>
      <View style={s.serviceChoices}>
        {fields.map((item) => (
          <TouchableOpacity key={item} style={[s.chip, item === servico && s.chipSelected]} onPress={() => setServico(item)}>
            <Text style={[s.chipText, item === servico && s.chipSelectedText]}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={s.formLabel}>Cidade e bairro</Text>
      <TextInput style={s.input} placeholder="Onde será o serviço?" placeholderTextColor="#8E8E8E" value={bairro} onChangeText={setBairro} />
      <Text style={s.formLabel}>Informações sobre os móveis</Text>
      <TextInput multiline style={[s.input, s.textArea]} placeholder="Quantidade, modelo, tamanho..." placeholderTextColor="#8E8E8E" value={observacoes} onChangeText={setObservacoes} textAlignVertical="top" />
      <TouchableOpacity accessibilityRole="button" style={s.formSubmit} onPress={enviar}>
        <Text style={s.formSubmitText}>Enviar pelo WhatsApp ↗</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const [showQuote, setShowQuote] = useState(false);

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
            <TouchableOpacity key={project.id} style={s.portfolioCard} onPress={() => router.push('/portfolio')} accessibilityRole="button">
              <Image source={{ uri: project.image }} style={s.portfolioPhoto} resizeMode="cover" />
            </TouchableOpacity>
          ))}
        </View>
        <Text style={s.photoDisclaimer}>Fotos ilustrativas de ambientes e tipos de montagem.</Text>
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
  serviceChoices: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  chip: { borderWidth: 1, borderColor: '#5A5A5A', padding: 10, borderRadius: 15 },
  chipSelected: { backgroundColor: P.red, borderColor: P.red },
  chipText: { color: '#FFFFFF', fontSize: 12 },
  chipSelectedText: { fontWeight: '900' },
  formSubmit: { marginTop: 22, padding: 15, backgroundColor: P.red, borderRadius: 12, alignItems: 'center' },
  formSubmitText: { color: '#FFFFFF', fontWeight: '900' },
});
