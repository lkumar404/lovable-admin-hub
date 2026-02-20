import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useDataStore } from '@/hooks/useDataStore';
import { getSaint, getSampradaya } from '@/lib/dataStore';

export default function BooksListPage() {
  const { books } = useDataStore();
  return (
    <>
      <SEOHead title="Books — Sacred Texts" description="Browse the sacred texts archived in BrajSastra." path="/books" />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Books' }]} />
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.2em] text-gold mb-2">Sacred Texts</p>
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">Books</h1>
          <p className="text-muted-foreground mb-10 max-w-2xl">The Granthas and literary works of the Rasik Saints, indexed and translated.</p>
          <div className="space-y-4">
            {books.map(b => {
              const saint = getSaint(b.saintId);
              const samp = getSampradaya(b.sampradayaId);
              return (
                <Link key={b.id} to={`/book/${b.slug}`} className="group block p-6 bg-card border border-border/60 rounded-sm hover:border-gold/30 transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-sm">{samp?.name}</span>
                    <span className="text-xs text-muted-foreground">{saint?.name}</span>
                  </div>
                  <p className="font-devanagari text-gold text-sm mb-0.5">{b.titleHindi}</p>
                  <h2 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">{b.title}</h2>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed">{b.description}</p>
                  <p className="text-xs text-muted-foreground mt-2">{b.vaniCount} Vānīs · {b.language}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
