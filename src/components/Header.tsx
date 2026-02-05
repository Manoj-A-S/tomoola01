import { Music, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="bg-gradient-to-r from-orange-600 to-red-600 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-white rounded-full p-2">
              <Music className="w-8 h-8 text-orange-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-wide">ToMoola</h1>
              <p className="text-sm text-orange-100">Celebrating India's Heritage</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6">
            <NavLinks />
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 bg-white text-orange-600 rounded-2xl shadow-lg overflow-hidden">
            <div className="flex flex-col divide-y">
              <MobileLink to="/" onClick={closeMenu}>Home</MobileLink>
              <MobileLink to="/about" onClick={closeMenu}>About</MobileLink>
              <MobileLink to="/folk-dances" onClick={closeMenu}>Folk Dances</MobileLink>
              <MobileLink to="/book" onClick={closeMenu}>
                Book Now
              </MobileLink>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

/* ---------- Reusable Components ---------- */

function NavLinks() {
  return (
    <>
      <Link className="hover:text-orange-200 font-serif font-bold py-2 text-lg" to="/">Home</Link>
      <Link className="hover:text-orange-200 font-serif font-bold py-2 text-lg" to="/about">About</Link>
      <Link className="hover:text-orange-200 font-serif font-bold py-2 text-lg" to="/folk-dances">Folk Dances</Link>
      <Link to="/book"
        className="bg-white text-orange-600 text-lg px-6 py-2 rounded-full font-serif font-bold hover:bg-orange-50 shadow-md">
        Book Now
      </Link>
    </>
  );
}

function MobileLink({
  to,
  children,
  onClick,
}: {
  to: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`px-6 py-4 text-lg font-medium transition-colors`}
    >
      {children}
    </Link>
  );
}
