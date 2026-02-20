import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useDataStore } from '@/hooks/useDataStore';
import { searchContent, getBook } from '@/lib/dataStore';
import { Search, X } from 'lucide-react';

export default function SearchPage() {
  const { sampradayas, saints, books, vanis } = useDataStore();
  const [query, setQuery] = useState('');
  const [filterSampradaya, setFilterSampradaya] = useState('');
  const [filterSaint, setFilterSaint] = useState('');

  const results = useMemo(() => {
    if (!query.trim() && !filterSampradaya && !filterSaint) return null;
    let items = query.trim() ? searchContent(query) : [];
    if (!query.trim() && (filterSampradaya || filterSaint)) {
      items = vanis.map(v => {
        const book = getBook(v.bookId);
        return { type: 'Vānī' as const, title: `${book?.title} — Vānī ${v.vaniNumber}`, url: `/book/${book?.slug}/vani/${v.vaniNumber}`, snippet: v.englishTranslation.slice(0, 120) + '…' };
      });
    }
    if (filterSampradaya) {
      const saintIds = saints.filter(s => s.sampradayaId === filterSampradaya).map(s => s.id);
      const bookSlugs = books.filter(b => saintIds.includes(b.saintId)).map(b => b.slug);
      items = items.filter(r => bookSlugs.some(slug => r.url.includes(slug)) || saints.filter(s => s.sampradayaId === filterSampradaya).some(s => r.url.includes(s.slug)));
    }
    if (filterSaint) {
      const bookSlugs = books.filter(b => b.saintId === filterSaint).map(b => b.slug);
      const saint = saints.find(s => s.id === filterSaint);
      items = items.filter(r => bookSlugs.some(slug => r.url.includes(slug)) || (saint && r.url.includes(saint.slug)));
    }
    return items;
  }, [query, filterSampradaya, filterSaint, vanis, saints, books]);

  return (
    <>
      <SEOHead title="Vānī Library — Search & Explore" description="Search the BrajSastra digital library." path="/search" />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Vānī Library' }]} />
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.2em] text-gold mb-2">Search & Explore</p>
          <h1 className="font-display text-4xl font-bold text-foreground mb-6">Vānī Library</h1>
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by saint, book, vānī, keyword, theme…"
              className="w-full pl-12 pr-10 py-3 bg-card border border-border/60 rounded-sm text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 transition-colors" />
            {query && <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>}
          </div>
          <div className="flex flex-wrap gap-3 mb-8">
            <select value={filterSampradaya} onChange={e => setFilterSampradaya(e.target.value)} className="px-3 py-2 bg-card border border-border/60 rounded-sm text-sm text-foreground font-body focus:outline-none focus:border-gold/50">
              <option value="">All Sampradāyas</option>
              {sampradayas.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            <select value={filterSaint} onChange={e => setFilterSaint(e.target.value)} className="px-3 py-2 bg-card border border-border/60 rounded-sm text-sm text-foreground font-body focus:outline-none focus:border-gold/50">
              <option value="">All Saints</option>
              {saints.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          {results === null ? (
            <div className="text-center py-16"><p className="text-muted-foreground mb-2">Enter a search term or select a filter to explore the archive.</p><p className="text-sm text-muted-foreground">Try: "Rādhā", "Nikunj", "Flute", "Śṛṅgāra"</p></div>
          ) : results.length === 0 ? (
            <div className="text-center py-16"><p className="text-muted-foreground">No results found. Try a different search term.</p></div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground mb-4">{results.length} result{results.length !== 1 ? 's' : ''}</p>
              {results.map((r, i) => (
                <Link key={i} to={r.url} className="group block p-4 bg-card border border-border/60 rounded-sm hover:border-gold/30 transition-all">
                  <div className="flex items-center gap-2 mb-1"><span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-sm">{r.type}</span></div>
                  <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">{r.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{r.snippet}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
