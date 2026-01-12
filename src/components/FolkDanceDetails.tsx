import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase, FolkDance } from '../lib/supabase';
import Breadcrumbs from './Breadcrumbs';
import { MapPin, Video } from 'lucide-react';
import ImageGallery from './ImageGallery';
import VideoGallery from './VideoGallery';

export default function FolkDanceDetail() {
  const { id } = useParams();
  const [dance, setDance] = useState<FolkDance | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


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
    <section className="relative bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 py-20">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: 'Folk Dances', to: '/folk-dances' },
            { label: dance.name }
          ]}
        />

        <div className="p-1 mt-4 flex flex-col md:flex-row gap-10">

          {/* Left: Image */}
          <div className="md:w-1/2 w-full rounded-2xl overflow-hidden flex items-center justify-center h-[400px] bg-gray-700">
            <img
              src={dance.image_url}
              alt={dance.name}
              className="max-w-full max-h-full object-contain rounded-2xl"
            />
          </div>

          {/* Right: Content */}
          <div className="md:w-1/2 w-full flex flex-col">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              {dance.name}
            </h1>

            <p className="text-gray-900 leading-relaxed font-serif text-lg mb-6">
              {dance.description}
            </p>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-500" />
              <span>Karnataka</span>
            </div>
            <div className='mt-5'>
              <button
                onClick={() => navigate(`/book`)}
                className="bg-gradient-to-r from-orange-600 to-red-600
                 text-white py-3 w-full sm:w-1/2 md:w-1/4 rounded-full font-semibold hover:shadow-lg transition-all transform hover:scale-105">
                Book Now
              </button>
            </div>
          </div>

        </div>
        <div className='p-1 mt-4 flex flex-col md:flex-row'>
          {dance.history && (
            <div>
              <h2 className="text-3xl font-serif font-bold mb-3">
                History
              </h2>
              <p className="text-gray-900 leading-relaxed font-serif text-lg">
                {dance.history}
              </p>
            </div>
          )}
        </div>
        <div className='p-1 mt-4 flex flex-col'>
          {dance?.images && dance.images.length > 0 && (
            <div className="text-3xl font-serif font-bold mb-3">
              🖼️ Images
            </div>
          )}
          <div>
            {dance?.images && dance.images.length > 0 && (
              <ImageGallery images={dance.images} />
            )}
          </div>
        </div>

        <div className='p-1 mt-4 flex flex-col'>
          {dance?.videos && dance.videos.length > 0 && (
            <>
              <div className="flex items-center gap-2 text-3xl font-serif font-bold mb-3">
                <Video className="w-7 h-7 text-red-500" />
                <span>Videos</span>
              </div>

              <VideoGallery videos={dance.videos} />
            </>
          )}
        </div>

      </div>
    </section>
  );
}
