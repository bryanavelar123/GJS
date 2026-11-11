import React, { useState } from 'react';
import {
  Alert, Linking, Platform, ScrollView, StyleSheet, Text, TextInput,
  StatusBar as NativeStatusBar,
  TouchableOpacity, View, useWindowDimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PHONE = '5541999739327';
const PHONE_DISPLAY = '(41) 99973-9327';
const C = {
  red: '#C1121F', redDark: '#8B0E18', black: '#111111',
  white: '#FFFFFF', pale: '#F7F7F7', muted: '#666666',
  border: '#E7E7E7', softRed: '#FDEBEC',
};

const services = [
  { tag: '01 / QUARTO', name: 'Guarda-roupas', detail: 'Montagem e regulagem.' },
  { tag: '02 / SALA', name: 'Painéis e racks', detail: 'Painéis de TV, racks e nichos.' },
  { tag: '03 / COZINHA', name: 'Cozinhas', detail: 'Armários e balcões.' },
  { tag: '04 / ORGANIZAÇÃO', name: 'Estantes e nichos', detail: 'Estantes e prateleiras.' },
  { tag: '05 / QUARTO', name: 'Camas e cômodas', detail: 'Camas, cabeceiras e cômodas.' },
  { tag: '06 / TRABALHO', name: 'Escritórios', detail: 'Mesas e móveis comerciais.' },
  { tag: '07 / MUDANÇA', name: 'Desmontagem', detail: 'Desmontagem e remontagem.' },
  { tag: '08 / INSTALAÇÃO', name: 'Instalações', detail: 'Suportes e acessórios.' },
];

const projects = [
  { symbol: '🪑', title: 'Montagem de móveis', detail: 'Quartos e dormitórios' },
  { symbol: '🗄️', title: 'Móveis planejados', detail: 'Organização e acabamento' },
  { symbol: '📺', title: 'Painel para TV', detail: 'Sala de estar' },
];

const steps = [
  { number: 'PASSO 01', title: 'Chame a GJS', detail: 'Envie uma foto do móvel.' },
  { number: 'PASSO 02', title: 'Receba o orçamento', detail: 'Combinamos o valor.' },
  { number: 'PASSO 03', title: 'Agende', detail: 'Escolha o melhor horário.' },
  { number: 'PASSO 04', title: 'Tudo pronto', detail: 'Aproveite seu móvel.' },
];

const faqs = [
  ['Como pedir orçamento?', 'Envie uma foto do móvel pelo WhatsApp da GJS.'],
  ['Quais móveis vocês montam?', 'Guarda-roupas, cozinhas, painéis, camas, mesas e muito mais.'],
  ['Vocês fazem desmontagem?', 'Consulte a disponibilidade para o serviço desejado.'],
  ['Quais regiões são atendidas?', 'Entre em contato informando sua cidade e bairro.'],
  ['Como posso agendar?', 'Envie sua solicitação pelo WhatsApp e combine uma data.'],
];

function notify(title: string, message: string) {
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    window.alert(title + '\n\n' + message);
  } else {
    Alert.alert(title, message);
  }
}

async function whatsapp(message: string) {
  const url = 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(message);
  try {
    await Linking.openURL(url);
  } catch {
    notify('WhatsApp', 'Não foi possível abrir o WhatsApp. Número: ' + PHONE_DISPLAY);
  }
}

