import { useParams, Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getBookBySlug, getSaint, getSampradaya, getVanisByBook } from '@/lib/dataStore';
import { ArrowRight } from 'lucide-react';

export default function BookDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const book = getBookBySlug(slug || '');
  if (!book) return <div className="container mx-auto px-4 py-16 text-center text-muted-foreground">Book not found.</div>;
  const saint = getSaint(book.saintId);
  const sampradaya = getSampradaya(book.sampradayaId);
  const vanisList = getVanisByBook(book.id);

  return (
    <>
      <SEOHead title={`${book.title} — ${saint?.name}`} description={book.description} path={`/book/${book.slug}`} />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Books', path: '/books' }, { label: book.title }]} />
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            {sampradaya && <Link to={`/sampradaya/${sampradaya.slug}`} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-sm hover:bg-secondary/80">{sampradaya.name}</Link>}
            {saint && <Link to={`/saint/${saint.slug}`} className="text-xs text-muted-foreground hover:text-foreground">{saint.name}</Link>}
          </div>
          <p className="font-devanagari text-gold text-lg mb-1">{book.titleHindi}</p>
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">{book.title}</h1>
          <div className="gold-divider mb-6" />
          <p className="text-muted-foreground leading-relaxed mb-4">{book.description}</p>
          <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
            <div className="p-3 bg-card border border-border/60 rounded-sm">
              <p className="text-xs text-muted-foreground mb-1">Language</p>
              <p className="font-medium text-foreground">{book.language}</p>
            </div>
            <div className="p-3 bg-card border border-border/60 rounded-sm">
              <p className="text-xs text-muted-foreground mb-1">Structure</p>
              <p className="font-medium text-foreground">{book.structure}</p>
            </div>
          </div>
          <section>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Vānī Index <span className="text-sm font-normal text-muted-foreground">({vanisList.length} available)</span></h2>
            <div className="space-y-2">
              {vanisList.map(v => (
                <Link key={v.id} to={`/book/${book.slug}/vani/${v.vaniNumber}`} className="group flex items-center justify-between p-4 bg-card border border-border/60 rounded-sm hover:border-gold/30 transition-all">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gold w-8">{v.vaniNumber}</span>
                    <div>
                      <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors text-sm">{v.title}</h3>
                      <p className="font-devanagari text-xs text-muted-foreground">{v.titleHindi}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground hidden sm:inline">{v.theme}</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
