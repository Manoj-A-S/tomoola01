import { Music } from 'lucide-react';

export default function Header() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="bg-gradient-to-r from-orange-600 to-red-600 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white rounded-full p-2">
              <Music className="w-8 h-8 text-orange-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-wide">ToMoola</h1>
              <p className="text-sm text-orange-100">Celebrating India's Heritage</p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-6">
            <button
              onClick={() => scrollToSection('home')}
              className="hover:text-orange-200 transition-colors font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="hover:text-orange-200 transition-colors font-medium"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('folk-dances')}
              className="hover:text-orange-200 transition-colors font-medium"
            >
              Folk Dances
            </button>
            <button
              onClick={() => scrollToSection('artists')}
              className="hover:text-orange-200 transition-colors font-medium"
            >
              Artists
            </button>
            <button
              onClick={() => scrollToSection('book')}
              className="bg-white text-orange-600 px-6 py-2 rounded-full font-semibold hover:bg-orange-50 transition-all shadow-md"
            >
              Book Now
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
