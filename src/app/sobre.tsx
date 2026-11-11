import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Page, GjsHeader, openWhatsApp } from '../components/gjs-premium';
import { PALETTE as P, PHONE_LABEL } from '../components/gjs-content';

const questions = [
  ['Como pedir um orçamento?', 'Toque em Orçamento ou envie fotos e medidas dos móveis para nosso WhatsApp.'],
  ['Quais tipos de móveis vocês montam?', 'Guarda-roupas, camas, armários, racks, painéis, nichos, estantes e outros móveis.'],
  ['Vocês fazem desmontagem?', 'Consulte a disponibilidade para desmontagem e remontagem de móveis.'],
  ['Quais regiões são atendidas?', 'Informe sua cidade e bairro para confirmar o atendimento.'],
];
export default function SobreScreen() {
  const [expanded, setExpanded] = useState(-1);
  return (
    <Page current="sobre">
      <GjsHeader />
      <View style={s.body}>
        <Text style={s.label}>QUEM SOMOS</Text>
        <Text style={s.title}>GJS Montagem de Móveis</Text>
        <Text style={s.paragraph}>Nossa proposta é oferecer montagem e instalação de móveis com organização, cuidado e atenção aos detalhes.</Text>
        <View style={s.panel}>
          <Text style={s.panelHeading}>Seu móvel pronto, sem complicação.</Text>
          <Text style={s.panelText}>Entre em contato, descreva o serviço e combine seu orçamento diretamente com a GJS.</Text>
          {['✓ Montagem de móveis', '✓ Desmontagem e remontagem', '✓ Instalação de painéis e suportes', '✓ Atendimento direto'].map(x => <Text key={x} style={s.check}>{x}</Text>)}
        </View>
        <Text style={s.faqTitle}>Perguntas frequentes</Text>
        {questions.map(([q,a],i)=>(
          <TouchableOpacity style={s.faq} key={q} onPress={()=>setExpanded(i===expanded?-1:i)} accessibilityRole="button">
            <View style={s.faqRow}>
              <Text style={s.question}>{q}</Text>
              <Ionicons name={expanded===i?'remove':'add'} size={21} color={P.red} />
            </View>
            {expanded===i && <Text style={s.answer}>{a}</Text>}
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={s.button} accessibilityRole="button" onPress={() => void openWhatsApp('Olá! Gostaria de falar com a GJS Montagem de Móveis.')}>
          <Ionicons name="logo-whatsapp" size={23} color="#FFFFFF" />
          <Text style={s.buttonText}>WhatsApp {PHONE_LABEL}</Text>
        </TouchableOpacity>
      </View>
    </Page>
  );
}
const s=StyleSheet.create({
  body:{paddingHorizontal:17,paddingTop:17},
  label:{color:P.red,fontWeight:'900',fontSize:11,letterSpacing:1.3},
  title:{color:'#FFFFFF',fontSize:29,fontWeight:'900',marginTop:9},
  paragraph:{color:'#D1D1D1',fontSize:15,lineHeight:24,marginTop:15},
  panel:{backgroundColor:'#171717',borderColor:'#4A191E',borderWidth:1,borderRadius:20,padding:20,marginTop:25},
  panelHeading:{color:'#FFFFFF',fontSize:23,fontWeight:'900'},
  panelText:{color:'#CFCFCF',lineHeight:22,marginTop:11,marginBottom:12},
  check:{color:'#FFFFFF',fontWeight:'700',marginTop:11},
  faqTitle:{color:'#FFFFFF',fontSize:25,fontWeight:'900',marginTop:33,marginBottom:11},
  faq:{borderBottomColor:'#393939',borderBottomWidth:1,paddingVertical:17},
  faqRow:{flexDirection:'row',alignItems:'center',justifyContent:'space-between'},
  question:{color:'#FFFFFF',fontWeight:'800',flex:1},
  answer:{color:'#C5C5C5',lineHeight:23,marginTop:10},
  button:{backgroundColor:P.red,borderRadius:15,padding:16,flexDirection:'row',gap:10,alignItems:'center',justifyContent:'center',marginTop:27},
  buttonText:{color:'#FFFFFF',fontSize:16,fontWeight:'900'},
});
