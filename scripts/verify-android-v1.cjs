'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const json = (path) => JSON.parse(fs.readFileSync(path, 'utf8'));
const app = json('app.json').expo;
const pkg = json('package.json');
const eas = json('eas.json');

assert.equal(pkg.main, 'expo-router/entry');
assert.equal(pkg.version, '1.0.3');
assert.match(pkg.dependencies.expo, /^~54\./);
assert.equal(app.name, 'GJS Montagem de Móveis');
assert.equal(app.version, '1.0.3');
assert.equal(app.android.package, 'com.gjs.moveisplanejados');
assert.equal(app.android.versionCode, 4);
assert.equal(eas.build.preview.android.buildType, 'apk');
assert.equal(eas.build.preview.distribution, 'internal');
assert.ok(fs.existsSync(app.icon), 'Logo GJS ausente');

for (const path of [
  'src/app/index.tsx',
  'src/app/_layout.tsx',
  'src/app/home.tsx',
  'src/app/servicos.tsx',
  'src/app/portfolio.tsx',
  'src/app/sobre.tsx',
  'src/components/gjs-premium.tsx',
  'src/components/gjs-content.ts',
]) {
  assert.ok(fs.existsSync(path), 'Arquivo essencial ausente: ' + path);
}

const read = (path) => fs.readFileSync(path, 'utf8');
const common = read('src/components/gjs-content.ts');
const shared = read('src/components/gjs-premium.tsx');
const home = read('src/app/home.tsx');
const services = read('src/app/servicos.tsx');
const portfolio = read('src/app/portfolio.tsx');
const about = read('src/app/sobre.tsx');
assert.match(common, /5541999739327/);
assert.match(shared, /https:\/\/wa\.me\//);
assert.match(home, /Solicitar Orçamento/);
assert.match(home, /Contato/);
assert.match(home, /FormOrcamento/);
for (const [name, source] of [['home',home],['servicos',services],['portfolio',portfolio],['sobre',about]]) {
  assert.match(source, /Page current=/, name + ' deve ter navegação inferior');
}
assert.ok(!home.includes('ÁREA DE TRABALHO'));
assert.ok(!home.includes('Móveis Planejados'));
assert.match(about, /Montagem de Móveis/);
assert.equal(new URL('https://wa.me/5541999739327').hostname, 'wa.me');
console.log('OK: marca, imagens, WhatsApp, quatro rotas, formulário, e APK v1.0.3.');
