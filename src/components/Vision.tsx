import { Heart, TrendingUp, Globe } from 'lucide-react';

export default function Vision() {
  const visions = [
    {
      icon: Globe,
      title: 'Bridge Tradition & Technology',
      description: 'Create sustainable livelihoods while preserving India’s invaluable cultural heritage for future generations.'
    },
    {
      icon: Heart,
      title: 'Celebrate Authenticity',
      description: 'Enable clients to experience and share genuine Indian culture effortlessly at every event and celebration.'
    },
    {
      icon: TrendingUp,
      title: 'Revive Heritage',
      description: 'Together, we can bring India\'s magnificent artistic traditions to the world stage where they truly belong.'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-orange-600 to-red-600 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our Vision
          </h2>
          <p className="text-xl text-orange-100 max-w-3xl mx-auto">
            Preserving Culture and Enriching Events
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {visions.map((vision, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg">
                <vision.icon className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{vision.title}</h3>
              <p className="text-orange-100 leading-relaxed">{vision.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-2xl font-semibold text-white max-w-4xl mx-auto leading-relaxed">
              Join us in our mission to celebrate and preserve India’s rich cultural tapestry, 
              keeping these traditions alive for generations to come.          </p>
        </div>
      </div>
    </section>
  );
}
