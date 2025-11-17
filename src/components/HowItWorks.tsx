import { Search, ShieldCheck, Sparkles } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: 'Browse & Compare',
      description: 'Explore comprehensive artist profiles featuring high-quality videos, professional photos, and authentic reviews from previous clients. Filter by genre, region, price range, and availability to find your ideal cultural experience.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: ShieldCheck,
      title: 'Book Securely',
      description: 'Request personalized quotes, negotiate event details directly with artists, and pay safely through our trusted, encrypted payment platform. Transparent pricing with no hidden fees ensures peace of mind.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Sparkles,
      title: 'Enjoy Your Event',
      description: 'Relax knowing your booking is confirmed with all details finalized. Your event will be enriched with authentic folk artistry, creating unforgettable memories for you and your guests.',
      color: 'from-pink-500 to-orange-500'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How ToMoola Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simple 3-Step Booking Process
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 h-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-lg`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <div className="absolute top-8 right-8 text-6xl font-bold text-orange-200 opacity-50">
                  {index + 1}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-700 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
