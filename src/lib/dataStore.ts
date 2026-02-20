import { Sampradaya, Saint, Book, Vani } from './types';
import { defaultSampradayas, defaultSaints, defaultBooks, defaultVanis } from './defaultData';

const STORAGE_KEYS = {
  sampradayas: 'brajsastra_sampradayas',
  saints: 'brajsastra_saints',
  books: 'brajsastra_books',
  vanis: 'brajsastra_vanis',
};

function load<T>(key: string, fallback: T[]): T[] {
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch {}
  return fallback;
}

function save<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Event system for realtime updates
const listeners: Set<() => void> = new Set();
export function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
function notify() {
  listeners.forEach(fn => fn());
}

// --- Getters ---
export function getSampradayas(): Sampradaya[] {
  return load(STORAGE_KEYS.sampradayas, defaultSampradayas);
}
export function getSaints(): Saint[] {
  return load(STORAGE_KEYS.saints, defaultSaints);
}
export function getBooks(): Book[] {
  return load(STORAGE_KEYS.books, defaultBooks);
}
export function getVanis(): Vani[] {
  return load(STORAGE_KEYS.vanis, defaultVanis);
}

// --- Helpers ---
export function getSampradaya(id: string) {
  return getSampradayas().find(s => s.id === id);
}
export function getSampradayaBySlug(slug: string) {
  return getSampradayas().find(s => s.slug === slug);
}
export function getSaint(id: string) {
  return getSaints().find(s => s.id === id);
}
export function getSaintBySlug(slug: string) {
  return getSaints().find(s => s.slug === slug);
}
export function getSaintsBySampradaya(sampradayaId: string) {
  return getSaints().filter(s => s.sampradayaId === sampradayaId);
}
export function getBook(id: string) {
  return getBooks().find(b => b.id === id);
}
export function getBookBySlug(slug: string) {
  return getBooks().find(b => b.slug === slug);
}
export function getBooksBySaint(saintId: string) {
  return getBooks().filter(b => b.saintId === saintId);
}
export function getBooksBySampradaya(sampradayaId: string) {
  return getBooks().filter(b => b.sampradayaId === sampradayaId);
}
export function getVanisByBook(bookId: string) {
  return getVanis().filter(v => v.bookId === bookId).sort((a, b) => a.vaniNumber - b.vaniNumber);
}
export function getVani(bookId: string, vaniNumber: number) {
  return getVanis().find(v => v.bookId === bookId && v.vaniNumber === vaniNumber);
}

export function searchContent(query: string) {
  const q = query.toLowerCase();
  const results: { type: string; title: string; url: string; snippet: string }[] = [];
  const allSaints = getSaints();
  const allBooks = getBooks();
  const allVanis = getVanis();

  allSaints.forEach(s => {
    if (s.name.toLowerCase().includes(q) || s.nameHindi.includes(q) || s.bio.toLowerCase().includes(q)) {
      results.push({ type: 'Saint', title: s.name, url: `/saint/${s.slug}`, snippet: s.bio.slice(0, 120) + '…' });
    }
  });
  allBooks.forEach(b => {
    if (b.title.toLowerCase().includes(q) || b.titleHindi.includes(q) || b.description.toLowerCase().includes(q)) {
      results.push({ type: 'Book', title: b.title, url: `/book/${b.slug}`, snippet: b.description.slice(0, 120) + '…' });
    }
  });
  allVanis.forEach(v => {
    const book = getBook(v.bookId);
    if (v.englishTranslation.toLowerCase().includes(q) || v.originalText.includes(q) || v.title.toLowerCase().includes(q) || v.theme.toLowerCase().includes(q)) {
      results.push({ type: 'Vānī', title: `${book?.title} — Vānī ${v.vaniNumber}`, url: `/book/${book?.slug}/vani/${v.vaniNumber}`, snippet: v.englishTranslation.slice(0, 120) + '…' });
    }
  });
  return results;
}

// --- Mutators ---
export function addSampradaya(item: Sampradaya) {
  const data = getSampradayas();
  data.push(item);
  save(STORAGE_KEYS.sampradayas, data);
  notify();
}
export function updateSampradaya(id: string, updates: Partial<Sampradaya>) {
  const data = getSampradayas().map(s => s.id === id ? { ...s, ...updates } : s);
  save(STORAGE_KEYS.sampradayas, data);
  notify();
}
export function deleteSampradaya(id: string) {
  save(STORAGE_KEYS.sampradayas, getSampradayas().filter(s => s.id !== id));
  notify();
}

export function addSaint(item: Saint) {
  const data = getSaints();
  data.push(item);
  save(STORAGE_KEYS.saints, data);
  notify();
}
export function updateSaint(id: string, updates: Partial<Saint>) {
  const data = getSaints().map(s => s.id === id ? { ...s, ...updates } : s);
  save(STORAGE_KEYS.saints, data);
  notify();
}
export function deleteSaint(id: string) {
  save(STORAGE_KEYS.saints, getSaints().filter(s => s.id !== id));
  notify();
}

export function addBook(item: Book) {
  const data = getBooks();
  data.push(item);
  save(STORAGE_KEYS.books, data);
  notify();
}
export function updateBook(id: string, updates: Partial<Book>) {
  const data = getBooks().map(b => b.id === id ? { ...b, ...updates } : b);
  save(STORAGE_KEYS.books, data);
  notify();
}
export function deleteBook(id: string) {
  save(STORAGE_KEYS.books, getBooks().filter(b => b.id !== id));
  notify();
}

export function addVani(item: Vani) {
  const data = getVanis();
  data.push(item);
  save(STORAGE_KEYS.vanis, data);
  notify();
}
export function updateVani(id: string, updates: Partial<Vani>) {
  const data = getVanis().map(v => v.id === id ? { ...v, ...updates } : v);
  save(STORAGE_KEYS.vanis, data);
  notify();
}
export function deleteVani(id: string) {
  save(STORAGE_KEYS.vanis, getVanis().filter(v => v.id !== id));
  notify();
}
