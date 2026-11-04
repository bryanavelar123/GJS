export type User = {
  id: string;
  email?: string;
};

export type Session = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at?: number;
  token_type: string;
  user: User;
};

export type Project = {
  id: string;
  name: string;
  environment: string;
  description: string | null;
  status: string;
  updated_at: string;
};

export type Measurement = {
  id: string;
  label: string;
  width_mm: number;
  length_mm: number | null;
  depth_mm: number | null;
  height_mm: number | null;
};

export type Material = {
  id: string;
  category: 'MDF' | 'Ferragens' | 'Acessórios' | 'Outro';
  name: string;
  brand: string | null;
  color_hex: string | null;
  unit: 'un' | 'm' | 'm2' | 'chapa' | 'kit';
  unit_price_cents: number;
};

const SUPABASE_URL =
  process.env.EXPO_PUBLIC_SUPABASE_URL ??
  'https://ajqrpviyfzahqkhdmhzz.supabase.co';

const SUPABASE_PUBLISHABLE_KEY =
  process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  'sb_publishable_14oqeVr7WTOBUKoAJo3NVA_oDrWH1_o';

let session: Session | null = null;

function headers(authenticated = false) {
  const result: Record<string, string> = {
    apikey: SUPABASE_PUBLISHABLE_KEY,
    'Content-Type': 'application/json',
  };

  if (authenticated) {
    if (!session?.access_token) {
      throw new Error('Sua sessão expirou. Entre novamente.');
    }
    result.Authorization = `Bearer ${session.access_token}`;
  }

  return result;
}

async function parseResponse(response: Response) {
  const text = await response.text();
  let body: any = null;

  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = text;
    }
  }

  if (!response.ok) {
    const message =
      body?.msg ||
      body?.message ||
      body?.error_description ||
      body?.error ||
      `Erro HTTP ${response.status}`;
    throw new Error(message);
  }

  return body;
}

async function authRequest(path: string, body?: unknown, method = 'POST') {
  const response = await fetch(`${SUPABASE_URL}/auth/v1${path}`, {
    method,
    headers: headers(Boolean(session)),
    body: body ? JSON.stringify(body) : undefined,
  });
  return parseResponse(response);
}

