import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  loadDrafts, loadDraft, saveDraft, deleteDraft,
  loadOrders, loadOrder, saveOrder, findOrderByMemoryHash,
  clearAllData, draftPhotos,
  type Draft, type Order,
} from "../storage";

// Minimal localStorage backed by a Map, attached to a fake window.
function installLocalStorage(quotaBytes = Infinity) {
  const store = new Map<string, string>();
  const localStorage = {
    getItem: (k: string) => (store.has(k) ? store.get(k)! : null),
    setItem: (k: string, v: string) => {
      if (v.length > quotaBytes) throw new DOMException("QuotaExceededError");
      store.set(k, v);
    },
    removeItem: (k: string) => { store.delete(k); },
  };
  vi.stubGlobal("window", { localStorage });
  return store;
}

const PHOTO_A = "data:image/png;base64," + "A".repeat(500);
const PHOTO_B = "data:image/png;base64," + "B".repeat(500);

function mkDraft(id: string, withPhoto = false): Draft {
  return {
    id,
    productId: "2",
    title: "Test Book",
    pages: [{
      id: "cover", label: "Cover", bg: "#fff",
      elements: [{ id: "e1", type: "image", x: 0, y: 0, w: 100, h: 100, src: withPhoto ? PHOTO_A : undefined }],
    }],
    createdAt: "2026-07-19T00:00:00.000Z",
    updatedAt: "2026-07-19T00:00:00.000Z",
  };
}

function mkOrder(id: string, hash: string): Order {
  return {
    id, draftId: "d1", productId: "2", title: "Test Book",
    total: 39.99, currency: "EUR", pageCount: 20,
    customer: { name: "Sofia", email: "s@e.com", address: "Street 1", city: "Nicosia", postalCode: "1000", country: "Cyprus" },
    memoryHash: hash, photos: [PHOTO_A],
    status: "processing", createdAt: "2026-07-19T00:00:00.000Z",
  };
}

describe("storage — drafts", () => {
  beforeEach(() => { installLocalStorage(); });

  it("returns empty list when nothing saved", () => {
    expect(loadDrafts()).toEqual([]);
  });

  it("saves and loads a draft", () => {
    expect(saveDraft(mkDraft("d1")).ok).toBe(true);
    expect(loadDraft("d1")?.title).toBe("Test Book");
    expect(loadDrafts()).toHaveLength(1);
  });

  it("updates an existing draft instead of duplicating it", () => {
    saveDraft(mkDraft("d1"));
    saveDraft({ ...mkDraft("d1"), title: "Renamed" });
    expect(loadDrafts()).toHaveLength(1);
    expect(loadDraft("d1")?.title).toBe("Renamed");
  });

  it("deletes a draft", () => {
    saveDraft(mkDraft("d1"));
    deleteDraft("d1");
    expect(loadDrafts()).toEqual([]);
  });

  it("strips photos when storage quota is exceeded", () => {
    installLocalStorage(450); // small quota: full draft with its ~520-char photo won't fit
    const res = saveDraft(mkDraft("d1", true));
    expect(res.ok).toBe(true);
    expect(res.stripped).toBe(true);
    expect(loadDraft("d1")?.pages[0].elements[0].src).toBeUndefined();
  });
});

describe("storage — orders", () => {
  beforeEach(() => { installLocalStorage(); });

  it("saves and loads an order", () => {
    expect(saveOrder(mkOrder("o1", "hash123")).ok).toBe(true);
    expect(loadOrder("o1")?.total).toBe(39.99);
    expect(loadOrders()).toHaveLength(1);
  });

  it("finds an order by memory hash", () => {
    saveOrder(mkOrder("o1", "hash123"));
    expect(findOrderByMemoryHash("hash123")?.id).toBe("o1");
    expect(findOrderByMemoryHash("nope")).toBeUndefined();
  });

  it("clearAllData removes drafts and orders", () => {
    saveDraft(mkDraft("d1"));
    saveOrder(mkOrder("o1", "h"));
    clearAllData();
    expect(loadDrafts()).toEqual([]);
    expect(loadOrders()).toEqual([]);
  });
});

describe("storage — SSR safety", () => {
  it("no-ops without a window object", () => {
    vi.unstubAllGlobals();
    expect(loadDrafts()).toEqual([]);
    expect(saveDraft(mkDraft("d1")).ok).toBe(false);
  });
});

describe("draftPhotos", () => {
  beforeEach(() => { installLocalStorage(); });

  it("collects image srcs across pages in order", () => {
    const d = mkDraft("d1", true);
    d.pages.push({ id: "p1", label: "Page 1", bg: "#fff", elements: [
      { id: "e2", type: "image", x: 0, y: 0, w: 50, h: 50, src: PHOTO_B },
      { id: "e3", type: "text", x: 0, y: 0, w: 50, h: 50, content: "hi" },
      { id: "e4", type: "image", x: 0, y: 0, w: 50, h: 50 }, // empty slot ignored
    ]});
    expect(draftPhotos(d)).toEqual([PHOTO_A, PHOTO_B]);
  });
});
