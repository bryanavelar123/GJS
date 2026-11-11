# GJS — Primeira versão Android (APK)

Aplicativo Expo Router / SDK 54 preparado para instalação direta no Android.

## O que está nesta ramificação

- ID Android: `com.gjs.moveisplanejados`, versão 1 (`versionCode: 1`).
- Interface preta, vermelha e branca; rotas principais de projetos, materiais, medidas e orçamentos.
- Link de contato para o WhatsApp GJS: https://wa.me/5541999739327
- `eas.json` com perfil `preview` gerando APK, não AAB.
- Workflow do GitHub Actions para compilar, verificar integridade e assinatura, e disponibilizar APK de TESTE.

## Gerar o APK pelo GitHub Actions

1. Abra **Actions → GJS Android APK v1** no repositório.
2. A compilação é iniciada automaticamente ao enviar commits à ramificação `release/android-apk-v1-20261109`. Também há `workflow_dispatch`.
3. Abra a execução finalizada com marca verde.
4. Em **Artifacts**, baixe `GJS-Android-v1-test-apk`.
5. Extraia o ZIP e instale o arquivo `app-release.apk` no Android. Pode ser necessário autorizar a instalação de fontes externas.

**Assinatura:** para a PRIMEIRA VERSÃO DE TESTE, o Gradle usa a assinatura de desenvolvimento padrão do projeto nativo gerado. Não publicar este arquivo na Play Store. Antes de lançar versões definitivas, configurar keystore de produção estável no EAS, com acesso autorizado à conta Expo.

## Alternativa oficial pelo Expo EAS

```bash
npm install
npx eas-cli login
npx eas-cli build --platform android --profile preview
```

O EAS solicitará vínculo com projeto Expo e eventual geração de credenciais; nunca publique tokens ou senhas no repositório.

## Testes

```bash
npm install
npm run verify:android
npx expo-doctor
npx expo start --android
```

Checklist em aparelho Android: abertura sem Metro; navegação para quatro funções; entrada de dados e retorno; contato WhatsApp; status bar; orientação retrato. A compilação e a assinatura não substituem os testes reais em um aparelho.

## Observações

A `main` do repositório possui recursos de **Móveis Planejados**. Uma PR diferente (`fix/full-stabilization`) propõe integração Supabase e Expo 57, mas não foi mesclada aqui. Esta primeira APK não depende daquela PR nem aplica alterações de banco de dados.

Para reproduzibilidade definitiva, atualizar e versionar `package-lock.json` em uma máquina com acesso ao npm. O workflow instala as dependências especificadas no `package.json` e compila o aplicativo.
