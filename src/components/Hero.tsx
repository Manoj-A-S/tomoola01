export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Discover Authentic
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600"> Indian Folk Art</span>
          </h2>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Connect with India's finest folk dance artists and groups. Bring the vibrant colors,
            rhythms, and traditions of our rich cultural heritage to your special events.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('artists')}
              className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all transform hover:scale-105"
            >
              Browse Artists
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="bg-white text-orange-600 px-8 py-4 rounded-full text-lg font-semibold border-2 border-orange-600 hover:bg-orange-50 transition-all"
            >
              How It Works
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
