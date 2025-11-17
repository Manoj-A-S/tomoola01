import { useEffect, useState } from 'react';
import { supabase, FolkDance, IndianState } from '../lib/supabase';
import { MapPin } from 'lucide-react';

export default function FolkDances() {
  const [states, setStates] = useState<IndianState[]>([]);
  const [folkDances, setFolkDances] = useState<FolkDance[]>([]);
  const [selectedState, setSelectedState] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: statesData } = await supabase
      .from('indian_states')
      .select('*')
      .order('name');

    const { data: dancesData } = await supabase
      .from('folk_dances')
      .select('*');

    if (statesData) setStates(statesData);
    if (dancesData) setFolkDances(dancesData);
    setLoading(false);
  };

  const filteredDances = selectedState === 'all'
    ? folkDances
    : folkDances.filter(dance => dance.state_id === selectedState);

  const getStateName = (stateId: string) => {
    return states.find(s => s.id === stateId)?.name || '';
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-600">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="folk-dances" className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore Folk Dance Traditions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover the rich tapestry of Indian folk dances, each telling a unique story of its region's culture, history, and traditions.
          </p>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            <button
              onClick={() => setSelectedState('all')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedState === 'all'
                  ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              All States
            </button>
            {states.map(state => (
              <button
                key={state.id}
                onClick={() => setSelectedState(state.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedState === state.id
                    ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {state.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredDances.map(dance => (
            <div key={dance.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:scale-105">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={dance.image_url}
                  alt={dance.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                  <MapPin className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium text-gray-800">{getStateName(dance.state_id)}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{dance.name}</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">{dance.description}</p>
                <div className="bg-orange-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 leading-relaxed">{dance.history}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
