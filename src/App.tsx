import Header from './components/Header';

import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import FolkDancesPage from './pages/FolkDancesPage';
import BookPage from './pages/BookPage';
import FolkDanceDetailPage from './pages/FolkDanceDetailPage';
import AboutPage from './pages/AboutPage';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function App() {
  return (
    <div className="min-h-screen">
      <Header />
        <main className="flex-grow">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/folk-dances" element={<FolkDancesPage />} />
            <Route path="/folk-dances/:id" element={<FolkDanceDetailPage />} />
            <Route path="/book" element={<BookPage />} />
          </Routes>
        </main>
      <Footer />
    </div>
  );
}

export default App;