async function rest<T>(
  path: string,
  options: {
    method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
    body?: unknown;
    prefer?: string;
  } = {},
): Promise<T> {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method: options.method ?? 'GET',
    headers: {
      ...headers(true),
      ...(options.prefer ? { Prefer: options.prefer } : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  return parseResponse(response) as Promise<T>;
}

export function getSession() {
  return session;
}

export async function signIn(email: string, password: string) {
  const data = (await authRequest('/token?grant_type=password', {
    email: email.trim().toLowerCase(),
    password,
  })) as Session;
  session = data;
  return data;
}

export async function signUp(email: string, password: string) {
  const data = await authRequest('/signup', {
    email: email.trim().toLowerCase(),
    password,
  });

  if (data?.access_token) {
    session = data as Session;
  }

  return data;
}

export async function signOut() {
  try {
    if (session) {
      await authRequest('/logout', undefined, 'POST');
    }
  } finally {
    session = null;
  }
}

export async function listProjects(): Promise<Project[]> {
  return rest<Project[]>(
    'projects?select=id,name,environment,description,status,updated_at&order=updated_at.desc&limit=50',
  );
}

export async function createClient(name: string) {
  if (!session) throw new Error('Sessão não encontrada.');
  const rows = await rest<any[]>('clients?select=id,name', {
    method: 'POST',
    prefer: 'return=representation',
    body: { user_id: session.user.id, name: name.trim() },
  });
  return rows[0];
}

export async function createProject(input: {
  name: string;
  clientName: string;
  environment: string;
  description?: string;
}) {
  if (!session) throw new Error('Sessão não encontrada.');

  const client = await createClient(input.clientName);
  const rows = await rest<any[]>('projects?select=id,name,environment,status,updated_at', {
    method: 'POST',
    prefer: 'return=representation',
    body: {
      user_id: session.user.id,
      client_id: client.id,
      name: input.name.trim(),
      environment: input.environment.trim(),
      description: input.description?.trim() || null,
    },
  });
  return rows[0] as Project;
}

export async function listMeasurements(projectId: string): Promise<Measurement[]> {
  return rest<Measurement[]>(
    `project_measurements?select=id,label,width_mm,length_mm,depth_mm,height_mm&project_id=eq.${encodeURIComponent(projectId)}&order=created_at.asc`,
  );
}

export async function createMeasurement(input: {
  projectId: string;
  label: string;
  widthMm: number;
  lengthMm?: number | null;
  depthMm?: number | null;
  heightMm?: number | null;
}) {
  if (!session) throw new Error('Sessão não encontrada.');

  return rest<Measurement[]>('project_measurements?select=id,label,width_mm,length_mm,depth_mm,height_mm', {
    method: 'POST',
    prefer: 'return=representation',
    body: {
      user_id: session.user.id,
      project_id: input.projectId,
      label: input.label.trim(),
      width_mm: input.widthMm,
      length_mm: input.lengthMm ?? null,
      depth_mm: input.depthMm ?? null,
      height_mm: input.heightMm ?? null,
    },
  });
}

export async function deleteMeasurement(id: string) {
  await rest(`project_measurements?id=eq.${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
}

export async function listMaterials(): Promise<Material[]> {
  return rest<Material[]>(
    'materials?select=id,category,name,brand,color_hex,unit,unit_price_cents&order=category.asc,name.asc',
  );
}

export async function createMaterial(input: {
  category: Material['category'];
  name: string;
  brand?: string;
  unit?: Material['unit'];
  unitPriceCents?: number;
}) {
  if (!session) throw new Error('Sessão não encontrada.');

  return rest<Material[]>('materials?select=id,category,name,brand,color_hex,unit,unit_price_cents', {
    method: 'POST',
    prefer: 'return=representation',
    body: {
      user_id: session.user.id,
      category: input.category,
      name: input.name.trim(),
      brand: input.brand?.trim() || null,
      unit: input.unit ?? 'un',
      unit_price_cents: input.unitPriceCents ?? 0,
    },
  });
}

export async function createQuote(input: {
  projectName: string;
  clientName: string;
  environment?: string;
  costs: Array<{ description: string; cents: number }>;
}) {
  if (!session) throw new Error('Sessão não encontrada.');

  const client = await createClient(input.clientName);
  const projects = await rest<any[]>('projects?select=id', {
    method: 'POST',
    prefer: 'return=representation',
    body: {
      user_id: session.user.id,
      client_id: client.id,
      name: input.projectName.trim(),
      environment: input.environment?.trim() || 'Não informado',
      status: 'quoted',
    },
  });
  const project = projects[0];

  const subtotal = input.costs.reduce((sum, item) => sum + item.cents, 0);
  const quotes = await rest<any[]>('quotes?select=id,version,total_cents', {
    method: 'POST',
    prefer: 'return=representation',
    body: {
      user_id: session.user.id,
      project_id: project.id,
      client_id: client.id,
      subtotal_cents: subtotal,
      status: 'draft',
    },
  });
  const quote = quotes[0];

  const items = input.costs
    .filter((item) => item.cents > 0)
    .map((item) => ({
      user_id: session!.user.id,
      quote_id: quote.id,
      description: item.description,
      quantity: 1,
      unit_price_cents: item.cents,
    }));

  if (items.length) {
    await rest('quote_items', {
      method: 'POST',
      body: items,
    });
  }

  await rest('quote_history', {
    method: 'POST',
    body: {
      user_id: session.user.id,
      quote_id: quote.id,
      version: quote.version,
      snapshot: {
        projectName: input.projectName,
        clientName: input.clientName,
        costs: input.costs,
        total_cents: subtotal,
      },
    },
  });

  return quote;
}

export function parsePositiveNumber(value: string, fieldName: string) {
  const normalized = value.trim().replace(',', '.');
  const number = Number(normalized);

  if (!Number.isFinite(number) || number <= 0) {
    throw new Error(`${fieldName} deve ser maior que zero.`);
  }

  if (number > 100000) {
    throw new Error(`${fieldName} excede o limite permitido.`);
  }

  return number;
}

export function parseCurrencyToCents(value: string) {
  const normalized = value
    .trim()
    .replace(/R\$/gi, '')
    .replace(/\s/g, '')
    .replace(/\./g, '')
    .replace(',', '.');

  if (!normalized) return 0;

  const number = Number(normalized);
  if (!Number.isFinite(number) || number < 0) {
    throw new Error('Informe um valor monetário válido.');
  }

  const cents = Math.round(number * 100);
  if (cents > 100000000000) {
    throw new Error('Valor excede o limite permitido.');
  }
  return cents;
}

export function formatCents(cents: number) {
  return (cents / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}
