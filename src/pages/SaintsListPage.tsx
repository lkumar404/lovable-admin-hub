import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useDataStore } from '@/hooks/useDataStore';
import { getSampradaya } from '@/lib/dataStore';

export default function SaintsListPage() {
  const { saints } = useDataStore();
  return (
    <>
      <SEOHead title="Saints — Rasik Ācāryas" description="Explore the Rasik Saints." path="/saints" />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Saints' }]} />
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.2em] text-gold mb-2">Rasik Ācāryas</p>
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">Saints</h1>
          <p className="text-muted-foreground mb-10 max-w-2xl">The poet-saints and mystic-theologians whose Vānīs illuminate the path of Nitya-Vihār.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {saints.map(s => {
              const samp = getSampradaya(s.sampradayaId);
              return (
                <Link key={s.id} to={`/saint/${s.slug}`} className="group p-6 bg-card border border-border/60 rounded-sm hover:border-gold/30 transition-all">
                  <p className="font-devanagari text-gold text-sm mb-1">{s.nameHindi}</p>
                  <h2 className="font-display text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{s.name}</h2>
                  <p className="text-xs text-muted-foreground mb-3">{s.period} · {samp?.name}</p>
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{s.bio}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
