import { useState, useEffect } from 'react';
import { supabase, Artist, Booking } from '../lib/supabase';
import { Calendar, Mail, Phone, MapPin, Users, MessageSquare, Send } from 'lucide-react';

export default function BookingForm() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [formData, setFormData] = useState<Booking>({
    artist_id: '',
    client_name: '',
    client_email: '',
    client_phone: '',
    event_date: '',
    event_type: '',
    event_location: '',
    expected_guests: 0,
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    const { data } = await supabase
      .from('artists')
      .select('*')
      .order('name');
    if (data) setArtists(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const { error } = await supabase
      .from('bookings')
      .insert([formData]);

    setSubmitting(false);

    if (!error) {
      setSubmitted(true);
      setFormData({
        artist_id: '',
        client_name: '',
        client_email: '',
        client_phone: '',
        event_date: '',
        event_type: '',
        event_location: '',
        expected_guests: 0,
        message: ''
      });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'expected_guests' ? parseInt(value) || 0 : value
    }));
  };

  return (
    <section id="book" className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Book Your Artist
            </h2>
            <p className="text-xl text-gray-600">
              Fill out the form below and we'll connect you with your chosen artist
            </p>
          </div>

          {submitted && (
            <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-6 mb-8 text-center">
              <div className="text-green-600 font-semibold text-lg mb-2">Booking Request Submitted!</div>
              <p className="text-green-700">We'll get back to you shortly with confirmation details.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-2">
                  Select Artist/Group *
                </label>
                <select
                  name="artist_id"
                  value={formData.artist_id}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                >
                  <option value="">Choose an artist...</option>
                  {artists.map(artist => (
                    <option key={artist.id} value={artist.id}>
                      {artist.name} - ₹{artist.price_range_min.toLocaleString()} - ₹{artist.price_range_max.toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Your Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="client_name"
                    value={formData.client_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="client_email"
                    value={formData.client_email}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    name="client_phone"
                    value={formData.client_phone}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Event Date *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    name="event_date"
                    value={formData.event_date}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Event Type *
                </label>
                <select
                  name="event_type"
                  value={formData.event_type}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                >
                  <option value="">Select event type...</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Corporate Event">Corporate Event</option>
                  <option value="Festival">Festival</option>
                  <option value="Cultural Event">Cultural Event</option>
                  <option value="Reception">Reception</option>
                  <option value="Private Party">Private Party</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Event Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="event_location"
                    value={formData.event_location}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                    placeholder="City, State"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Expected Guests
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    name="expected_guests"
                    value={formData.expected_guests || ''}
                    onChange={handleChange}
                    min="0"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                    placeholder="Number of guests"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-2">
                  Additional Message
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors resize-none"
                    placeholder="Any special requirements or questions?"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-8 bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>{submitting ? 'Submitting...' : 'Submit Booking Request'}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
