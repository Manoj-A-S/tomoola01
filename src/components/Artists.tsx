import { useEffect, useState } from 'react';
import { supabase, Artist, FolkDance, Review } from '../lib/supabase';
import { Star, BadgeCheck, Users, Calendar } from 'lucide-react';

export default function Artists() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [folkDances, setFolkDances] = useState<FolkDance[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [artistsRes, dancesRes, reviewsRes] = await Promise.all([
      supabase.from('artists').select('*').order('rating', { ascending: false }),
      supabase.from('folk_dances').select('*'),
      supabase.from('reviews').select('*')
    ]);

    if (artistsRes.data) setArtists(artistsRes.data);
    if (dancesRes.data) setFolkDances(dancesRes.data);
    if (reviewsRes.data) setReviews(reviewsRes.data);
    setLoading(false);
  };

  const getDanceName = (danceId: string) => {
    return folkDances.find(d => d.id === danceId)?.name || '';
  };

  const getArtistReviews = (artistId: string) => {
    return reviews.filter(r => r.artist_id === artistId).slice(0, 2);
  };

  const filteredArtists = artists.filter(artist => {
    const priceMatch = priceFilter === 'all' ||
      (priceFilter === 'budget' && artist.price_range_max <= 75000) ||
      (priceFilter === 'mid' && artist.price_range_max > 75000 && artist.price_range_max <= 150000) ||
      (priceFilter === 'premium' && artist.price_range_max > 150000);
    return priceMatch;
  });

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-600">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="artists" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Artists & Groups
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Browse our curated collection of verified folk artists and performance groups
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredArtists.map(artist => {
            const artistReviews = getArtistReviews(artist.id);
            return (
              <div key={artist.id} className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:scale-105">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={artist.profile_image}
                    alt={artist.name}
                    className="w-full h-full object-cover"
                  />
                  {artist.is_verified && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full flex items-center space-x-1 shadow-lg">
                      <BadgeCheck className="w-4 h-4" />
                      <span className="text-sm font-medium">Verified</span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{artist.name}</h3>
                  <p className="text-orange-600 font-medium mb-3">{getDanceName(artist.folk_dance_id)}</p>

                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold text-gray-900">{artist.rating}</span>
                      <span className="text-gray-600 text-sm">({artist.total_reviews})</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{artist.experience_years} years</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span className="text-sm capitalize">{artist.type}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 leading-relaxed line-clamp-3">{artist.bio}</p>

                  <div className="bg-white rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Price Range</span>
                      <span className="font-bold text-orange-600">
                        ₹{artist.price_range_min.toLocaleString()} - ₹{artist.price_range_max.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {artistReviews.length > 0 && (
                    <div className="space-y-2 mb-4">
                      {artistReviews.map(review => (
                        <div key={review.id} className="bg-white rounded-lg p-3">
                          <div className="flex items-center space-x-2 mb-1">
                            <div className="flex">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                              ))}
                            </div>
                            <span className="text-sm font-medium text-gray-900">{review.client_name}</span>
                          </div>
                          <p className="text-xs text-gray-600 line-clamp-2">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() => {
                      const element = document.getElementById('book');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all transform hover:scale-105"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
