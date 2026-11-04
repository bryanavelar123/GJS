# GJS Montagem de Móveis

Aplicativo Expo/React Native para gestão de clientes, projetos, medidas, materiais e orçamentos da GJS.

## Stack

- Expo 57
- React 19.2
- React Native 0.86
- Expo Router
- Supabase Auth + PostgreSQL + Row Level Security

## Segurança

O app usa somente a **publishable key** do Supabase no cliente. Nunca use `service_role` ou uma secret key no aplicativo.

Todas as tabelas de negócio no Supabase estão com RLS habilitado e políticas de ownership por `user_id`. Usuários autenticados só podem acessar os próprios registros.

## Desenvolvimento

```bash
npm ci
npm run typecheck
npm run build:web
npm start
```

No Codespaces:

```bash
npx expo start --web --clear
```

## Variáveis opcionais

O cliente possui valores públicos de fallback para o projeto atual. Para facilitar rotação e ambientes diferentes, configure:

```env
EXPO_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

Essas variáveis são públicas por design. Não coloque chaves secretas em variáveis `EXPO_PUBLIC_*`.

## Estrutura

- `src/app/login.tsx`: autenticação
- `src/app/home.tsx`: projetos recentes
- `src/app/novo-projeto.tsx`: criação de cliente + projeto
- `src/app/materiais.tsx`: catálogo privado de materiais
- `src/app/medidas.tsx`: medidas do projeto
- `src/app/orcamento.tsx`: orçamento e histórico
- `src/lib/backend.ts`: integração HTTPS com Supabase
- `supabase/migrations/`: histórico de schema e RLS

## Modelo de dados

O backend possui tabelas para clientes, projetos, medidas, módulos, peças, materiais, materiais de projeto, orçamentos, itens de orçamento e histórico.

Valores monetários são armazenados em centavos. Medidas usam milímetros e possuem validações no banco.

## Verificação antes de publicar

1. `npm ci`
2. `npm run typecheck`
3. `npm run build:web`
4. Testar cadastro/login em Android e web
5. Confirmar RLS no Supabase Advisors
6. Confirmar políticas de backup e restauração
7. Exigir revisão antes de merge na branch `main`

## Observação sobre sessão

A autenticação atual mantém a sessão em memória. Ao reiniciar o aplicativo, o usuário entra novamente. Isso evita armazenar tokens em armazenamento inseguro enquanto a camada de SecureStore não estiver instalada.
