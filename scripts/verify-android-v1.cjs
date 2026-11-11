'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');

const json = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const pkg = json('package.json');
const app = json('app.json').expo;
const eas = json('eas.json');

assert.equal(pkg.main, 'expo-router/entry', 'Entrada do Expo Router incorreta');
assert.match(pkg.dependencies.expo, /^~54\./, 'Versão Expo deve ser SDK 54 nesta ramificação');
assert.equal(app.android.package, 'com.gjs.moveisplanejados');
assert.equal(app.android.versionCode, 1);
assert.match(app.android.package, /^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)+$/);
assert.equal(eas.build.preview.android.buildType, 'apk');
assert.equal(eas.build.preview.distribution, 'internal');

for (const path of [
  'src/app/index.tsx',
  'src/app/_layout.tsx',
  'src/app/home.tsx',
  'src/app/novo-projeto.tsx',
  'src/app/materiais.tsx',
  'src/app/medidas.tsx',
  'src/app/orcamento.tsx',
]) {
  assert.ok(fs.existsSync(path), 'Rota ausente: ' + path);
}

const home = fs.readFileSync('src/app/home.tsx', 'utf8');
const about = fs.readFileSync('src/app/explore.tsx', 'utf8');
const phone = '5541999739327';

for (const [filename, source] of [
  ['home.tsx', home], ['explore.tsx', about],
]) {
  assert.ok(source.includes('https://wa.me/' + phone), 'WhatsApp incorreto em ' + filename);
}
assert.equal(new URL('https://wa.me/' + phone).hostname, 'wa.me');
assert.match(phone, /^55\d{2}9\d{8}$/);
const layout = fs.readFileSync('src/app/_layout.tsx', 'utf8');
assert.ok(!layout.includes("<Stack.Screen name=\"index\" />'"), 'Aspas inválidas no layout');

console.log('OK: configuração Android, perfil APK, rotas e link WhatsApp validados.');
