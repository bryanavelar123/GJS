import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { getSession, listProjects, Project, signOut } from '@/lib/backend';

export default function HomeScreen() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const carregar = useCallback(async () => {
    if (!getSession()) {
      router.replace('/login');
      return;
    }
    try {
      setLoading(true);
      setProjects(await listProjects());
    } catch (error) {
      Alert.alert('Erro ao carregar', error instanceof Error ? error.message : 'Falha de conexão.');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useFocusEffect(useCallback(() => { void carregar(); }, [carregar]));

  const sair = async () => {
    await signOut();
    router.replace('/login');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={carregar} />}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.brand}>GJS</Text>
          <Text style={styles.subtitle}>Montagem de Móveis</Text>
        </View>
        <TouchableOpacity onPress={sair} accessibilityRole="button">
          <Text style={styles.logout}>Sair</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.hero}>
        <Text style={styles.heroTag}>GESTÃO DE SERVIÇOS</Text>
        <Text style={styles.heroTitle}>Projetos organizados, do orçamento à montagem.</Text>
        <Text style={styles.heroText}>Cadastre clientes, medidas, materiais e valores com segurança.</Text>
      </View>

      <View style={styles.grid}>
        <Action title="Novo projeto" icon="＋" primary onPress={() => router.push('/novo-projeto')} />
        <Action title="Orçamento" icon="R$" onPress={() => router.push('/orcamento')} />
        <Action title="Materiais" icon="▦" onPress={() => router.push('/materiais')} />
        <Action title="Serviços" icon="✓" onPress={() => router.push('/explore')} />
      </View>

      <Text style={styles.sectionTitle}>Projetos recentes</Text>

      {loading && projects.length === 0 ? (
        <ActivityIndicator color="#650606" style={{ marginTop: 20 }} />
      ) : projects.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>Nenhum projeto ainda</Text>
          <Text style={styles.emptyText}>Crie seu primeiro projeto para começar.</Text>
        </View>
      ) : (
        projects.map((project) => (
          <TouchableOpacity
            key={project.id}
            style={styles.project}
            onPress={() => router.push({ pathname: '/medidas', params: { projectId: project.id, name: project.name } } as any)}
            accessibilityRole="button"
          >
            <View style={styles.projectIcon}><Text style={styles.projectIconText}>G</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.projectName}>{project.name}</Text>
              <Text style={styles.projectMeta}>{project.environment} · {project.status}</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}

function Action({ title, icon, primary, onPress }: { title: string; icon: string; primary?: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity style={[styles.action, primary && styles.actionPrimary]} onPress={onPress} accessibilityRole="button">
      <Text style={[styles.actionIcon, primary && styles.actionPrimaryText]}>{icon}</Text>
      <Text style={[styles.actionText, primary && styles.actionPrimaryText]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F3EA' },
  content: { padding: 20, paddingTop: 52, paddingBottom: 48 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  brand: { color: '#650606', fontSize: 30, fontWeight: '900' },
  subtitle: { color: '#716666', fontSize: 12 },
  logout: { color: '#650606', fontWeight: '800', padding: 10 },
  hero: { backgroundColor: '#650606', borderRadius: 24, padding: 22, marginTop: 22 },
  heroTag: { color: '#D9F36A', fontSize: 11, fontWeight: '900', letterSpacing: 1.3 },
  heroTitle: { color: '#fff', fontSize: 26, lineHeight: 31, fontWeight: '900', marginTop: 10 },
  heroText: { color: '#EBDDDD', marginTop: 10, lineHeight: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 18 },
  action: { width: '48%', minHeight: 112, borderRadius: 18, backgroundColor: '#fff', padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#E6DED3', justifyContent: 'space-between' },
  actionPrimary: { backgroundColor: '#D9F36A', borderColor: '#D9F36A' },
  actionIcon: { color: '#650606', fontWeight: '900', fontSize: 22 },
  actionText: { color: '#302424', fontWeight: '800' },
  actionPrimaryText: { color: '#27331F' },
  sectionTitle: { fontSize: 20, fontWeight: '900', color: '#302424', marginTop: 18, marginBottom: 12 },
  empty: { backgroundColor: '#fff', padding: 22, borderRadius: 18, borderWidth: 1, borderColor: '#E6DED3' },
  emptyTitle: { color: '#302424', fontWeight: '900', fontSize: 16 },
  emptyText: { color: '#766B6B', marginTop: 5 },
  project: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#E6DED3' },
  projectIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#650606', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  projectIconText: { color: '#D9F36A', fontWeight: '900' },
  projectName: { color: '#302424', fontWeight: '900' },
  projectMeta: { color: '#786D6D', fontSize: 12, marginTop: 3 },
  arrow: { color: '#650606', fontSize: 28 },
});
