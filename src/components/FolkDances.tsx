import { useEffect, useState } from 'react';
import { supabase, FolkDance } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function FolkDances() {
  const [folkDances, setFolkDances] = useState<FolkDance[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    
    const { data: dancesData } = await supabase
      .from('folk_dances')
      .select('*');

    if (dancesData) setFolkDances(dancesData);
    setLoading(false);
  };

  const filteredDances = folkDances;

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
        </div>

        <div className="grid gap-8 mx-auto grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
          {filteredDances.map(dance => (
            <div key={dance.id} 
                 onClick={()=> navigate(`/folk-dances/${dance.id}`)}
                 className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:scale-105">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={dance.image_url}
                  alt={dance.name}
                  className="w-full h-full object-cover"
                />
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
