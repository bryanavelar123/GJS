import React from 'react';
import {
  Alert, Image, ImageBackground, Linking, Platform, ScrollView, StyleSheet,
  Text, TouchableOpacity, View, useWindowDimensions,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PALETTE as P, PHONE, PHONE_LABEL } from './gjs-content';

export async function openWhatsApp(message?: string) {
  const text = message || 'Olá! Gostaria de solicitar um orçamento com a GJS Montagem de Móveis.';
  const url = 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(text);
  try {
    await Linking.openURL(url);
  } catch {
    const msg = 'Não foi possível abrir o WhatsApp. Número: ' + PHONE_LABEL;
    if (Platform.OS === 'web' && typeof window !== 'undefined') window.alert(msg);
    else Alert.alert('GJS', msg);
  }
}

export function GjsLogo({ size = 82 }: { size?: number }) {
  return (
    <Image
      accessibilityLabel="Logo GJS Móveis com engrenagens e ferramentas"
      source={require('../../assets/images/logo-gjs.jpg')}
      style={{ width: size, height: size, borderRadius: size / 2 }}
      resizeMode="contain"
    />
  );
}

export function GjsHeader() {
  return (
    <View style={styles.header}>
      <GjsLogo size={88} />
      <View style={styles.brand}>
        <Text style={styles.brandGjs}>GJS</Text>
        <Text style={styles.brandName} numberOfLines={2}>Montagem de Móveis</Text>
        <Text style={styles.brandSmall}>MONTAGEM E INSTALAÇÃO</Text>
        <View style={styles.brandLine} />
      </View>
    </View>
  );
}

export function Photo({ uri, style, children, imageStyle }: { uri: string; style?: any; children?: React.ReactNode; imageStyle?: any }) {
  return (
    <ImageBackground
      source={{ uri }}
      style={[styles.photoBase, style]}
      imageStyle={[{ resizeMode: 'cover' }, imageStyle]}
    >
      {children}
    </ImageBackground>
  );
}

export function SectionHeading({ title, right, onRight }: { title: string; right?: string; onRight?: () => void }) {
  return (
    <View style={styles.headingRow}>
      <View style={styles.headingLeft}>
        <View style={styles.headingAccent} />
        <Text style={styles.headingTitle}>{title}</Text>
      </View>
      {right ? (
        <TouchableOpacity onPress={onRight} accessibilityRole="button">
          <Text style={styles.headingLink}>{right} ›</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

export function BottomNavigation({ current }: { current: 'home' | 'servicos' | 'portfolio' | 'sobre' }) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const items = [
    { id: 'home', label: 'Início', icon: 'home', path: '/home' },
    { id: 'servicos', label: 'Serviços', icon: 'grid-outline', path: '/servicos' },
    { id: 'portfolio', label: 'Portfólio', icon: 'images-outline', path: '/portfolio' },
    { id: 'sobre', label: 'Sobre', icon: 'information-circle-outline', path: '/sobre' },
  ] as const;
  return (
    <View style={[styles.nav, { paddingBottom: Math.max(10, insets.bottom + 5) }]}>
      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.navItem}
          accessibilityRole="tab"
          accessibilityState={{ selected: current === item.id }}
          onPress={() => {
            if (current !== item.id) router.replace(item.path);
          }}
        >
          <Ionicons
            name={item.icon}
            color={current === item.id ? P.red : P.white}
            size={27}
          />
          <Text style={[styles.navText, current === item.id && styles.navActive]}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export function Page({ current, children }: { current: 'home' | 'servicos' | 'portfolio' | 'sobre'; children: React.ReactNode }) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  return (
    <View style={styles.screen}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: Math.max(insets.top, Platform.OS === 'android' ? 20 : 6),
          paddingBottom: 125 + insets.bottom,
          alignItems: 'center',
        }}
      >
        <View style={{ width: '100%', maxWidth: width >= 900 ? 880 : undefined }}>
          {children}
        </View>
      </ScrollView>
      <BottomNavigation current={current} />
    </View>
  );
}

export function ServicePhotoCard({ title, detail, image, icon, onPress, tall = false }: {
  title: string; detail: string; image: string; icon: string;
  onPress: () => void; tall?: boolean;
}) {
  return (
    <TouchableOpacity onPress={onPress} accessibilityRole="button" activeOpacity={0.86} style={styles.serviceWrap}>
      <Photo uri={image} style={{ height: tall ? 205 : 192, justifyContent: 'flex-end' }} imageStyle={{ borderRadius: 17 }}>
        <View style={styles.serviceDark} />
        <View style={styles.serviceBottom}>
          <View style={styles.circle}>
            <MaterialCommunityIcons name={icon as any} color="#FFFFFF" size={22} />
          </View>
          <View style={styles.serviceTexts}>
            <Text style={styles.serviceTitle} numberOfLines={2}>{title}</Text>
            <Text style={styles.serviceSubtitle} numberOfLines={2}>{detail}</Text>
          </View>
        </View>
      </Photo>
    </TouchableOpacity>
  );
}

export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: P.black },
  photoBase: { backgroundColor: '#282828', overflow: 'hidden' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 13, paddingBottom: 15 },
  brand: { flex: 1, marginLeft: 11 },
  brandGjs: { color: '#FFFFFF', fontWeight: '900', fontSize: 34, lineHeight: 36 },
  brandName: { color: '#FFFFFF', fontWeight: '900', fontSize: 20, lineHeight: 23 },
  brandSmall: { color: '#E5E5E5', fontSize: 9, letterSpacing: 1.5, fontWeight: '700', marginTop: 6 },
  brandLine: { height: 4, width: '78%', marginTop: 8, backgroundColor: P.red, borderRadius: 4 },
  headingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 4, marginBottom: 15 },
  headingLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  headingAccent: { height: 28, width: 6, borderRadius: 9, backgroundColor: P.red, marginRight: 10 },
  headingTitle: { color: '#FFFFFF', fontSize: 23, lineHeight: 29, fontWeight: '900', flexShrink: 1 },
  headingLink: { color: '#FF4E59', fontWeight: '700', fontSize: 13 },
  nav: { flexDirection: 'row', backgroundColor: '#121212', borderTopColor: '#383838', borderTopWidth: 1, paddingTop: 11, justifyContent: 'space-around' },
  navItem: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 5, minHeight: 55 },
  navText: { color: '#FFFFFF', fontSize: 11, fontWeight: '600' },
  navActive: { color: P.red, fontWeight: '900' },
  serviceWrap: { width: '48.4%', borderRadius: 17, marginBottom: 13, borderWidth: 1, borderColor: '#5A5A5A', overflow: 'hidden' },
  serviceDark: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.25)' },
  serviceBottom: { paddingHorizontal: 8, paddingVertical: 10, minHeight: 91, justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.65)' },
  circle: { width: 37, height: 37, borderRadius: 25, alignItems: 'center', justifyContent: 'center', backgroundColor: '#B90012', marginRight: 7 },
  serviceTexts: { flex: 1 },
  serviceTitle: { color: '#FFFFFF', fontWeight: '900', fontSize: 14 },
  serviceSubtitle: { color: '#F4F4F4', fontSize: 11, marginTop: 4 },
});
