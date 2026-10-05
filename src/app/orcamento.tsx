import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function OrcamentoScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* CABEÇALHO */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backBtn}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Orçamento</Text>

          <View style={styles.headerSpace} />
        </View>

        {/* PROJETO */}
        <View style={styles.projectCard}>
          <View style={styles.imgPlaceholder}>
            <Text style={styles.camera}>📸</Text>
          </View>

          <View style={styles.projectInfo}>
            <Text style={styles.projName}>
              Cozinha Moderna
            </Text>

            <Text style={styles.projClient}>
              Cliente: Mariana
            </Text>

            <Text style={styles.projDate}>
              12/09/2025
            </Text>
          </View>
        </View>

        {/* RESUMO DO ORÇAMENTO */}
        <View style={styles.breakdown}>
          <Text style={styles.sectionTitle}>
            Resumo dos custos
          </Text>

          <View style={styles.row}>
            <Text style={styles.label}>MDF e chapas</Text>
            <Text style={styles.val}>R$ 1.850,00</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Ferragens</Text>
            <Text style={styles.val}>R$ 320,00</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Acessórios</Text>
            <Text style={styles.val}>R$ 150,00</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Mão de obra</Text>
            <Text style={styles.val}>R$ 1.200,00</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Outros</Text>
            <Text style={styles.val}>R$ 180,00</Text>
          </View>

          {/* TOTAL */}
          <View style={[styles.row, styles.totalRow]}>
            <Text style={styles.totalLabel}>da 
              Valor total
            </Text>

            <Text style={styles.totalVal}>
              R$ 3.700,00
            </Text>
          </View>
        </View>

        {/* BOTÕES */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.btnSecondary}>
            <Text style={styles.btnSecText}>
              📄 Gerar PDF
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnSecondary}>
            <Text style={styles.btnSecText}>
              🔗 Compartilhar
            </Text>
          </TouchableOpacity>
        </View>

        {/* FINALIZAR */}
        <TouchableOpacity
          style={styles.btnFinal}
          onPress={() => router.replace('/home')}
        >
          <Text style={styles.btnFinalText}>
            Finalizar Orçamento
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },

  scrollContent: {
    padding: 20,
    paddingTop: 50,
    paddingBottom: 30,
  },

  /* HEADER */

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  backBtn: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: '300',
    lineHeight: 40,
  },

  headerSpace: {
    width: 40,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },

  /* PROJETO */

  projectCard: {
    flexDirection: 'row',
    backgroundColor: '#111111',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#222222',
  },

  imgPlaceholder: {
    width: 55,
    height: 55,
    backgroundColor: '#222222',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  camera: {
    fontSize: 22,
  },

  projectInfo: {
    marginLeft: 12,
  },

  projName: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },

  projClient: {
    color: '#888888',
    fontSize: 12,
    marginBottom: 3,
  },

  projDate: {
    color: '#555555',
    fontSize: 11,
  },

  /* RESUMO */

  breakdown: {
    backgroundColor: '#111111',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#222222',
    marginBottom: 20,
  },

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#222222',
  },

  label: {
    color: '#888888',
    fontSize: 14,
  },

  val: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 14,
  },

  totalRow: {
    borderBottomWidth: 0,
    marginTop: 10,
    paddingVertical: 8,
  },

  totalLabel: {
    color: '#FF2222',
    fontWeight: 'bold',
    fontSize: 17,
  },

  totalVal: {
    color: '#FF2222',
    fontWeight: 'bold',
    fontSize: 20,
  },

  /* BOTÕES */

  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  btnSecondary: {
    flex: 0.48,
    backgroundColor: '#111111',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },

  btnSecText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },

  /* FINALIZAR */

  btnFinal: {
    backgroundColor: '#FF2222',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },

  btnFinalText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});