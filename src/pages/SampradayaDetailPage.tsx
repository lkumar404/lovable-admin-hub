import { useParams, Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getSampradayaBySlug, getSaintsBySampradaya, getBooksBySampradaya } from '@/lib/dataStore';
import { ArrowRight } from 'lucide-react';

export default function SampradayaDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const sampradaya = getSampradayaBySlug(slug || '');
  if (!sampradaya) return <div className="container mx-auto px-4 py-16 text-center text-muted-foreground">Sampradāya not found.</div>;

  const saintsList = getSaintsBySampradaya(sampradaya.id);
  const booksList = getBooksBySampradaya(sampradaya.id);

  return (
    <>
      <SEOHead title={`${sampradaya.name} Sampradāya`} description={sampradaya.description} path={`/sampradaya/${sampradaya.slug}`} />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Sampradāya', path: '/sampradaya' }, { label: sampradaya.name }]} />
        <div className="max-w-3xl">
          <p className="font-devanagari text-gold text-lg mb-1">{sampradaya.nameHindi}</p>
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">{sampradaya.name}</h1>
          <div className="gold-divider mb-6" />
          <p className="text-muted-foreground leading-relaxed mb-4">{sampradaya.description}</p>
          <p className="text-sm text-muted-foreground mb-10"><span className="font-medium text-foreground">Lineage:</span> {sampradaya.lineage}</p>
          {saintsList.length > 0 && (
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Saints</h2>
              <div className="space-y-4">
                {saintsList.map(s => (
                  <Link key={s.id} to={`/saint/${s.slug}`} className="group block p-5 bg-card border border-border/60 rounded-sm hover:border-gold/30 transition-all">
                    <p className="font-devanagari text-gold text-xs mb-0.5">{s.nameHindi}</p>
                    <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{s.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{s.period}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
          {booksList.length > 0 && (
            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Books</h2>
              <div className="space-y-4">
                {booksList.map(b => (
                  <Link key={b.id} to={`/book/${b.slug}`} className="group flex items-center justify-between p-5 bg-card border border-border/60 rounded-sm hover:border-gold/30 transition-all">
                    <div>
                      <p className="font-devanagari text-gold text-xs mb-0.5">{b.titleHindi}</p>
                      <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{b.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{b.vaniCount} Vānīs</p>
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
