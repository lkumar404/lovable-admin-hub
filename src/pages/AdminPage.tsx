import { useState } from 'react';
import { useDataStore } from '@/hooks/useDataStore';
import { Sampradaya, Saint, Book, Vani } from '@/lib/types';
import * as store from '@/lib/dataStore';
import { Plus, Trash2, Edit2, LogOut, Lock, ChevronDown, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

const ADMIN_PASSWORD = 'brajsastra2024';

function generateSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function generateId() {
  return Math.random().toString(36).substring(2, 10);
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-full max-w-sm p-8 bg-card border border-border/60 rounded-sm">
          <div className="text-center mb-6">
            <Lock className="w-8 h-8 mx-auto mb-3 text-gold" />
            <h1 className="font-display text-2xl font-bold text-foreground">Admin Panel</h1>
            <p className="text-sm text-muted-foreground mt-1">Enter password to continue</p>
          </div>
          <form onSubmit={e => {
            e.preventDefault();
            if (password === ADMIN_PASSWORD) {
              setAuthenticated(true);
              setError('');
            } else {
              setError('Incorrect password');
            }
          }}>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 bg-background border border-border/60 rounded-sm text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 mb-3"
              autoFocus
            />
            {error && <p className="text-destructive text-sm mb-3">{error}</p>}
            <button type="submit" className="w-full px-4 py-3 bg-primary text-primary-foreground font-body text-sm font-medium rounded-sm hover:bg-primary/90 transition-colors">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <AdminDashboard onLogout={() => setAuthenticated(false)} />;
}

type Tab = 'sampradayas' | 'saints' | 'books' | 'vanis';

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const { sampradayas, saints, books, vanis } = useDataStore();
  const [tab, setTab] = useState<Tab>('sampradayas');

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: 'sampradayas', label: 'Sampradāyas', count: sampradayas.length },
    { key: 'saints', label: 'Saints', count: saints.length },
    { key: 'books', label: 'Books', count: books.length },
    { key: 'vanis', label: 'Vānīs', count: vanis.length },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-card/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-devanagari text-sm font-bold">ब्र</span>
            </div>
            <h1 className="font-display text-lg font-semibold text-foreground">BrajSastra Admin</h1>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">View Site</a>
            <button onClick={onLogout} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6 border-b border-border/40">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2 text-sm font-body border-b-2 transition-colors ${
                tab === t.key ? 'border-primary text-primary font-medium' : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {t.label} ({t.count})
            </button>
          ))}
        </div>

        {tab === 'sampradayas' && <SampradayaManager sampradayas={sampradayas} />}
        {tab === 'saints' && <SaintManager saints={saints} sampradayas={sampradayas} />}
        {tab === 'books' && <BookManager books={books} saints={saints} sampradayas={sampradayas} />}
        {tab === 'vanis' && <VaniManager vanis={vanis} books={books} />}
      </div>
    </div>
  );
}

