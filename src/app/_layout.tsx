import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function GJSLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Correção: No iOS/Android moderno, apenas o estilo 'light' é necessário */}
      {/* O fundo preto é herdado da própria janela/tela do aplicativo */}
      <StatusBar style="light" />
      
      <Stack
        screenOptions={{
          headerShown: false, // Oculta o cabeçalho padrão
          contentStyle: { backgroundColor: '#000000' }, // Isto garante o fundo preto em 100% da tela (inclusive sob a StatusBar)
          animation: 'fade_from_bottom', 
        }}
      >
        {/* Tela do formulário de novo projeto */}
        <Stack.Screen name="index" />'
      </Stack>
    </GestureHandlerRootView>
  );
}

