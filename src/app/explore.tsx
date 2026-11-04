import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

const services = [
  ['Guarda-roupas', 'Montagem, regulagem de portas, gavetas e dobradiças.'],
  ['Painéis e racks', 'Instalação de painéis de TV, racks, nichos e prateleiras.'],
  ['Cozinhas', 'Armários, balcões e módulos com alinhamento cuidadoso.'],
  ['Desmontagem', 'Desmontagem e remontagem para mudanças e reorganizações.'],
];

export default function ServicosScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <TouchableOpacity onPress={() => router.back()}><Text style={styles.back}>‹ Voltar</Text></TouchableOpacity>
      <Text style={styles.kicker}>GJS MONTAGEM DE MÓVEIS</Text>
      <Text style={styles.title}>Serviços para deixar tudo no lugar.</Text>
      <Text style={styles.subtitle}>Atendimento com organização, cuidado e acabamento.</Text>

      {services.map(([title, description], index) => (
        <View key={title} style={styles.card}>
          <Text style={styles.number}>{String(index + 1).padStart(2, '0')}</Text>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardText}>{description}</Text>
        </View>
      ))}

      <TouchableOpacity style={styles.button} onPress={() => router.push('/orcamento')}>
        <Text style={styles.buttonText}>Criar orçamento</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#F6F3EA' },
  content: { padding: 20, paddingTop: 50, paddingBottom: 50 },
  back: { color: '#650606', fontWeight: '800', marginBottom: 24 },
  kicker: { color: '#650606', fontSize: 11, fontWeight: '900', letterSpacing: 1.4 },
  title: { color: '#302424', fontSize: 30, lineHeight: 35, fontWeight: '900', marginTop: 8 },
  subtitle: { color: '#786D6D', marginTop: 8, marginBottom: 22, lineHeight: 20 },
  card: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#E6DED3', borderRadius: 18, padding: 18, marginBottom: 12 },
  number: { color: '#650606', fontWeight: '900', fontSize: 12 },
  cardTitle: { color: '#302424', fontWeight: '900', fontSize: 18, marginTop: 9 },
  cardText: { color: '#786D6D', lineHeight: 20, marginTop: 5 },
  button: { backgroundColor: '#D9F36A', borderRadius: 14, padding: 16, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#27331F', fontWeight: '900', fontSize: 16 },
});
