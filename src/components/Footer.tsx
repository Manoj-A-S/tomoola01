import { Music, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-full p-2">
                <Music className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">ToMoola</span>
            </div>
            <p className="text-sm leading-relaxed">
              Celebrating and preserving India's magnificent folk dance traditions while empowering artists nationwide.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-orange-200 font-medium">Home</Link></li>
              <li><Link to="/how-it-works" className="hover:text-orange-200 font-medium">How It Works</Link></li>
              <li><Link to="/folk-dances" className="hover:text-orange-200 font-medium">Folk Dances</Link></li>
              <li><Link to="/artists" className="hover:text-orange-200 font-medium">Artists</Link></li>
              <li><Link to="/book" className="hover:text-orange-200 font-medium">Book Now</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-orange-500 transition-colors cursor-pointer">Help Center</li>
              <li className="hover:text-orange-500 transition-colors cursor-pointer">Terms of Service</li>
              <li className="hover:text-orange-500 transition-colors cursor-pointer">Privacy Policy</li>
              <li className="hover:text-orange-500 transition-colors cursor-pointer">Artist Guidelines</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-orange-500" />
                <span>info@tomoola.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-orange-500" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span>Bangalore, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; 2025 ToMoola. All rights reserved. Proudly preserving India's cultural heritage.</p>
        </div>
      </div>
    </footer>
  );
}
