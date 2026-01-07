import About from '../components/About';
import Artists from '../components/Artists';
import BookingForm from '../components/BookingForm';
import FolkDances from '../components/FolkDances';
import Hero from '../components/Hero';
import Vision from '../components/Vision';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <FolkDances />
      <Artists />
      <BookingForm />
      <Vision />
    </>
  );
}
