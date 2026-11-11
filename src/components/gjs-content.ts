// Imagens ilustrativas para apresentação dos serviços; substituir por fotos próprias da GJS quando disponíveis.
// URLs fixas; não são apresentadas como serviços efetivamente realizados pela empresa.
export const PHONE = '5541999739327';
export const PHONE_LABEL = '(41) 99973-9327';
export const PALETTE = {
  black: '#050505',
  panel: '#101010',
  panel2: '#181818',
  red: '#E10619',
  darkRed: '#9C0713',
  white: '#FFFFFF',
  grey: '#C8C8C8',
  muted: '#969696',
  stroke: '#484848',
};
export const photos = {
  hero: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1100&q=83&fit=crop',
  montagem: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=82&fit=crop',
  desmontagem: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=82&fit=crop',
  instalacoes: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=700&q=82&fit=crop',
  suporte: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&q=82&fit=crop',
  portfolio1: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=700&q=82&fit=crop',
  portfolio2: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=700&q=82&fit=crop',
  portfolio3: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=700&q=82&fit=crop',
};
export const services = [
  { id: 'montagem', title: 'Montagem de Móveis', short: 'Montagem profissional e segura.', description: 'Montagem de guarda-roupas, camas, racks, armários e móveis em geral.', image: photos.montagem, icon: 'tools' },
  { id: 'desmontagem', title: 'Desmontagem', short: 'Desmontagem com cuidado e organização.', description: 'Desmontagem e remontagem de móveis para mudanças e reorganização.', image: photos.desmontagem, icon: 'package-variant' },
  { id: 'instalacoes', title: 'Instalações', short: 'Painéis, suportes, nichos e prateleiras.', description: 'Instalação de suportes, painéis de TV, prateleiras e nichos.', image: photos.instalacoes, icon: 'hammer-screwdriver' },
  { id: 'suporte', title: 'Suporte Especializado', short: 'Orientação para seu serviço.', description: 'Tire dúvidas e solicite avaliação do móvel com a GJS.', image: photos.suporte, icon: 'headset' },
] as const;
export const portfolio = [
  { id: 'cozinha', title: 'Cozinhas e armários', detail: 'Montagem e instalação', image: photos.portfolio1 },
  { id: 'guarda-roupa', title: 'Guarda-roupas', detail: 'Montagem e regulagem', image: photos.portfolio2 },
  { id: 'painel', title: 'Painéis e racks', detail: 'Instalação e acabamento', image: photos.portfolio3 },
] as const;
