import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useDataStore } from '@/hooks/useDataStore';
import { getSaintsBySampradaya } from '@/lib/dataStore';
import { ArrowRight } from 'lucide-react';

export default function SampradayaListPage() {
  const { sampradayas } = useDataStore();
  return (
    <>
      <SEOHead title="Sampradāya — Sacred Lineages" description="Explore the great devotional traditions." path="/sampradaya" />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Sampradāya' }]} />
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.2em] text-gold mb-2">Sacred Lineages</p>
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">Sampradāya</h1>
          <p className="text-muted-foreground mb-10 max-w-2xl">The devotional traditions that have preserved and transmitted the theology of Nitya-Vihār across centuries.</p>
          <div className="space-y-6">
            {sampradayas.map(s => {
              const saintCount = getSaintsBySampradaya(s.id).length;
              return (
                <Link key={s.id} to={`/sampradaya/${s.slug}`} className="group block p-6 bg-card border border-border/60 rounded-sm hover:border-gold/30 transition-all">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-devanagari text-gold text-sm mb-1">{s.nameHindi}</p>
                      <h2 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{s.name}</h2>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{s.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{saintCount} Saint{saintCount !== 1 ? 's' : ''}</span>
                        <span>•</span>
                        <span>{s.lineage}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors mt-2 flex-shrink-0" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
