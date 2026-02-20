import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { useDataStore } from '@/hooks/useDataStore';
import { BookOpen, Users, Library, ScrollText, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const { sampradayas, saints, books, vanis } = useDataStore();

  const stats = [
    { icon: Library, label: 'Sampradāyas', value: sampradayas.length },
    { icon: Users, label: 'Saints', value: saints.length },
    { icon: BookOpen, label: 'Books', value: books.length },
    { icon: ScrollText, label: 'Vānīs', value: vanis.length },
  ];

  return (
    <>
      <SEOHead title="Digital Library of Braj Rasik Literature" description="BrajSastra is the definitive digital archive of Braj Rasik literature." path="/" />

      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-devanagari text-gold text-lg md:text-xl mb-4 tracking-wide">ब्रजशास्त्र</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6 text-balance">
              The Digital Archive of Braj Rasik Literature
            </h1>
            <div className="gold-divider max-w-xs mx-auto mb-6" />
            <p className="text-lg md:text-xl text-muted-foreground font-body leading-relaxed mb-8 max-w-2xl mx-auto">
              Preserving, translating, and publishing the sacred Śāstras and Vānīs of the Rasik Saints —
              the literary heritage of Nitya-Vihār Upāsanā — for scholars, seekers, and future generations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/search" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-body text-sm font-medium rounded-sm hover:bg-primary/90 transition-colors">
                <BookOpen className="w-4 h-4" /> Explore the Library
              </Link>
              <Link to="/mission" className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-body text-sm font-medium rounded-sm hover:bg-secondary/50 transition-colors">
                Our Mission <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 border-y border-border/40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(stat => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-5 h-5 mx-auto mb-2 text-gold" />
                <p className="font-display text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-gold mb-2">Sacred Lineages</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">Sampradāya</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">The great devotional traditions preserving the theology of Nitya-Vihār.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {sampradayas.map(s => (
              <Link key={s.id} to={`/sampradaya/${s.slug}`} className="group p-6 bg-card border border-border/60 rounded-sm hover:border-gold/30 transition-all">
                <p className="font-devanagari text-gold text-sm mb-1">{s.nameHindi}</p>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{s.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{s.description}</p>
                <span className="inline-flex items-center gap-1 mt-3 text-xs text-gold font-medium">Explore <ArrowRight className="w-3 h-3" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-gold mb-2">From the Archive</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">Featured Vānīs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {vanis.slice(0, 4).map(v => {
              const book = books.find(b => b.id === v.bookId);
              const saint = saints.find(s => s.id === book?.saintId);
              return (
                <Link key={v.id} to={`/book/${book?.slug}/vani/${v.vaniNumber}`} className="group p-6 bg-card border border-border/60 rounded-sm hover:border-gold/30 transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-sm">{saint?.name}</span>
                    <span className="text-xs text-muted-foreground">Vānī {v.vaniNumber}</span>
                  </div>
                  <p className="font-devanagari text-foreground text-sm leading-relaxed mb-3 line-clamp-2">{v.originalText}</p>
                  <p className="text-sm text-muted-foreground italic line-clamp-2 leading-relaxed">"{v.englishTranslation}"</p>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Link to="/search" className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline">Browse all Vānīs <ArrowRight className="w-3.5 h-3.5" /></Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-gold mb-2">A Civilizational Mission</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Why This Archive Exists</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              For centuries, the Rasik literature of Braj has been preserved in fragile manuscripts, scattered across private collections and aging temples. BrajSastra exists to ensure this irreplaceable heritage is digitized, translated, and made accessible to the world.
            </p>
            <Link to="/mission" className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline">Read the full mission <ArrowRight className="w-3.5 h-3.5" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
