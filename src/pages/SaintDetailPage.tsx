import { useParams, Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getSaintBySlug, getSampradaya, getBooksBySaint } from '@/lib/dataStore';
import { ArrowRight } from 'lucide-react';

export default function SaintDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const saint = getSaintBySlug(slug || '');
  if (!saint) return <div className="container mx-auto px-4 py-16 text-center text-muted-foreground">Saint not found.</div>;
  const sampradaya = getSampradaya(saint.sampradayaId);
  const booksList = getBooksBySaint(saint.id);

  return (
    <>
      <SEOHead title={saint.name} description={`${saint.name} (${saint.period}) — ${saint.theologicalEmphasis}`} path={`/saint/${saint.slug}`} />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Saints', path: '/saints' }, { label: saint.name }]} />
        <div className="max-w-3xl">
          <p className="font-devanagari text-gold text-lg mb-1">{saint.nameHindi}</p>
          <h1 className="font-display text-4xl font-bold text-foreground mb-2">{saint.name}</h1>
          <p className="text-sm text-muted-foreground mb-4">{saint.period}</p>
          <div className="gold-divider mb-6" />
          <div className="flex flex-wrap gap-2 mb-6">
            {sampradaya && <Link to={`/sampradaya/${sampradaya.slug}`} className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-sm hover:bg-secondary/80 transition-colors">{sampradaya.name}</Link>}
            {saint.tags.map(t => <span key={t} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-sm">{t}</span>)}
          </div>
          <section className="mb-8">
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">Biography</h2>
            <p className="text-muted-foreground leading-relaxed">{saint.bio}</p>
          </section>
          <section className="mb-8">
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">Theological Emphasis</h2>
            <p className="text-muted-foreground leading-relaxed">{saint.theologicalEmphasis}</p>
          </section>
          <section className="mb-8">
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">Major Works</h2>
            <ul className="space-y-1">
              {saint.works.map(w => <li key={w} className="text-muted-foreground flex items-center gap-2"><span className="text-gold text-xs">✦</span> {w}</li>)}
            </ul>
          </section>
          {booksList.length > 0 && (
            <section>
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">Books in Archive</h2>
              <div className="space-y-3">
                {booksList.map(b => (
                  <Link key={b.id} to={`/book/${b.slug}`} className="group flex items-center justify-between p-4 bg-card border border-border/60 rounded-sm hover:border-gold/30 transition-all">
                    <div>
                      <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">{b.title}</h3>
                      <p className="text-xs text-muted-foreground">{b.vaniCount} Vānīs · {b.language}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
