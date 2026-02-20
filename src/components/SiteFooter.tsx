import { Link } from 'react-router-dom';

export default function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-card/50 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-devanagari text-sm font-bold">ब्र</span>
              </div>
              <span className="font-display text-lg font-semibold text-foreground">BrajSastra</span>
            </div>
            <p className="text-sm text-muted-foreground font-body leading-relaxed">
              The digital archive of Braj Rasik literature. Preserving the Śāstras and Vānīs of Rasik Saints for generations.
            </p>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-3">Library</h4>
            <ul className="space-y-2">
              <li><Link to="/sampradaya" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sampradāya</Link></li>
              <li><Link to="/saints" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Saints</Link></li>
              <li><Link to="/books" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Books</Link></li>
              <li><Link to="/search" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Vānī Library</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-3">About</h4>
            <ul className="space-y-2">
              <li><Link to="/mission" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Mission</Link></li>
              <li><Link to="/contribute" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contribute</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-3">Connect</h4>
            <p className="text-sm text-muted-foreground font-body">contact@brajsastra.com</p>
          </div>
        </div>
        <div className="gold-divider mt-8 mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} BrajSastra.com — A civilizational preservation initiative.</p>
          <p className="text-xs text-muted-foreground font-devanagari">राधा सर्वस्व सम्प्रदाय</p>
        </div>
      </div>
    </footer>
  );
}
