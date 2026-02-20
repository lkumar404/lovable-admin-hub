import { useParams, Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getBookBySlug, getVani, getVanisByBook, getSaint, getSampradaya } from '@/lib/dataStore';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function VaniPage() {
  const { slug, vaniNumber } = useParams<{ slug: string; vaniNumber: string }>();
  const book = getBookBySlug(slug || '');
  if (!book) return <div className="container mx-auto px-4 py-16 text-center text-muted-foreground">Book not found.</div>;
  const num = parseInt(vaniNumber || '1');
  const vani = getVani(book.id, num);
  if (!vani) return <div className="container mx-auto px-4 py-16 text-center text-muted-foreground">Vānī not found.</div>;

  const allVanis = getVanisByBook(book.id);
  const currentIndex = allVanis.findIndex(v => v.vaniNumber === num);
  const prevVani = currentIndex > 0 ? allVanis[currentIndex - 1] : null;
  const nextVani = currentIndex < allVanis.length - 1 ? allVanis[currentIndex + 1] : null;
  const saint = getSaint(book.saintId);
  const sampradaya = getSampradaya(book.sampradayaId);

  return (
    <>
      <SEOHead title={`Vānī ${vani.vaniNumber} – ${book.title} | ${saint?.name}`} description={vani.englishTranslation} path={`/book/${book.slug}/vani/${vani.vaniNumber}`} />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Books', path: '/books' }, { label: book.title, path: `/book/${book.slug}` }, { label: `Vānī ${vani.vaniNumber}` }]} />
        <article className="max-w-3xl">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {sampradaya && <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-sm">{sampradaya.name}</span>}
            {saint && <Link to={`/saint/${saint.slug}`} className="text-xs text-muted-foreground hover:text-foreground">{saint.name}</Link>}
            <span className="text-xs text-muted-foreground">·</span>
            <Link to={`/book/${book.slug}`} className="text-xs text-muted-foreground hover:text-foreground">{book.title}</Link>
          </div>
          <p className="font-devanagari text-gold text-sm mb-1">{vani.titleHindi}</p>
          <h1 className="font-display text-3xl font-bold text-foreground mb-1">Vānī {vani.vaniNumber} — {vani.title}</h1>
          <div className="gold-divider my-6" />

          <section className="mb-8">
            <h2 className="text-xs uppercase tracking-[0.15em] text-gold mb-3">Original Text (Brajbhāṣā)</h2>
            <div className="p-6 bg-card border border-border/60 rounded-sm">
              <p className="font-devanagari text-xl leading-loose text-foreground whitespace-pre-line">{vani.originalText}</p>
            </div>
          </section>

          {vani.transliteration && (
            <section className="mb-8">
              <h2 className="text-xs uppercase tracking-[0.15em] text-gold mb-3">Transliteration</h2>
              <div className="p-6 bg-card border border-border/60 rounded-sm">
                <p className="text-foreground italic leading-relaxed whitespace-pre-line">{vani.transliteration}</p>
              </div>
            </section>
          )}

          <section className="mb-8">
            <h2 className="text-xs uppercase tracking-[0.15em] text-gold mb-3">English Translation</h2>
            <div className="p-6 bg-secondary/40 border border-border/60 rounded-sm">
              <p className="text-foreground leading-relaxed text-lg">{vani.englishTranslation}</p>
            </div>
          </section>

          {vani.commentary && (
            <section className="mb-8">
              <h2 className="text-xs uppercase tracking-[0.15em] text-gold mb-3">Commentary</h2>
              <p className="text-muted-foreground leading-relaxed">{vani.commentary}</p>
            </section>
          )}

          <section className="mb-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              <div className="p-3 bg-card border border-border/60 rounded-sm"><p className="text-xs text-muted-foreground mb-0.5">Ras</p><p className="font-medium text-foreground">{vani.ras}</p></div>
              <div className="p-3 bg-card border border-border/60 rounded-sm"><p className="text-xs text-muted-foreground mb-0.5">Theme</p><p className="font-medium text-foreground">{vani.theme}</p></div>
              {vani.raga && <div className="p-3 bg-card border border-border/60 rounded-sm"><p className="text-xs text-muted-foreground mb-0.5">Rāga</p><p className="font-medium text-foreground">{vani.raga}</p></div>}
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {vani.tags.map(t => <span key={t} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-sm">{t}</span>)}
            </div>
          </section>

          <nav className="flex items-center justify-between py-4 border-t border-border/60">
            {prevVani ? (
              <Link to={`/book/${book.slug}/vani/${prevVani.vaniNumber}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ChevronLeft className="w-4 h-4" /><span>Vānī {prevVani.vaniNumber}</span>
              </Link>
            ) : <div />}
            <Link to={`/book/${book.slug}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Back to {book.title}</Link>
            {nextVani ? (
              <Link to={`/book/${book.slug}/vani/${nextVani.vaniNumber}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <span>Vānī {nextVani.vaniNumber}</span><ChevronRight className="w-4 h-4" />
              </Link>
            ) : <div />}
          </nav>
        </article>
      </div>
    </>
  );
}
