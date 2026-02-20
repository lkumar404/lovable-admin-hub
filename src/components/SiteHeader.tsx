import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Mission', path: '/mission' },
  { label: 'Sampradāya', path: '/sampradaya' },
  { label: 'Saints', path: '/saints' },
  { label: 'Books', path: '/books' },
  { label: 'Vānī Library', path: '/search' },
  { label: 'Contribute', path: '/contribute' },
];

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="border-b border-border/60 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3 border-b border-border/40">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-sm border-2 border-primary/80 flex items-center justify-center relative bg-primary/5">
              <span className="text-primary font-devanagari text-base font-bold leading-none tracking-tight">ब्र</span>
              <div className="absolute inset-0 border border-primary/20 rounded-sm scale-[1.15]" />
            </div>
            <div>
              <h1 className="font-display text-xl font-semibold text-foreground tracking-tight leading-none">
                BrajSastra
              </h1>
              <p className="font-devanagari text-xs text-muted-foreground leading-none mt-0.5">
                ब्रजशास्त्र
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Link to="/search" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Search">
              <Search className="w-5 h-5" />
            </Link>
            <button className="md:hidden text-muted-foreground" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1 py-2" aria-label="Main navigation">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-1.5 text-sm font-body transition-colors rounded-sm ${
                location.pathname === link.path
                  ? 'text-primary font-medium bg-primary/5'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {mobileOpen && (
          <nav className="md:hidden py-4 space-y-1" aria-label="Mobile navigation">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 text-sm font-body transition-colors rounded-sm ${
                  location.pathname === link.path
                    ? 'text-primary font-medium bg-primary/5'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
