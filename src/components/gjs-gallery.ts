import { Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// Abre a galeria do aparelho somente quando a pessoa toca em Projetos.
// O sistema permite escolher fotos sem acesso irrestrito aos arquivos.
export async function escolherFotosDoProjeto(): Promise<string[]> {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      selectionLimit: 10,
      quality: 0.85,
      allowsEditing: false,
    });
    if (result.canceled || !result.assets) return [];
    return result.assets.map((asset) => asset.uri).filter(Boolean);
  } catch {
    const mensagem = 'Não foi possível abrir as fotos. Verifique as permissões e tente novamente.';
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.alert(mensagem);
    } else {
      Alert.alert('Fotos de projetos', mensagem);
    }
    return [];
  }
}