function Button({ title, onPress, dark = false }: {
  title: string; onPress: () => void; dark?: boolean;
}) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.82}
      style={[s.button, dark && s.darkButton]}
      onPress={onPress}
    >
      <Text style={s.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

function SectionTitle({ tag, title, description, onDark = false }: {
  tag: string; title: string; description?: string; onDark?: boolean;
}) {
  return (
    <View style={s.sectionHeader}>
      <Text style={[s.kicker, onDark && s.textWhite]}>{tag}</Text>
      <Text style={[s.sectionTitle, onDark && s.textWhite]}>{title}</Text>
      {description ? (
        <Text style={[s.paragraph, onDark && s.textPale]}>{description}</Text>
      ) : null}
    </View>
  );
}

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const statusBarHeight = Platform.OS === 'android' ? (NativeStatusBar.currentHeight || 24) : 0;
  const topPadding = Math.max(12, insets.top + 10, statusBarHeight + 9);
  const bottomPadding = Math.max(20, insets.bottom + 20, Platform.OS === 'android' ? 58 : 0);
  const wide = width >= 740;

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [servico, setServico] = useState('');
  const [data, setData] = useState('');
  const [bairro, setBairro] = useState('');
  const [detalhes, setDetalhes] = useState('');
  const [faqAberta, setFaqAberta] = useState(-1);

  function sendQuote() {
    if (!nome.trim()) {
      notify('Campo obrigatório', 'Preencha seu nome para solicitar o orçamento.');
      return;
    }
    if (!servico) {
      notify('Campo obrigatório', 'Selecione o serviço desejado.');
      return;
    }
    const message = [
      'Olá! Gostaria de solicitar um orçamento com a GJS Montagem de Móveis.',
      '',
      'Nome: ' + nome.trim(),
      'Telefone: ' + (telefone.trim() || 'Não informado'),
      'Serviço: ' + servico,
      'Data desejada: ' + (data.trim() || 'A combinar'),
      'Cidade e bairro: ' + (bairro.trim() || 'Não informado'),
      'Detalhes: ' + (detalhes.trim() || 'Não informado'),
    ].join('\n');
    void whatsapp(message);
  }

  return (
    <View style={s.root}>
      <StatusBar style="dark" backgroundColor={C.white} />
      <View style={[s.topBar, { paddingTop: topPadding }]}>
        <View style={s.brandWrap}>
          <View style={s.logo}><Text style={s.logoLabel}>GJS</Text></View>
          <View style={{ flexShrink: 1 }}>
            <Text style={s.brand}>GJS Montagem</Text>
            <Text style={s.brandCaption}>MONTAGEM DE MÓVEIS</Text>
          </View>
        </View>
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => void whatsapp('Olá! Gostaria de solicitar um orçamento com a GJS.')}
          style={s.headerCTA}
        >
          <Text style={s.headerCTAText}>Orçamento ↗</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[s.content, wide && { maxWidth: 850, alignSelf: 'center' }]}>
          <View style={s.hero}>
            <Text style={s.heroLabel}>MONTAGEM PROFISSIONAL DE MÓVEIS</Text>
            <Text style={[s.heroTitle, wide && { fontSize: 54, lineHeight: 60 }]}>
              Seu móvel pronto,{'\n'}
              <Text style={s.redText}>sem complicação.</Text>
            </Text>
            <Text style={s.heroParagraph}>
              Montagem, desmontagem e instalação de móveis com cuidado,
              organização e acabamento caprichado.
            </Text>
            <Button
              title="Solicitar orçamento →"
              onPress={() => void whatsapp('Olá! Gostaria de solicitar um orçamento de montagem de móveis.')}
            />
            <View style={s.trust}>
              <Text style={s.trustItem}>✓ Capricho nos detalhes</Text>
              <Text style={s.trustItem}>✓ Pontualidade</Text>
              <Text style={s.trustItem}>✓ Orçamento rápido</Text>
            </View>
            <View style={s.heroBlack}>
              <Text style={s.heroEmoji}>🪑</Text>
              <Text style={s.heroBlackTitle}>GJS Montagem de Móveis</Text>
              <Text style={s.heroBlackCopy}>Do planejamento ao acabamento, cuidamos de cada detalhe.</Text>
              <Text style={s.heroBlackPhone}>WhatsApp: {PHONE_DISPLAY}</Text>
            </View>
          </View>

          <View style={s.section}>
            <SectionTitle
              tag="O QUE FAZEMOS"
              title="Serviços para deixar tudo no lugar."
              description="Atendimento para diferentes tipos de móveis, com atenção ao acabamento."
            />
            <View style={[s.cardsWrap, wide && s.rowCards]}>
              {services.map((service) => (
                <View key={service.tag} style={[s.serviceCard, wide && { width: '48.7%' }]}>
                  <Text style={s.cardTag}>{service.tag}</Text>
                  <Text style={s.cardHeading}>{service.name}</Text>
                  <Text style={s.cardBody}>{service.detail}</Text>
                </View>
              ))}
            </View>
            <Button
              title="Consultar serviço pelo WhatsApp →"
              onPress={() => void whatsapp('Olá! Gostaria de consultar um serviço de montagem de móveis.')}
            />
          </View>

          <View style={s.about}>
            <SectionTitle
              tag="GJS MONTAGEM DE MÓVEIS"
              title="Cuidado em cada peça. Capricho em cada detalhe."
              description="Nosso objetivo é entregar um serviço bem feito, com comunicação clara, organização durante a montagem e atenção ao acabamento final."
            />
            <Text style={s.paragraph}>Entre em contato, envie uma foto do móvel e solicite seu orçamento.</Text>
            <Button
              title="Falar com a GJS →"
              onPress={() => void whatsapp('Olá! Gostaria de falar com a GJS Montagem de Móveis.')}
            />
            <View style={s.aboutBlack}>
              <Text style={s.aboutTitle}>Um serviço bem feito faz toda a diferença.</Text>
              <Text style={s.aboutCopy}>Trabalhamos para que você receba seu móvel pronto para usar, com tudo conferido e o ambiente organizado.</Text>
              {['✓ Atendimento atencioso', '✓ Organização', '✓ Acabamento cuidadoso', '✓ Orçamento combinado'].map((item) => (
                <Text key={item} style={s.aboutCheck}>{item}</Text>
              ))}
            </View>
          </View>

          <View style={s.section}>
            <SectionTitle
              tag="PORTFÓLIO"
              title="Alguns trabalhos que fazemos."
              description="Tipos de serviços oferecidos pela GJS. Fotos reais podem ser adicionadas posteriormente."
            />
            {projects.map((project) => (
              <View key={project.title} style={s.portfolioCard}>
                <View style={s.portfolioArt}>
                  <Text style={s.portfolioEmoji}>{project.symbol}</Text>
                </View>
                <View style={s.portfolioCaption}>
                  <Text style={s.cardHeading}>{project.title}</Text>
                  <Text style={s.cardBody}>{project.detail}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={s.section}>
            <SectionTitle tag="COMO FUNCIONA" title="Do primeiro contato à montagem." />
            {steps.map((step) => (
              <View key={step.number} style={s.stepCard}>
                <Text style={s.cardTag}>{step.number}</Text>
                <Text style={s.cardHeading}>{step.title}</Text>
                <Text style={s.cardBody}>{step.detail}</Text>
              </View>
            ))}
          </View>

          <View style={s.booking}>
            <SectionTitle
              tag="ORÇAMENTO E CONTATO"
              title="Vamos montar seu próximo projeto?"
              description="Preencha os dados. O WhatsApp abrirá com sua mensagem pronta para revisar e enviar."
              onDark
            />
            <View style={s.form}>
              <Text style={s.formTitle}>Solicitar orçamento</Text>
              <Text style={s.formPhone}>Atendimento pelo WhatsApp{'\n'}{PHONE_DISPLAY}</Text>

              <Text style={s.inputLabel}>Seu nome *</Text>
              <TextInput
                style={s.input} placeholder="Como podemos te chamar?"
                placeholderTextColor="#777777" value={nome} onChangeText={setNome}
                autoCapitalize="words"
              />
              <Text style={s.inputLabel}>Seu telefone</Text>
              <TextInput
                style={s.input} placeholder="(00) 00000-0000"
                placeholderTextColor="#777777" value={telefone} onChangeText={setTelefone}
                keyboardType="phone-pad"
              />
              <Text style={s.inputLabel}>Tipo de serviço *</Text>
              <View style={s.options}>
                {services.map((service) => (
                  <TouchableOpacity
                    accessibilityRole="radio"
                    accessibilityState={{ selected: servico === service.name }}
                    key={service.name}
                    style={[s.option, servico === service.name && s.optionSelected]}
                    onPress={() => setServico(service.name)}
                  >
                    <Text style={[s.optionText, servico === service.name && s.optionTextSelected]}>
                      {service.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={s.inputLabel}>Data desejada</Text>
              <TextInput
                style={s.input} placeholder="Ex.: a combinar"
                placeholderTextColor="#777777" value={data} onChangeText={setData}
              />
              <Text style={s.inputLabel}>Cidade e bairro</Text>
              <TextInput
                style={s.input} placeholder="Cidade e bairro do atendimento"
                placeholderTextColor="#777777" value={bairro} onChangeText={setBairro}
              />
              <Text style={s.inputLabel}>Conte um pouco sobre o móvel</Text>
              <TextInput
                style={[s.input, s.textArea]}
                placeholder="Quantidade, tamanho, marca ou outras informações..."
                placeholderTextColor="#777777"
                value={detalhes} onChangeText={setDetalhes} multiline textAlignVertical="top"
              />
              <Button title="Enviar orçamento pelo WhatsApp ↗" onPress={sendQuote} dark />
              <Text style={s.formNotice}>O envio só acontece depois que você confirmar a mensagem no WhatsApp.</Text>
            </View>
          </View>

          <View style={s.section}>
            <SectionTitle tag="DÚVIDAS FREQUENTES" title="Respondemos para você." />
            {faqs.map(([question, answer], index) => (
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={{ expanded: faqAberta === index }}
                key={question}
                style={s.faqItem}
                onPress={() => setFaqAberta(faqAberta === index ? -1 : index)}
              >
                <View style={s.faqRow}>
                  <Text style={s.faqQuestion}>{question}</Text>
                  <Text style={s.faqSign}>{faqAberta === index ? '−' : '+'}</Text>
                </View>
                {faqAberta === index && <Text style={s.faqAnswer}>{answer}</Text>}
              </TouchableOpacity>
            ))}
          </View>

          <View style={s.footer}>
            <Text style={s.footerBrand}>GJS Montagem de Móveis</Text>
            <Text style={s.footerText}>Montagem, desmontagem e instalação de móveis.</Text>
            <Text style={s.footerPhone}>WhatsApp: {PHONE_DISPLAY}</Text>
            <Button
              title="Conversar no WhatsApp ↗"
              onPress={() => void whatsapp('Olá! Gostaria de solicitar um orçamento com a GJS Montagem de Móveis.')}
            />
            <Text style={s.copyright}>© 2026 GJS Montagem de Móveis</Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Falar pelo WhatsApp"
        onPress={() => void whatsapp('Olá! Gostaria de solicitar um orçamento com a GJS.')}
        style={[s.floating, { bottom: bottomPadding }]}
      >
        <Text style={s.floatingText}>WhatsApp ↗</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.white },
  scroll: { flex: 1, backgroundColor: C.white },
  scrollContent: { paddingBottom: 65 },
  content: { width: '100%' },
  topBar: { backgroundColor: C.white, paddingHorizontal: 14, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: C.border, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  brandWrap: { flexDirection: 'row', alignItems: 'center', gap: 8, flexShrink: 1 },
  logo: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: C.red },
  logoLabel: { fontSize: 16, fontWeight: '900', color: C.white },
  brand: { fontSize: 16, fontWeight: '900', color: C.black },
  brandCaption: { fontSize: 9, letterSpacing: 0.8, marginTop: 3, color: C.muted },
  headerCTA: { marginLeft: 8, padding: 11, backgroundColor: C.black, borderRadius: 22 },
  headerCTAText: { color: C.white, fontWeight: '800', fontSize: 12 },
  hero: { padding: 22, paddingTop: 36 },
  heroLabel: { alignSelf: 'flex-start', fontWeight: '900', fontSize: 10, color: C.red, backgroundColor: C.softRed, padding: 10, borderRadius: 18, overflow: 'hidden' },
  heroTitle: { color: C.black, fontWeight: '900', fontSize: 41, lineHeight: 47, letterSpacing: -1.8, marginTop: 24, marginBottom: 16 },
  redText: { color: C.red },
  heroParagraph: { color: C.muted, fontSize: 16, lineHeight: 26 },
  button: { backgroundColor: C.red, borderRadius: 28, paddingHorizontal: 19, paddingVertical: 16, alignSelf: 'flex-start', marginTop: 20 },
  darkButton: { backgroundColor: C.black },
  buttonText: { color: C.white, fontWeight: '900', fontSize: 14 },
  trust: { marginTop: 21, gap: 10 },
  trustItem: { color: C.black, fontWeight: '700', fontSize: 13 },
  heroBlack: { marginTop: 28, padding: 28, minHeight: 250, backgroundColor: C.black, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  heroEmoji: { fontSize: 75, marginBottom: 12 },
  heroBlackTitle: { color: C.white, fontSize: 22, fontWeight: '900', textAlign: 'center' },
  heroBlackCopy: { color: '#E6E6E6', textAlign: 'center', fontSize: 14, lineHeight: 22, marginTop: 8 },
  heroBlackPhone: { color: '#FFCDD2', fontWeight: '900', marginTop: 18 },
  section: { paddingHorizontal: 22, paddingVertical: 48, backgroundColor: C.white },
  sectionHeader: { marginBottom: 27 },
  kicker: { color: C.red, fontWeight: '900', fontSize: 11, letterSpacing: 1.2, marginBottom: 11 },
  sectionTitle: { color: C.black, fontWeight: '900', fontSize: 31, lineHeight: 38, marginBottom: 12 },
  paragraph: { color: C.muted, lineHeight: 24, fontSize: 15, marginBottom: 12 },
  textWhite: { color: C.white },
  textPale: { color: '#EEEEEE' },
  cardsWrap: { width: '100%' },
  rowCards: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  serviceCard: { minHeight: 137, borderColor: C.border, borderWidth: 1, borderRadius: 17, padding: 20, marginBottom: 12, backgroundColor: C.white },
  cardTag: { color: C.red, fontWeight: '900', fontSize: 11 },
  cardHeading: { color: C.black, fontWeight: '900', fontSize: 18, marginTop: 12, marginBottom: 6 },
  cardBody: { color: C.muted, fontSize: 13, lineHeight: 21 },
  about: { backgroundColor: C.pale, padding: 22, paddingVertical: 50 },
  aboutBlack: { backgroundColor: C.black, padding: 25, borderRadius: 20, marginTop: 25 },
  aboutTitle: { color: C.white, fontSize: 23, fontWeight: '900', lineHeight: 30 },
  aboutCopy: { color: '#E7E7E7', lineHeight: 23, marginVertical: 14 },
  aboutCheck: { marginTop: 10, color: C.white, fontWeight: '700' },
  portfolioCard: { borderWidth: 1, borderColor: C.border, borderRadius: 18, marginBottom: 15, overflow: 'hidden' },
  portfolioArt: { height: 165, backgroundColor: '#F1F1F1', alignItems: 'center', justifyContent: 'center' },
  portfolioEmoji: { fontSize: 65 },
  portfolioCaption: { padding: 16 },
  stepCard: { backgroundColor: C.white, padding: 21, borderWidth: 1, borderColor: C.border, borderTopColor: C.red, borderTopWidth: 3, borderRadius: 12, marginBottom: 13 },
  booking: { backgroundColor: C.redDark, padding: 22, paddingVertical: 51 },
  form: { backgroundColor: C.white, padding: 20, borderRadius: 20 },
  formTitle: { color: C.black, fontWeight: '900', fontSize: 23 },
  formPhone: { color: C.red, fontWeight: '800', fontSize: 14, lineHeight: 22, marginTop: 8, marginBottom: 16 },
  inputLabel: { color: C.black, fontWeight: '800', fontSize: 13, marginTop: 16, marginBottom: 8 },
  input: { backgroundColor: '#FAFAFA', color: C.black, fontSize: 14, borderWidth: 1, borderColor: C.border, borderRadius: 10, paddingHorizontal: 13, paddingVertical: 13 },
  textArea: { minHeight: 110 },
  options: { gap: 7 },
  option: { borderWidth: 1, borderColor: C.border, borderRadius: 9, padding: 11 },
  optionSelected: { backgroundColor: C.red, borderColor: C.red },
  optionText: { color: C.black, fontWeight: '700' },
  optionTextSelected: { color: C.white },
  formNotice: { color: C.muted, textAlign: 'center', fontSize: 12, lineHeight: 18, marginTop: 17 },
  faqItem: { borderBottomWidth: 1, borderBottomColor: C.border, paddingVertical: 18 },
  faqRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  faqQuestion: { flex: 1, color: C.black, fontSize: 14, fontWeight: '900' },
  faqSign: { color: C.red, fontSize: 23, marginLeft: 8 },
  faqAnswer: { color: C.muted, fontSize: 14, lineHeight: 23, marginTop: 10 },
  footer: { backgroundColor: C.black, padding: 25, paddingVertical: 40 },
  footerBrand: { color: C.white, fontWeight: '900', fontSize: 21 },
  footerText: { color: '#D6D6D6', marginTop: 13, fontSize: 13 },
  footerPhone: { color: '#FFCDD2', fontWeight: '900', marginTop: 18, fontSize: 15 },
  copyright: { color: '#AAAAAA', fontSize: 12, marginTop: 25 },
  floating: { position: 'absolute', right: 17, bottom: 16, backgroundColor: C.red, paddingHorizontal: 20, paddingVertical: 15, borderRadius: 25, elevation: 7 },
  floatingText: { color: C.white, fontSize: 14, fontWeight: '900' },
});
