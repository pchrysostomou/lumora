// Client-side persistence for drafts and orders (localStorage).
// All functions are SSR-safe: they no-op / return empty values on the server.

export interface DraftElement {
  id: string;
  type: "text" | "image" | "shape" | "qr";
  x: number;
  y: number;
  w: number;
  h: number;
  content?: string;
  src?: string;
  fill?: string;
  fontSize?: number;
}

export interface DraftPage {
  id: string;
  label: string;
  bg: string;
  elements: DraftElement[];
}

export interface Draft {
  id: string;
  productId: string;
  title: string;
  pages: DraftPage[];
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus = "processing" | "printed" | "shipped";

export interface OrderCustomer {
  name: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  draftId: string;
  productId: string;
  title: string;
  total: number;
  currency: string;
  pageCount: number;
  customer: OrderCustomer;
  memoryHash: string;
  photos: string[];
  status: OrderStatus;
  createdAt: string;
}

const DRAFTS_KEY = "lumora:drafts:v1";
const ORDERS_KEY = "lumora:orders:v1";

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readJson<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown): boolean {
  if (!isBrowser()) return false;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    // Most likely QuotaExceededError (large embedded images).
    return false;
  }
}

// ── Drafts ────────────────────────────────────────────────────────────────

export function loadDrafts(): Draft[] {
  return readJson<Draft[]>(DRAFTS_KEY, []);
}

export function loadDraft(id: string): Draft | undefined {
  return loadDrafts().find(d => d.id === id);
}

export interface SaveResult {
  ok: boolean;
  /** Set when the payload was too large and images had to be stripped. */
  stripped?: boolean;
}

/** Saves (inserts or updates) a draft. If storage is full, retries once
 *  with image data stripped so at least the layout survives. */
export function saveDraft(draft: Draft): SaveResult {
  const drafts = loadDrafts().filter(d => d.id !== draft.id);
  drafts.unshift({ ...draft, updatedAt: new Date().toISOString() });
  if (writeJson(DRAFTS_KEY, drafts)) return { ok: true };

  const slim = drafts.map(d =>
    d.id === draft.id
      ? { ...d, pages: d.pages.map(p => ({ ...p, elements: p.elements.map(e => ({ ...e, src: undefined })) })) }
      : d
  );
  if (writeJson(DRAFTS_KEY, slim)) return { ok: true, stripped: true };
  return { ok: false };
}

export function deleteDraft(id: string): void {
  writeJson(DRAFTS_KEY, loadDrafts().filter(d => d.id !== id));
}

// ── Orders ────────────────────────────────────────────────────────────────

export function loadOrders(): Order[] {
  return readJson<Order[]>(ORDERS_KEY, []);
}

export function loadOrder(id: string): Order | undefined {
  return loadOrders().find(o => o.id === id);
}

export function findOrderByMemoryHash(hash: string): Order | undefined {
  return loadOrders().find(o => o.memoryHash === hash);
}

/** Saves an order. If storage is full, retries without the embedded photos. */
export function saveOrder(order: Order): SaveResult {
  const orders = loadOrders().filter(o => o.id !== order.id);
  orders.unshift(order);
  if (writeJson(ORDERS_KEY, orders)) return { ok: true };

  const slim = orders.map(o => (o.id === order.id ? { ...o, photos: [] } : o));
  if (writeJson(ORDERS_KEY, slim)) return { ok: true, stripped: true };
  return { ok: false };
}

export function clearAllData(): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(DRAFTS_KEY);
    window.localStorage.removeItem(ORDERS_KEY);
  } catch {
    /* ignore */
  }
}

/** Photos (image srcs) used in a draft, in page order. */
export function draftPhotos(draft: Draft): string[] {
  const out: string[] = [];
  for (const page of draft.pages) {
    for (const el of page.elements) {
      if (el.type === "image" && el.src) out.push(el.src);
    }
  }
  return out;
}