// ============ SAMPRADAYA MANAGER ============
function SampradayaManager({ sampradayas }: { sampradayas: Sampradaya[] }) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Sampradaya | null>(null);
  const [form, setForm] = useState({ name: '', nameHindi: '', description: '', lineage: '', tags: '' });

  const resetForm = () => { setForm({ name: '', nameHindi: '', description: '', lineage: '', tags: '' }); setEditing(null); setShowForm(false); };

  const handleSubmit = () => {
    if (!form.name.trim()) return;
    if (editing) {
      store.updateSampradaya(editing.id, { ...form, slug: generateSlug(form.name), tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) });
      toast.success('Sampradāya updated');
    } else {
      store.addSampradaya({ id: generateId(), slug: generateSlug(form.name), ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) });
      toast.success('Sampradāya added');
    }
    resetForm();
  };

  const startEdit = (s: Sampradaya) => {
    setEditing(s);
    setForm({ name: s.name, nameHindi: s.nameHindi, description: s.description, lineage: s.lineage, tags: s.tags.join(', ') });
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-xl font-semibold text-foreground">Sampradāyas</h2>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="flex items-center gap-1 px-3 py-2 bg-primary text-primary-foreground text-sm rounded-sm hover:bg-primary/90">
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      {showForm && (
        <div className="p-6 bg-card border border-border/60 rounded-sm mb-6 space-y-3">
          <h3 className="font-display font-semibold text-foreground">{editing ? 'Edit' : 'Add'} Sampradāya</h3>
          <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Name (English)" className="w-full px-3 py-2 bg-background border border-border/60 rounded-sm text-sm text-foreground" />
          <input value={form.nameHindi} onChange={e => setForm(f => ({ ...f, nameHindi: e.target.value }))} placeholder="Name (Hindi)" className="w-full px-3 py-2 bg-background border border-border/60 rounded-sm text-sm text-foreground font-devanagari" />
          <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Description" rows={3} className="w-full px-3 py-2 bg-background border border-border/60 rounded-sm text-sm text-foreground" />
          <input value={form.lineage} onChange={e => setForm(f => ({ ...f, lineage: e.target.value }))} placeholder="Lineage" className="w-full px-3 py-2 bg-background border border-border/60 rounded-sm text-sm text-foreground" />
          <input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="Tags (comma separated)" className="w-full px-3 py-2 bg-background border border-border/60 rounded-sm text-sm text-foreground" />
          <div className="flex gap-2">
            <button onClick={handleSubmit} className="px-4 py-2 bg-primary text-primary-foreground text-sm rounded-sm hover:bg-primary/90">{editing ? 'Update' : 'Add'}</button>
            <button onClick={resetForm} className="px-4 py-2 border border-border text-foreground text-sm rounded-sm hover:bg-secondary/50">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {sampradayas.map(s => (
          <div key={s.id} className="flex items-center justify-between p-4 bg-card border border-border/60 rounded-sm">
            <div>
              <p className="font-devanagari text-gold text-xs">{s.nameHindi}</p>
              <p className="font-display font-semibold text-foreground">{s.name}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(s)} className="p-2 text-muted-foreground hover:text-foreground"><Edit2 className="w-4 h-4" /></button>
              <button onClick={() => { store.deleteSampradaya(s.id); toast.success('Deleted'); }} className="p-2 text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ SAINT MANAGER ============
function SaintManager({ saints, sampradayas }: { saints: Saint[]; sampradayas: Sampradaya[] }) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Saint | null>(null);
  const [form, setForm] = useState({ name: '', nameHindi: '', sampradayaId: '', period: '', bio: '', works: '', theologicalEmphasis: '', tags: '' });

  const resetForm = () => { setForm({ name: '', nameHindi: '', sampradayaId: sampradayas[0]?.id || '', period: '', bio: '', works: '', theologicalEmphasis: '', tags: '' }); setEditing(null); setShowForm(false); };

  const handleSubmit = () => {
    if (!form.name.trim()) return;
    const data = { ...form, slug: generateSlug(form.name), works: form.works.split(',').map(w => w.trim()).filter(Boolean), tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) };
    if (editing) {
      store.updateSaint(editing.id, data);
      toast.success('Saint updated');
    } else {
      store.addSaint({ id: generateId(), ...data });
      toast.success('Saint added');
    }
    resetForm();
  };

  const startEdit = (s: Saint) => {
    setEditing(s);
    setForm({ name: s.name, nameHindi: s.nameHindi, sampradayaId: s.sampradayaId, period: s.period, bio: s.bio, works: s.works.join(', '), theologicalEmphasis: s.theologicalEmphasis, tags: s.tags.join(', ') });
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-xl font-semibold text-foreground">Saints</h2>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="flex items-center gap-1 px-3 py-2 bg-primary text-primary-foreground text-sm rounded-sm hover:bg-primary/90"><Plus className="w-4 h-4" /> Add</button>
      </div>

      {showForm && (
        <div className="p-6 bg-card border border-border/60 rounded-sm mb-6 space-y-3">
          <h3 className="font-display font-semibold text-foreground">{editing ? 'Edit' : 'Add'} Saint</h3>
          <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Name (English)" className="w-full px-3 py-2 bg-background border border-border/60 rounded-sm text-sm text-foreground" />
          <input value={form.nameHindi} onChange={e => setForm(f => ({ ...f, nameHindi: e.target.value }))} placeholder="Name (Hindi)" className="w-full px-3 py-2 bg-background border border-border/60 rounded-sm text-sm text-foreground font-devanagari" />
          <select value={form.sampradayaId} onChange={e => setForm(f => ({ ...f, sampradayaId: e.target.value }))} className="w-full px-3 py-2 bg-background border border-border/60 rounded-sm text-sm text-foreground">
            <option value="">Select Sampradāya</option>
            {sampradayas.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <input value={form.period} onChange={e => setForm(f => ({ ...f, period: e.target.value }))} placeholder="Period (e.g. 1502–1552 CE)" className="w-full px-3 py-2 bg-background border border-border/60 rounded-sm text-sm text-foreground" />
          <textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} placeholder="Biography" rows={3} className="w-full px-3 py-2 bg-background border border-border/60 rounded-sm text-sm text-foreground" />
          <input value={form.works} onChange={e => setForm(f => ({ ...f, works: e.target.value }))} placeholder="Major Works (comma separated)" className="w-full px-3 py-2 bg-background border border-border/60 rounded-sm text-sm text-foreground" />
          <input value={form.theologicalEmphasis} onChange={e => setForm(f => ({ ...f, theologicalEmphasis: e.target.value }))} placeholder="Theological Emphasis" className="w-full px-3 py-2 bg-background border border-border/60 rounded-sm text-sm text-foreground" />
          <input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="Tags (comma separated)" className="w-full px-3 py-2 bg-background border border-border/60 rounded-sm text-sm text-foreground" />
          <div className="flex gap-2">
            <button onClick={handleSubmit} className="px-4 py-2 bg-primary text-primary-foreground text-sm rounded-sm hover:bg-primary/90">{editing ? 'Update' : 'Add'}</button>
            <button onClick={resetForm} className="px-4 py-2 border border-border text-foreground text-sm rounded-sm hover:bg-secondary/50">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {saints.map(s => {
          const samp = sampradayas.find(sp => sp.id === s.sampradayaId);
          return (
            <div key={s.id} className="flex items-center justify-between p-4 bg-card border border-border/60 rounded-sm">
              <div>
                <p className="font-devanagari text-gold text-xs">{s.nameHindi}</p>
                <p className="font-display font-semibold text-foreground">{s.name}</p>
                <p className="text-xs text-muted-foreground">{s.period} · {samp?.name}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(s)} className="p-2 text-muted-foreground hover:text-foreground"><Edit2 className="w-4 h-4" /></button>
                <button onClick={() => { store.deleteSaint(s.id); toast.success('Deleted'); }} className="p-2 text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============ BOOK MANAGER ============
function BookManager({ books, saints, sampradayas }: { books: Book[]; saints: Saint[]; sampradayas: Sampradaya[] }) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Book | null>(null);
  const [form, setForm] = useState({ title: '', titleHindi: '', saintId: '', sampradayaId: '', description: '', language: 'Brajbhāṣā', structure: '', vaniCount: '0', tags: '' });

  const resetForm = () => { setForm({ title: '', titleHindi: '', saintId: '', sampradayaId: '', description: '', language: 'Brajbhāṣā', structure: '', vaniCount: '0', tags: '' }); setEditing(null); setShowForm(false); };

  const handleSubmit = () => {
    if (!form.title.trim()) return;
    const data = { ...form, slug: generateSlug(form.title), vaniCount: parseInt(form.vaniCount) || 0, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) };
    if (editing) {
      store.updateBook(editing.id, data);
      toast.success('Book updated');
    } else {
      store.addBook({ id: generateId(), ...data });
      toast.success('Book added');
    }
    resetForm();
  };

  const startEdit = (b: Book) => {
    setEditing(b);
    setForm({ title: b.title, titleHindi: b.titleHindi, saintId: b.saintId, sampradayaId: b.sampradayaId, description: b.description, language: b.language, structure: b.structure, vaniCount: String(b.vaniCount), tags: b.tags.join(', ') });
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-xl font-semibold text-foreground">Books</h2>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="flex items-center gap-1 px-3 py-2 bg-primary text-primary-foreground text-sm rounded-sm hover:bg-primary/90"><Plus className="w-4 h-4" /> Add</button>
      </div>

      {showForm && (
        <div className="p-6 bg-card border border-border/60 rounded-sm mb-6 space-y-3">
          <h3 className="font-display font-semibold text-foreground">{editing ? 'Edit' : 'Add'} Book</h3>
          <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Title (English)" className="w-full px-3 py-2 bg-background border border-border/60 rounded-sm text-sm text-foreground" />
          <input value={form.titleHindi} onChange={e => setForm(f => ({ ...f, titleHindi: e.target.value }))} placeholder="Title (Hindi)" className="w-full px-3 py-2 bg-background border border-border/60 rounded-sm text-sm text-foreground font-devanagari" />
          <select value={form.saintId} onChange={e => setForm(f => ({ ...f, saintId: e.target.value }))} className="w-full px-3 py-2 bg-background border border-border/60 rounded-sm text-sm text-foreground">
            <option value="">Select Saint</option>
            {saints.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <select value={form.sampradayaId} onChange={e => setForm(f => ({ ...f, sampradayaId: e.target.value }))} className="w-full px-3 py-2 bg-background border border-border/60 rounded-sm text-sm text-foreground">
            <option value="">Select Sampradāya</option>
            {sampradayas.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Description" rows={3} className="w-full px-3 py-2 bg-background border border-border/60 rounded-sm text-sm text-foreground" />
          <div className="grid grid-cols-3 gap-3">
            <input value={form.language} onChange={e => setForm(f => ({ ...f, language: e.target.value }))} placeholder="Language" className="px-3 py-2 bg-background border border-border/60 rounded-sm text-sm text-foreground" />
            <input value={form.structure} onChange={e => setForm(f => ({ ...f, structure: e.target.value }))} placeholder="Structure" className="px-3 py-2 bg-background border border-border/60 rounded-sm text-sm text-foreground" />
            <input value={form.vaniCount} onChange={e => setForm(f => ({ ...f, vaniCount: e.target.value }))} placeholder="Vānī Count" type="number" className="px-3 py-2 bg-background border border-border/60 rounded-sm text-sm text-foreground" />
          </div>
          <input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="Tags (comma separated)" className="w-full px-3 py-2 bg-background border border-border/60 rounded-sm text-sm text-foreground" />
          <div className="flex gap-2">
            <button onClick={handleSubmit} className="px-4 py-2 bg-primary text-primary-foreground text-sm rounded-sm hover:bg-primary/90">{editing ? 'Update' : 'Add'}</button>
            <button onClick={resetForm} className="px-4 py-2 border border-border text-foreground text-sm rounded-sm hover:bg-secondary/50">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {books.map(b => {
          const saint = saints.find(s => s.id === b.saintId);
          return (
            <div key={b.id} className="flex items-center justify-between p-4 bg-card border border-border/60 rounded-sm">
              <div>
                <p className="font-devanagari text-gold text-xs">{b.titleHindi}</p>
                <p className="font-display font-semibold text-foreground">{b.title}</p>
                <p className="text-xs text-muted-foreground">{saint?.name} · {b.vaniCount} Vānīs</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(b)} className="p-2 text-muted-foreground hover:text-foreground"><Edit2 className="w-4 h-4" /></button>
                <button onClick={() => { store.deleteBook(b.id); toast.success('Deleted'); }} className="p-2 text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============ VANI MANAGER ============
function VaniManager({ vanis, books }: { vanis: Vani[]; books: Book[] }) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Vani | null>(null);
  const [expandedBook, setExpandedBook] = useState<string | null>(null);
  const [form, setForm] = useState({ bookId: '', vaniNumber: '1', title: '', titleHindi: '', originalText: '', transliteration: '', englishTranslation: '', commentary: '', ras: '', theme: '', raga: '', tags: '' });

  const resetForm = () => { setForm({ bookId: '', vaniNumber: '1', title: '', titleHindi: '', originalText: '', transliteration: '', englishTranslation: '', commentary: '', ras: '', theme: '', raga: '', tags: '' }); setEditing(null); setShowForm(false); };

  const handleSubmit = () => {
    if (!form.title.trim() || !form.bookId) return;
    const data = { ...form, vaniNumber: parseInt(form.vaniNumber) || 1, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean), raga: form.raga || undefined };
    if (editing) {
      store.updateVani(editing.id, data);
      toast.success('Vānī updated');
    } else {
      store.addVani({ id: generateId(), ...data } as Vani);
      toast.success('Vānī added');
    }
    resetForm();
  };

  const startEdit = (v: Vani) => {
    setEditing(v);
    setForm({ bookId: v.bookId, vaniNumber: String(v.vaniNumber), title: v.title, titleHindi: v.titleHindi, originalText: v.originalText, transliteration: v.transliteration, englishTranslation: v.englishTranslation, commentary: v.commentary, ras: v.ras, theme: v.theme, raga: v.raga || '', tags: v.tags.join(', ') });
    setShowForm(true);
  };

  const groupedByBook: Record<string, Vani[]> = {};
  vanis.forEach(v => {
    if (!groupedByBook[v.bookId]) groupedByBook[v.bookId] = [];
    groupedByBook[v.bookId].push(v);
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-xl font-semibold text-foreground">Vānīs</h2>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="flex items-center gap-1 px-3 py-2 bg-primary text-primary-foreground text-sm rounded-sm hover:bg-primary/90"><Plus className="w-4 h-4" /> Add</button>
      </div>

      {showForm && (
        <div className="p-6 bg-card border border-border/60 rounded-sm mb-6 space-y-3">
          <h3 className="font-display font-semibold text-foreground">{editing ? 'Edit' : 'Add'} Vānī</h3>
          <select value={form.bookId} onChange={e => setForm(f => ({ ...f, bookId: e.target.value }))} className="w-full px-3 py-2 bg-background border border-border/60 rounded-sm text-sm text-foreground">
            <option value="">Select Book</option>
            {books.map(b => <option key={b.id} value={b.id}>{b.title}</option>)}
          </select>
          <div className="grid grid-cols-2 gap-3">
            <input value={form.vaniNumber} onChange={e => setForm(f => ({ ...f, vaniNumber: e.target.value }))} placeholder="Vānī Number" type="number" className="px-3 py-2 bg-background border border-border/60 rounded-sm text-sm text-foreground" />
            <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Title (English)" className="px-3 py-2 bg-background border border-border/60 rounded-sm text-sm text-foreground" />
          </div>
          <input value={form.titleHindi} onChange={e => setForm(f => ({ ...f, titleHindi: e.target.value }))} placeholder="Title (Hindi)" className="w-full px-3 py-2 bg-background border border-border/60 rounded-sm text-sm text-foreground font-devanagari" />
          <textarea value={form.originalText} onChange={e => setForm(f => ({ ...f, originalText: e.target.value }))} placeholder="Original Text (Brajbhāṣā)" rows={3} className="w-full px-3 py-2 bg-background border border-border/60 rounded-sm text-sm text-foreground font-devanagari" />
          <textarea value={form.transliteration} onChange={e => setForm(f => ({ ...f, transliteration: e.target.value }))} placeholder="Transliteration" rows={2} className="w-full px-3 py-2 bg-background border border-border/60 rounded-sm text-sm text-foreground" />
          <textarea value={form.englishTranslation} onChange={e => setForm(f => ({ ...f, englishTranslation: e.target.value }))} placeholder="English Translation" rows={3} className="w-full px-3 py-2 bg-background border border-border/60 rounded-sm text-sm text-foreground" />
          <textarea value={form.commentary} onChange={e => setForm(f => ({ ...f, commentary: e.target.value }))} placeholder="Commentary" rows={3} className="w-full px-3 py-2 bg-background border border-border/60 rounded-sm text-sm text-foreground" />
          <div className="grid grid-cols-3 gap-3">
            <input value={form.ras} onChange={e => setForm(f => ({ ...f, ras: e.target.value }))} placeholder="Ras" className="px-3 py-2 bg-background border border-border/60 rounded-sm text-sm text-foreground" />
            <input value={form.theme} onChange={e => setForm(f => ({ ...f, theme: e.target.value }))} placeholder="Theme" className="px-3 py-2 bg-background border border-border/60 rounded-sm text-sm text-foreground" />
            <input value={form.raga} onChange={e => setForm(f => ({ ...f, raga: e.target.value }))} placeholder="Rāga (optional)" className="px-3 py-2 bg-background border border-border/60 rounded-sm text-sm text-foreground" />
          </div>
          <input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="Tags (comma separated)" className="w-full px-3 py-2 bg-background border border-border/60 rounded-sm text-sm text-foreground" />
          <div className="flex gap-2">
            <button onClick={handleSubmit} className="px-4 py-2 bg-primary text-primary-foreground text-sm rounded-sm hover:bg-primary/90">{editing ? 'Update' : 'Add'}</button>
            <button onClick={resetForm} className="px-4 py-2 border border-border text-foreground text-sm rounded-sm hover:bg-secondary/50">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {books.map(book => {
          const bookVanis = (groupedByBook[book.id] || []).sort((a, b) => a.vaniNumber - b.vaniNumber);
          const isExpanded = expandedBook === book.id;
          return (
            <div key={book.id} className="bg-card border border-border/60 rounded-sm">
              <button onClick={() => setExpandedBook(isExpanded ? null : book.id)} className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/30 transition-colors">
                <div>
                  <p className="font-display font-semibold text-foreground">{book.title}</p>
                  <p className="text-xs text-muted-foreground">{bookVanis.length} Vānīs</p>
                </div>
                {isExpanded ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
              </button>
              {isExpanded && (
                <div className="border-t border-border/40 p-4 space-y-2">
                  {bookVanis.map(v => (
                    <div key={v.id} className="flex items-center justify-between p-3 bg-background/50 rounded-sm">
                      <div>
                        <span className="text-xs text-gold font-medium mr-2">{v.vaniNumber}</span>
                        <span className="text-sm text-foreground">{v.title}</span>
                        <span className="font-devanagari text-xs text-muted-foreground ml-2">{v.titleHindi}</span>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => startEdit(v)} className="p-1 text-muted-foreground hover:text-foreground"><Edit2 className="w-3.5 h-3.5" /></button>
                        <button onClick={() => { store.deleteVani(v.id); toast.success('Deleted'); }} className="p-1 text-muted-foreground hover:text-destructive"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  ))}
                  {bookVanis.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No Vānīs yet. Click "Add" to create one.</p>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
