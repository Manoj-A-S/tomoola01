import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section id="home" className="relative bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6 leading-tight">
            Discover Authentic
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600"> Indian Folk Art</span>
          </h2>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed font-sans tracking-tight">
            Connect with India's finest folk dance groups. Bring the vibrant colors,
            rhythms, and traditions of our rich cultural heritage to your special events.
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
