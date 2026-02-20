import SEOHead from '@/components/SEOHead';

export default function MissionPage() {
  return (
    <>
      <SEOHead title="Mission" description="BrajSastra exists to preserve, translate, and publish the Braj Śāstras and Vānīs of Rasik Saints." path="/mission" />
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-gold mb-2">Our Purpose</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">Mission</h1>
          <div className="gold-divider mb-8" />
          <div className="prose prose-stone max-w-none space-y-6 text-muted-foreground font-body leading-relaxed">
            <p className="text-lg text-foreground">BrajSastra is the foundation of the Braj Rasik Digital Library — a long-term civilizational initiative to preserve, translate, organize, and publish the sacred literature of the Rasik Saints of Vṛndāvan.</p>
            <h2 className="font-display text-xl font-semibold text-foreground mt-10 mb-3">The Problem</h2>
            <p>The Rasik literary tradition — spanning centuries of devotional poetry, theological commentary, and mystical revelation in Brajbhāṣā and Sanskrit — remains one of the most underserved domains in Indian textual scholarship.</p>
            <h2 className="font-display text-xl font-semibold text-foreground mt-10 mb-3">Our Response</h2>
            <p>BrajSastra creates a structured, searchable, multilingual digital archive organized by Sampradāya, Saint, Book, and Vānī — with original Brajbhāṣā text, English translations, scholarly commentary, and rich metadata.</p>
            <h2 className="font-display text-xl font-semibold text-foreground mt-10 mb-3">Our Standards</h2>
            <ul className="list-none space-y-2 pl-0">
              <li className="flex items-start gap-2"><span className="text-gold mt-1">✦</span><span>Academic rigor in translation and attribution</span></li>
              <li className="flex items-start gap-2"><span className="text-gold mt-1">✦</span><span>Devotional integrity in presentation</span></li>
              <li className="flex items-start gap-2"><span className="text-gold mt-1">✦</span><span>Technological excellence in delivery</span></li>
              <li className="flex items-start gap-2"><span className="text-gold mt-1">✦</span><span>Open access for scholars and seekers worldwide</span></li>
            </ul>
            <h2 className="font-display text-xl font-semibold text-foreground mt-10 mb-3">The Vision</h2>
            <p>To become the world's most comprehensive and authoritative digital repository of Braj Rasik literature.</p>
            <div className="mt-12 p-6 bg-secondary/40 border border-border/60 rounded-sm text-center">
              <p className="font-devanagari text-gold text-lg mb-2">राधा सर्वसु साम्प्रदायिक धुरीण</p>
              <p className="text-sm text-muted-foreground italic">"Śrī Rādhā, the supreme presiding deity of all devotional traditions"</p>
              <p className="text-xs text-muted-foreground mt-1">— Hit Catuṣṭī, Vānī 1</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
