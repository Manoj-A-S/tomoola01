import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase, FolkDance } from '../lib/supabase';

export default function FolkDanceDetail() {
  const { id } = useParams();
  const [dance, setDance] = useState<FolkDance | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDance();
  }, [id]);

  const fetchDance = async () => {
    const { data } = await supabase
      .from('folk_dances')
      .select('*')
      .eq('id', id)
      .single();

    setDance(data);
    setLoading(false);
  };

  if (loading) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  if (!dance) {
    return <div className="py-20 text-center">Dance not found</div>;
  }

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4 max-w-5xl">
        <img
          src={dance.image_url}
          alt={dance.name}
          className="w-full h-[400px] object-cover rounded-3xl shadow-lg mb-10"
        />

        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          {dance.name}
        </h1>

        <p className="text-xl text-gray-700 mb-8">
          {dance.description}
        </p>

        <div className="bg-white rounded-2xl p-8 shadow-md">
          <h2 className="text-2xl font-bold mb-4">History & Cultural Significance</h2>
          <p className="text-gray-700 leading-relaxed">
            {dance.history}
          </p>
        </div>
      </div>
    </section>
  );
}
