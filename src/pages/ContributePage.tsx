import SEOHead from '@/components/SEOHead';

export default function ContributePage() {
  return (
    <>
      <SEOHead title="Contribute" description="Join the BrajSastra mission." path="/contribute" />
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-gold mb-2">Join the Mission</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">Contribute</h1>
          <div className="gold-divider mb-8" />
          <div className="space-y-8 text-muted-foreground font-body leading-relaxed">
            <p className="text-lg text-foreground">BrajSastra is a collective endeavour. We welcome scholars, translators, transcribers, and devotees who wish to contribute.</p>
            <div className="space-y-6">
              <div className="p-6 bg-card border border-border/60 rounded-sm"><h2 className="font-display text-lg font-semibold text-foreground mb-2">Transcription</h2><p className="text-sm">Help digitize handwritten manuscripts and printed texts into searchable, structured Devanagari text.</p></div>
              <div className="p-6 bg-card border border-border/60 rounded-sm"><h2 className="font-display text-lg font-semibold text-foreground mb-2">Translation</h2><p className="text-sm">Translate Brajbhāṣā and Sanskrit texts into English with scholarly accuracy and devotional sensitivity.</p></div>
              <div className="p-6 bg-card border border-border/60 rounded-sm"><h2 className="font-display text-lg font-semibold text-foreground mb-2">Research & Commentary</h2><p className="text-sm">Provide theological commentary, historical context, and academic notes for archived texts.</p></div>
              <div className="p-6 bg-card border border-border/60 rounded-sm"><h2 className="font-display text-lg font-semibold text-foreground mb-2">Manuscript Access</h2><p className="text-sm">If you have access to rare manuscripts or printed editions, help us expand the archive.</p></div>
            </div>
            <div className="mt-10 p-6 bg-secondary/40 border border-border/60 rounded-sm text-center">
              <p className="text-foreground font-medium mb-2">Interested in contributing?</p>
              <p className="text-sm text-muted-foreground">Write to us at <span className="text-foreground">contact@brajsastra.com</span></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
